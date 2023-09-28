import {
  GameState,
  Position,
  Action,
  distanceTo,
  MarkerC,
  MarkerA,
  MarkerB,
  MarkerD,
} from "../gameState";

type DivisiveOverrulingDarkGameState = GameState & {
  stage: "divisive-overruling-dark";
};

const getSafeSpot = (gameState: DivisiveOverrulingDarkGameState): Position => {
  const short = gameState.player.debuff !== gameState.tetheredTo.debuff;
  if (
    short &&
    (gameState.player.role === "Healer" ||
      gameState.tetheredTo.role === "Healer")
  ) {
    return [MarkerB[0], MarkerC[1]];
  }
  if (
    !short &&
    (gameState.player.role === "Tank" || gameState.tetheredTo.role === "Healer")
  ) {
    return [MarkerB[0], MarkerA[1]];
  }

  if (short) {
    return [MarkerD[0], MarkerA[1]];
  }

  return [MarkerD[0], MarkerC[1]];
};

const move = (
  gameState: DivisiveOverrulingDarkGameState,
  position: Position
): GameState => {
  const safeLocation = getSafeSpot(gameState);
  if (distanceTo(position, safeLocation) < 0.1) {
    return {
      stage: "end",
      player: {
        ...gameState.player,
        position: position,
      },
      tetheredTo: {
        ...gameState.tetheredTo,
        position: getSafeSpot({
          ...gameState,
          player: gameState.tetheredTo,
          tetheredTo: gameState.player,
        }),
      },
    };
  } else {
    return {
      stage: "dead",
      player: {
        ...gameState.player,
        alive: false,
        position: position,
      },
      tetheredTo: {
        ...gameState.tetheredTo,
        alive: false,
        position: getSafeSpot({
          ...gameState,
          player: gameState.tetheredTo,
          tetheredTo: gameState.player,
        }),
      },
      safeLocation: safeLocation,
      bossColour: null
    };
  }
};

export const divisiveOverrulingDarkReducer = (
  gameState: DivisiveOverrulingDarkGameState,
  action: Action
): GameState | undefined => {
  if (action.type === "MOVE") {
    return move(gameState, action.target);
  }
  return undefined;
};
