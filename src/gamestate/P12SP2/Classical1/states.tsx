import { Point, point } from "@flatten-js/core";
import { DangerPuddle } from "../../Mechanics/DangerPuddles";
import { Player } from "../../Player";
import { Cardinal, Designation, Designations } from "../../gameState";
import { pickOne, shuffle } from "../../helpers";

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

export type Classical1GameState = InitialState;

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

const toDice = (state: DieState): DiePosition => {
  const [pyramidDir, squareDir] = shuffle([state.dir1, state.dir2]);
  return {
    pos: state.pos,
    pyramidPos: offsetGrid(state.pos, pyramidDir),
    squarePos: offsetGrid(state.pos, squareDir),
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

export const nextStep = (state: Classical1GameState): Classical1GameState => {
  if (state.stage === "Initial") {
  }
  return state;
};

export const getTargetSpot = (
  state: Classical1GameState,
  player: Player
): Point => {
  if (state.stage === "Initial") {
  }

  return player.position;
};
