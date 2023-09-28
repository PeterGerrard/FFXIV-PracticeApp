import { JuryOverrulingState } from "../JuryOverruling/juryOverrulingState";
import {
  Position,
  Action,
  distanceTo,
  Player,
  getDefaultPos,
  GameState,
  Loop,
} from "../gameState";
import { RevelationExplosionOverlay } from "./RevelationExplosionOverlay";

const getSafeRevelationSpot = (
  player: Player,
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

const isSafe = (
  player: Player,
  bossColour: "Dark" | "Light",
  topBomb: "Dark" | "Light"
) => {
  const bombLocations: Position[] =
    bossColour === topBomb
      ? [
          [0.5, 0.2],
          [0.5, 0.8],
        ]
      : [
          [0.2, 0.5],
          [0.8, 0.5],
        ];
  return bombLocations.every((p) => distanceTo(player.position, p) > 0.4);
};

export type RevelationGameState = GameState & {
  bossColour: "Dark" | "Light";
  topBomb: "Dark" | "Light";
};

export const RevelationState: Loop<
  RevelationGameState,
  typeof JuryOverrulingState
> = {
  overlay: (
    gameState: RevelationGameState,
    dispatch: (action: Action) => void
  ) => {
    return gameState.cast !== null ? (
      <RevelationExplosionOverlay
        state={gameState}
        cast={gameState.cast}
        dispatch={dispatch}
      />
    ) : (
      <></>
    );
  },
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
  isSafe: (gameState: RevelationGameState, player: Player) =>
    gameState.bossColour === null ||
    gameState.cast === null ||
    gameState.cast.value < 100 ||
    isSafe(player, gameState.bossColour, gameState.topBomb),
  getSafeSpot: (gameState: RevelationGameState, player: Player): Position => {
    return gameState.bossColour === null ||
      gameState.cast === null ||
      gameState.cast.value < 100
      ? getDefaultPos(player)
      : getSafeRevelationSpot(player, gameState.bossColour, gameState.topBomb);
  },
  nextLoop: JuryOverrulingState,
};
