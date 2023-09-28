import React from "react";

export type Role = "Tank" | "Healer" | "DPS";
export type Position = [number, number];

export type Player = {
  role: Role;
  position: Position;
  debuff: "Light" | "Dark";
  alive: boolean;
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
  reduce: (action: Action) => IGameState;
  player: Player;
  tetheredTo: Player;
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
    alive: true,
  };
};

export const createPartner = (player: Player): Player => {
  return {
    role:
      player.role === "DPS"
        ? Math.random() <= 0.5
          ? "Tank"
          : "Healer"
        : "DPS",
    position: getRandomPos(),
    debuff: Math.random() <= 0.5 ? "Light" : "Dark",
    alive: true,
  };
};
