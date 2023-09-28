import {
  ClockSpot,
  GameState,
  InterCardinal,
  Player,
  Position,
  Role,
  getRandomPos,
} from "../gameState";

export type LetterOfTheLawPlayer = Player & {
  clockSpot: ClockSpot;
  isTethered: boolean;
};

export type LetterOfTheLawState = GameState & {
  bossColour: "Dark" | "Light";
  add1Location: InterCardinal;
  add2Location: InterCardinal;
};

export const MarkerA: Position = [0.498, 0.206];
export const Marker1: Position = [0.714, 0.289];
export const MarkerB: Position = [0.664, 0.502];
export const Marker2: Position = [0.617, 0.621];
export const MarkerC: Position = [0.498, 0.816];
export const Marker3: Position = [0.278, 0.719];
export const MarkerD: Position = [0.332, 0.502];
export const Marker4: Position = [0.383, 0.391];

export const createPlayer = (
  role: Role,
  clockSpot: ClockSpot
): LetterOfTheLawPlayer => {
  return {
    role,
    position: getRandomPos(),
    clockSpot,
    isTethered: Math.random() < (role === "Tank" ? 0.5 : 1 / 6),
  };
};
