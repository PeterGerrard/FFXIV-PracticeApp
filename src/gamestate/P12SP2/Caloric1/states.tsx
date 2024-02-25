import { Point, point } from "@flatten-js/core";
import { DangerPuddle } from "../../Mechanics/DangerPuddles";
import { Debuff, Player } from "../../Player";
import {
  Designation,
  Designations,
  distanceTo,
  getGroup,
  getRole,
} from "../../gameState";
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
  fireTargets2: Designation[];
};

type BeaconExplosion = {
  stage: "Beacon";
  supportBeacon: Designation;
  dpsBeacon: Designation;
  explodingBeacon: "Support" | "DPS";
  autoProgress: 1500;
  fireTargets1: Designation[];
  windTargets1: Designation[];
  fireTargets2: Designation[];
};

type PostBeaconExplosion = {
  stage: "PostBeacon";
  supportBeacon: Designation;
  dpsBeacon: Designation;
  explodingBeacon: "Support" | "DPS";
  autoProgress: false;
  fireTargets1: Designation[];
  windTargets1: Designation[];
  fireTargets2: Designation[];
  startingDistances: { [p in Designation]: number };
};

type AfterSupportMove = {
  stage: "AfterSupportMove";
  supportBeacon: Designation;
  dpsBeacon: Designation;
  explodingBeacon: "Support" | "DPS";
  autoProgress: false;
  fireTargets1: Designation[];
  windTargets1: Designation[];
  fireTargets2: Designation[];
  startingDistances: { [p in Designation]: number };
};

type AfterDpsMove = {
  stage: "AfterDpsMove";
  supportBeacon: Designation;
  dpsBeacon: Designation;
  explodingBeacon: "Support" | "DPS";
  autoProgress: 0;
  fireTargets1: Designation[];
  windTargets1: Designation[];
  fireTargets2: Designation[];
  startingDistances: { [p in Designation]: number };
};

type StackExplosions1 = {
  stage: "StackExplosions1";
  supportBeacon: Designation;
  dpsBeacon: Designation;
  explodingBeacon: "Support" | "DPS";
  autoProgress: false;
  fireTargets1: Designation[];
  windTargets1: Designation[];
  fireTargets2: Designation[];
  startingDistances: { [p in Designation]: number };
};

type AeroOut = {
  stage: "AeroOut";
  supportBeacon: Designation;
  dpsBeacon: Designation;
  explodingBeacon: "Support" | "DPS";
  autoProgress: false;
  fireTargets1: Designation[];
  windTargets1: Designation[];
  fireTargets2: Designation[];
  startingDistances: { [p in Designation]: number };
};

type StackExplosions2 = {
  stage: "StackExplosions2";
  supportBeacon: Designation;
  dpsBeacon: Designation;
  explodingBeacon: "Support" | "DPS";
  autoProgress: 1500;
  fireTargets1: Designation[];
  windTargets1: Designation[];
  fireTargets2: Designation[];
  startingDistances: { [p in Designation]: number };
};

type Final = {
  stage: "Final";
  supportBeacon: Designation;
  dpsBeacon: Designation;
  explodingBeacon: "Support" | "DPS";
  autoProgress: false;
  fireTargets1: Designation[];
  windTargets1: Designation[];
  fireTargets2: Designation[];
  startingDistances: { [p in Designation]: number };
};

export type Caloric1GameState =
  | InitialState
  | BeaconExplosion
  | PostBeaconExplosion
  | AfterSupportMove
  | AfterDpsMove
  | StackExplosions1
  | AeroOut
  | StackExplosions2
  | Final;

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
    explodingBeacon: pickOne<"Support" | "DPS">(["Support", "DPS"]),
    autoProgress: false,
    fireTargets1: shuffledDesignations.slice(0, 4),
    windTargets1: [
      supportBeacon,
      dpsBeacon,
      ...shuffledDesignations.slice(4, 6),
    ],
    fireTargets2: shuffledDesignations.slice(0, 2),
  };
};

export const getDangerPuddles = (
  state: Caloric1GameState,
  players: Player[]
): DangerPuddle[] => {
  const getPlayer = (d: Designation): Player =>
    players.filter((p) => p.designation === d)[0];

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
  if (state.stage === "StackExplosions1") {
    return state.fireTargets1.map(getPlayer).map((p) => ({
      type: "circle",
      damage: 1.5,
      debuffRequirement: null,
      instaKill: null,
      onAnimationEnd: () => {},
      radius: 0.05,
      roleRequirement: null,
      source: p.position,
      split: true,
    }));
  }
  if (state.stage === "StackExplosions2") {
    return state.fireTargets2
      .map(getPlayer)
      .map<DangerPuddle>((p) => ({
        type: "circle",
        damage: 1.5,
        debuffRequirement: null,
        instaKill: null,
        onAnimationEnd: () => {},
        radius: 0.05,
        roleRequirement: null,
        source: p.position,
        split: true,
      }))
      .concat(
        state.windTargets1.map(getPlayer).map<DangerPuddle>((p) => ({
          type: "circle",
          damage: 0.8,
          debuffRequirement: CaloricWindDebuff,
          instaKill: null,
          onAnimationEnd: () => {},
          radius: 0.15,
          roleRequirement: null,
          source: p.position,
          split: false,
          colour: "lightgreen",
        }))
      );
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
      autoProgress: 1500,
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
  if (state.stage === "PostBeacon") {
    return {
      ...state,
      stage: "AfterSupportMove",
    };
  }
  if (state.stage === "AfterSupportMove") {
    return {
      ...state,
      stage: "AfterDpsMove",
      autoProgress: 0,
    };
  }
  if (state.stage === "AfterDpsMove") {
    return {
      ...state,
      stage: "StackExplosions1",
      autoProgress: false,
    };
  }
  if (state.stage === "StackExplosions1") {
    return {
      ...state,
      stage: "AeroOut",
    };
  }
  if (state.stage === "AeroOut") {
    return {
      ...state,
      stage: "StackExplosions2",
      autoProgress: 1500,
    };
  }
  if (state.stage === "StackExplosions2") {
    return {
      ...state,
      stage: "Final",
      autoProgress: false,
    };
  }
  return state;
};

export const CaloricFireDebuff: Debuff = {
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

const getPartner = (d: Designation): Designation => {
  switch (d) {
    case "MT":
      return "OT";
    case "OT":
      return "MT";
    case "H1":
      return "H2";
    case "H2":
      return "H1";
    case "M1":
      return "M2";
    case "M2":
      return "M1";
    case "R1":
      return "R2";
    case "R2":
      return "R1";
  }
};

const inState = (
  state: Caloric1GameState,
  stages: Caloric1GameState["stage"][]
) => stages.includes(state.stage);

export const getDebuffs = (state: Caloric1GameState, player: Player) => {
  if (state.stage === "Initial") return [];

  const debuffs: Debuff[] = [];
  let stackCount = 1;

  if (
    inState(state, ["Beacon", "PostBeacon", "AfterSupportMove", "AfterDpsMove"])
  ) {
    if (state.fireTargets1.includes(player.designation)) {
      debuffs.push(CaloricFireDebuff);
    }
  }
  if (inState(state, ["StackExplosions1", "AeroOut"])) {
    if (state.fireTargets2.includes(player.designation)) {
      debuffs.push(CaloricFireDebuff);
    }
  }
  if (
    state.stage !== "Final" &&
    state.windTargets1.includes(player.designation)
  ) {
    debuffs.push(CaloricWindDebuff);
    stackCount++;
  }

  if (state.stage !== "Beacon") {
    if (
      player.distanceTravelled - state.startingDistances[player.designation] >
      0.12
    ) {
      stackCount += Math.floor(
        (player.distanceTravelled -
          state.startingDistances[player.designation]) /
          0.12
      );
    }
  }

  if (
    inState(state, ["StackExplosions1", "AeroOut", "StackExplosions2", "Final"])
  ) {
    stackCount++;
  }
  if (inState(state, ["StackExplosions2", "Final"])) {
    if (!state.windTargets1.includes(player.designation)) {
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
  if (stackCount >= 5) {
    debuffs.unshift(CaloricStack5Debuff);
  }

  return debuffs;
};

export const getTargetSpot = (
  state: Caloric1GameState,
  allPlayers: Player[],
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
  if (state.stage === "PostBeacon") {
    const initialEast = state.dpsBeacon;
    const initialNorth = getPartner(initialEast);
    const initialWest = state.supportBeacon;
    const initialSouth = getPartner(initialWest);
    if (
      [initialEast, initialNorth, initialWest, initialSouth].includes(
        player.designation
      ) ||
      getRole(player.designation) === "DPS"
    ) {
      return player.position;
    }
    const targets = state.fireTargets1.includes(player.designation)
      ? state.windTargets1
      : state.fireTargets1;
    if (getGroup(player.designation) === "Group1") {
      if (targets.includes(initialWest)) {
        return P12SP2Waymarks["Waymark D"].translate(0.02, 0);
      }
      if (targets.includes(initialSouth)) {
        return P12SP2Waymarks["Waymark C"];
      }
      if (targets.includes(initialEast)) {
        return P12SP2Waymarks["Waymark B"].translate(-0.02, 0);
      }
      if (targets.includes(initialNorth)) {
        return P12SP2Waymarks["Waymark A"];
      }
    } else {
      if (targets.includes(initialNorth)) {
        return P12SP2Waymarks["Waymark A"];
      }
      if (targets.includes(initialEast)) {
        return P12SP2Waymarks["Waymark B"].translate(-0.02, 0);
      }
      if (targets.includes(initialSouth)) {
        return P12SP2Waymarks["Waymark C"];
      }
      if (targets.includes(initialWest)) {
        return P12SP2Waymarks["Waymark D"].translate(0.02, 0);
      }
    }
  }
  if (state.stage === "AfterSupportMove") {
    const initialEast = state.dpsBeacon;
    const initialNorth = getPartner(initialEast);
    const initialWest = state.supportBeacon;
    const initialSouth = getPartner(initialWest);
    if (
      [initialEast, initialNorth, initialWest, initialSouth].includes(
        player.designation
      )
    ) {
      return player.position;
    }

    const targets = state.fireTargets1.includes(player.designation)
      ? state.windTargets1
      : state.fireTargets1;
    const isDps = getRole(player.designation) === "DPS";
    const matchingInGroup = (
      state.fireTargets1.includes(player.designation)
        ? state.fireTargets1
        : state.windTargets1
    ).filter((d) => getGroup(d) === getGroup(player.designation));
    const doubleMoveRequired =
      matchingInGroup.filter(
        (x) =>
          ![initialEast, initialSouth, initialWest, initialNorth].includes(x)
      ).length > 1;
    if (getGroup(player.designation) === "Group1") {
      let matched = false;
      if (targets.includes(initialWest)) {
        if (isDps && doubleMoveRequired && !matched) {
          matched = true;
        } else {
          return P12SP2Waymarks["Waymark D"].translate(0.02, 0);
        }
      }
      if (targets.includes(initialSouth)) {
        if (isDps && doubleMoveRequired && !matched) {
          matched = true;
        } else {
          return P12SP2Waymarks["Waymark C"];
        }
      }
      if (targets.includes(initialEast)) {
        if (isDps && doubleMoveRequired && !matched) {
          matched = true;
        } else {
          return P12SP2Waymarks["Waymark B"].translate(-0.02, 0);
        }
      }
      if (targets.includes(initialNorth)) {
        return P12SP2Waymarks["Waymark A"];
      }
    } else {
      let matched = false;
      if (targets.includes(initialNorth)) {
        if (isDps && doubleMoveRequired && !matched) {
          matched = true;
        } else {
          return P12SP2Waymarks["Waymark A"];
        }
      }
      if (targets.includes(initialEast)) {
        if (isDps && doubleMoveRequired && !matched) {
          matched = true;
        } else {
          return P12SP2Waymarks["Waymark B"].translate(-0.02, 0);
        }
      }
      if (targets.includes(initialSouth)) {
        if (isDps && doubleMoveRequired && !matched) {
          matched = true;
        } else {
          return P12SP2Waymarks["Waymark C"];
        }
      }
      if (targets.includes(initialWest)) {
        return P12SP2Waymarks["Waymark D"].translate(0.02, 0);
      }
    }
  }
  if (state.stage === "StackExplosions1") {
    if (state.windTargets1.includes(player.designation)) {
      if (distanceTo(player.position, P12SP2Waymarks["Waymark A"]) < 0.1) {
        return P12SP2Waymarks["Waymark A"].translate(0, -0.1);
      }
      if (distanceTo(player.position, P12SP2Waymarks["Waymark B"]) < 0.1) {
        return P12SP2Waymarks["Waymark B"].translate(0.18, 0);
      }
      if (distanceTo(player.position, P12SP2Waymarks["Waymark C"]) < 0.1) {
        return P12SP2Waymarks["Waymark C"].translate(0, 0.1);
      }
      if (distanceTo(player.position, P12SP2Waymarks["Waymark D"]) < 0.1) {
        return P12SP2Waymarks["Waymark D"].translate(-0.18, 0);
      }
    } else {
      return player.position;
    }
  }
  if (state.stage === "AeroOut") {
    if (state.windTargets1.includes(player.designation)) {
      return player.position;
    }
    if (distanceTo(player.position, P12SP2Waymarks["Waymark B"]) < 0.1) {
      return player.position;
    }
    if (distanceTo(player.position, P12SP2Waymarks["Waymark D"]) < 0.1) {
      return player.position;
    }
    if (distanceTo(player.position, P12SP2Waymarks["Waymark A"]) < 0.1) {
      const [[targetPlayer]] = allPlayers
        .map(
          (p) =>
            [p, distanceTo(p.position, P12SP2Waymarks["Waymark B"])] as const
        )
        .sort(([, d1], [, d2]) => d1 - d2);
      console.log({ from: "A", targetPlayer });
      if (
        state.fireTargets2.includes(player.designation) ===
        state.fireTargets2.includes(targetPlayer.designation)
      ) {
        return P12SP2Waymarks["Waymark D"].translate(0.02, 0);
      } else {
        return P12SP2Waymarks["Waymark B"].translate(-0.02, 0);
      }
    }
    if (distanceTo(player.position, P12SP2Waymarks["Waymark C"]) < 0.1) {
      const [[targetPlayer]] = allPlayers
        .map(
          (p) =>
            [p, distanceTo(p.position, P12SP2Waymarks["Waymark D"])] as const
        )
        .sort(([, d1], [, d2]) => d1 - d2);
      console.log({ from: "C", targetPlayer });
      if (
        state.fireTargets2.includes(player.designation) ===
        state.fireTargets2.includes(targetPlayer.designation)
      ) {
        return P12SP2Waymarks["Waymark B"].translate(-0.02, 0);
      } else {
        return P12SP2Waymarks["Waymark D"].translate(0.02, 0);
      }
    }
  }
  return player.position;
};
