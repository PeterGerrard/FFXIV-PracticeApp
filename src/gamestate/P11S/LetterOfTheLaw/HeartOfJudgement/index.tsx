import { InterCardinal, rotation } from "../../../gameState";
import { LetterOfTheLawState, LetterOfTheLawPlayer } from "../gameState";
import { Point } from "@flatten-js/core";
import { Marker3, MarkerA } from "../../p11sMarkers";
import { emptyMechanic, Mechanic, composeMechanics } from "../../../mechanics";
import { lineMechanic } from "../../../Mechanics/LineAoE";
import { SimpleKillProfile } from "../../../Mechanics/DangerPuddles";
import { circleMechanic } from "../../../Mechanics/CircleAoE";

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

export const getMechanic = (
  state: HeartOfJudgementState
): Mechanic<LetterOfTheLawPlayer> => {
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
    const lineAoes: Mechanic<LetterOfTheLawPlayer>[] = [
      lineMechanic(
        addLoc(innerBox),
        rotation(innerBox),
        0.475,
        SimpleKillProfile,
        { color: state.bossColour === "Dark" ? "purple" : "yellow" }
      ),
      lineMechanic(
        addLoc(outerBox, -0.36875),
        rotation(outerBox),
        0.2625,
        SimpleKillProfile,
        { color: state.bossColour === "Dark" ? "purple" : "yellow" }
      ),
      lineMechanic(
        addLoc(outerBox, 0.36875),
        rotation(outerBox),
        0.2625,
        SimpleKillProfile,
        { color: state.bossColour === "Dark" ? "purple" : "yellow" }
      ),
    ];
    return composeMechanics(
      lineAoes.concat(
        bombLocations.map<Mechanic<LetterOfTheLawPlayer>>((b) =>
          circleMechanic(b, 0.4, SimpleKillProfile, {
            color: state.bossColour === "Dark" ? "purple" : "yellow",
          })
        )
      )
    );
  }
  return emptyMechanic();
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
  const damageMap = getMechanic(gameState).applyDamage(players);
  return players.map((p) => ({
    ...p,
    alive: damageMap[p.designation] < 1,
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
