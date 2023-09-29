import { IterateGames3 } from "../..";
import { Setup } from "../../gameState";
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

export const startDarkAndLight = (setup: Setup): DarkAndLightState => {
  const player = createPlayer(setup.role);
  const otherPlayer = createPartner(player);
  return {
    player,
    otherPlayers: [otherPlayer],
    game: RevelationState,
    gameState: {
      hasFinished: false,
      bossColour: Math.random() < 0.5 ? "Dark" : "Light",
      topBomb: Math.random() < 0.5 ? "Dark" : "Light",
      cast: null,
    },
    isSafe: (p, ps) => isTetherSafe(p, ps[0]),
    isDead: false,
    next: [
      [JuryOverrulingState, () => initialJuryOverrullingState],
      [DivisiveOverrulingState, initialDivisiveState],
    ],
    loop: 3,
  };
};
