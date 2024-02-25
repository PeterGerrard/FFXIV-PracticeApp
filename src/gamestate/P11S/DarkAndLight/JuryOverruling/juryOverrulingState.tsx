import { Point, point, vector } from "@flatten-js/core";
import { DangerPuddle, survivePuddles } from "../../../Mechanics/DangerPuddles";
import { getRole } from "../../../gameState";
import {
  MarkerC,
  MarkerA,
  Marker1,
  Marker3,
  Marker2,
  Marker4,
  MarkerB,
  MarkerD,
} from "../../p11sMarkers";
import {
  DarkAndLightPlayer,
  DarkAndLightGameState,
  getDefaultPos,
  isTetherSafe,
} from "../gameState";

const getSafeSpot = (
  player: DarkAndLightPlayer,
  bossColour: "Dark" | "Light"
): Point => {
  const short = player.tetherLength === "Short";
  if (bossColour === "Dark") {
    if (
      short &&
      (player.role === "Healer" ||
        getRole(player.tetheredDesignation) === "Healer")
    ) {
      return MarkerC;
    }
    if (
      short &&
      (player.role === "Tank" || getRole(player.tetheredDesignation) === "Tank")
    ) {
      return MarkerA;
    }

    if (
      player.role === "Tank" ||
      getRole(player.tetheredDesignation) === "Healer"
    ) {
      return Marker1;
    }
    return Marker3;
  } else {
    const leftSafe = new Point(0.2, 0.5);
    const rightSafe = new Point(0.8, 0.5);
    if (
      short &&
      (player.role === "Healer" ||
        getRole(player.tetheredDesignation) === "Healer")
    ) {
      return rightSafe;
    }
    if (
      !short &&
      (player.role === "Tank" ||
        getRole(player.tetheredDesignation) === "Healer")
    ) {
      return rightSafe;
    }

    return leftSafe;
  }
};

export type JuryOverrulingGameState = DarkAndLightGameState & {
  stage: "Before" | "Lines" | "Move" | "AOE";
};

export const initialJuryOverrullingState = (): JuryOverrulingGameState => ({
  bossColour: null,
  cast: null,
  stage: "Before",
  hasFinished: false,
});

export const getDangerPuddles = (
  gameState: JuryOverrulingGameState,
  players: DarkAndLightPlayer[]
): DangerPuddle[] => {
  if (gameState.bossColour && gameState.stage === "Lines") {
    return players.map<DangerPuddle>((p) => ({
      type: "line",
      angle: vector(point(0.5, 0.5), point(0.5, 1)).angleTo(
        vector(point(0.5, 0.5), p.position)
      ),
      onAnimationEnd: () => {},
      source: new Point(0.5, 0.5),
      width: 0.2,
      colour: gameState.bossColour === "Dark" ? "purple" : "yellow",
      split: false,
      damage: 0.8,
      roleRequirement: null,
      debuffRequirement: null,
      instaKill: null,
    }));
  }
  if (gameState.bossColour && gameState.stage === "AOE") {
    return [
      Marker1,
      Marker2,
      Marker3,
      Marker4,
      MarkerA,
      MarkerB,
      MarkerC,
      MarkerD,
    ].map<DangerPuddle>((m) =>
      gameState.bossColour === "Dark"
        ? {
            type: "donut",
            innerRadius: 0.05,
            outerRadius: 0.2,
            source: m,
            colour: "purple",
            onAnimationEnd: () => {},
            split: false,
            damage: 1,
            roleRequirement: null,
            debuffRequirement: null,
            instaKill: null,
          }
        : {
            type: "circle",
            source: m,
            radius: 0.125,
            colour: "yellow",
            onAnimationEnd: () => {},
            split: false,
            damage: 1,
            roleRequirement: null,
            debuffRequirement: null,
            instaKill: null,
          }
    );
  }
  return [];
};

export const applyDamage = (
  gameState: JuryOverrulingGameState,
  players: DarkAndLightPlayer[]
): DarkAndLightPlayer[] => {
  const survivingPlayers = survivePuddles(
    getDangerPuddles(gameState, players),
    players
  );
  return players.map((p) => ({
    ...p,
    alive:
      survivingPlayers.includes(p.designation) &&
      isTetherSafe(
        p,
        players.filter((o) => o.designation === p.tetheredDesignation)[0]
      ),
  }));
};
export const getTargetSpot = (
  gameState: JuryOverrulingGameState,
  player: DarkAndLightPlayer
): Point => {
  if (!gameState.bossColour) return getDefaultPos(player);
  if (gameState.stage === "Move")
    return getSafeSpot(player, gameState.bossColour);
  return getDefaultPos(player);
};
export const progress = (
  gameState: JuryOverrulingGameState
): JuryOverrulingGameState => {
  if (gameState.cast === null) {
    return {
      bossColour: Math.random() < 0.5 ? "Dark" : "Light",
      cast: {
        name: "Jury Overruling",
        value: 100,
      },
      stage: "Lines",
      hasFinished: false,
    };
  }
  if (gameState.stage === "Lines") {
    return {
      ...gameState,
      stage: "Move",
    };
  }
  if (gameState.stage === "Move") {
    return {
      ...gameState,
      stage: "AOE",
      hasFinished: true,
    };
  }
  return {
    ...gameState,
    hasFinished: true,
  };
};
