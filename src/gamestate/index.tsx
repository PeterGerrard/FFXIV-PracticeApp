import { useContext, useEffect, useState } from "react";
import { GameLoop, GameState, Role, Setup } from "./gameState";
import { DeathOverlay } from "./Death/DeathOverlay";
import { SetupContext } from "./Setup/Setup";
import { Point } from "@flatten-js/core";
import { Player } from "./Player";

export type { Role };

type Game1<TPlayer, T> = {
  loop: 1;
  game: GameLoop<TPlayer, T>;
  gameState: T;
  next: [];
};

type Game2<TPlayer, T1, T2> = {
  loop: 2;
  game: GameLoop<TPlayer, T1>;
  gameState: T1;
  next: [[GameLoop<TPlayer, T2>, (g: GameLoop<TPlayer, T1>, s: T1) => T2]];
};

type Game3<TPlayer, T1, T2, T3> = {
  loop: 3;
  game: GameLoop<TPlayer, T1>;
  gameState: T1;
  next: [
    [GameLoop<TPlayer, T2>, (g: GameLoop<TPlayer, T1>, s: T1) => T2],
    [GameLoop<TPlayer, T3>, (g: GameLoop<TPlayer, T2>, s: T2) => T3]
  ];
};

type Game4<TPlayer, T1, T2, T3, T4> = {
  loop: 4;
  game: GameLoop<TPlayer, T1>;
  gameState: T1;
  next: [
    [GameLoop<TPlayer, T2>, T2],
    [GameLoop<TPlayer, T3>, (g: GameLoop<TPlayer, T2>, s: T2) => T3],
    [GameLoop<TPlayer, T4>, (g: GameLoop<TPlayer, T3>, s: T3) => T4]
  ];
};

type Game5<TPlayer, T1, T2, T3, T4, T5> = {
  loop: 5;
  game: GameLoop<TPlayer, T1>;
  gameState: T1;
  next: [
    [GameLoop<TPlayer, T2>, T2],
    [GameLoop<TPlayer, T3>, T3],
    [GameLoop<TPlayer, T4>, (g: GameLoop<TPlayer, T3>, s: T3) => T4],
    [GameLoop<TPlayer, T5>, (g: GameLoop<TPlayer, T4>, s: T4) => T5]
  ];
};

export const stepGame1 = <TPlayer extends Player, T extends GameState<TPlayer>>(
  game: Game1<TPlayer, T>
): Game1<TPlayer, T> => {
  if (game.gameState.hasFinished) {
    return game;
  }

  const nextState = game.game.nextState(game.gameState);
  const movedPlayers = game.gameState.players.map((p) => ({
    ...p,
    position: p.controlled ? p.position : game.game.getSafeSpot(nextState, p),
  }));
  const nextStateWithOtherMoves = {
    ...nextState,
    players: movedPlayers,
  };
  return {
    ...game,
    gameState: game.game.applyDamage(nextStateWithOtherMoves),
  };
};

export const stepGame2 = <
  TPlayer extends Player,
  T extends GameState<TPlayer>,
  T1 extends GameState<TPlayer>
>(
  game: Game2<TPlayer, T, T1>
): Game2<TPlayer, T, T1> | Game1<TPlayer, T1> => {
  if (game.gameState.hasFinished) {
    const [x, ...ys] = game.next;
    const result: Game1<TPlayer, T1> = {
      game: x[0],
      gameState: x[1](game.game, game.gameState),
      next: ys,
      loop: 1,
    };
    return result;
  }

  const nextState = game.game.nextState(game.gameState);
  const movedPlayers = game.gameState.players.map((p) => ({
    ...p,
    position: p.controlled ? p.position : game.game.getSafeSpot(nextState, p),
  }));
  const nextStateWithOtherMoves = {
    ...nextState,
    players: movedPlayers,
  };
  return {
    ...game,
    gameState: game.game.applyDamage(nextStateWithOtherMoves),
  };
};

export const stepGame3 = <
  TPlayer extends Player,
  T extends GameState<TPlayer>,
  T1 extends GameState<TPlayer>,
  T2 extends GameState<TPlayer>
>(
  game: Game3<TPlayer, T, T1, T2>
): Game3<TPlayer, T, T1, T2> | Game2<TPlayer, T1, T2> => {
  if (game.gameState.hasFinished) {
    const [x, ...ys] = game.next;
    const result: Game2<TPlayer, T1, T2> = {
      game: x[0],
      gameState: x[1](game.game, game.gameState),
      next: ys,
      loop: 2,
    };
    return result;
  }

  const nextState = game.game.nextState(game.gameState);
  const movedPlayers = game.gameState.players.map((p) => ({
    ...p,
    position: p.controlled ? p.position : game.game.getSafeSpot(nextState, p),
  }));
  const nextStateWithOtherMoves = {
    ...nextState,
    players: movedPlayers,
  };
  return {
    ...game,
    gameState: game.game.applyDamage(nextStateWithOtherMoves),
  };
};

export const stepGame4 = <
  TPlayer extends Player,
  T extends GameState<TPlayer>,
  T1 extends GameState<TPlayer>,
  T2 extends GameState<TPlayer>,
  T3 extends GameState<TPlayer>
>(
  game: Game4<TPlayer, T, T1, T2, T3>
): Game4<TPlayer, T, T1, T2, T3> | Game3<TPlayer, T1, T2, T3> => {
  if (game.gameState.hasFinished) {
    const [x, ...ys] = game.next;
    const result: Game3<TPlayer, T1, T2, T3> = {
      game: x[0],
      gameState: x[1],
      next: ys,
      loop: 3,
    };
    return result;
  }

  const nextState = game.game.nextState(game.gameState);
  const movedPlayers = game.gameState.players.map((p) => ({
    ...p,
    position: p.controlled ? p.position : game.game.getSafeSpot(nextState, p),
  }));
  const nextStateWithOtherMoves = {
    ...nextState,
    players: movedPlayers,
  };
  return {
    ...game,
    gameState: game.game.applyDamage(nextStateWithOtherMoves),
  };
};

export const stepGame5 = <
  TPlayer extends Player,
  T extends GameState<TPlayer>,
  T1 extends GameState<TPlayer>,
  T2 extends GameState<TPlayer>,
  T3 extends GameState<TPlayer>,
  T4 extends GameState<TPlayer>
>(
  game: Game5<TPlayer, T, T1, T2, T3, T4>
): Game5<TPlayer, T, T1, T2, T3, T4> | Game4<TPlayer, T1, T2, T3, T4> => {
  if (game.gameState.hasFinished) {
    const [x, ...ys] = game.next;
    const result: Game4<TPlayer, T1, T2, T3, T4> = {
      game: x[0],
      gameState: x[1],
      next: ys,
      loop: 4,
    };
    return result;
  }

  const nextState = game.game.nextState(game.gameState);
  const movedPlayers = game.gameState.players.map((p) => ({
    ...p,
    position: p.controlled ? p.position : game.game.getSafeSpot(nextState, p),
  }));
  const nextStateWithOtherMoves = {
    ...nextState,
    players: movedPlayers,
  };
  return {
    ...game,
    gameState: game.game.applyDamage(nextStateWithOtherMoves),
  };
};

const stepGame = <
  TPlayer extends Player,
  T1 extends GameState<TPlayer>,
  T2 extends GameState<TPlayer>,
  T3 extends GameState<TPlayer>
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

const move = <T extends GameState<Player>>(state: T, pos: Point): T => {
  return {
    ...state,
    players: state.players.map((p) =>
      p.controlled ? { ...p, position: pos } : p
    ),
  };
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

export const useGameState1 = <
  TPlayer extends Player,
  T1 extends GameState<TPlayer>
>(
  start: (setup: Setup) => IterateGames1<TPlayer, T1>
) => {
  return useGameState3<TPlayer, never, never, T1>(start);
};
export const useGameState3 = <
  TPlayer extends Player,
  T1 extends GameState<TPlayer>,
  T2 extends GameState<TPlayer>,
  T3 extends GameState<TPlayer>
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
          (p: Point) => {
            if (
              gameState &&
              !gameState.gameState.players.some((x) => !x.alive) &&
              !(gameState.loop === 1 && gameState.gameState.hasFinished)
            ) {
              const nextState = move(gameState.gameState, p);
              let nextGame: IterateGames3<TPlayer, T1, T2, T3>;
              switch (gameState.loop) {
                case 3:
                  nextGame = {
                    ...gameState,
                    gameState: nextState,
                  } as IterateGames3<TPlayer, T1, T2, T3>;
                  break;
                case 2:
                  nextGame = {
                    ...gameState,
                    gameState: nextState,
                  } as IterateGames3<TPlayer, T1, T2, T3>;
                  break;
                case 1:
                  nextGame = {
                    ...gameState,
                    gameState: nextState,
                  } as IterateGames3<TPlayer, T1, T2, T3>;
                  break;
              }
              setGameState(stepGame(nextGame));
            }
          },
          () => {
            if (
              gameState &&
              !gameState.gameState.players.some((x) => !x.alive) &&
              !(gameState.loop === 1 && gameState.gameState.hasFinished)
            ) {
              setGameState(stepGame(gameState));
            }
          }
        );

      if (!gameState) {
        return <></>;
      }
      if (gameState.gameState.players.some((x) => x.controlled && !x.alive)) {
        return (
          <DeathOverlay safeLocation={getSafeSpot(gameState)}>
            {inner}
          </DeathOverlay>
        );
      }
      if (gameState.loop === 1 && gameState.gameState.hasFinished) {
        return (
          <>
            {inner}
            <h1
              style={{
                position: "absolute",
                left: `50%`,
                top: `50%`,
                transformOrigin: "0 0",
                transform: `translate(-50%,0)`,
                fontSize: "10rem",
                color: "hotpink",
              }}
            >
              Finished!
            </h1>
          </>
        );
      }
      return inner;
    },
  ] as const;
};

const arena = <TPlayer extends Player, T1 extends GameState<TPlayer>, T2 extends GameState<TPlayer>, T3 extends GameState<TPlayer>>(
  gameState: IterateGames3<TPlayer, T1, T2, T3>,
  moveTo: (p: Point) => void,
  animationEnd: () => void
) => {
  switch (gameState.loop) {
    case 1:
      return gameState.game.arena(
        gameState.gameState,
        gameState.gameState.players.some(x => !x.alive) ? () => {} : moveTo,
        gameState.gameState.players.some(x => !x.alive) ? () => {} : animationEnd
      );
    case 2:
      return gameState.game.arena(
        gameState.gameState,
        gameState.gameState.players.some(x => !x.alive) ? () => {} : moveTo,
        gameState.gameState.players.some(x => !x.alive) ? () => {} : animationEnd
      );
    case 3:
      return gameState.game.arena(
        gameState.gameState,
        gameState.gameState.players.some(x => !x.alive) ? () => {} : moveTo,
        gameState.gameState.players.some(x => !x.alive) ? () => {} : animationEnd
      );
  }
};

const getSafeSpot = <
  TPlayer extends Player,
  T1 extends GameState<TPlayer>,
  T2 extends GameState<TPlayer>,
  T3 extends GameState<TPlayer>
>(
  gameState: IterateGames3<TPlayer, T1, T2, T3>
) => {
  const player = gameState.gameState.players.filter((x) => x.controlled)[0];

  switch (gameState.loop) {
    case 1:
      return gameState.game.getSafeSpot(gameState.gameState, player);
    case 2:
      return gameState.game.getSafeSpot(gameState.gameState, player);
    case 3:
      return gameState.game.getSafeSpot(gameState.gameState, player);
  }
};
