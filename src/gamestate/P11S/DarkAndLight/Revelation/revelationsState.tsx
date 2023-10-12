import { Bombs } from "../../Bombs";
import { DangerPuddle, survivePuddles } from "../../../Mechanics/DangerPuddles";
import { GameState, GameLoop } from "../../../gameState";
import { Arena } from "../Arena";
import { DarkAndLightPlayer, getDefaultPos } from "../gameState";
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
  const topSafe = new Point(0.5, 0.2);
  const bottomSafe = new Point(0.5, 0.8);
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
): DangerPuddle[] => {
  if (gameState.cast && gameState.cast.value >= 100) {
    const bombLocations: Point[] =
      gameState.bossColour === gameState.topBomb
        ? [new Point(0.5, 0.2), new Point(0.5, 0.8)]
        : [new Point(0.2, 0.5), new Point(0.8, 0.5)];
    return bombLocations.map<DangerPuddle>((b, i) => ({
      type: "circle",
      source: b,
      colour: gameState.bossColour === "Dark" ? "purple" : "yellow",
      radius: 0.4,
      onAnimationEnd: animationEnd && i == 0 ? animationEnd : () => {},
      survivable: 0,
      roleRequirement: null,
    }));
  }
  return [];
};

export const RevelationState: GameLoop<
  DarkAndLightPlayer,
  RevelationGameState
> = {
  arena: (
    player: DarkAndLightPlayer,
    otherPlayers: DarkAndLightPlayer[],
    isDead: boolean,
    gameState: RevelationGameState,
    moveTo: (p: Point) => void,
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
    return survivePuddles(dangerPuddles, player);
  },
  getSafeSpot: (
    gameState: RevelationGameState,
    player: DarkAndLightPlayer
  ): Point => {
    return gameState.bossColour === null ||
      gameState.cast === null ||
      gameState.cast.value < 100
      ? getDefaultPos(player)
      : getSafeRevelationSpot(player, gameState.bossColour, gameState.topBomb);
  },
};
