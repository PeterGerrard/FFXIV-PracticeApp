import { DangerPuddle, survivePuddles } from "../../../Mechanics/DangerPuddles";
import { Cast, getRole } from "../../../gameState";
import { DarkAndLightPlayer, getDefaultPos, isTetherSafe } from "../gameState";
import { Point } from "@flatten-js/core";

const getSafeRevelationSpot = (
  player: DarkAndLightPlayer,
  bossColour: "Dark" | "Light",
  topBomb: "Dark" | "Light"
): Point => {
  if (bossColour === topBomb) {
    const leftSafe = new Point(0.2, 0.5);
    const rightSafe = new Point(0.8, 0.5);
    if (
      player.tetherLength === "Short" &&
      (player.role === "Healer" ||
        getRole(player.tetheredDesignation) === "Healer")
    ) {
      return rightSafe;
    }
    if (player.tetherLength === "Long" && player.role === "Tank") {
      return rightSafe;
    }
    if (
      player.tetherLength === "Long" &&
      getRole(player.tetheredDesignation) === "Healer"
    ) {
      return rightSafe;
    }
    return leftSafe;
  }
  const topSafe = new Point(0.5, 0.2);
  const bottomSafe = new Point(0.5, 0.8);
  if (player.role === "Healer") {
    return bottomSafe;
  }
  if (player.role === "Tank") {
    return topSafe;
  }
  if (player.tetherLength === "Long") {
    return getRole(player.tetheredDesignation) === "Healer"
      ? topSafe
      : bottomSafe;
  } else {
    return getRole(player.tetheredDesignation) === "Healer"
      ? bottomSafe
      : topSafe;
  }
};

export type RevelationGameState =
  | {
      stage: "initial";
      hasFinished: false;
      cast: null;
      bossColour: "Dark" | "Light";
      topBomb: "Dark" | "Light";
    }
  | {
      stage: "BombAppear";
      hasFinished: false;
      cast: Cast;
      bossColour: "Dark" | "Light";
      topBomb: "Dark" | "Light";
    }
  | {
      stage: "Explosion";
      hasFinished: true;
      cast: Cast;
      bossColour: "Dark" | "Light";
      topBomb: "Dark" | "Light";
    };

export const getDangerPuddles = (
  gameState: RevelationGameState
): DangerPuddle[] => {
  if (gameState.stage === "Explosion") {
    const bombLocations: Point[] =
      gameState.bossColour === gameState.topBomb
        ? [new Point(0.5, 0.2), new Point(0.5, 0.8)]
        : [new Point(0.2, 0.5), new Point(0.8, 0.5)];
    return bombLocations.map<DangerPuddle>((b) => ({
      type: "circle",
      source: b,
      colour: gameState.bossColour === "Dark" ? "purple" : "yellow",
      radius: 0.4,
      onAnimationEnd: () => {},
      split: false,
      damage: 1,
      roleRequirement: null,
      debuffRequirement: null,
      instaKill: null,
    }));
  }
  return [];
};

export const applyDamage = (
  gameState: RevelationGameState,
  players: DarkAndLightPlayer[]
): DarkAndLightPlayer[] => {
  const survivingPlayers = survivePuddles(getDangerPuddles(gameState), players);
  return players.map((p) => ({
    ...p,
    alive:
      survivingPlayers.includes(p.designation) &&
      (gameState.cast === null ||
        isTetherSafe(
          p,
          players.filter((o) => o.designation === p.tetheredDesignation)[0]
        )),
  }));
};
export const getTargetSpot = (
  gameState: RevelationGameState,
  _players: DarkAndLightPlayer[],
  player: DarkAndLightPlayer
): Point => {
  return gameState.bossColour === null ||
    gameState.cast === null ||
    gameState.cast.value < 50
    ? getDefaultPos(player)
    : getSafeRevelationSpot(player, gameState.bossColour, gameState.topBomb);
};
export const progress = (
  gameState: RevelationGameState
): RevelationGameState => {
  if (gameState.stage === "initial") {
    return {
      ...gameState,
      stage: "BombAppear",
      cast: {
        name: "Arcane Revelation",
        value: 50,
      },
    };
  } else if (gameState.stage === "BombAppear") {
    return {
      ...gameState,
      stage: "Explosion",
      cast: {
        name: "Arcane Revelation",
        value: 100,
      },
      hasFinished: true,
    };
  }
  return gameState;
};
