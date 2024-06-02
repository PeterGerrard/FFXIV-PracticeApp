import { Point } from "@flatten-js/core";
import { Player } from "../../Player";
import {
  Cast,
  Designation,
  Designations,
  InterCardinal,
  InterCardinals,
  Setup,
  getRandomPos,
  getRole,
} from "../../gameState";
import {
  DismissalOverrulingState,
  getMechanic as dismissalGetMechanic,
  getTargetSpot as dismissalGetTargetSpot,
  applyDamage as dismissalApplyDamage,
  progress as dismissalProgress,
} from "./DismissalOverruling";
import {
  HeartOfJudgementState,
  getMechanic as heartGetMechanic,
  getTargetSpot as heartGetTargetSpot,
  applyDamage as heartApplyDamage,
  progress as heartProgress,
} from "./HeartOfJudgement";
import {
  TwofoldRevelationState,
  getMechanic as twofoldGetMechanic,
  getTargetSpot as twofoldGetTargetSpot,
  applyDamage as twofoldApplyDamage,
  progress as twofoldProgress,
} from "./Twofold Revelation";
import { useGame } from "../../gameHooks";
import { split, pickOne } from "../../helpers";
import { Mechanic } from "../../mechanics";
import { useFullPartyProfile } from "../../Setup/ProfileContext";

export type LetterOfTheLawPlayer = Player & {
  isTethered: boolean;
};

export type LetterOfTheLawState = {
  hasFinished: boolean;
  cast: Cast | null;
  bossColour: "Dark" | "Light" | null;
};

export type NewLetterOfTheLawState =
  | ({ outer: "Dismissal" } & DismissalOverrulingState)
  | ({ outer: "Heart" } & HeartOfJudgementState)
  | ({ outer: "Twofold" } & TwofoldRevelationState);

export const getMechanic = (
  state: NewLetterOfTheLawState,
  players: LetterOfTheLawPlayer[]
): Mechanic<LetterOfTheLawPlayer> => {
  switch (state.outer) {
    case "Dismissal":
      return dismissalGetMechanic(state);
    case "Heart":
      return heartGetMechanic(state);
    case "Twofold":
      return twofoldGetMechanic(state, players);
  }
};

const getTargetSpot = (
  state: NewLetterOfTheLawState,
  players: LetterOfTheLawPlayer[],
  player: LetterOfTheLawPlayer
): Point => {
  switch (state.outer) {
    case "Dismissal":
      return dismissalGetTargetSpot(state, player);
    case "Heart":
      return heartGetTargetSpot(state, player);
    case "Twofold":
      return twofoldGetTargetSpot(state, players, player);
  }
};

const getSurvivors = (
  state: NewLetterOfTheLawState,
  players: LetterOfTheLawPlayer[]
): Designation[] => {
  switch (state.outer) {
    case "Dismissal":
      return dismissalApplyDamage(state, players)
        .filter((p) => p.alive)
        .map((p) => p.designation);
    case "Heart":
      return heartApplyDamage(state, players)
        .filter((p) => p.alive)
        .map((p) => p.designation);
    case "Twofold":
      return twofoldApplyDamage(state, players)
        .filter((p) => p.alive)
        .map((p) => p.designation);
  }
};

export const hasFinished = (state: NewLetterOfTheLawState) =>
  state.outer === "Dismissal" && state.hasFinished;

const createPlayers = (setup: Setup): LetterOfTheLawPlayer[] => {
  const [tanks, others] = split(Designations, (d) => getRole(d) === "Tank");
  const tetheredTank = pickOne(tanks);
  const tetheredNonTank = pickOne(others);
  return Designations.map((d) => {
    const role = getRole(d);
    return {
      type: "Full",
      role: role,
      position: getRandomPos(),
      isTethered: d === tetheredTank || d === tetheredNonTank,
      debuffs: [],
      controlled: d === setup.designation,
      designation: d,
      show: true,
      alive: true,
      distanceTravelled: 0,
    };
  });
};

const createState = (): NewLetterOfTheLawState => {
  const paired = InterCardinals.map<[InterCardinal, InterCardinal]>((_, i) => [
    InterCardinals[i],
    InterCardinals[(i + 1) % InterCardinals.length],
  ]);
  const adds1 = pickOne<[InterCardinal, InterCardinal]>(paired);
  const empty = InterCardinals.filter((a) => !adds1.includes(a));
  const darkBox = pickOne(empty);
  const i = Math.round(Math.random());
  return {
    outer: "Heart",
    stage: "Initial",
    hasFinished: false,
    cast: null,
    darkAddLocation: adds1[i],
    lightAddLocation: adds1[1 - i],
    bossColour: pickOne<"Dark" | "Light">(["Dark", "Light"]),
    topBomb: pickOne<"Dark" | "Light">(["Dark", "Light"]),
    darkBoxLocation: darkBox,
    lightBoxLocation: empty.filter((x) => x !== darkBox)[0],
  };
};

const autoProgress = (state: NewLetterOfTheLawState): false | number => {
  if (state.outer === "Heart") {
    if (state.stage === "Final") return 1500;
  }
  if (state.outer === "Dismissal") {
    if (state.stage === "CrossLine") return 1500;
    if (state.stage === "CrossLine2") return 1500;
    if (state.stage === "InOut") return 1500;
  }
  if (state.outer === "Twofold") {
    if (state.stage === "Jump" || state.stage === "Outer") return 1500;
  }
  return false;
};

const progress = (
  state: NewLetterOfTheLawState,
  players: LetterOfTheLawPlayer[]
): NewLetterOfTheLawState => {
  switch (state.outer) {
    case "Heart":
      if (state.hasFinished) {
        return {
          outer: "Twofold",
          bossColour: null,
          cast: null,
          darkAddLocation: state.darkAddLocation,
          lightAddLocation: state.lightAddLocation,
          hasFinished: false,
          stage: "Initial",
        };
      }
      const s1 = heartProgress(state);
      return { outer: "Heart", ...s1 };
    case "Twofold":
      if (state.hasFinished) {
        const paired = InterCardinals.map<[InterCardinal, InterCardinal]>(
          (_, i) => [
            InterCardinals[i],
            InterCardinals[(i + 1) % InterCardinals.length],
          ]
        );
        const adds2 = pickOne<[InterCardinal, InterCardinal]>(paired);
        const j = Math.round(Math.random());
        return {
          outer: "Dismissal",
          stage: "Initial",
          cast: null,
          hasFinished: false,
          bossColour: null,
          darkAddLocation: adds2[j],
          lightAddLocation: adds2[1 - j],
        };
      }
      const s2 = twofoldProgress(state, players);
      return { outer: "Twofold", ...s2 };
    case "Dismissal":
      return { outer: "Dismissal", ...dismissalProgress(state) };
  }
};

const getDebuffs = () => [];

export const useLetterOfTheLaw = () => {
  const setup = useFullPartyProfile();

  return useGame<LetterOfTheLawPlayer, NewLetterOfTheLawState>(
    getSurvivors,
    hasFinished,
    () => createPlayers(setup),
    getTargetSpot,
    createState,
    autoProgress,
    progress,
    getDebuffs
  );
};
