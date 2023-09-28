import { GameState, Position, Action, Marker1, Marker3 } from "../gameState";

type DivisiveOverrulingGameState = GameState & {
  stage: "divisive-overruling";
};

const getSafeSpot = (gameState: DivisiveOverrulingGameState): Position => {
  const short = gameState.player.debuff !== gameState.tetheredTo.debuff;
  const leftSafe: Position = [0.2, 0.5];
  const rightSafe: Position = [0.8, 0.5];
  if (
    short &&
    (gameState.player.role === "Healer" ||
      gameState.tetheredTo.role === "Healer")
  ) {
    return gameState.bossColour === "Light"
      ? rightSafe
      : [rightSafe[0], Marker3[1]];
  }
  if (
    !short &&
    (gameState.player.role === "Tank" || gameState.tetheredTo.role === "Healer")
  ) {
    return gameState.bossColour === "Light"
      ? rightSafe
      : [rightSafe[0], Marker1[1]];
  }

  if (short) {
    return gameState.bossColour === "Light"
      ? leftSafe
      : [leftSafe[0], Marker1[1]];
  }

  return gameState.bossColour === "Light"
    ? leftSafe
    : [leftSafe[0], Marker3[1]];
};

const move = (
  gameState: DivisiveOverrulingGameState,
  position: Position
): GameState => {
  const safeLocation = getSafeSpot(gameState);
  if (Math.abs(0.5 - position[0]) > 0.2) {
    return {
      stage:
        gameState.bossColour === "Dark" ? "divisive-overruling-dark" : "end",
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
    };
  }
};

export const divisiveOverrulingReducer = (
  gameState: DivisiveOverrulingGameState,
  action: Action
): GameState | undefined => {
  if (action.type === "MOVE") {
    return move(gameState, action.target);
  }
  return undefined;
};
