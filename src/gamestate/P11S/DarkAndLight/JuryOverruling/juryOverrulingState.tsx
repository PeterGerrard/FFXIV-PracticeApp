import { Point } from "@flatten-js/core";
import { DangerPuddle, survivePuddles } from "../../../Mechanics/DangerPuddles";
import { GameLoop } from "../../../gameState";
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
import { Arena } from "../Arena";
import {
  getDefaultPos,
  DarkAndLightPlayer,
  DarkAndLightGameState,
} from "../gameState";

const getSafeSpot = (
  player: DarkAndLightPlayer,
  bossColour: "Dark" | "Light"
): Point => {
  const short = player.tetherLength === "Short";
  if (bossColour === "Dark") {
    if (
      short &&
      (player.role === "Healer" || player.tetheredRole === "Healer")
    ) {
      return MarkerC;
    }
    if (short && (player.role === "Tank" || player.tetheredRole === "Tank")) {
      return MarkerA;
    }

    if (player.role === "Tank" || player.tetheredRole === "Healer") {
      return Marker1;
    }
    return Marker3;
  } else {
    const leftSafe = new Point(0.2, 0.5);
    const rightSafe = new Point(0.8, 0.5);
    if (
      short &&
      (player.role === "Healer" || player.tetheredRole === "Healer")
    ) {
      return rightSafe;
    }
    if (
      !short &&
      (player.role === "Tank" || player.tetheredRole === "Healer")
    ) {
      return rightSafe;
    }

    return leftSafe;
  }
};

export type JuryOverrulingGameState = DarkAndLightGameState & {
  explosions: "Before" | "Lines" | "Move" | "AOE";
};

export const initialJuryOverrullingState: JuryOverrulingGameState = {
  bossColour: null,
  cast: null,
  explosions: "Before",
  hasFinished: false,
};

const getDangerPuddles = (
  gameState: JuryOverrulingGameState,
  animationEnd?: () => void
): DangerPuddle[] => {
  if (gameState.bossColour && gameState.explosions === "Lines") {
    return [0, 45, 90, 135, 180, 225, 270, 315].map<DangerPuddle>((d) => ({
      type: "line",
      angle: d,
      onAnimationEnd: animationEnd && d == 0 ? animationEnd : () => {},
      source: new Point(0.5, 0.5),
      width: 0.2,
      colour: gameState.bossColour === "Dark" ? "purple" : "yellow",
      survivable: 1,
      roleRequirement: null,
    }));
  }
  if (gameState.bossColour && gameState.explosions === "AOE") {
    return [
      Marker1,
      Marker2,
      Marker3,
      Marker4,
      MarkerA,
      MarkerB,
      MarkerC,
      MarkerD,
    ].map<DangerPuddle>((m, i) =>
      gameState.bossColour === "Dark"
        ? {
            type: "donut",
            innerRadius: 0.05,
            outerRadius: 0.2,
            source: m,
            colour: "purple",
            onAnimationEnd: animationEnd && i == 0 ? animationEnd : () => {},
            survivable: 0,
            roleRequirement: null,
          }
        : {
            type: "circle",
            source: m,
            radius: 0.125,
            colour: "yellow",
            onAnimationEnd: animationEnd && i == 0 ? animationEnd : () => {},
            survivable: 0,
            roleRequirement: null,
          }
    );
  }
  return [];
};

export const JuryOverrulingState: GameLoop<
  DarkAndLightPlayer,
  JuryOverrulingGameState
> = {
  arena: (
    player: DarkAndLightPlayer,
    otherPlayers: DarkAndLightPlayer[],
    isDead: boolean,
    gameState: JuryOverrulingGameState,
    moveTo: (p: Point) => void,
    animationEnd: () => void
  ) => (
    <Arena
      player={player}
      otherPlayer={otherPlayers[0]}
      bossColour={gameState.bossColour}
      isDead={isDead}
      dangerPuddles={getDangerPuddles(gameState, animationEnd)}
      moveTo={moveTo}
    />
  ),
  nextState: (gameState: JuryOverrulingGameState): JuryOverrulingGameState => {
    if (gameState.cast === null) {
      return {
        bossColour: Math.random() < 0.5 ? "Dark" : "Light",
        cast: {
          name: "Jury Overruling",
          value: 100,
        },
        explosions: "Lines",
        hasFinished: false,
      };
    }
    if (gameState.explosions === "Lines") {
      return {
        ...gameState,
        explosions: "Move",
      };
    }
    if (gameState.explosions === "Move") {
      return {
        ...gameState,
        explosions: "AOE",
        hasFinished: true,
      };
    }
    return {
      ...gameState,
      hasFinished: true,
    };
  },
  isSafe: (gameState: JuryOverrulingGameState, player: DarkAndLightPlayer) => {
    const dangerPuddles = getDangerPuddles(gameState);
    return survivePuddles(dangerPuddles, player);
  },

  getSafeSpot: (
    gameState: JuryOverrulingGameState,
    player: DarkAndLightPlayer
  ): Point => {
    if (!gameState.bossColour) return getDefaultPos(player);
    if (gameState.explosions === "AOE")
      return getSafeSpot(player, gameState.bossColour);
    return getDefaultPos(player);
  },
};
