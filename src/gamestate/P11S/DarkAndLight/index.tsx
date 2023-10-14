import { IterateGames3 } from "../..";
import { Designations, Setup, getRole } from "../../gameState";
import { pickOne, shuffle } from "../../helpers";
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
import { DarkAndLightPlayer, createPlayer } from "./gameState";

export type DarkAndLightState = IterateGames3<
  DarkAndLightPlayer,
  RevelationGameState,
  JuryOverrulingGameState,
  DivisiveOverrulingGameState
>;

export const startDarkAndLight = (setup: Setup): DarkAndLightState => {
  let dps = Designations.filter((d) => getRole(d) === "DPS");
  let tanks = Designations.filter((d) => getRole(d) === "Tank");
  let healers = Designations.filter((d) => getRole(d) === "Healer");

  dps = shuffle(dps);
  healers = shuffle(healers);
  tanks = shuffle(tanks);
  const debuffPairs: ["Dark" | "Light", "Dark" | "Light"][] = [
    ["Dark", "Dark"],
    ["Light", "Light"],
    ["Dark", "Light"],
    ["Light", "Dark"],
  ];
  const prio = pickOne(["Tank", "Healer"]);
  const soups = [0, 1].flatMap((i) =>
    prio === "Tank" ? [tanks[i], healers[i]] : [healers[i], tanks[i]]
  );

  const players = [0, 1, 2, 3].flatMap((i) => {
    const d = dps[i];
    const s = soups[i];
    return [
      createPlayer(
        d,
        debuffPairs[i][0],
        s,
        debuffPairs[i][1],
        d === setup.designation
      ),
      createPlayer(
        s,
        debuffPairs[i][1],
        d,
        debuffPairs[i][0],
        s === setup.designation
      ),
    ];
  });

  return {
    game: RevelationState,
    gameState: {
      hasFinished: false,
      bossColour: Math.random() < 0.5 ? "Dark" : "Light",
      topBomb: Math.random() < 0.5 ? "Dark" : "Light",
      cast: null,
      players: players,
    },
    next: [
      [JuryOverrulingState, (s) => initialJuryOverrullingState(s.players)],
      [DivisiveOverrulingState, (s) => initialDivisiveState(s.players)],
    ],
    loop: 3,
  };
};
