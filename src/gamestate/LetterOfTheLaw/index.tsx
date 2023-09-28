import { IterateGames1 } from "..";
import { GameLoop1, GameState, Setup } from "../gameState";
import { LetterOfTheLawPlayer, createPlayer } from "./gameState";

export type LetterOfTheLawState = IterateGames1<
  LetterOfTheLawPlayer,
  GameState
>;

const tempState: GameLoop1<LetterOfTheLawPlayer, GameState> = {
  arena: () => <div>LOTL</div>,
  getSafeSpot: () => [0.5, 0.5],
  isSafe: () => true,
  nextState: (s) => s,
};

export const startLetterOfTheLaw = (setup: Setup): LetterOfTheLawState => {
  const player = createPlayer(setup.role, setup.clockSpot);
  return {
    player,
    otherPlayers: [],
    game: tempState,
    gameState: {
      hasFinished: false,
      cast: null,
    },
    isSafe: () => true,
    isDead: false,
    next: [],
    loop: 1,
  };
};
