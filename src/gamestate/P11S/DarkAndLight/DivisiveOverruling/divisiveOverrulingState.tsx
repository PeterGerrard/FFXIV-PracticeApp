import { Point, point } from "@flatten-js/core";
import { getRole } from "../../../gameState";
import {
  DarkAndLightPlayer,
  DarkAndLightGameState,
  getDefaultPos,
  isTetherSafe,
} from "../gameState";
import { Marker3, Marker1, MarkerB, MarkerD } from "../../p11sMarkers";
import { Mechanic, composeMechanics, emptyMechanic } from "../../../mechanics";
import { lineMechanic } from "../../../Mechanics/LineAoE";
import { SimpleKillProfile } from "../../../Mechanics/DangerPuddles";

const getSafeSpot1 = (
  player: DarkAndLightPlayer,
  bossColour: "Dark" | "Light"
): Point => {
  const short = player.tetherLength === "Short";
  const leftSafe = new Point(0.2, 0.5);
  const rightSafe = new Point(0.8, 0.5);
  if (
    short &&
    (player.role === "Healer" ||
      getRole(player.tetheredDesignation) === "Healer")
  ) {
    return bossColour === "Light"
      ? rightSafe
      : new Point(rightSafe.x, Marker3.y);
  }
  if (
    !short &&
    (player.role === "Tank" || getRole(player.tetheredDesignation) === "Healer")
  ) {
    return bossColour === "Light"
      ? rightSafe
      : new Point(rightSafe.x, Marker1.y);
  }

  if (short) {
    return bossColour === "Light" ? leftSafe : new Point(leftSafe.x, Marker1.y);
  }

  return bossColour === "Light" ? leftSafe : new Point(leftSafe.x, Marker3.y);
};

const getSafeSpot2 = (
  player: DarkAndLightPlayer,
  bossColour: "Dark" | "Light"
): Point => {
  const short = player.tetherLength === "Short";
  if (bossColour === "Light") {
    const leftSafe = new Point(0.18, 0.5);
    const rightSafe = new Point(0.82, 0.5);
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

    if (short) {
      return leftSafe;
    }

    return leftSafe;
  }

  if (
    short &&
    (player.role === "Healer" ||
      getRole(player.tetheredDesignation) === "Healer")
  ) {
    return new Point(MarkerB.x, Marker3.y);
  }
  if (
    !short &&
    (player.role === "Tank" || getRole(player.tetheredDesignation) === "Healer")
  ) {
    return new Point(MarkerB.x, Marker1.y);
  }

  if (short) {
    return new Point(MarkerD.x, Marker1.y);
  }

  return new Point(MarkerD.x, Marker3.y);
};

export type DivisiveOverrulingGameState = DarkAndLightGameState & {
  stage: "Before" | "Explosion1" | "Explosion2";
};

export const initialDivisiveState = (): DivisiveOverrulingGameState => ({
  bossColour: null,
  cast: null,
  hasFinished: false,
  stage: "Before",
});

export const getMechanic = (
  gameState: DivisiveOverrulingGameState
): Mechanic<DarkAndLightPlayer> => {
  if (gameState.stage === "Explosion1") {
    return lineMechanic(point(0.5, 1), Math.PI, 0.4, SimpleKillProfile, {
      color: gameState.bossColour === "Dark" ? "purple" : "yellow",
    });
  }
  if (gameState.stage === "Explosion2") {
    if (gameState.bossColour === "Dark") {
      return composeMechanics([
        lineMechanic(point(0.15, 1), Math.PI, 0.3, SimpleKillProfile, {
          color: "purple",
        }),
        lineMechanic(point(0.85, 1), Math.PI, 0.3, SimpleKillProfile, {
          color: "purple",
        }),
      ]);
    } else {
      return lineMechanic(point(0.5, 1), Math.PI, 0.6, SimpleKillProfile, {
        color: "yellow",
      });
    }
  }
  return emptyMechanic();
};

export const applyDamage = (
  gameState: DivisiveOverrulingGameState,
  players: DarkAndLightPlayer[]
): DarkAndLightPlayer[] => {
  const damageMap = getMechanic(gameState).applyDamage(players);
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
  gameState: DivisiveOverrulingGameState,
  player: DarkAndLightPlayer
): Point => {
  if (!gameState.bossColour) return getDefaultPos(player);
  if (gameState.stage === "Before")
    return getSafeSpot1(player, gameState.bossColour);
  if (gameState.stage === "Explosion1")
    return getSafeSpot2(player, gameState.bossColour);
  return getDefaultPos(player);
};
export const progress = (
  gameState: DivisiveOverrulingGameState
): DivisiveOverrulingGameState => {
  if (gameState.cast === null) {
    return {
      bossColour: Math.random() < 0.5 ? "Dark" : "Light",
      cast: {
        name: "Divisive Overruling",
        value: 50,
      },
      stage: "Before",
      hasFinished: false,
    };
  }
  if (gameState.stage === "Before") {
    return {
      ...gameState,
      cast: {
        name: "Divisive Overruling",
        value: 100,
      },
      stage: "Explosion1",
    };
  }
  if (gameState.stage === "Explosion1") {
    return {
      ...gameState,
      stage: "Explosion2",
      hasFinished: true,
    };
  }
  return {
    ...gameState,
    hasFinished: true,
  };
};
