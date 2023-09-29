import { Position } from "../../..";
import { Bombs } from "../../Bombs";
import {
  DangerPuddle,
  DangerPuddles,
  survivePuddles,
} from "../../../Mechanics/DangerPuddles";
import { GameState, Loop } from "../../../gameState";
import { Arena } from "../Arena";
import { JuryOverrulingState } from "../JuryOverruling/juryOverrulingState";
import { DarkAndLightPlayer, getDefaultPos } from "../gameState";

const getSafeRevelationSpot = (
  player: DarkAndLightPlayer,
  bossColour: "Dark" | "Light",
  topBomb: "Dark" | "Light"
): Position => {
  if (bossColour === topBomb) {
    const leftSafe: Position = [0.2, 0.5];
    const rightSafe: Position = [0.8, 0.5];
    if (
      player.tetherLength === "Short" &&
      (player.role === "Healer" || player.tetheredRole === "Healer")
    ) {
      return rightSafe;
    }
    if (player.tetherLength === "Long" && player.role === "Tank") {
      return rightSafe;
    }
    if (player.tetherLength === "Long" && player.tetheredRole === "Healer") {
      return rightSafe;
    }
    return leftSafe;
  }
  const topSafe: Position = [0.5, 0.2];
  const bottomSafe: Position = [0.5, 0.8];
  if (player.role === "Healer") {
    return bottomSafe;
  }
  if (player.role === "Tank") {
    return topSafe;
  }
  if (player.tetherLength === "Long") {
    return player.tetheredRole === "Healer" ? topSafe : bottomSafe;
  } else {
    return player.tetheredRole === "Healer" ? bottomSafe : topSafe;
  }
};

export type RevelationGameState = GameState & {
  bossColour: "Dark" | "Light";
  topBomb: "Dark" | "Light";
};

const getDangerPuddles = (
  gameState: RevelationGameState,
  animationEnd?: () => void
): DangerPuddles => {
  if (gameState.cast && gameState.cast.value >= 100) {
    const bombLocations: Position[] =
      gameState.bossColour === gameState.topBomb
        ? [
            [0.5, 0.2],
            [0.5, 0.8],
          ]
        : [
            [0.2, 0.5],
            [0.8, 0.5],
          ];
    return {
      puddles: bombLocations.map<DangerPuddle>((b, i) => ({
        type: "circle",
        source: b,
        colour: gameState.bossColour === "Dark" ? "purple" : "yellow",
        radius: 0.4,
        onAnimationEnd: animationEnd && i == 0 ? animationEnd : () => {},
      })),
      survivable: 0,
    };
  }
  return { puddles: [], survivable: 0 };
};

export const RevelationState: Loop<
  DarkAndLightPlayer,
  RevelationGameState,
  typeof JuryOverrulingState
> = {
  arena: (
    player: DarkAndLightPlayer,
    otherPlayers: DarkAndLightPlayer[],
    isDead: boolean,
    gameState: RevelationGameState,
    moveTo: (p: Position) => void,
    animationEnd: () => void
  ) => (
    <Arena
      player={player}
      otherPlayer={otherPlayers[0]}
      bossColour={gameState.cast ? gameState.bossColour : null}
      isDead={isDead}
      dangerPuddles={getDangerPuddles(gameState, animationEnd)}
      moveTo={moveTo}
    >
      {gameState.cast !== null && <Bombs topBomb={gameState.topBomb} />}
    </Arena>
  ),
  nextState: (gameState: RevelationGameState) => {
    if (gameState.cast === null) {
      return {
        ...gameState,
        cast: {
          name: "Arcane Revelation",
          value: 50,
        },
      };
    } else if (gameState.cast.value < 100) {
      return {
        ...gameState,
        cast: {
          name: "Arcane Revelation",
          value: 100,
        },
        hasFinished: true,
      };
    }
    return {
      ...gameState,
      hasFinished: true,
    };
  },
  isSafe: (gameState: RevelationGameState, player: DarkAndLightPlayer) => {
    const dangerPuddles = getDangerPuddles(gameState);
    return survivePuddles(dangerPuddles, player.position);
  },
  getSafeSpot: (
    gameState: RevelationGameState,
    player: DarkAndLightPlayer
  ): Position => {
    return gameState.bossColour === null ||
      gameState.cast === null ||
      gameState.cast.value < 100
      ? getDefaultPos(player)
      : getSafeRevelationSpot(player, gameState.bossColour, gameState.topBomb);
  },
  nextLoop: JuryOverrulingState,
};
