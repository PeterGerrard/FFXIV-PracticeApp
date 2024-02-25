import { Point, point } from "@flatten-js/core";
import { DangerPuddle } from "../../Mechanics/DangerPuddles";
import { Debuff, Player } from "../../Player";
import { Designation, Designations, getRole } from "../../gameState";
import { pickOne, shuffle } from "../../helpers";
import { P12SP2Waymarks } from "../P12SP2Arena";
import caloricFire from "../assets/CaloricStack.png";
import caloricWind from "../assets/CaloricWind.png";
import caloricStack1 from "../assets/CaloricCount1.png";
import caloricStack2 from "../assets/CaloricCount2.png";
import caloricStack3 from "../assets/CaloricCount3.png";
import caloricStack4 from "../assets/CaloricCount4.png";
import caloricStack5 from "../assets/CaloricCount5.png";

type InitialState = {
  stage: "Initial";
  supportBeacon: Designation;
  dpsBeacon: Designation;
  explodingBeacon: "Support" | "DPS";
  autoProgress: false;
  fireTargets1: Designation[];
  windTargets1: Designation[];
};

type BeaconExplosion = {
  stage: "Beacon";
  supportBeacon: Designation;
  dpsBeacon: Designation;
  explodingBeacon: "Support" | "DPS";
  autoProgress: true;
  fireTargets1: Designation[];
  windTargets1: Designation[];
};

type PostBeaconExplosion = {
  stage: "PostBeacon";
  supportBeacon: Designation;
  dpsBeacon: Designation;
  explodingBeacon: "Support" | "DPS";
  autoProgress: false;
  fireTargets1: Designation[];
  windTargets1: Designation[];
  startingDistances: { [p in Designation]: number };
};

export type Caloric1GameState =
  | InitialState
  | BeaconExplosion
  | PostBeaconExplosion;

export const createInitialState = (): Caloric1GameState => {
  const supportBeacon = pickOne<Designation>(["MT", "OT", "H1", "H2"]);
  const dpsBeacon = pickOne<Designation>(["M1", "M2", "R1", "R2"]);
  const shuffledDesignations = shuffle(
    Designations.filter((x) => x !== supportBeacon && x !== dpsBeacon)
  );
  return {
    stage: "Initial",
    supportBeacon: supportBeacon,
    dpsBeacon: dpsBeacon,
    explodingBeacon: pickOne(["Support", "DPS"] as const),
    autoProgress: false,
    fireTargets1: shuffledDesignations.slice(0, 4),
    windTargets1: [
      supportBeacon,
      dpsBeacon,
      ...shuffledDesignations.slice(4, 6),
    ],
  };
};

export const getDangerPuddles = (
  state: Caloric1GameState,
  players: Player[]
): DangerPuddle[] => {
  if (state.stage === "Beacon") {
    const targetedSpot = players.filter(
      (p) =>
        p.designation ===
        (state.explodingBeacon === "Support"
          ? state.supportBeacon
          : state.dpsBeacon)
    )[0].position;
    return [
      {
        type: "circle",
        damage: 1.5,
        debuffRequirement: null,
        instaKill: null,
        onAnimationEnd: () => {},
        radius: 0.1,
        roleRequirement: null,
        source: targetedSpot,
        split: true,
      },
    ];
  }
  return [];
};

export const nextStep = (
  state: Caloric1GameState,
  players: Player[]
): Caloric1GameState => {
  if (state.stage === "Initial") {
    return {
      ...state,
      stage: "Beacon",
      autoProgress: true,
    };
  }
  if (state.stage === "Beacon") {
    return {
      ...state,
      stage: "PostBeacon",
      autoProgress: false,
      startingDistances: players.reduce(
        (a, p) => ({ ...a, [p.designation]: p.distanceTravelled }),
        {}
      ) as { [p in Designation]: number },
    };
  }
  return state;
};

const CaloricFireDebuff: Debuff = {
  name: "Caloric Fire",
  src: caloricFire,
};

const CaloricWindDebuff: Debuff = {
  name: "Caloric Wind",
  src: caloricWind,
};
const CaloricStack1Debuff: Debuff = {
  name: "Caloric Stack 1",
  src: caloricStack1,
};
const CaloricStack2Debuff: Debuff = {
  name: "Caloric Stack 2",
  src: caloricStack2,
};
const CaloricStack3Debuff: Debuff = {
  name: "Caloric Stack 3",
  src: caloricStack3,
};
const CaloricStack4Debuff: Debuff = {
  name: "Caloric Stack 4",
  src: caloricStack4,
};
export const CaloricStack5Debuff: Debuff = {
  name: "Caloric Stack 5",
  src: caloricStack5,
};

export const getDebuffs = (state: Caloric1GameState, player: Player) => {
  if (state.stage === "Initial") return [];

  const debuffs: Debuff[] = [];
  let stackCount = 1;

  if (state.fireTargets1.includes(player.designation)) {
    debuffs.push(CaloricFireDebuff);
  }
  if (state.windTargets1.includes(player.designation)) {
    debuffs.push(CaloricWindDebuff);
    stackCount++;
  }

  if (state.stage !== "Beacon") {
    if (
      player.distanceTravelled - state.startingDistances[player.designation] >
      0.12
    ) {
      stackCount++;
    }
  }

  if (stackCount === 1) {
    debuffs.unshift(CaloricStack1Debuff);
  }
  if (stackCount === 2) {
    debuffs.unshift(CaloricStack2Debuff);
  }
  if (stackCount === 3) {
    debuffs.unshift(CaloricStack3Debuff);
  }
  if (stackCount === 4) {
    debuffs.unshift(CaloricStack4Debuff);
  }
  if (stackCount === 5) {
    debuffs.unshift(CaloricStack5Debuff);
  }

  return debuffs;
};

export const getTargetSpot = (
  state: Caloric1GameState,
  player: Player
): Point => {
  if (state.stage === "Initial") {
    if (player.designation === state.supportBeacon) {
      return P12SP2Waymarks["Waymark D"].translate(0.02, 0);
    }
    if (getRole(player.designation) === getRole(state.supportBeacon)) {
      return P12SP2Waymarks["Waymark C"];
    }
    if (player.designation === state.dpsBeacon) {
      return P12SP2Waymarks["Waymark B"].translate(-0.02, 0);
    }
    if (
      getRole(player.designation) === "DPS" &&
      player.designation[0] === state.dpsBeacon[0]
    ) {
      return P12SP2Waymarks["Waymark A"];
    }

    return point(P12SP2Waymarks["Waymark A"].x, P12SP2Waymarks["Waymark B"].y);
  }
  return player.position;
};
