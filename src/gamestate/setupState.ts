import { Action, GameState, getRandomPos } from "./gameState";

type SetupGameState = GameState & { stage: "setup" };

export const setupReducer = (
  gameState: SetupGameState,
  action: Action
): GameState | undefined => {
  if (action.type === "START") {
    return {
      stage: "positions1",
      player: {
        role: gameState.role,
        position: getRandomPos(),
        debuff: Math.random() <= 0.5 ? "Light" : "Dark",
        alive: true,
      },
      tetheredTo: {
        role:
          gameState.role === "DPS"
            ? Math.random() <= 0.5
              ? "Tank"
              : "Healer"
            : "DPS",
        position: getRandomPos(),
        debuff: Math.random() <= 0.5 ? "Light" : "Dark",
        alive: true,
      },
    };
  } else if (action.type === "SELECTROLE") {
    return { ...gameState, role: action.role };
  }
  return undefined;
};
