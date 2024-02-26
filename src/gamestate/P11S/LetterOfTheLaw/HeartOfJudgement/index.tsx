import { InterCardinal, rotation } from "../../../gameState";
import { LetterOfTheLawState, LetterOfTheLawPlayer } from "../gameState";
import { DangerPuddle, survivePuddles } from "../../../Mechanics/DangerPuddles";
import { Point } from "@flatten-js/core";
import { Marker3, MarkerA } from "../../p11sMarkers";

const addLoc = (inter: InterCardinal, offset?: number): Point => {
  const o = offset ? offset / Math.sqrt(2) : 0;
  switch (inter) {
    case "North East":
      return new Point(0.9 + o, 0.1 + o);
    case "South East":
      return new Point(0.9 + o, 0.9 - o);
    case "South West":
      return new Point(0.1 + o, 0.9 + o);
    case "North West":
      return new Point(0.1 + o, 0.1 - o);
  }
};

export const getDangerPuddles = (
  state: HeartOfJudgementState,
): DangerPuddle[] => {
  const innerBox =
    state.bossColour === "Dark"
      ? state.darkBoxLocation
      : state.lightBoxLocation;
  const outerBox =
    state.bossColour === "Dark"
      ? state.lightBoxLocation
      : state.darkBoxLocation;
  if (state.stage === "Final") {
    const bombLocations: Point[] =
      state.bossColour === state.topBomb
        ? [new Point(0.5, 0.2), new Point(0.5, 0.8)]
        : [new Point(0.2, 0.5), new Point(0.8, 0.5)];
    const lineAoes: DangerPuddle[] = [
      {
        type: "line",
        angle: rotation(innerBox),
        source: addLoc(innerBox),
        width: 0.475,
        colour: state.bossColour === "Dark" ? "purple" : "yellow",
        split: false,
        damage: 1,
        roleRequirement: null,
        debuffRequirement: null,
        instaKill: null,
      },
      {
        type: "line",
        angle: rotation(outerBox),
        source: addLoc(outerBox, -0.36875),
        width: 0.2625,
        colour: state.bossColour === "Dark" ? "purple" : "yellow",
        split: false,
        damage: 1,
        roleRequirement: null,
        debuffRequirement: null,
        instaKill: null,
      },
      {
        type: "line",
        angle: rotation(outerBox),
        source: addLoc(outerBox, 0.36875),
        width: 0.2625,
        colour: state.bossColour === "Dark" ? "purple" : "yellow",
        split: false,
        damage: 1,
        roleRequirement: null,
        debuffRequirement: null,
        instaKill: null,
      },
    ];
    return lineAoes.concat(
      bombLocations.map<DangerPuddle>((b) => ({
        type: "circle",
        source: b,
        colour: state.bossColour === "Dark" ? "purple" : "yellow",
        radius: 0.4,
        split: false,
        damage: 1,
        roleRequirement: null,
        debuffRequirement: null,
        instaKill: null,
      }))
    );
  }
  return [];
};

export type HeartOfJudgementState = LetterOfTheLawState & {
  bossColour: "Dark" | "Light";
  topBomb: "Dark" | "Light";
  darkAddLocation: InterCardinal;
  lightAddLocation: InterCardinal;
  darkBoxLocation: InterCardinal;
  lightBoxLocation: InterCardinal;
  stage: "Initial" | "Mid" | "Final";
};

export const getTargetSpot = (
  gameState: HeartOfJudgementState,
  player: LetterOfTheLawPlayer
) => {
  if (gameState.stage === "Initial") {
    return player.isTethered && player.role === "Tank" ? MarkerA : Marker3;
  }
  const innerBox =
    gameState.bossColour === "Dark"
      ? gameState.darkBoxLocation
      : gameState.lightBoxLocation;
  if (gameState.topBomb === gameState.bossColour) {
    if (player.isTethered && player.role === "Tank") {
      return new Point(
        0.85,
        innerBox === "North West" || innerBox === "South East" ? 0.45 : 0.55
      );
    } else {
      return new Point(
        0.15,
        innerBox === "North West" || innerBox === "South East" ? 0.55 : 0.45
      );
    }
  } else {
    if (player.isTethered && player.role === "Tank") {
      return new Point(
        innerBox === "North West" || innerBox === "South East" ? 0.55 : 0.45,
        0.15
      );
    } else {
      return new Point(
        innerBox === "North West" || innerBox === "South East" ? 0.45 : 0.55,
        0.85
      );
    }
  }
};
export const applyDamage = (
  gameState: HeartOfJudgementState,
  players: LetterOfTheLawPlayer[]
): LetterOfTheLawPlayer[] => {
  const survivingPlayers = survivePuddles(
    getDangerPuddles(gameState),
    players
  );
  return players.map((p) => ({
    ...p,
    alive: survivingPlayers.includes(p.designation),
  }));
};
export const progress = (s: HeartOfJudgementState): HeartOfJudgementState => {
  if (s.stage === "Initial") {
    return {
      ...s,
      cast: {
        name: "Heart of Judgment",
        value: 50,
      },
      stage: "Mid",
    };
  }
  if (s.stage === "Mid") {
    return {
      ...s,
      cast: {
        name: "Heart of Judgment",
        value: 100,
      },
      hasFinished: true,
      stage: "Final",
    };
  }
  return s;
};
