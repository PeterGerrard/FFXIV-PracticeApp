import { Point } from "@flatten-js/core";
import { Designation, Designations,  getRole } from "../../gameState";
import { pickOne, shuffle } from "../../helpers";
import {
  DivisiveOverrulingGameState,
  initialDivisiveState,
  applyDamage as divisiveApplyDamage,
  getTargetSpot as divisiveGetTargetSpot,
  progress as divisiveProgress,
  getMechanic as divisiveGetMechanic,
} from "./DivisiveOverruling/divisiveOverrulingState";
import {
  applyDamage as juryApplyDamage,
  getTargetSpot as juryGetTargetSpot,
  progress as juryProgress,
  JuryOverrulingGameState,
  initialJuryOverrullingState,
  getMechanic as juryGetMechanic,
} from "./JuryOverruling/juryOverrulingState";
import {
  applyDamage as revelationsApplyDamage,
  getTargetSpot as revelationsGetTargetSpot,
  progress as revelationsProgress,
  getMechanic as revelationsGetMechanic,
  RevelationGameState,
} from "./Revelation/revelationsState";
import { DarkAndLightPlayer, createPlayer } from "./gameState";
import { Mechanic } from "../../mechanics";
import { FullPartyProfile } from "../../Setup/ProfileContext";

export type NewDarkAndLightState =
  | ({ outer: "Revelation" } & RevelationGameState)
  | ({ outer: "Jury" } & JuryOverrulingGameState)
  | ({ outer: "Divisive" } & DivisiveOverrulingGameState);

export const getSurvivors = (
  state: NewDarkAndLightState,
  players: DarkAndLightPlayer[]
): Designation[] => {
  switch (state.outer) {
    case "Revelation":
      return revelationsApplyDamage(state, players)
        .filter((p) => p.alive)
        .map((p) => p.designation);
    case "Jury":
      return juryApplyDamage(state, players)
        .filter((p) => p.alive)
        .map((p) => p.designation);
    case "Divisive":
      return divisiveApplyDamage(state, players)
        .filter((p) => p.alive)
        .map((p) => p.designation);
  }
};

export const getDangerPuddles = (
  state: NewDarkAndLightState,
  players: DarkAndLightPlayer[]
): Mechanic<DarkAndLightPlayer> => {
  switch (state.outer) {
    case "Revelation":
      return revelationsGetMechanic(state);
    case "Jury":
      return juryGetMechanic(state, players);
    case "Divisive":
      return divisiveGetMechanic(state);
  }
};

export const getTargetSpot = (
  state: NewDarkAndLightState,
  players: DarkAndLightPlayer[],
  player: DarkAndLightPlayer
): Point => {
  switch (state.outer) {
    case "Revelation":
      return revelationsGetTargetSpot(state, players, player);
    case "Jury":
      return juryGetTargetSpot(state, player);
    case "Divisive":
      return divisiveGetTargetSpot(state, player);
  }
};

export const createPlayers = (setup: FullPartyProfile) => {
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

  return [0, 1, 2, 3].flatMap((i) => {
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
};

export const autoProgress = (state: NewDarkAndLightState): false | number => {
  if (state.outer === "Revelation") {
    if (state.stage === "Explosion") return 1500;
  }
  if (state.outer === "Jury") {
    if (state.stage === "Lines") return 1500;
    if (state.stage === "AOE") return 1500;
  }
  return false;
};
export const progress = (
  state: NewDarkAndLightState,
  _players: DarkAndLightPlayer[]
): NewDarkAndLightState => {
  switch (state.outer) {
    case "Revelation":
      if (state.hasFinished) {
        return { outer: "Jury", ...initialJuryOverrullingState() };
      }
      const s1 = revelationsProgress(state);
      return { outer: "Revelation", ...s1 };
    case "Jury":
      if (state.hasFinished) {
        return { outer: "Divisive", ...initialDivisiveState() };
      }
      const s2 = juryProgress(state);
      return { outer: "Jury", ...s2 };
    case "Divisive":
      return { outer: "Divisive", ...divisiveProgress(state) };
  }
};
