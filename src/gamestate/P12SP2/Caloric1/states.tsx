import { Point } from "@flatten-js/core";
import { DangerPuddle } from "../../Mechanics/DangerPuddles";
import { Player } from "../../Player";

type InitialState = {
  stage: "Initial";
};

export type Caloric1GameState = InitialState;

export const createInitialState = (): Caloric1GameState => {
  return {
    stage: "Initial",
  };
};

export const getDangerPuddles = (
  _state: Caloric1GameState,
  _players: Player[]
): DangerPuddle[] => {
  return [];
};

export const nextStep = (
  state: Caloric1GameState,
  _players: Player[]
): Caloric1GameState => {
  return state;
};

export const getDebuffs = (_state: Caloric1GameState, _player: Player) => [];

export const getTargetSpot = (
  _state: Caloric1GameState,
  player: Player
): Point => {
  return player.position;
};
