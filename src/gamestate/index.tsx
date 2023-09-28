import { useContext, useEffect, useState } from "react";
import {
  Action,
  GameLoop1,
  GameLoop2,
  GameLoop3,
  GameLoop4,
  GameLoop5,
  GameState,
  Position,
  Role,
  Setup,
} from "./gameState";
import { DeathOverlay } from "./Death/DeathOverlay";
import { SetupContext } from "./Setup/Setup";

export type { Role, Position, Action };

type Game1<TPlayer, T> = {
  loop: 1;
  game: GameLoop1<TPlayer, T>;
  gameState: T;
  player: TPlayer;
  otherPlayers: TPlayer[];
  isSafe: (player: TPlayer, otherPlayers: TPlayer[]) => boolean;
  isDead: boolean;
  next: [];
};

type Game2<TPlayer, T1, T2> = {
  loop: 2;
  game: GameLoop2<TPlayer, T1, T2>;
  gameState: T1;
  player: TPlayer;
  otherPlayers: TPlayer[];
  isSafe: (player: TPlayer, otherPlayers: TPlayer[]) => boolean;
  isDead: boolean;
  next: [[GameLoop1<TPlayer, T2>, T2]];
};

type Game3<TPlayer, T1, T2, T3> = {
  loop: 3;
  game: GameLoop3<TPlayer, T1, T2, T3>;
  gameState: T1;
  player: TPlayer;
  otherPlayers: TPlayer[];
  isSafe: (player: TPlayer, otherPlayers: TPlayer[]) => boolean;
  isDead: boolean;
  next: [[GameLoop2<TPlayer, T2, T3>, T2], [GameLoop1<TPlayer, T3>, T3]];
};

type Game4<TPlayer, T1, T2, T3, T4> = {
  loop: 4;
  game: GameLoop4<TPlayer, T1, T2, T3, T4>;
  gameState: T1;
  player: TPlayer;
  otherPlayers: TPlayer[];
  isSafe: (player: TPlayer, otherPlayers: TPlayer[]) => boolean;
  isDead: boolean;
  next: [
    [GameLoop3<TPlayer, T2, T3, T4>, T2],
    [GameLoop2<TPlayer, T3, T4>, T3],
    [GameLoop1<TPlayer, T4>, T4]
  ];
};

type Game5<TPlayer, T1, T2, T3, T4, T5> = {
  loop: 5;
  game: GameLoop5<TPlayer, T1, T2, T3, T4, T5>;
  gameState: T1;
  player: TPlayer;
  otherPlayers: TPlayer[];
  isSafe: (player: TPlayer, otherPlayers: TPlayer[]) => boolean;
  isDead: boolean;
  next: [
    [GameLoop4<TPlayer, T2, T3, T4, T5>, T2],
    [GameLoop3<TPlayer, T3, T4, T5>, T3],
    [GameLoop2<TPlayer, T4, T5>, T4],
    [GameLoop1<TPlayer, T5>, T5]
  ];
};

export const stepGame1 = <TPlayer, T extends GameState>(
  game: Game1<TPlayer, T>
): Game1<TPlayer, T> => {
  if (game.gameState.hasFinished) {
    return game;
  }

  const nextState = game.game.nextState(game.gameState, game.player);
  const otherPlayers = game.otherPlayers.map((o) => ({
    ...o,
    position: game.game.getSafeSpot(nextState, o),
  }));
  const lived =
    game.game.isSafe(nextState, game.player) &&
    game.isSafe(game.player, otherPlayers);
  return {
    ...game,
    otherPlayers,
    gameState: nextState,
    isDead: !lived,
  };
};

export const stepGame2 = <TPlayer, T extends GameState, T1 extends GameState>(
  game: Game2<TPlayer, T, T1>
): Game2<TPlayer, T, T1> | Game1<TPlayer, T1> => {
  if (game.gameState.hasFinished) {
    const [x, ...ys] = game.next;
    const result: Game1<TPlayer, T1> = {
      game: x[0],
      gameState: x[1],
      isDead: game.isDead,
      player: game.player,
      otherPlayers: game.otherPlayers,
      isSafe: game.isSafe,
      next: ys,
      loop: 1,
    };
    return result;
  }

  const nextState = game.game.nextState(game.gameState);
  const otherPlayers = game.otherPlayers.map((o) => ({
    ...o,
    position: game.game.getSafeSpot(nextState, o),
  }));
  const lived =
    game.game.isSafe(nextState, game.player) &&
    game.isSafe(game.player, otherPlayers);
  return {
    ...game,
    otherPlayers,
    gameState: nextState,
    isDead: !lived,
  };
};

export const stepGame3 = <
  TPlayer,
  T extends GameState,
  T1 extends GameState,
  T2 extends GameState
>(
  game: Game3<TPlayer, T, T1, T2>
): Game3<TPlayer, T, T1, T2> | Game2<TPlayer, T1, T2> => {
  if (game.gameState.hasFinished) {
    const [x, ...ys] = game.next;
    const result: Game2<TPlayer, T1, T2> = {
      game: x[0],
      gameState: x[1],
      isDead: game.isDead,
      player: game.player,
      otherPlayers: game.otherPlayers,
      isSafe: game.isSafe,
      next: ys,
      loop: 2,
    };
    return result;
  }

  const nextState = game.game.nextState(game.gameState);
  const otherPlayers = game.otherPlayers.map((o) => ({
    ...o,
    position: game.game.getSafeSpot(nextState, o),
  }));
  const lived =
    game.game.isSafe(nextState, game.player) &&
    game.isSafe(game.player, otherPlayers);
  return {
    ...game,
    otherPlayers,
    gameState: nextState,
    isDead: !lived,
  };
};

export const stepGame4 = <
  TPlayer,
  T extends GameState,
  T1 extends GameState,
  T2 extends GameState,
  T3 extends GameState
>(
  game: Game4<TPlayer, T, T1, T2, T3>
): Game4<TPlayer, T, T1, T2, T3> | Game3<TPlayer, T1, T2, T3> => {
  if (game.gameState.hasFinished) {
    const [x, ...ys] = game.next;
    const result: Game3<TPlayer, T1, T2, T3> = {
      game: x[0],
      gameState: x[1],
      isDead: game.isDead,
      player: game.player,
      otherPlayers: game.otherPlayers,
      isSafe: game.isSafe,
      next: ys,
      loop: 3,
    };
    return result;
  }

  const nextState = game.game.nextState(game.gameState);
  const otherPlayers = game.otherPlayers.map((o) => ({
    ...o,
    position: game.game.getSafeSpot(nextState, o),
  }));
  const lived =
    game.game.isSafe(nextState, game.player) &&
    game.isSafe(game.player, otherPlayers);
  return {
    ...game,
    otherPlayers,
    gameState: nextState,
    isDead: !lived,
  };
};

export const stepGame5 = <
  TPlayer,
  T extends GameState,
  T1 extends GameState,
  T2 extends GameState,
  T3 extends GameState,
  T4 extends GameState
>(
  game: Game5<TPlayer, T, T1, T2, T3, T4>
): Game5<TPlayer, T, T1, T2, T3, T4> | Game4<TPlayer, T1, T2, T3, T4> => {
  if (game.gameState.hasFinished) {
    const [x, ...ys] = game.next;
    const result: Game4<TPlayer, T1, T2, T3, T4> = {
      game: x[0],
      gameState: x[1],
      isDead: game.isDead,
      player: game.player,
      otherPlayers: game.otherPlayers,
      isSafe: game.isSafe,
      next: ys,
      loop: 4,
    };
    return result;
  }

  const nextState = game.game.nextState(game.gameState);
  const otherPlayers = game.otherPlayers.map((o) => ({
    ...o,
    position: game.game.getSafeSpot(nextState, o),
  }));
  const lived =
    game.game.isSafe(nextState, game.player) &&
    game.isSafe(game.player, otherPlayers);
  return {
    ...game,
    otherPlayers,
    gameState: nextState,
    isDead: !lived,
  };
};

const stepGame = <
  TPlayer,
  T1 extends GameState,
  T2 extends GameState,
  T3 extends GameState
>(
  game: IterateGames3<TPlayer, T1, T2, T3>
): IterateGames3<TPlayer, T1, T2, T3> => {
  switch (game.loop) {
    case 3:
      return stepGame3(game);
    case 2:
      return stepGame2(game);
    case 1:
      return stepGame1(game);
  }
};

const move = <
  TPlayer,
  T1 extends GameState,
  T2 extends GameState,
  T3 extends GameState
>(
  game: IterateGames3<TPlayer, T1, T2, T3>,
  pos: Position
): IterateGames3<TPlayer, T1, T2, T3> => {
  return { ...game, player: { ...game.player, position: pos } };
};

export type IterateGames5<TPlayer, T1, T2, T3, T4, T5> =
  | Game5<TPlayer, T1, T2, T3, T4, T5>
  | IterateGames4<TPlayer, T2, T3, T4, T5>;
export type IterateGames4<TPlayer, T1, T2, T3, T4> =
  | Game4<TPlayer, T1, T2, T3, T4>
  | IterateGames3<TPlayer, T2, T3, T4>;
export type IterateGames3<TPlayer, T1, T2, T3> =
  | Game3<TPlayer, T1, T2, T3>
  | IterateGames2<TPlayer, T2, T3>;
export type IterateGames2<TPlayer, T1, T2> =
  | Game2<TPlayer, T1, T2>
  | IterateGames1<TPlayer, T2>;
export type IterateGames1<TPlayer, T1> = Game1<TPlayer, T1>;

export const useGameState = <
  TPlayer,
  T1 extends GameState,
  T2 extends GameState,
  T3 extends GameState
>(
  start: (setup: Setup) => IterateGames3<TPlayer, T1, T2, T3>
) => {
  const { state: setup } = useContext(SetupContext);
  const [gameState, setGameState] = useState<
    IterateGames3<TPlayer, T1, T2, T3>
  >(start(setup));

  const restart = () => setGameState(start(setup));

  useEffect(restart, [setup]);

  return [
    gameState,
    restart,
    () => {
      const inner =
        gameState &&
        arena(
          gameState,
          (p: Position) => {
            if (
              gameState &&
              !gameState.isDead &&
              !(gameState.loop === 1 && gameState.gameState.hasFinished)
            ) {
              setGameState(stepGame(move(gameState, p)));
            }
          },
          () => {
            if (
              gameState &&
              !gameState.isDead &&
              !(gameState.loop === 1 && gameState.gameState.hasFinished)
            ) {
              setGameState(stepGame(gameState));
            }
          }
        );

      if (!gameState) {
        return <></>;
      }
      if (gameState.isDead) {
        return (
          <DeathOverlay safeLocation={getSafeSpot(gameState)}>
            {inner}
          </DeathOverlay>
        );
      }
      return inner;
    },
  ] as const;
};

const arena = <TPlayer, T1, T2, T3>(
  gameState: IterateGames3<TPlayer, T1, T2, T3>,
  moveTo: (p: Position) => void,
  animationEnd: () => void
) => {
  switch (gameState.loop) {
    case 1:
      return gameState.game.arena(
        gameState.player,
        gameState.otherPlayers,
        gameState.isDead,
        gameState.gameState,
        moveTo,
        animationEnd
      );
    case 2:
      return gameState.game.arena(
        gameState.player,
        gameState.otherPlayers,
        gameState.isDead,
        gameState.gameState,
        moveTo,
        animationEnd
      );
    case 3:
      return gameState.game.arena(
        gameState.player,
        gameState.otherPlayers,
        gameState.isDead,
        gameState.gameState,
        moveTo,
        animationEnd
      );
  }
};

const getSafeSpot = <TPlayer, T1, T2, T3>(
  gameState: IterateGames3<TPlayer, T1, T2, T3>
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
