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

export type GameState = {
  hasFinished: boolean;
  bossColour: "Dark" | "Light" | null;
  cast: Cast | null;
};

export type Loop<T, TNextLoop> = {
  overlay: (
    gameState: T,
    dispatch: (action: Action) => void
  ) => React.ReactElement;
  nextState: (gameState: T) => T;
  isSafe: (gameState: T, player: Player) => boolean;
  getSafeSpot: (gameState: T, player: Player) => Position;
  nextLoop: TNextLoop;
};

export type FinalLoop<T> = {
  overlay: (
    gameState: T,
    dispatch: (action: Action) => void
  ) => React.ReactElement;
  nextState: (gameState: T) => T;
  isSafe: (gameState: T, player: Player) => boolean;
  getSafeSpot: (gameState: T, player: Player) => Position;
};

export type GameLoop1<T> = FinalLoop<T>;
export type GameLoop2<T1, T2> = Loop<T1, GameLoop1<T2>>;
export type GameLoop3<T1, T2, T3> = Loop<T1, GameLoop2<T2, T3>>;
export type GameLoop4<T1, T2, T3, T4> = Loop<T1, GameLoop3<T2, T3, T4>>;
export type GameLoop5<T1, T2, T3, T4, T5> = Loop<T1, GameLoop4<T2, T3, T4, T5>>;

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
