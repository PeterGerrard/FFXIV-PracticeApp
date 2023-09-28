import { GameState, Position, Action, distanceTo } from "./gameState";

type RevelationGameState = GameState & {
  stage: "revelation";
};

const getSafeRevelationSpot = (gameState: RevelationGameState): Position => {
  if (gameState.bossColour === gameState.topBomb) {
    const leftSafe: Position = [0.2, 0.5];
    const rightSafe: Position = [0.8, 0.5];
    if (
      gameState.player.debuff !== gameState.tetheredTo.debuff &&
      (gameState.player.role === "Healer" ||
        gameState.tetheredTo.role === "Healer")
    ) {
      return rightSafe;
    }
    if (
      gameState.player.debuff === gameState.tetheredTo.debuff &&
      gameState.player.role === "Tank"
    ) {
      return rightSafe;
    }
    if (
      gameState.player.debuff === gameState.tetheredTo.debuff &&
      gameState.player.role === "Tank"
    ) {
      return rightSafe;
    }
    if (
      gameState.player.debuff === gameState.tetheredTo.debuff &&
      gameState.tetheredTo.role === "Healer"
    ) {
      return rightSafe;
    }
    return leftSafe;
  }
  const topSafe: Position = [0.5, 0.2];
  const bottomSafe: Position = [0.5, 0.8];
  if (gameState.player.role === "Healer") {
    return bottomSafe;
  }
  if (gameState.player.role === "Tank") {
    return topSafe;
  }
  if (gameState.player.debuff === gameState.tetheredTo.debuff) {
    return gameState.tetheredTo.role === "Healer" ? topSafe : bottomSafe;
  } else {
    return gameState.tetheredTo.role === "Healer" ? bottomSafe : topSafe;
  }
};

const move = (
  gameState: RevelationGameState,
  position: Position
): GameState => {
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
  if (bombLocations.every((p) => distanceTo(position, p) > 0.4)) {
    return {
      stage: "end",
      player: {
        ...gameState.player,
        position: position,
      },
      tetheredTo: {
        ...gameState.tetheredTo,
        position: getSafeRevelationSpot({
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
        position: getSafeRevelationSpot({
          ...gameState,
          player: gameState.tetheredTo,
          tetheredTo: gameState.player,
        }),
      },
      safeLocation: getSafeRevelationSpot(gameState),
    };
  }
};

export const revalationReducer = (
  gameState: RevelationGameState,
  action: Action
): GameState | undefined => {
  if (action.type === "MOVE") {
    return move(gameState, action.target);
  }
  return undefined;
};
