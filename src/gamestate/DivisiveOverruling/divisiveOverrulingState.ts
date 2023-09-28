import {
  GameState,
  Position,
  Action,
  Marker1,
  Marker3,
  Player,
} from "../gameState";

type DivisiveOverrulingGameState = GameState & {
  stage: "divisive-overruling";
};
export type DivisiveOverrulingInitialExplosionGameState = GameState & {
  stage: "divisive-overruling-initial-explosion";
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
): GameState & {
  player: Player;
  tetheredTo: Player;
  bossColour: "Light" | "Dark";
} => {
  const safeLocation = getSafeSpot(gameState);
  if (Math.abs(0.5 - position[0]) > 0.2) {
    return {
      stage: "divisive-overruling-post-explosion",
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
      bossColour: gameState.bossColour,
      setup: gameState.setup,
    };
  }
};

export const divisiveOverrulingReducer = (
  gameState: DivisiveOverrulingGameState,
  action: Action
): GameState | undefined => {
  if (action.type === "MOVE") {
    const nextState = move(gameState, action.target);

    return {
      ...gameState,
      stage: "divisive-overruling-initial-explosion",
      player: nextState.player,
      tetheredTo: nextState.tetheredTo,
      nextState,
      bossColour: nextState.bossColour,
    };
  }
  return undefined;
};

export const divisiveOverrulingInitialExplosionReducer = (
  gameState: DivisiveOverrulingInitialExplosionGameState,
  action: Action
): GameState | undefined => {
  if (action.type === "ANIMATIONEND") {
    return gameState.nextState;
  }
  return undefined;
};
