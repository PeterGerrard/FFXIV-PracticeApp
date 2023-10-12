import { Point } from "@flatten-js/core";
import React from "react";

export type Role = "Tank" | "Healer" | "DPS";
export type Designation = "MT" | "OT" | "H1" | "H2" | "M1" | "M2" | "R1" | "R2";
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
    moveTo: (p: Point) => void,
    animationEnd: () => void
  ) => React.ReactElement;
  nextState: (gameState: T, player: TPlayer) => T;
  isSafe: (gameState: T, player: TPlayer, otherPlayers: TPlayer[]) => boolean;
  getSafeSpot: (
    gameState: T,
    player: TPlayer,
    otherPlayers: TPlayer[]
  ) => Point;
};

export const distanceTo = (source: Point, target: Point) =>
  source.distanceTo(target)[0];

export const getRandomPos = (): Point => {
  const p: Point = new Point(Math.random(), Math.random());
  if (distanceTo(p, new Point(0.5, 0.5)) < 0.35) {
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
