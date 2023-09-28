import { useReducer } from "react";
import {
  Action,
  GameState,
  Player,
  Position,
  Role,
  defaultReducer,
  isTetherSafe,
} from "./gameState";
import { setupReducer } from "./Setup/setupState";
import { positions1Reducer } from "./positions1State";
import { revalationReducer } from "./Revelation/revelationsState";
import { positions2Reducer } from "./Positions2/positions2State";
import { juryOverrulingReducer } from "./JuryOverruling/juryOverrulingState";
import { positions3Reducer } from "./Positions3/positions3State";

export type { Role, Position, Player, GameState, Action };
export { isTetherSafe };

const applyStateReducer = (
  gameState: GameState,
  action: Action
): GameState | undefined => {
  switch (gameState.stage) {
    case "setup":
      return setupReducer(gameState, action);
    case "positions1":
      return positions1Reducer(gameState, action);
    case "revelation":
      return revalationReducer(gameState, action);
    case "positions2":
      return positions2Reducer(gameState, action);
    case "jury-overruling":
      return juryOverrulingReducer(gameState, action);
    case "positions3":
      return positions3Reducer(gameState, action);
    case "end":
    case "dead":
      return undefined;
  }
};

const defaultState: GameState = {
  stage: "setup",
  role: "Healer",
};

const reducer = (gameState: GameState, action: Action): GameState =>
  defaultReducer(gameState, action) ??
  applyStateReducer(gameState, action) ??
  gameState;

export const useGameState = () => useReducer(reducer, defaultState);
