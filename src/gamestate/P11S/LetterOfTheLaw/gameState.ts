import { Player } from "../../Player";
import { ClockSpot, GameState } from "../../gameState";

export type LetterOfTheLawPlayer = Player & {
  clockSpot: ClockSpot;
  isTethered: boolean;
};

export type LetterOfTheLawState = GameState<LetterOfTheLawPlayer> & {
  bossColour: "Dark" | "Light" | null;
};
