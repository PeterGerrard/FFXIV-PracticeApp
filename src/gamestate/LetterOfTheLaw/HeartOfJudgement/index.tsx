import { Position } from "../..";
import { InterCardinal, distanceTo, GameLoop3 } from "../../gameState";
import { LetterOfTheLawState, LetterOfTheLawPlayer } from "../gameState";
import {
  TwofoldRevelationState,
  twofoldRevelation,
} from "../Twofold Revelation";
import { DismissalOverrulingState } from "../DismissalOverruling";
import { HeartArena } from "./HeartArena";

export type HeartOfJudgementState = LetterOfTheLawState & {
  bossColour: "Dark" | "Light";
  topBomb: "Dark" | "Light";
  darkAddLocation: InterCardinal;
  lightAddLocation: InterCardinal;
  darkBoxLocation: InterCardinal;
  lightBoxLocation: InterCardinal;
};
export const heartOfJudgement: GameLoop3<
  LetterOfTheLawPlayer,
  HeartOfJudgementState,
  TwofoldRevelationState,
  DismissalOverrulingState
> = {
  arena: (player, _, isDead, gameState, moveTo, animationEnd) => {
    return (
      <HeartArena
        animationEnd={animationEnd}
        gameState={gameState}
        isDead={isDead}
        moveTo={moveTo}
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
        return [
          0.83,
          innerBox === "North West" || innerBox === "South East" ? 0.4 : 0.6,
        ];
      } else {
        return [
          0.17,
          innerBox === "North West" || innerBox === "South East" ? 0.6 : 0.4,
        ];
      }
    } else {
      if (player.isTethered && player.role === "Tank") {
        return [
          innerBox === "North West" || innerBox === "South East" ? 0.6 : 0.4,
          0.17,
        ];
      } else {
        return [
          innerBox === "North West" || innerBox === "South East" ? 0.4 : 0.6,
          0.83,
        ];
      }
    }
  },
  isSafe: (gameState: HeartOfJudgementState, player: LetterOfTheLawPlayer) => {
    if (!gameState.cast || gameState.cast.value < 100) {
      return true;
    }
    const bombs: Position[] =
      gameState.bossColour == gameState.topBomb
        ? [
            [0.5, 0.2],
            [0.5, 0.8],
          ]
        : [
            [0.2, 0.5],
            [0.8, 0.5],
          ];
    const innerBox =
      gameState.bossColour === "Dark"
        ? gameState.darkBoxLocation
        : gameState.lightBoxLocation;
    const outerBox =
      gameState.bossColour === "Dark"
        ? gameState.lightBoxLocation
        : gameState.darkBoxLocation;
    const hitByBomb = bombs.some((b) => distanceTo(player.position, b) < 0.35);
    const hitByInner =
      innerBox === "North West" || innerBox === "South East"
        ? player.position[0] + player.position[1] < 0.668 ||
          player.position[0] + player.position[1] > 1.332
        : player.position[1] - player.position[0] < -0.332 ||
          player.position[1] - player.position[0] > 0.332;
    const hitByOuter =
      outerBox === "North West" || outerBox === "South East"
        ? player.position[0] + player.position[1] > 0.668 &&
          player.position[0] + player.position[1] < 1.332
        : player.position[1] - player.position[0] > -0.332 &&
          player.position[1] - player.position[0] < 0.332;
    return !hitByBomb && !hitByInner && !hitByOuter;
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
  nextLoop: twofoldRevelation,
};
