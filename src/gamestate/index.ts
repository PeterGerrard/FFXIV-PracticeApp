import { useReducer } from "react";
import {
  Action,
  IGameState,
  Player,
  Position,
  Role,
  Setup,
  createPartner,
  createPlayer,
  isTetherSafe,
} from "./gameState";
import { Positions1 } from "./positions1State";
import { useSetup } from "./Setup/setupState";

export type { Role, Position, Player, Action };
export { isTetherSafe };

const reducerClass =
  (setup: Setup) =>
  (gameState: IGameState | null, action: Action): IGameState | null => {
    switch (action.type) {
      case "RESET":
        return null;
      case "RESTART":
      case "START":
        const player = createPlayer(setup);
        const tetheredTo = createPartner(player);
        return new Positions1({
          player,
          tetheredTo,
        });
    }
    return gameState ? gameState.reduce(action) ?? gameState : null;
  };

export const useGameState = () => {
  const [setupState, dispatchSetup] = useSetup();
  const [gameState, dispatch] = useReducer(reducerClass(setupState), null);
  return [
    gameState,
    setupState,
    (a: Action) => {
      dispatchSetup(a);
      dispatch(a);
    },
  ] as const;
};
