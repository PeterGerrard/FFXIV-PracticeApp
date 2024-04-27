import { Point, point, vector } from "@flatten-js/core";
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
import { EmptyMechanic, Mechanic, composeMechanics } from "../../../mechanics";
import { lineMechanic } from "../../../Mechanics/LineAoE";
import { SimpleHeavyDamageProfile, SimpleKillProfile } from "../../../Mechanics/DangerPuddles";
import { donutMechanic } from "../../../Mechanics/DonutAoE";
import { circleMechanic } from "../../../Mechanics/CircleAoE";

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

export const getMechanic = (
  gameState: JuryOverrulingGameState,
  players: DarkAndLightPlayer[]
): Mechanic<DarkAndLightPlayer> => {
  if (gameState.bossColour && gameState.stage === "Lines") {
    return composeMechanics(
      players.map((p) =>
        lineMechanic(
          point(0.5, 0.5),
          vector(point(0.5, 0.5), point(0.5, 1)).angleTo(
            vector(point(0.5, 0.5), p.position)
          ),
          0.2,
          SimpleHeavyDamageProfile,
          {
            color: gameState.bossColour === "Dark" ? "purple" : "yellow",
          }
        )
      )
    );
  }
  if (gameState.bossColour && gameState.stage === "AOE") {
    return composeMechanics([
      Marker1,
      Marker2,
      Marker3,
      Marker4,
      MarkerA,
      MarkerB,
      MarkerC,
      MarkerD,
    ].map((m) =>
      gameState.bossColour === "Dark"
        ? donutMechanic(m, 0.05, 0.2, SimpleKillProfile, {color: "purple"})
        : circleMechanic(m, 0.125, SimpleKillProfile, { color: "yellow"})
    ));
  }
  return EmptyMechanic;
};

export const applyDamage = (
  gameState: JuryOverrulingGameState,
  players: DarkAndLightPlayer[]
): DarkAndLightPlayer[] => {
  const damageMap = getMechanic(gameState, players).applyDamage(players);
  return players.map((p) => ({
    ...p,
    alive:
      damageMap[p.designation] < 1 &&
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
