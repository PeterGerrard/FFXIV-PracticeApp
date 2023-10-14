import { Point, point } from "@flatten-js/core";
import { InterCardinal, Cast, GameLoop, distanceTo } from "../../../gameState";
import { LetterOfTheLawState, LetterOfTheLawPlayer } from "../gameState";
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
        stage: "Jump";
      }
    | {
        cast: Cast;
        tankPosition: Point;
        nonTankPosition: Point;
        stage: "Space1" | "Outer";
      }
  );

export const towerPos = (inter: InterCardinal): Point => {
  switch (inter) {
    case "North East":
      return new Point(0.69, 0.31);
    case "South East":
      return new Point(0.69, 0.69);
    case "South West":
      return new Point(0.31, 0.69);
    case "North West":
      return new Point(0.32, 0.31);
  }
};

export const twofoldRevelation: GameLoop<
  LetterOfTheLawPlayer,
  TwofoldRevelationState
> = {
  arena: (gameState, moveTo, animationEnd) => (
    <TwofoldArena
      animationEnd={animationEnd}
      gameState={gameState}
      moveTo={moveTo}
      dangerPuddles={[]}
      players={gameState.players}
    />
  ),
  getSafeSpot: (
    gameState: TwofoldRevelationState,
    player: LetterOfTheLawPlayer
  ) => {
    if (
      gameState.cast &&
      (gameState.stage === "Jump" || gameState.stage === "Space1")
    ) {
      if (player.isTethered && player.role === "Tank") {
        return new Point(0.5, 0.5);
      } else {
        return gameState.players.filter(
          (x) => x.isTethered && x.role !== "Tank"
        )[0].position;
      }
    }
    if (gameState.cast) {
      return new Point(0.55, 0.45);
    }
    if (player.isTethered && player.role === "Tank") {
      return new Point(0.5, 0.5);
    } else {
      return gameState.cast === null ? point() : new Point(0.4, 0.8);
    }
  },
  applyDamage: (gameState: TwofoldRevelationState): TwofoldRevelationState => {
    if (
      !gameState.cast ||
      gameState.cast.value < 100 ||
      gameState.stage === "Space1"
    ) {
      return gameState;
    }
    if (gameState.stage === "Jump") {
      return {
        ...gameState,
        players: gameState.players.map((p) => {
          let alive = true;
          if (p.isTethered && p.role === "Tank") {
            alive =
              distanceTo(
                p.position,
                gameState.players.filter(
                  (x) => x.isTethered && x.role !== "Tank"
                )[0].position
              ) > 0.25;
          } else {
            alive =
              distanceTo(
                p.position,
                gameState.players.filter(
                  (x) => x.isTethered && x.role === "Tank"
                )[0].position
              ) > 0.275 &&
              distanceTo(
                p.position,
                gameState.players.filter(
                  (x) => x.isTethered && x.role !== "Tank"
                )[0].position
              ) < 0.15;
          }
          return {
            ...p,
            alive: alive,
          };
        }),
      };
    }
    if (gameState.stage === "Outer") {
      return {
        ...gameState,
        players: gameState.players.map((p) => {
          return {
            ...p,
            alive:
              distanceTo(p.position, gameState.tankPosition) < 0.175 &&
              distanceTo(p.position, gameState.nonTankPosition) > 0.225,
          };
        }),
      };
    }
    return gameState;
  },
  nextState: (s): TwofoldRevelationState => {
    if (!s.cast) {
      return {
        ...s,
        cast: {
          name: "Twofold Revelation",
          value: 100,
        },
        stage: "Jump",
      };
    }
    if (s.stage === "Jump") {
      return {
        ...s,
        tankPosition: s.players.filter(
          (x) => x.role === "Tank" && x.isTethered
        )[0].position,
        nonTankPosition: s.players.filter(
          (x) => x.role !== "Tank" && x.isTethered
        )[0].position,
        stage: "Space1",
      };
    }
    if (s.stage === "Space1") {
      return {
        ...s,
        stage: "Outer",
        hasFinished: true,
      };
    }
    return s;
  },
};
