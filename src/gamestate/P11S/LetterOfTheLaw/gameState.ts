import { Player } from "../../Player";
import { ClockSpot, GameState, Role, getRandomPos } from "../../gameState";

export type LetterOfTheLawPlayer = Player & {
  clockSpot: ClockSpot;
  isTethered: boolean;
};

export type LetterOfTheLawState = GameState & {
  bossColour: "Dark" | "Light" | null;
};

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
