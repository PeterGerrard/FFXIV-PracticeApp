import { Player } from "../../Player";
import { GameState } from "../../gameState";

export type LetterOfTheLawPlayer = Player & {
  isTethered: boolean;
};

export type LetterOfTheLawState = GameState<LetterOfTheLawPlayer> & {
  bossColour: "Dark" | "Light" | null;
};
