import React, { useState } from "react";
import {
  Action,
  GameLoop1,
  GameLoop2,
  GameLoop3,
  GameLoop4,
  GameLoop5,
  GameState,
  Player,
  Position,
  Role,
  createPartner,
  createPlayer,
  isTetherSafe,
} from "./gameState";
import { useSetup } from "./Setup/setupState";
import {
  RevelationGameState,
  RevelationState,
} from "./Revelation/revelationsState";
import {
  JuryOverrulingGameState,
  JuryOverrulingState,
  initialJuryOverrullingState,
} from "./JuryOverruling/juryOverrulingState";
import {
  DivisiveOverrulingGameState,
  DivisiveOverrulingState,
  initialDivisiveState,
} from "./DivisiveOverruling/divisiveOverrulingState";
import { DeathOverlay } from "./Death/DeathOverlay";

export type { Role, Position, Player, Action };
export { isTetherSafe };

type Game1<T> = {
  loop: 1;
  game: GameLoop1<T>;
  gameState: T;
  player: Player;
  otherPlayer: Player;
  isDead: boolean;
  next: [];
};

type Game2<T1, T2> = {
  loop: 2;
  game: GameLoop2<T1, T2>;
  gameState: T1;
  player: Player;
  otherPlayer: Player;
  isDead: boolean;
  next: [[GameLoop1<T2>, T2]];
};

type Game3<T1, T2, T3> = {
  loop: 3;
  game: GameLoop3<T1, T2, T3>;
  gameState: T1;
  player: Player;
  otherPlayer: Player;
  isDead: boolean;
  next: [[GameLoop2<T2, T3>, T2], [GameLoop1<T3>, T3]];
};

type Game4<T1, T2, T3, T4> = {
  loop: 4;
  game: GameLoop4<T1, T2, T3, T4>;
  gameState: T1;
  player: Player;
  otherPlayer: Player;
  isDead: boolean;
  next: [
    [GameLoop3<T2, T3, T4>, T2],
    [GameLoop2<T3, T4>, T3],
    [GameLoop1<T4>, T4]
  ];
};

type Game5<T1, T2, T3, T4, T5> = {
  loop: 5;
  game: GameLoop5<T1, T2, T3, T4, T5>;
  gameState: T1;
  player: Player;
  otherPlayer: Player;
  isDead: boolean;
  next: [
    [GameLoop4<T2, T3, T4, T5>, T2],
    [GameLoop3<T3, T4, T5>, T3],
    [GameLoop2<T4, T5>, T4],
    [GameLoop1<T5>, T5]
  ];
};

export const stepGame1 = <T extends GameState>(game: Game1<T>): Game1<T> => {
  if (game.gameState.hasFinished) {
    return game;
  }

  const nextState = game.game.nextState(game.gameState);
  const otherPlayer = {
    ...game.otherPlayer,
    position: game.game.getSafeSpot(nextState, game.otherPlayer),
  };
  const lived =
    game.game.isSafe(nextState, game.player) &&
    isTetherSafe(game.player, otherPlayer);
  return {
    ...game,
    otherPlayer,
    gameState: nextState,
    isDead: !lived,
  };
};

export const stepGame2 = <T extends GameState, T1 extends GameState>(
  game: Game2<T, T1>
): Game2<T, T1> | Game1<T1> => {
  if (game.gameState.hasFinished) {
    const [x, ...ys] = game.next;
    const result: Game1<T1> = {
      game: x[0],
      gameState: x[1],
      isDead: game.isDead,
      player: game.player,
      otherPlayer: game.otherPlayer,
      next: ys,
      loop: 1,
    };
    return result;
  }

  const nextState = game.game.nextState(game.gameState);
  const otherPlayer = {
    ...game.otherPlayer,
    position: game.game.getSafeSpot(nextState, game.otherPlayer),
  };
  const lived =
    game.game.isSafe(nextState, game.player) &&
    isTetherSafe(game.player, otherPlayer);
  return {
    ...game,
    otherPlayer,
    gameState: nextState,
    isDead: !lived,
  };
};

export const stepGame3 = <
  T extends GameState,
  T1 extends GameState,
  T2 extends GameState
>(
  game: Game3<T, T1, T2>
): Game3<T, T1, T2> | Game2<T1, T2> => {
  if (game.gameState.hasFinished) {
    const [x, ...ys] = game.next;
    const result: Game2<T1, T2> = {
      game: x[0],
      gameState: x[1],
      isDead: game.isDead,
      player: game.player,
      otherPlayer: game.otherPlayer,
      next: ys,
      loop: 2,
    };
    return result;
  }

  const nextState = game.game.nextState(game.gameState);
  const otherPlayer = {
    ...game.otherPlayer,
    position: game.game.getSafeSpot(nextState, game.otherPlayer),
  };
  const lived =
    game.game.isSafe(nextState, game.player) &&
    isTetherSafe(game.player, otherPlayer);
  return {
    ...game,
    otherPlayer,
    gameState: nextState,
    isDead: !lived,
  };
};

export const stepGame4 = <
  T extends GameState,
  T1 extends GameState,
  T2 extends GameState,
  T3 extends GameState
>(
  game: Game4<T, T1, T2, T3>
): Game4<T, T1, T2, T3> | Game3<T1, T2, T3> => {
  if (game.gameState.hasFinished) {
    const [x, ...ys] = game.next;
    const result: Game3<T1, T2, T3> = {
      game: x[0],
      gameState: x[1],
      isDead: game.isDead,
      player: game.player,
      otherPlayer: game.otherPlayer,
      next: ys,
      loop: 3,
    };
    return result;
  }

  const nextState = game.game.nextState(game.gameState);
  const otherPlayer = {
    ...game.otherPlayer,
    position: game.game.getSafeSpot(nextState, game.otherPlayer),
  };
  const lived =
    game.game.isSafe(nextState, game.player) &&
    isTetherSafe(game.player, otherPlayer);
  return {
    ...game,
    otherPlayer,
    gameState: nextState,
    isDead: !lived,
  };
};

export const stepGame5 = <
  T extends GameState,
  T1 extends GameState,
  T2 extends GameState,
  T3 extends GameState,
  T4 extends GameState
>(
  game: Game5<T, T1, T2, T3, T4>
): Game5<T, T1, T2, T3, T4> | Game4<T1, T2, T3, T4> => {
  if (game.gameState.hasFinished) {
    const [x, ...ys] = game.next;
    const result: Game4<T1, T2, T3, T4> = {
      game: x[0],
      gameState: x[1],
      isDead: game.isDead,
      player: game.player,
      otherPlayer: game.otherPlayer,
      next: ys,
      loop: 4,
    };
    return result;
  }

  const nextState = game.game.nextState(game.gameState);
  const otherPlayer = {
    ...game.otherPlayer,
    position: game.game.getSafeSpot(nextState, game.otherPlayer),
  };
  const lived =
    game.game.isSafe(nextState, game.player) &&
    isTetherSafe(game.player, otherPlayer);
  return {
    ...game,
    otherPlayer,
    gameState: nextState,
    isDead: !lived,
  };
};

const stepGame = <
  T1 extends GameState,
  T2 extends GameState,
  T3 extends GameState
>(
  game: IterateGames<T1, T2, T3>
): IterateGames<T1, T2, T3> => {
  switch (game.loop) {
    case 3:
      return stepGame3(game);
    case 2:
      return stepGame2(game);
    case 1:
      return stepGame1(game);
  }
};

const move = <T1 extends GameState, T2 extends GameState, T3 extends GameState>(
  game: IterateGames<T1, T2, T3>,
  pos: Position
): IterateGames<T1, T2, T3> => {
  return { ...game, player: { ...game.player, position: pos } };
};

type IterateGames<T1, T2, T3> = Game3<T1, T2, T3> | Game2<T2, T3> | Game1<T3>;

export const useGameState = () => {
  const [setupState, dispatchSetup] = useSetup();
  const [gameState, setGameState] = useState<IterateGames<
    RevelationGameState,
    JuryOverrulingGameState,
    DivisiveOverrulingGameState
  > | null>(null);

  const dispatch = (a: Action) => {
    dispatchSetup(a);
    switch (a.type) {
      case "RESET":
        setGameState(null);
        break;
      case "RESTART":
      case "START":
        const player = createPlayer(setupState);
        const otherPlayer = createPartner(player);
        setGameState({
          player,
          otherPlayer,
          game: RevelationState,
          gameState: {
            hasFinished: false,
            bossColour: Math.random() < 0.5 ? "Dark" : "Light",
            topBomb: Math.random() < 0.5 ? "Dark" : "Light",
            cast: null,
          },
          isDead: false,
          next: [
            [JuryOverrulingState, initialJuryOverrullingState],
            [DivisiveOverrulingState, initialDivisiveState],
          ],
          loop: 3,
        });
        break;
      case "MOVE":
        if (
          gameState &&
          !(gameState.loop === 1 && gameState.gameState.hasFinished)
        ) {
          setGameState(stepGame(move(gameState, a.target)));
        }
        break;
      case "ANIMATIONEND":
        if (gameState) {
          setGameState(stepGame(gameState));
        }
        break;
    }
  };

  return [
    gameState,
    (): React.ReactNode => {
      if (!gameState) {
        return <></>;
      }
      if (gameState.isDead) {
        return (
          <DeathOverlay safeLocation={getSafeSpot(gameState)}>
            {overlay(gameState, () => {})}
          </DeathOverlay>
        );
      } else {
        return overlay(gameState, dispatch);
      }
    },
    setupState,
    dispatch,
  ] as const;
};

const overlay = (
  gameState: IterateGames<
    RevelationGameState,
    JuryOverrulingGameState,
    DivisiveOverrulingGameState
  >,
  dispatch: (action: Action) => void
) => {
  switch (gameState.loop) {
    case 1:
      return gameState.game.overlay(gameState.gameState, dispatch);
    case 2:
      return gameState.game.overlay(gameState.gameState, dispatch);
    case 3:
      return gameState.game.overlay(gameState.gameState, dispatch);
  }
};

const getSafeSpot = (
  gameState: IterateGames<
    RevelationGameState,
    JuryOverrulingGameState,
    DivisiveOverrulingGameState
  >
) => {
  switch (gameState.loop) {
    case 1:
      return gameState.game.getSafeSpot(gameState.gameState, gameState.player);
    case 2:
      return gameState.game.getSafeSpot(gameState.gameState, gameState.player);
    case 3:
      return gameState.game.getSafeSpot(gameState.gameState, gameState.player);
  }
};
