import React from "react";

export type Role = "Tank" | "Healer" | "DPS";
export type Position = [number, number];
export type ClockSpot = Cardinal | InterCardinal;
export type Cardinal = "North" | "East" | "South" | "West";
export type InterCardinal =
  | "North East"
  | "South East"
  | "South West"
  | "North West";
export const InterCardinals: InterCardinal[] = [
  "North East",
  "South East",
  "South West",
  "North West",
];
export const Cardinals: Cardinal[] = ["North", "East", "South", "West"];
export const ClockSpots = InterCardinals.flatMap((_, i) => [
  Cardinals[i],
  InterCardinals[i],
]);

export type Group = "Group1" | "Group2";

export const getGroup = (clockSpot: ClockSpot): Group => {
  return ["North East", "East", "South East", "South"].includes(clockSpot)
    ? "Group2"
    : "Group1";
};

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

export type GameLoop<TPlayer, T> = {
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

export const rotation = (inter: InterCardinal): number => {
  switch (inter) {
    case "North East":
      return 45;
    case "South East":
      return 135;
    case "South West":
      return 225;
    case "North West":
      return 315;
  }
};
