import {
  GameState,
  Position,
  Action,
  distanceTo,
  MarkerC,
  MarkerA,
  Marker1,
  Marker3,
  Player,
} from "../gameState";

type JuryOverrulingGameState = GameState & {
  stage: "jury-overruling";
};

export type JuryOverrulingInitialExplosionGameState = GameState & {
  stage: "jury-overruling-initial-explosion";
};

export type JuryOverrulingPostExplosionGameState = GameState & {
  stage: "jury-overruling-explosion";
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
): GameState & { player: Player; tetheredTo: Player } => {
  const safeLocation = getSafeSpot(gameState);
  if (distanceTo(position, safeLocation) < 0.1) {
    return {
      stage: "positions3",
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
      safeLocation: getSafeSpot(gameState),
      bossColour: null,
      setup: gameState.setup,
    };
  }
};

export const juryOverrulingReducer = (
  gameState: JuryOverrulingGameState,
  action: Action
): GameState | undefined => {
  if (action.type === "MOVE") {
    const nextState = move(gameState, action.target);
    return {
      ...gameState,
      stage: "jury-overruling-explosion",
      player: nextState.player,
      tetheredTo: nextState.tetheredTo,
      nextState: nextState,
    };
  }
  return undefined;
};

export const juryOverrulingInitialExplosionReducer = (
  gameState: JuryOverrulingInitialExplosionGameState,
  action: Action
): GameState | undefined => {
  if (action.type === "ANIMATIONEND") {
    return gameState.nextState;
  }
  return undefined;
};

export const juryOverrulingPostExplosionReducer = (
  gameState: JuryOverrulingPostExplosionGameState,
  action: Action
): GameState | undefined => {
  if (action.type === "ANIMATIONEND") {
    return gameState.nextState;
  }
  return undefined;
};
