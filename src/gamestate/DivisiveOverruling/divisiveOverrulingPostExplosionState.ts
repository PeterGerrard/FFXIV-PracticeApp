import {
  GameState,
  Position,
  Action,
  MarkerB,
  MarkerD,
  Marker3,
  Marker1,
  isTetherSafe,
} from "../gameState";

export type DivisiveOverrulingPostExplosionGameState = GameState & {
  stage: "divisive-overruling-post-explosion";
};

const getSafeSpot = (
  gameState: DivisiveOverrulingPostExplosionGameState
): Position => {
  const short = gameState.player.debuff !== gameState.tetheredTo.debuff;
  if (gameState.bossColour === "Light") {
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

    if (short) {
      return leftSafe;
    }

    return leftSafe;
  }

  if (
    short &&
    (gameState.player.role === "Healer" ||
      gameState.tetheredTo.role === "Healer")
  ) {
    return [MarkerB[0], Marker3[1]];
  }
  if (
    !short &&
    (gameState.player.role === "Tank" || gameState.tetheredTo.role === "Healer")
  ) {
    return [MarkerB[0], Marker1[1]];
  }

  if (short) {
    return [MarkerD[0], Marker1[1]];
  }

  return [MarkerD[0], Marker3[1]];
};

const move = (
  gameState: DivisiveOverrulingPostExplosionGameState,
  position: Position
): GameState => {
  const safeLocation = getSafeSpot(gameState);

  if (
    ((gameState.bossColour === "Dark" && Math.abs(0.5 - position[0]) < 0.2) ||
      (gameState.bossColour === "Light" &&
        Math.abs(0.5 - position[0]) > 0.3)) &&
    isTetherSafe(gameState.player, gameState.tetheredTo)
  ) {
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
      bossColour: gameState.bossColour,
      setup: gameState.setup,
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
      bossColour: null,
      setup: gameState.setup,
    };
  }
};

export const divisiveOverrulingPostExplosionReducer = (
  gameState: DivisiveOverrulingPostExplosionGameState,
  action: Action
): GameState | undefined => {
  if (action.type === "MOVE") {
    return move(gameState, action.target);
  }
  return undefined;
};
