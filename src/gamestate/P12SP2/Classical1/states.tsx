import { Point, point, vector } from "@flatten-js/core";
import { Debuff, Player } from "../../Player";
import { Designation, Designations } from "../../gameState";
import { pickOne, shuffle } from "../../helpers";
import alphaSrc from "../assets/alpha.png";
import betaSrc from "../assets/beta.png";
import { DiePosition, validDiePositions } from "./validDiePositions";
import { P12SP2Waymarks } from "../P12SP2Arena";
import { EmptyMechanic, Mechanic, composeMechanics } from "../../mechanics";
import { circleMechanic } from "../../Mechanics/CircleAoE";
import {
  SimpleHeavyDamageProfile,
  SimpleKillProfile,
} from "../../Mechanics/DangerPuddles";
import { coneMechanic } from "../../Mechanics/ConeAoE";

const AlphaDebuff: Debuff = {
  name: "Alpha",
  src: alphaSrc,
};
const BetaDebuff: Debuff = {
  name: "Beta",
  src: betaSrc,
};

type InitialState = {
  stage: "Initial";
  crossPair: [Designation, Designation];
  squarePair: [Designation, Designation];
  circlePair: [Designation, Designation];
  trianglePair: [Designation, Designation];
  die1: DiePosition;
  die2: DiePosition;
  die3: DiePosition;
  die4: DiePosition;
};

type TetherMoveState = Omit<InitialState, "stage"> & {
  stage: "TetherMove";
};

type TetherAttachState = Omit<InitialState, "stage"> & {
  stage: "TetherAttach";
  cube1Attach: Designation | null;
  pyramid1Attach: Designation | null;
  cube2Attach: Designation | null;
  pyramid2Attach: Designation | null;
  cube3Attach: Designation | null;
  pyramid3Attach: Designation | null;
  cube4Attach: Designation | null;
  pyramid4Attach: Designation | null;
};

type DodgePuddles = Omit<InitialState, "stage"> & {
  stage: "DodgePuddles";
};

type Bait = Omit<InitialState, "stage"> & {
  stage: "Bait";
};

type BaitHit = Omit<InitialState, "stage"> & {
  stage: "BaitHit";
  bait1Targets: Point[];
  bait2Targets: Point[];
};

type FinalDodge = Omit<InitialState, "stage"> & {
  stage: "FinalDodge";
  bait1Targets: Point[];
  bait2Targets: Point[];
};

export type Classical1GameState =
  | InitialState
  | TetherMoveState
  | TetherAttachState
  | DodgePuddles
  | Bait
  | BaitHit
  | FinalDodge;

const toDisplayPos = (gridPos: Point): Point =>
  point(gridPos.x * 0.2 + 0.2, gridPos.y * 0.2 + 0.35);

const toDice = (state: DiePosition): DiePosition => {
  return {
    pos: toDisplayPos(state.pos),
    pyramidPos: toDisplayPos(state.pyramidPos),
    squarePos: toDisplayPos(state.squarePos),
  };
};

const getRandomDies = (): readonly [
  DiePosition,
  DiePosition,
  DiePosition,
  DiePosition,
] => {
  const dieState = pickOne(validDiePositions);

  return dieState.map(toDice) as [
    DiePosition,
    DiePosition,
    DiePosition,
    DiePosition,
  ];
};

export const createInitialState = (): Classical1GameState => {
  const shuffledDesignation = shuffle(Designations);
  const dies = getRandomDies();
  return {
    stage: "Initial",
    crossPair: [shuffledDesignation[0], shuffledDesignation[1]],
    squarePair: [shuffledDesignation[2], shuffledDesignation[3]],
    circlePair: [shuffledDesignation[4], shuffledDesignation[5]],
    trianglePair: [shuffledDesignation[6], shuffledDesignation[7]],
    die1: dies[0],
    die2: dies[1],
    die3: dies[2],
    die4: dies[3],
  };
};

const bait1Source = P12SP2Waymarks["Waymark 3"];
const bait2Source = P12SP2Waymarks["Waymark 4"];

export const getMechanic = (state: Classical1GameState): Mechanic<Player> => {
  if (state.stage === "DodgePuddles") {
    const points: Point[] = [0, 1, 2, 3].flatMap((x) =>
      [0, 1, 2].map((y) => toDisplayPos(point(x, y)))
    );
    return composeMechanics(
      points.map((p) => circleMechanic(p, 0.1, SimpleKillProfile))
    );
  }
  if (state.stage === "BaitHit" || state.stage === "FinalDodge") {
    const profile =
      state.stage === "BaitHit" ? SimpleHeavyDamageProfile : SimpleKillProfile;
    const puddles1 = state.bait1Targets.map((p) =>
      coneMechanic(
        bait1Source,
        vector(bait1Source, bait1Source.translate(0, -1)).angleTo(
          vector(bait1Source, p)
        ),
        0.4,
        profile
      )
    );
    const puddles2 = state.bait2Targets.map((p) =>
      coneMechanic(
        bait2Source,
        vector(bait2Source, bait2Source.translate(0, -1)).angleTo(
          vector(bait2Source, p)
        ),
        0.4,
        profile
      )
    );
    return composeMechanics(puddles1.concat(puddles2));
  }
  return EmptyMechanic;
};

const getAttached = (
  tetherSource: Point,
  tetherTarget: Point,
  players: Player[]
): Designation | null => {
  const [tetherDistance] = tetherSource.distanceTo(tetherTarget);
  const angleTolerance = 0.1;

  const interceptions = players
    .map(
      (p) =>
        [
          p.designation,
          tetherSource.distanceTo(p.position)[0],
          vector(tetherSource, tetherTarget).angleTo(
            vector(tetherSource, p.position)
          ),
        ] as const
    )
    .filter(
      ([_, d, a]) =>
        d < tetherDistance &&
        (a < angleTolerance || a > Math.PI * 2 - angleTolerance)
    );
  interceptions.sort((a, b) => a[1] - b[1]);

  if (interceptions.length > 0) {
    return interceptions[0][0];
  }

  return null;
};

export const nextStep = (
  state: Classical1GameState,
  players: Player[]
): Classical1GameState => {
  if (state.stage === "Initial") {
    return {
      ...state,
      stage: "TetherMove",
    };
  }
  if (state.stage === "TetherMove") {
    return {
      ...state,
      stage: "TetherAttach",
      cube1Attach: getAttached(state.die1.squarePos, state.die1.pos, players),
      cube2Attach: getAttached(state.die2.squarePos, state.die2.pos, players),
      cube3Attach: getAttached(state.die3.squarePos, state.die3.pos, players),
      cube4Attach: getAttached(state.die4.squarePos, state.die4.pos, players),
      pyramid1Attach: getAttached(
        state.die1.pyramidPos,
        state.die1.pos,
        players
      ),
      pyramid2Attach: getAttached(
        state.die2.pyramidPos,
        state.die2.pos,
        players
      ),
      pyramid3Attach: getAttached(
        state.die3.pyramidPos,
        state.die3.pos,
        players
      ),
      pyramid4Attach: getAttached(
        state.die4.pyramidPos,
        state.die4.pos,
        players
      ),
    };
  }
  if (state.stage === "TetherAttach") {
    return {
      ...state,
      stage: "DodgePuddles",
    };
  }
  if (state.stage === "DodgePuddles") {
    return {
      ...state,
      stage: "Bait",
    };
  }
  if (state.stage === "Bait") {
    const playerPositions = players.map((p) => p.position);
    return {
      ...state,
      stage: "BaitHit",
      bait1Targets: playerPositions
        .sort(
          (p1, p2) =>
            p1.distanceTo(bait1Source)[0] - p2.distanceTo(bait1Source)[0]
        )
        .slice(0, 4),
      bait2Targets: playerPositions
        .sort(
          (p1, p2) =>
            p1.distanceTo(bait2Source)[0] - p2.distanceTo(bait2Source)[0]
        )
        .slice(0, 4),
    };
  }
  if (state.stage === "BaitHit") {
    return {
      ...state,
      stage: "FinalDodge",
    };
  }
  return state;
};

export const getDebuffs = (state: Classical1GameState, player: Player) => [
  [
    state.crossPair[0],
    state.squarePair[0],
    state.circlePair[0],
    state.trianglePair[0],
  ].includes(player.designation)
    ? AlphaDebuff
    : BetaDebuff,
];

export const getTargetSpot = (
  state: Classical1GameState,
  _players: Player[],
  player: Player
): Point => {
  if (state.stage === "Initial" || state.stage === "TetherMove") {
    if (state.crossPair.includes(player.designation)) {
      return state.die1.pos.translate(
        vector(
          state.die1.pos,
          player.debuffs.some((d) => d.name === AlphaDebuff.name)
            ? state.die1.pyramidPos
            : state.die1.squarePos
        ).scale(0.1, 0.1)
      );
    }
    if (state.squarePair.includes(player.designation)) {
      return state.die2.pos.translate(
        vector(
          state.die2.pos,
          player.debuffs.some((d) => d.name === AlphaDebuff.name)
            ? state.die2.pyramidPos
            : state.die2.squarePos
        ).scale(0.1, 0.1)
      );
    }
    if (state.circlePair.includes(player.designation)) {
      return state.die3.pos.translate(
        vector(
          state.die3.pos,
          player.debuffs.some((d) => d.name === AlphaDebuff.name)
            ? state.die3.pyramidPos
            : state.die3.squarePos
        ).scale(0.1, 0.1)
      );
    }
    if (state.trianglePair.includes(player.designation)) {
      return state.die4.pos.translate(
        vector(
          state.die4.pos,
          player.debuffs.some((d) => d.name === AlphaDebuff.name)
            ? state.die4.pyramidPos
            : state.die4.squarePos
        ).scale(0.1, 0.1)
      );
    }
  }
  if (state.stage === "TetherAttach") {
    let x = 0;
    let y = 0;
    if (
      state.crossPair.includes(player.designation) ||
      state.squarePair.includes(player.designation)
    ) {
      x = 0.3;
    } else {
      x = 0.7;
    }
    if (player.debuffs.some((d) => d.name === AlphaDebuff.name)) {
      y = 0.45;
    } else {
      y = 0.65;
    }
    return point(x, y);
  }
  if (state.stage === "DodgePuddles") {
    let x = 0;
    let y = 0;
    if (state.crossPair.includes(player.designation)) {
      x = bait1Source.x - 0.03;
    } else if (state.squarePair.includes(player.designation)) {
      x = bait1Source.x + 0.03;
    } else if (state.circlePair.includes(player.designation)) {
      x = bait2Source.x - 0.03;
    } else {
      x = bait2Source.x + 0.03;
    }
    if (player.debuffs.some((d) => d.name === AlphaDebuff.name)) {
      y = bait1Source.y - 0.03;
    } else {
      y = bait1Source.y + 0.03;
    }
    return point(x, y);
  }
  if (state.stage === "BaitHit") {
    let x = 0;
    let y = 0;
    if (
      state.crossPair.includes(player.designation) ||
      state.squarePair.includes(player.designation)
    ) {
      x = 0.3;
    } else {
      x = 0.7;
    }
    if (player.debuffs.some((d) => d.name === AlphaDebuff.name)) {
      y = 0.4;
    } else {
      y = 0.6;
    }
    return point(x, y);
  }

  return player.position;
};
