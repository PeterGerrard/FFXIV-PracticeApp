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

export const getClockSpot = (designation: Designation): ClockSpot => {
  switch (designation) {
    case "MT":
      return "North";
    case "OT":
      return "South";
    case "H1":
      return "West";
    case "H2":
      return "East";
    case "M1":
      return "North West";
    case "M2":
      return "North East";
    case "R1":
      return "South East";
    case "R2":
      return "South West";
  }
};

export const getGroup = (designation: Designation): Group => {
  return ["R2", "H2", "M2", "OT"].includes(designation) ? "Group2" : "Group1";
};

export type Setup = {
  designation: Designation;
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
      return 45;
    case "South East":
      return 135;
    case "South West":
      return 225;
    case "North West":
      return 315;
  }
};
