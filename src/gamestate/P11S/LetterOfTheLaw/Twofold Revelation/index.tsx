import { Point, point } from "@flatten-js/core";
import { InterCardinal, Cast } from "../../../gameState";
import { LetterOfTheLawState, LetterOfTheLawPlayer } from "../gameState";
import { EmptyMechanic, Mechanic, composeMechanics } from "../../../mechanics";
import { circleMechanic } from "../../../Mechanics/CircleAoE";
import {
  SimpleHeavyDamageProfile,
  SimpleKillProfile,
} from "../../../Mechanics/DangerPuddles";
import { donutMechanic } from "../../../Mechanics/DonutAoE";

export type TwofoldRevelationState = LetterOfTheLawState & {
  bossColour: null;
} & (
    | {
        cast: null;
        darkAddLocation: InterCardinal;
        lightAddLocation: InterCardinal;
        stage: "Initial";
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

export const getTargetSpot = (
  gameState: TwofoldRevelationState,
  players: LetterOfTheLawPlayer[],
  player: LetterOfTheLawPlayer
) => {
  if (gameState.stage === "Initial" || gameState.stage === "Jump") {
    if (player.isTethered && player.role === "Tank") {
      return new Point(0.5, 0.5);
    } else {
      return players.filter((x) => x.isTethered && x.role !== "Tank")[0]
        .position;
    }
  }
  if (gameState.cast) {
    return new Point(0.55, 0.45);
  }
  if (player.isTethered && player.role === "Tank") {
    return new Point(0.5, 0.5);
  }

  return point();
};

export const getMechanic = (
  state: TwofoldRevelationState,
  players: LetterOfTheLawPlayer[]
): Mechanic<LetterOfTheLawPlayer> => {
  if (state.stage === "Jump") {
    return composeMechanics([
      circleMechanic(
        players.filter((p) => p.isTethered && p.role === "Tank")[0].position,
        0.275,
        SimpleHeavyDamageProfile,
        { color: "purple" }
      ),
      circleMechanic(
        players.filter((p) => p.isTethered && p.role !== "Tank")[0].position,
        0.125,
        {
          damage: 5,
          debuffRequirement: null,
          instaKill: null,
          roleRequirement: null,
          split: true,
        },
        { color: "yellow" }
      ),
    ]);
  }

  if (state.stage === "Outer") {
    return composeMechanics([
      donutMechanic(state.tankPosition, 0.2, 0.6, SimpleKillProfile, {
        color: "purple",
      }),
      circleMechanic(state.nonTankPosition, 0.225, SimpleKillProfile, {
        color: "yellow",
      }),
    ]);
  }

  return EmptyMechanic;
};

export const applyDamage = (
  gameState: TwofoldRevelationState,
  players: LetterOfTheLawPlayer[]
): LetterOfTheLawPlayer[] => {
  const damageMap = getMechanic(gameState, players).applyDamage(players);
  return players.map((p) => ({
    ...p,
    alive: p.alive && damageMap[p.designation] < 1,
  }));
};

export const progress = (
  s: TwofoldRevelationState,
  players: LetterOfTheLawPlayer[]
): TwofoldRevelationState => {
  if (s.stage === "Initial") {
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
      stage: "Space1",
      tankPosition: players.filter((x) => x.role === "Tank" && x.isTethered)[0]
        .position,
      nonTankPosition: players.filter(
        (x) => x.role !== "Tank" && x.isTethered
      )[0].position,
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
};
