import {
  InterCardinal,
  distanceTo,
  GameLoop,
  rotation,
} from "../../../gameState";
import { LetterOfTheLawState, LetterOfTheLawPlayer } from "../gameState";
import { HeartArena } from "./HeartArena";
import { DangerPuddle, survivePuddles } from "../../../Mechanics/DangerPuddles";
import { Point } from "@flatten-js/core";

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
  state: HeartOfJudgementState
): DangerPuddle[] => {
  const innerBox =
    state.bossColour === "Dark"
      ? state.darkBoxLocation
      : state.lightBoxLocation;
  const outerBox =
    state.bossColour === "Dark"
      ? state.lightBoxLocation
      : state.darkBoxLocation;
  if (state.cast && state.cast.value >= 100) {
    return [
      {
        type: "line",
        angle: 180 + rotation(innerBox),
        onAnimationEnd: () => {},
        source: addLoc(innerBox),
        width: 0.475,
        colour: state.bossColour === "Dark" ? "purple" : "yellow",
        survivable: 0,
        roleRequirement: null,
      },
      {
        type: "line",
        angle: 180 + rotation(outerBox),
        onAnimationEnd: () => {},
        source: addLoc(outerBox, -0.36875),
        width: 0.2625,
        colour: state.bossColour === "Dark" ? "purple" : "yellow",
        survivable: 0,
        roleRequirement: null,
      },
      {
        type: "line",
        angle: 180 + rotation(outerBox),
        onAnimationEnd: () => {},
        source: addLoc(outerBox, 0.36875),
        width: 0.2625,
        colour: state.bossColour === "Dark" ? "purple" : "yellow",
        survivable: 0,
        roleRequirement: null,
      },
    ];
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
};
export const heartOfJudgement: GameLoop<
  LetterOfTheLawPlayer,
  HeartOfJudgementState
> = {
  arena: (player, _, isDead, gameState, moveTo, animationEnd) => {
    return (
      <HeartArena
        animationEnd={animationEnd}
        gameState={gameState}
        isDead={isDead}
        moveTo={moveTo}
        dangerPuddles={getDangerPuddles(gameState)}
        player={player}
      />
    );
  },
  getSafeSpot: (
    gameState: HeartOfJudgementState,
    player: LetterOfTheLawPlayer
  ) => {
    const innerBox =
      gameState.bossColour === "Dark"
        ? gameState.darkBoxLocation
        : gameState.lightBoxLocation;
    if (gameState.topBomb === gameState.bossColour) {
      if (player.isTethered && player.role === "Tank") {
        return new Point(
          0.83,
          innerBox === "North West" || innerBox === "South East" ? 0.4 : 0.6
        );
      } else {
        return new Point(
          0.17,
          innerBox === "North West" || innerBox === "South East" ? 0.6 : 0.4
        );
      }
    } else {
      if (player.isTethered && player.role === "Tank") {
        return new Point(
          innerBox === "North West" || innerBox === "South East" ? 0.6 : 0.4,
          0.17
        );
      } else {
        return new Point(
          innerBox === "North West" || innerBox === "South East" ? 0.4 : 0.6,
          0.83
        );
      }
    }
  },
  isSafe: (gameState: HeartOfJudgementState, player: LetterOfTheLawPlayer) => {
    if (!gameState.cast || gameState.cast.value < 100) {
      return true;
    }
    const bombs: Point[] =
      gameState.bossColour == gameState.topBomb
        ? [new Point(0.5, 0.2), new Point(0.5, 0.8)]
        : [new Point(0.2, 0.5), new Point(0.8, 0.5)];
    const hitByBomb = bombs.some((b) => distanceTo(player.position, b) < 0.35);
    const safeFromDangerPuddles = survivePuddles(
      getDangerPuddles(gameState),
      player
    );
    return !hitByBomb && safeFromDangerPuddles;
  },
  nextState: (s) => {
    if (s.cast === null) {
      return {
        ...s,
        cast: {
          name: "Heart of Judgment",
          value: 50,
        },
      };
    }
    if (s.cast.value < 100) {
      return {
        ...s,
        cast: {
          ...s.cast,
          value: 100,
        },
        hasFinished: true,
      };
    }
    return s;
  },
};
