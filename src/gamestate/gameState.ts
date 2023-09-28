import React from "react";

export type Role = "Tank" | "Healer" | "DPS";
export type Position = [number, number];
export type ClockSpot =
  | "North"
  | "North East"
  | "East"
  | "South East"
  | "South"
  | "South West"
  | "West"
  | "North West";
export const InterCardinals: InterCardinal[] = [
  "North East",
  "South East",
  "South West",
  "North West",
];
export type InterCardinal =
  | "North East"
  | "South East"
  | "South West"
  | "North West";

export type Setup = {
  role: Role;
  clockSpot: ClockSpot;
};

export type Cast = {
  name: string;
  value: number;
};

export type GameState = {
  hasFinished: boolean;
  cast: Cast | null;
};

export type Loop<TPlayer, T, TNextLoop> = {
  arena: (
    player: TPlayer,
    otherPlayers: TPlayer[],
    isDead: boolean,
    gameState: T,
    moveTo: (p: Position) => void,
    animationEnd: () => void
  ) => React.ReactElement;
  nextState: (gameState: T) => T;
  isSafe: (gameState: T, player: TPlayer) => boolean;
  getSafeSpot: (gameState: T, player: TPlayer) => Position;
  nextLoop: TNextLoop;
};

export type FinalLoop<TPlayer, T> = {
  arena: (
    player: TPlayer,
    otherPlayers: TPlayer[],
    isDead: boolean,
    gameState: T,
    moveTo: (p: Position) => void,
    animationEnd: () => void
  ) => React.ReactElement;
  nextState: (gameState: T, player: TPlayer) => T;
  isSafe: (gameState: T, player: TPlayer) => boolean;
  getSafeSpot: (gameState: T, player: TPlayer) => Position;
};

export type GameLoop1<TPlayer, T> = FinalLoop<TPlayer, T>;
export type GameLoop2<TPlayer, T1, T2> = Loop<
  TPlayer,
  T1,
  GameLoop1<TPlayer, T2>
>;
export type GameLoop3<TPlayer, T1, T2, T3> = Loop<
  TPlayer,
  T1,
  GameLoop2<TPlayer, T2, T3>
>;
export type GameLoop4<TPlayer, T1, T2, T3, T4> = Loop<
  TPlayer,
  T1,
  GameLoop3<TPlayer, T2, T3, T4>
>;
export type GameLoop5<TPlayer, T1, T2, T3, T4, T5> = Loop<
  TPlayer,
  T1,
  GameLoop4<TPlayer, T2, T3, T4, T5>
>;

export type Action =
  | { type: "RESET" }
  | { type: "RESTART" }
  | { type: "START" }
  | { type: "SELECTROLE"; role: Role };

export const distanceTo = (source: Position, target: Position) =>
  Math.sqrt(
    Math.pow(target[0] - source[0], 2) + Math.pow(target[1] - source[1], 2)
  );

export const getRandomPos = (): Position => {
  const p: Position = [Math.random(), Math.random()];
  if (distanceTo(p, [0.5, 0.5]) < 0.35) {
    return p;
  }
  return getRandomPos();
};
