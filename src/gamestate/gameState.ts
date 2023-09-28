import React from "react";

export type Role = "Tank" | "Healer" | "DPS";
export type Position = [number, number];

export type Player = {
  role: Role;
  position: Position;
  debuff: "Light" | "Dark";
  tetherLength: "Short" | "Long";
  tetheredRole: Role;
};

export type Setup = {
  role: Role;
};

export type Cast = {
  name: string;
  value: number;
};

export interface IGameState {
  overlay: (dispatch: (action: Action) => void) => React.ReactElement;
  nextState: () => IGameState;
  isSafe: (player: Player) => boolean;
  getSafeSpot: (player: Player) => Position;
  bossColour: "Dark" | "Light" | null;
  cast: Cast | null;
}

export type Action =
  | { type: "RESET" }
  | { type: "RESTART" }
  | { type: "START" }
  | { type: "MOVE"; target: Position }
  | { type: "SELECTROLE"; role: Role }
  | { type: "ANIMATIONEND" };

export const MarkerA: Position = [0.498, 0.206];
export const Marker1: Position = [0.714, 0.289];
export const MarkerB: Position = [0.664, 0.502];
export const Marker2: Position = [0.617, 0.621];
export const MarkerC: Position = [0.498, 0.816];
export const Marker3: Position = [0.278, 0.719];
export const MarkerD: Position = [0.332, 0.502];
export const Marker4: Position = [0.383, 0.391];

export const distanceTo = (source: Position, target: Position) =>
  Math.sqrt(
    Math.pow(target[0] - source[0], 2) + Math.pow(target[1] - source[1], 2)
  );

export const isTetherSafe = (p1: Player, p2: Player) => {
  const d = distanceTo(p1.position, p2.position);

  return p1.debuff === p2.debuff ? d > 0.34 : d < 0.17;
};

export const getRandomPos = (): Position => {
  const p: Position = [Math.random(), Math.random()];
  if (distanceTo(p, [0.5, 0.5]) < 0.35) {
    return p;
  }
  return getRandomPos();
};

export const createPlayer = (setup: Setup): Player => {
  return {
    role: setup.role,
    position: getRandomPos(),
    debuff: Math.random() <= 0.5 ? "Light" : "Dark",
    tetherLength: Math.random() <= 0.5 ? "Long" : "Short",
    tetheredRole:
      setup.role === "DPS" ? (Math.random() <= 0.5 ? "Tank" : "Healer") : "DPS",
  };
};

export const createPartner = (player: Player): Player => {
  return {
    role: player.tetheredRole,
    position: getRandomPos(),
    debuff:
      player.tetherLength === "Long"
        ? player.debuff
        : player.debuff === "Dark"
        ? "Light"
        : "Dark",
    tetherLength: player.tetherLength,
    tetheredRole: player.role,
  };
};

export const getDefaultPos = (player: Player): Position => {
  if (player.role === "Healer" && player.tetherLength === "Short") {
    return MarkerB;
  }
  if (player.role === "Healer" && player.tetherLength === "Long") {
    return MarkerC;
  }
  if (player.role === "Tank" && player.tetherLength === "Short") {
    return MarkerD;
  }
  if (player.role === "Tank" && player.tetherLength === "Long") {
    return MarkerA;
  }
  if (player.tetheredRole === "Tank" && player.tetherLength === "Short") {
    return Marker4;
  }
  if (player.tetheredRole === "Tank" && player.tetherLength === "Long") {
    return Marker3;
  }
  if (player.tetheredRole === "Healer" && player.tetherLength === "Short") {
    return Marker2;
  }
  if (player.tetheredRole === "Healer" && player.tetherLength === "Long") {
    return Marker1;
  }
  throw "Something went wrong";
};
