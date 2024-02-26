import { Point, point } from "@flatten-js/core";
import { InterCardinal, Cast } from "../../../gameState";
import { LetterOfTheLawState, LetterOfTheLawPlayer } from "../gameState";
import { DangerPuddle, survivePuddles } from "../../../Mechanics/DangerPuddles";

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

export const getDangerPuddles = (
  state: TwofoldRevelationState,
  players: LetterOfTheLawPlayer[]
): DangerPuddle[] => {
  if (state.stage === "Jump") {
    return [
      {
        type: "circle",
        damage: 0.9,
        debuffRequirement: null,
        instaKill: null,
        radius: 0.275,
        roleRequirement: null,
        source: players.filter((p) => p.isTethered && p.role === "Tank")[0]
          .position,
        split: false,
        colour: "purple",
      },
      {
        type: "circle",
        damage: 5,
        debuffRequirement: null,
        instaKill: null,
        radius: 0.125,
        roleRequirement: null,
        source: players.filter((p) => p.isTethered && p.role !== "Tank")[0]
          .position,
        split: true,
        colour: "yellow",
      },
    ];
  }

  if (state.stage === "Outer") {
    return [
      {
        type: "donut",
        damage: 2,
        debuffRequirement: null,
        instaKill: null,
        innerRadius: 0.2,
        outerRadius: 0.6,
        roleRequirement: null,
        source: state.tankPosition,
        split: false,
        colour: "purple",
      },
      {
        type: "circle",
        damage: 2,
        debuffRequirement: null,
        instaKill: null,
        radius: 0.225,
        roleRequirement: null,
        source: state.nonTankPosition,
        split: false,
        colour: "yellow",
      },
    ];
  }

  return [];
};

export const applyDamage = (
  gameState: TwofoldRevelationState,
  players: LetterOfTheLawPlayer[]
): LetterOfTheLawPlayer[] => {
  const dangerPuddles = getDangerPuddles(gameState, players);
  const surviving = survivePuddles(dangerPuddles, players);
  return players.map((p) => ({
    ...p,
    alive: p.alive && surviving.includes(p.designation),
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
