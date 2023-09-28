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
          gameState: new Positions1(),
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
        const updatedPlayer = {
          ...gameState.player,
          position: action.target,
        };
        const updatedOtherPlayer = {
          ...gameState.otherPlayer,
          position: gameState.gameState.getSafeSpot(gameState.otherPlayer),
        };
        const lived =
          gameState.gameState.isSafe(updatedPlayer) &&
          isTetherSafe(updatedPlayer, updatedOtherPlayer);
        return {
          player: updatedPlayer,
          otherPlayer: updatedOtherPlayer,
          gameState: gameState.gameState.nextState(),
          isDead: !lived,
        };
      case "ANIMATIONEND":
        const lived2 =
          gameState.gameState.isSafe(gameState.player) &&
          isTetherSafe(gameState.player, gameState.otherPlayer);
        return {
          player: gameState.player,
          otherPlayer: gameState.otherPlayer,
          gameState: gameState.gameState.nextState(),
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
