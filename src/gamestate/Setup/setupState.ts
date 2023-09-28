import { useReducer } from "react";
import { Action, Role } from "../gameState";

export type SetupGameState = { role: Role };

const setupReducer = (
  state: SetupGameState,
  action: Action
): SetupGameState => {
  if (action.type === "SELECTROLE") {
    return { role: action.role };
  }
  return state;
};

export const useSetup = () => useReducer(setupReducer, { role: "Healer" });
