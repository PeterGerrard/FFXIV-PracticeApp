import { Action, GameState, createPartner, createPlayer } from "../gameState";

export type SetupGameState = GameState & { stage: "setup" };

export const setupReducer = (
  gameState: SetupGameState,
  action: Action
): GameState | undefined => {
  if (action.type === "START") {
    const player = createPlayer(gameState.setup);
    const tetheredTo = createPartner(player);
    return {
      stage: "positions1",
      player,
      tetheredTo,
      setup: gameState.setup,
    };
  } else if (action.type === "SELECTROLE") {
    return { ...gameState, setup: { role: action.role } };
  }
  return undefined;
};
