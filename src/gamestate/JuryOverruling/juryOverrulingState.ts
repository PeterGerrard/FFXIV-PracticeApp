import {
  GameState,
  Position,
  Action,
  distanceTo,
  MarkerC,
  MarkerA,
  Marker1,
  Marker3,
} from "../gameState";

type JuryOverrulingGameState = GameState & {
  stage: "jury-overruling";
};

const getSafeSpot = (gameState: JuryOverrulingGameState): Position => {
  const short = gameState.player.debuff !== gameState.tetheredTo.debuff;
  if (gameState.bossColour === "Dark") {
    if (
      short &&
      (gameState.player.role === "Healer" ||
        gameState.tetheredTo.role === "Healer")
    ) {
      return MarkerC;
    }
    if (
      short &&
      (gameState.player.role === "Tank" || gameState.tetheredTo.role === "Tank")
    ) {
      return MarkerA;
    }

    if (
      gameState.player.role === "Tank" ||
      gameState.tetheredTo.role === "Healer"
    ) {
      return Marker1;
    }
    return Marker3;
  } else {
    const leftSafe: Position = [0.2, 0.5];
    const rightSafe: Position = [0.8, 0.5];
    if (
      short &&
      (gameState.player.role === "Healer" ||
        gameState.tetheredTo.role === "Healer")
    ) {
      return rightSafe;
    }
    if (
      !short &&
      (gameState.player.role === "Tank" ||
        gameState.tetheredTo.role === "Healer")
    ) {
      return rightSafe;
    }

    return leftSafe;
  }
};

const move = (
  gameState: JuryOverrulingGameState,
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
      safeLocation: getSafeSpot(gameState),
    };
  }
};

export const juryOverrulingReducer = (
  gameState: JuryOverrulingGameState,
  action: Action
): GameState | undefined => {
  if (action.type === "MOVE") {
    return move(gameState, action.target);
  }
  return undefined;
};
