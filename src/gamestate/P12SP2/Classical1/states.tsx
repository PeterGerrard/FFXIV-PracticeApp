import { Point } from "@flatten-js/core";
import { DangerPuddle } from "../../Mechanics/DangerPuddles";
import { Player } from "../../Player";
import { Designation, Designations } from "../../gameState";
import { shuffle } from "../../helpers";

type InitialState = {
  stage: "Initial";
  crossPair: [Designation, Designation];
  squarePair: [Designation, Designation];
  circlePair: [Designation, Designation];
  trianglePair: [Designation, Designation];
};

export type Classical1GameState = InitialState;

export const createInitialState = (): Classical1GameState => {
  const shuffledDesignation = shuffle(Designations);
  return {
    stage: "Initial",
    crossPair: [shuffledDesignation[0], shuffledDesignation[1]],
    squarePair: [shuffledDesignation[2], shuffledDesignation[3]],
    circlePair: [shuffledDesignation[4], shuffledDesignation[5]],
    trianglePair: [shuffledDesignation[6], shuffledDesignation[7]],
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
