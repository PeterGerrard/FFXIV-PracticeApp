import { Point, point, vector } from "@flatten-js/core";
import { DangerPuddle } from "../../Mechanics/DangerPuddles";
import { Debuff, Player } from "../../Player";
import { Cardinal, Designation, Designations } from "../../gameState";
import { pickOne, shuffle } from "../../helpers";
import alphaSrc from "../assets/alpha.png";
import betaSrc from "../assets/beta.png";

const AlphaDebuff: Debuff = {
  name: "Alpha",
  src: alphaSrc,
};
const BetaDebuff: Debuff = {
  name: "Beta",
  src: betaSrc,
};

type DiePosition = {
  pos: Point;
  squarePos: Point;
  pyramidPos: Point;
};

type DieState = {
  pos: Point;
  dir1: Cardinal;
  dir2: Cardinal;
};
const validDieStates: [DieState, DieState, DieState, DieState][] = [
  [
    { pos: point(0, 0), dir1: "East", dir2: "South" },
    { pos: point(1, 2), dir1: "West", dir2: "North" },
    { pos: point(2, 0), dir1: "East", dir2: "South" },
    { pos: point(3, 2), dir1: "West", dir2: "North" },
  ],
  [
    { pos: point(0, 0), dir1: "East", dir2: "South" },
    { pos: point(1, 2), dir1: "West", dir2: "North" },
    { pos: point(2, 1), dir1: "North", dir2: "South" },
    { pos: point(3, 1), dir1: "North", dir2: "South" },
  ],
  [
    { pos: point(0, 0), dir1: "East", dir2: "South" },
    { pos: point(1, 2), dir1: "West", dir2: "North" },
    { pos: point(2, 2), dir1: "North", dir2: "East" },
    { pos: point(3, 0), dir1: "South", dir2: "West" },
  ],
  [
    { pos: point(0, 0), dir1: "East", dir2: "South" },
    { pos: point(1, 2), dir1: "West", dir2: "East" },
    { pos: point(2, 1), dir1: "North", dir2: "West" },
    { pos: point(3, 1), dir1: "North", dir2: "South" },
  ],
  [
    { pos: point(0, 1), dir1: "North", dir2: "East" },
    { pos: point(1, 2), dir1: "West", dir2: "East" },
    { pos: point(2, 0), dir1: "South", dir2: "West" },
    { pos: point(3, 1), dir1: "North", dir2: "South" },
  ],
  [
    { pos: point(0, 1), dir1: "North", dir2: "East" },
    { pos: point(1, 2), dir1: "West", dir2: "East" },
    { pos: point(2, 0), dir1: "East", dir2: "West" },
    { pos: point(3, 1), dir1: "West", dir2: "South" },
  ],
  [
    { pos: point(0, 1), dir1: "North", dir2: "South" },
    { pos: point(1, 0), dir1: "East", dir2: "South" },
    { pos: point(2, 2), dir1: "North", dir2: "West" },
    { pos: point(3, 1), dir1: "North", dir2: "South" },
  ],
  [
    { pos: point(0, 1), dir1: "North", dir2: "South" },
    { pos: point(1, 0), dir1: "East", dir2: "South" },
    { pos: point(2, 2), dir1: "East", dir2: "West" },
    { pos: point(3, 1), dir1: "North", dir2: "West" },
  ],
  [
    { pos: point(0, 1), dir1: "North", dir2: "South" },
    { pos: point(1, 1), dir1: "North", dir2: "East" },
    { pos: point(2, 2), dir1: "East", dir2: "West" },
    { pos: point(3, 0), dir1: "South", dir2: "West" },
  ],
  [
    { pos: point(0, 1), dir1: "North", dir2: "South" },
    { pos: point(1, 1), dir1: "North", dir2: "South" },
    { pos: point(2, 0), dir1: "South", dir2: "East" },
    { pos: point(3, 2), dir1: "North", dir2: "West" },
  ],
  [
    { pos: point(0, 1), dir1: "North", dir2: "South" },
    { pos: point(1, 1), dir1: "North", dir2: "South" },
    { pos: point(2, 1), dir1: "South", dir2: "North" },
    { pos: point(3, 1), dir1: "North", dir2: "South" },
  ],
  [
    { pos: point(0, 1), dir1: "North", dir2: "South" },
    { pos: point(1, 1), dir1: "North", dir2: "South" },
    { pos: point(2, 2), dir1: "North", dir2: "East" },
    { pos: point(3, 0), dir1: "South", dir2: "West" },
  ],
  [
    { pos: point(0, 1), dir1: "North", dir2: "South" },
    { pos: point(1, 1), dir1: "East", dir2: "South" },
    { pos: point(2, 0), dir1: "West", dir2: "East" },
    { pos: point(3, 2), dir1: "North", dir2: "West" },
  ],
  [
    { pos: point(0, 1), dir1: "North", dir2: "South" },
    { pos: point(1, 2), dir1: "East", dir2: "North" },
    { pos: point(2, 0), dir1: "South", dir2: "West" },
    { pos: point(3, 1), dir1: "North", dir2: "South" },
  ],
  [
    { pos: point(0, 1), dir1: "North", dir2: "South" },
    { pos: point(1, 2), dir1: "East", dir2: "North" },
    { pos: point(2, 0), dir1: "East", dir2: "West" },
    { pos: point(3, 1), dir1: "South", dir2: "West" },
  ],
  [
    { pos: point(0, 1), dir1: "South", dir2: "East" },
    { pos: point(1, 0), dir1: "West", dir2: "East" },
    { pos: point(2, 2), dir1: "North", dir2: "West" },
    { pos: point(3, 1), dir1: "North", dir2: "South" },
  ],
  [
    { pos: point(0, 1), dir1: "South", dir2: "East" },
    { pos: point(1, 0), dir1: "West", dir2: "East" },
    { pos: point(2, 2), dir1: "East", dir2: "West" },
    { pos: point(3, 1), dir1: "West", dir2: "North" },
  ],
  [
    { pos: point(0, 2), dir1: "East", dir2: "North" },
    { pos: point(1, 0), dir1: "West", dir2: "South" },
    { pos: point(2, 2), dir1: "East", dir2: "North" },
    { pos: point(3, 0), dir1: "West", dir2: "South" },
  ],
  [
    { pos: point(0, 2), dir1: "East", dir2: "North" },
    { pos: point(1, 0), dir1: "West", dir2: "South" },
    { pos: point(2, 1), dir1: "North", dir2: "South" },
    { pos: point(3, 1), dir1: "North", dir2: "South" },
  ],
  [
    { pos: point(0, 2), dir1: "East", dir2: "North" },
    { pos: point(1, 0), dir1: "West", dir2: "South" },
    { pos: point(2, 0), dir1: "South", dir2: "East" },
    { pos: point(3, 2), dir1: "North", dir2: "West" },
  ],
  [
    { pos: point(0, 2), dir1: "East", dir2: "North" },
    { pos: point(1, 0), dir1: "West", dir2: "South" },
    { pos: point(2, 0), dir1: "South", dir2: "East" },
    { pos: point(3, 2), dir1: "North", dir2: "West" },
  ],
  [
    { pos: point(0, 2), dir1: "East", dir2: "North" },
    { pos: point(1, 0), dir1: "West", dir2: "East" },
    { pos: point(2, 1), dir1: "South", dir2: "West" },
    { pos: point(3, 1), dir1: "North", dir2: "South" },
  ],
];

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

export type Classical1GameState =
  | InitialState
  | TetherMoveState
  | TetherAttachState;

const offsetGrid = (p: Point, d: Cardinal) => {
  switch (d) {
    case "North":
      return p.translate(0, -1);
    case "East":
      return p.translate(1, 0);
    case "South":
      return p.translate(0, 1);
    case "West":
      return p.translate(-1, 0);
  }
};

const toDisplayPos = (gridPos: Point): Point =>
  point(gridPos.x * 0.2 + 0.2, gridPos.y * 0.2 + 0.35);

const toDice = (state: DieState): DiePosition => {
  const [pyramidDir, squareDir] = shuffle([state.dir1, state.dir2]);
  return {
    pos: toDisplayPos(state.pos),
    pyramidPos: toDisplayPos(offsetGrid(state.pos, pyramidDir)),
    squarePos: toDisplayPos(offsetGrid(state.pos, squareDir)),
  };
};

const getRandomDies = (): readonly [
  DiePosition,
  DiePosition,
  DiePosition,
  DiePosition,
] => {
  const dieState = pickOne(validDieStates);

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

export const getDangerPuddles = (
  _state: Classical1GameState,
  _players: Player[]
): DangerPuddle[] => {
  return [];
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

  return player.position;
};
