import { Point } from "@flatten-js/core";

export type Role = "Tank" | "Healer" | "DPS";
export type Designation = "MT" | "OT" | "H1" | "H2" | "M1" | "M2" | "R1" | "R2";
export type LightPartyDesignation = "T" | "H" | "D1" | "D2";
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
export const LightPartyDesignations: LightPartyDesignation[] = [
  "T",
  "H",
  "D1",
  "D2",
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

export const getRole = (
  designation: Designation | LightPartyDesignation
): Role => {
  switch (designation) {
    case "MT":
    case "OT":
    case "T":
      return "Tank";
    case "H1":
    case "H2":
    case "H":
      return "Healer";
    case "M1":
    case "M2":
    case "R1":
    case "R2":
    case "D1":
    case "D2":
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

export const isDps = (designation: Designation): boolean => {
  switch (designation) {
    case "MT":
    case "OT":
    case "H1":
    case "H2":
      return false;
    case "M1":
    case "M2":
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

export const distanceTo = (source: Point, target: Point) =>
  source.distanceTo(target)[0];

export const getRandomPos = (
  isValid: ((p: Point) => boolean) | undefined = undefined
): Point => {
  const p: Point = new Point(Math.random(), Math.random());
  if (distanceTo(p, new Point(0.5, 0.5)) < 0.35 && (!isValid || isValid(p))) {
    return p;
  }
  return getRandomPos(isValid);
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
