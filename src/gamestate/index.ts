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
import { useSetup } from "./Setup/setupState";
import { RevelationState } from "./Revelation/revelationsState";

export type { Role, Position, Player, Action };
export { isTetherSafe };

const reducerClass =
  (setup: Setup) =>
  (gameState: Game | null, action: Action): Game | null => {
    switch (action.type) {
      case "RESET":
        return null;
      case "RESTART":
      case "START":
        const player = createPlayer(setup);
        const otherPlayer = createPartner(player);
        return {
          player,
          otherPlayer,
          gameState: new RevelationState(),
          isDead: false,
        };

      case "SELECTROLE":
        return null;
    }
    if (gameState === null || gameState.isDead) {
      return gameState;
    }
    switch (action.type) {
      case "MOVE":
        const nextState = gameState.gameState.nextState();
        const updatedPlayer = {
          ...gameState.player,
          position: action.target,
        };
        const updatedOtherPlayer = {
          ...gameState.otherPlayer,
          position: nextState.getSafeSpot(gameState.otherPlayer),
        };
        const lived =
          nextState.isSafe(updatedPlayer) &&
          isTetherSafe(updatedPlayer, updatedOtherPlayer);
        return {
          player: updatedPlayer,
          otherPlayer: updatedOtherPlayer,
          gameState: nextState,
          isDead: !lived,
        };
      case "ANIMATIONEND":
        const nextState2 = gameState.gameState.nextState();
        const lived2 =
          nextState2.isSafe(gameState.player) &&
          isTetherSafe(gameState.player, gameState.otherPlayer);
        return {
          player: gameState.player,
          otherPlayer: gameState.otherPlayer,
          gameState: nextState2,
          isDead: !lived2,
        };
    }
  };

type Game = {
  gameState: IGameState;
  player: Player;
  otherPlayer: Player;
  isDead: boolean;
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
