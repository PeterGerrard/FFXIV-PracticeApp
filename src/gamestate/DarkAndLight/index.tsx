import { IterateGames3, Role } from "..";
import {
  DivisiveOverrulingGameState,
  DivisiveOverrulingState,
  initialDivisiveState,
} from "./DivisiveOverruling/divisiveOverrulingState";
import {
  JuryOverrulingGameState,
  JuryOverrulingState,
  initialJuryOverrullingState,
} from "./JuryOverruling/juryOverrulingState";
import {
  RevelationGameState,
  RevelationState,
} from "./Revelation/revelationsState";
import {
  DarkAndLightPlayer,
  createPartner,
  createPlayer,
  isTetherSafe,
} from "./gameState";

export type DarkAndLightState = IterateGames3<
  DarkAndLightPlayer,
  RevelationGameState,
  JuryOverrulingGameState,
  DivisiveOverrulingGameState
>;

export const startDarkAndLight = (role: Role): DarkAndLightState => {
  const player = createPlayer(role);
  const otherPlayer = createPartner(player);
  return {
    player,
    otherPlayer,
    game: RevelationState,
    gameState: {
      hasFinished: false,
      bossColour: Math.random() < 0.5 ? "Dark" : "Light",
      topBomb: Math.random() < 0.5 ? "Dark" : "Light",
      cast: null,
    },
    isSafe: isTetherSafe,
    isDead: false,
    next: [
      [JuryOverrulingState, initialJuryOverrullingState],
      [DivisiveOverrulingState, initialDivisiveState],
    ],
    loop: 3,
  };
};
