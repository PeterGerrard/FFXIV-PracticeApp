import {
  InterCardinal,
  distanceTo,
  Position,
  Cast,
  GameLoop2,
} from "../../gameState";
import { LetterOfTheLawState, LetterOfTheLawPlayer } from "../gameState";
import {
  DismissalOverrulingState,
  dismissalOverruling,
} from "../DismissalOverruling";
import { TwofoldArena } from "./TwofoldArena";

export type TwofoldRevelationState = LetterOfTheLawState & {
  bossColour: null;
} & (
    | {
        cast: null;
        darkAddLocation: InterCardinal;
        lightAddLocation: InterCardinal;
      }
    | {
        darkAddLocation: InterCardinal;
        lightAddLocation: InterCardinal;
        cast: Cast;
        tankPosition: Position;
        nonTankPosition: Position;
        stage: "Inner";
      }
    | {
        cast: Cast;
        tankPosition: Position;
        nonTankPosition: Position;
        stage: "Space1" | "Outer" | "Space2";
      }
  );

export const towerPos = (inter: InterCardinal): Position => {
  switch (inter) {
    case "North East":
      return [0.69, 0.31];
    case "South East":
      return [0.69, 0.69];
    case "South West":
      return [0.31, 0.69];
    case "North West":
      return [0.32, 0.31];
  }
};

export const twofoldRevelation: GameLoop2<
  LetterOfTheLawPlayer,
  TwofoldRevelationState,
  DismissalOverrulingState
> = {
  arena: (player, _, isDead, gameState, moveTo, animationEnd) => (
    <TwofoldArena
      animationEnd={animationEnd}
      gameState={gameState}
      isDead={isDead}
      moveTo={moveTo}
      player={player}
    />
  ),
  getSafeSpot: (
    gameState: TwofoldRevelationState,
    player: LetterOfTheLawPlayer
  ) => {
    if (gameState.cast && gameState.stage === "Inner") {
      return [0.55, 0.45];
    }
    if (player.isTethered && player.role === "Tank") {
      return [0.5, 0.5];
    } else {
      return [0.4, 0.8];
    }
  },
  isSafe: (gameState: TwofoldRevelationState, player: LetterOfTheLawPlayer) => {
    if (
      !gameState.cast ||
      gameState.cast.value < 100 ||
      gameState.stage === "Space1" ||
      gameState.stage === "Space2"
    ) {
      return true;
    }
    if (gameState.stage === "Inner") {
      if (player.isTethered && player.role === "Tank") {
        return player.position[1] <= 0.55;
      } else {
        return distanceTo(player.position, [0.5, 0.5]) > 0.275;
      }
    }
    if (gameState.stage === "Outer") {
      return (
        distanceTo(player.position, gameState.tankPosition) < 0.175 &&
        distanceTo(player.position, gameState.nonTankPosition) > 0.225
      );
    }
    return true;
  },
  nextState: (s, player): TwofoldRevelationState => {
    if (s.cast === null) {
      return {
        ...s,
        cast: {
          name: "Twofold Revelation",
          value: 100,
        },
        tankPosition:
          player.isTethered && player.role === "Tank"
            ? player.position
            : [0.5, 0.5],
        nonTankPosition:
          player.isTethered && player.role !== "Tank"
            ? player.position
            : [0.3, 0.7],
        stage: "Inner",
        hasFinished: false,
      };
    }
    if (s.stage === "Inner") {
      return {
        ...s,
        stage: "Space1",
      };
    }
    if (s.stage === "Space1") {
      return {
        ...s,
        stage: "Outer",
      };
    }
    if (s.stage === "Outer") {
      return {
        ...s,
        stage: "Space2",
        hasFinished: true,
      };
    }
    return s;
  },
  nextLoop: dismissalOverruling,
};
