import { Point } from "@flatten-js/core";
import React from "react";
import { Player } from "./Player";

export type Role = "Tank" | "Healer" | "DPS";
export type Designation = "MT" | "OT" | "H1" | "H2" | "M1" | "M2" | "R1" | "R2";
export const Designations: Designation[] = [
  "MT",
  "OT",
  "H1",
  "H2",
  "M1",
  "M2",
  "R1",
  "R2",
];
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

export const getRole = (designation: Designation): Role => {
  switch (designation) {
    case "MT":
    case "OT":
      return "Tank";
    case "H1":
    case "H2":
      return "Healer";
    case "M1":
    case "M2":
    case "R1":
    case "R2":
      return "DPS";
  }
};

export const isRanged = (designation: Designation): boolean => {
  switch (designation) {
    case "MT":
    case "OT":
    case "M1":
    case "M2":
      return false;
    case "H1":
    case "H2":
    case "R1":
    case "R2":
      return true;
  }
};

export const getGroup = (designation: Designation): Group => {
  return ["R2", "H2", "M2", "OT"].includes(designation) ? "Group2" : "Group1";
};

export type Setup = {
  designation: Designation;
  playerIconSize: number;
};

export type Cast = {
  name: string;
  value: number;
};

export type GameState<TPlayer extends Player> = {
  hasFinished: boolean;
  players: TPlayer[];
  cast: Cast | null;
};

export type GameLoop<TPlayer, T> = {
  arena: (
    gameState: T,
    moveTo: (p: Point) => void,
    animationEnd: () => void
  ) => React.ReactElement;
  getSafeSpot: (gameState: T, player: TPlayer) => Point;
  applyDamage: (gameState: T) => T;
  nextState: (gameState: T) => T;
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
      return Math.PI / 4;
    case "South East":
      return (3 * Math.PI) / 4;
    case "South West":
      return (5 * Math.PI) / 4;
    case "North West":
      return (7 * Math.PI) / 4;
  }
};
