import { Point, point, vector } from "@flatten-js/core";
import { DangerPuddle } from "../../Mechanics/DangerPuddles";
import {
  SuperchainExplosion,
  SuperchainExplosionInOut,
  getSuperChainDangerPuddles,
} from "../Superchain/explosionTypes";
import { Player } from "../../Player";
import { pickOne } from "../../helpers";

type TrinitySide = "Left" | "Right";

type InitialState = {
  stage: "Initial";
  short:
    | {
        north: "Circle";
        middle: "Circle";
        south: "Pair";
      }
    | {
        north: "Pair";
        middle: "Circle";
        south: "Circle";
      };
  long:
    | {
        north: "Circle";
        middle: "Circle";
        south: Exclude<SuperchainExplosion, SuperchainExplosionInOut>;
      }
    | {
        north: Exclude<SuperchainExplosion, SuperchainExplosionInOut>;
        middle: "Circle";
        south: "Circle";
      };
  trinity: [TrinitySide, TrinitySide, TrinitySide];
};

type Trinity = Omit<InitialState, "stage"> & {
  stage: "Trinity";
  displayed: 0 | 1 | 2 | 3;
};

type Explosion1 = Omit<InitialState, "stage"> & {
  stage: "Explosion1";
};

type Explosion2 = Omit<InitialState, "stage"> & {
  stage: "Explosion2";
};

type Explosion3 = Omit<InitialState, "stage"> & {
  stage: "Explosion3";
};

type Explosion4 = Omit<InitialState, "stage"> & {
  stage: "Explosion4";
};

export type SuperchainTheory2aGameState =
  | InitialState
  | Trinity
  | Explosion1
  | Explosion2
  | Explosion3
  | Explosion4;

export const createInitialState = (): SuperchainTheory2aGameState => {
  const northFirst = pickOne([true, false]);
  const northLast = pickOne([true, false]);
  const lastType = pickOne<
    Exclude<SuperchainExplosion, SuperchainExplosionInOut>
  >(["Pair", "Protean"]);
  const t1 = pickOne<"Left" | "Right">(["Left", "Right"]);
  const t2 = pickOne<"Left" | "Right">(["Left", "Right"]);
  const t3 =
    t1 == "Left" && t2 == "Left"
      ? "Right"
      : t1 == "Right" && t2 == "Right"
        ? "Left"
        : pickOne<"Left" | "Right">(["Left", "Right"]);
  return {
    stage: "Initial",
    short: northFirst
      ? {
          north: "Pair",
          middle: "Circle",
          south: "Circle",
        }
      : {
          north: "Circle",
          middle: "Circle",
          south: "Pair",
        },
    long: northLast
      ? {
          north: lastType,
          middle: "Circle",
          south: "Circle",
        }
      : {
          north: "Circle",
          middle: "Circle",
          south: lastType,
        },
    trinity: [t1, t2, t3],
  };
};

export const getDangerPuddles = (
  state: SuperchainTheory2aGameState,
  players: Player[]
): DangerPuddle[] => {
  if (state.stage === "Explosion1") {
    return [
      {
        type: "line",
        angle: state.trinity[0] === "Left" ? Math.PI / 2 : (3 * Math.PI) / 2,
        damage: 2,
        debuffRequirement: null,
        instaKill: null,
        onAnimationEnd: () => {},
        roleRequirement: null,
        source: point(0.5, 0.5),
        split: false,
        width: 2,
        colour: "blue",
      },
      ...getSuperChainDangerPuddles(
        [state.short.north],
        point(0.5, 0.25),
        players
      ),
      ...getSuperChainDangerPuddles(
        [state.short.middle],
        point(0.5, 0.5),
        players
      ),
      ...getSuperChainDangerPuddles(
        [state.short.south],
        point(0.5, 0.75),
        players
      ),
    ];
  }
  if (state.stage === "Explosion2") {
    return [
      {
        type: "line",
        angle: state.trinity[1] === "Left" ? (3 * Math.PI) / 2 : Math.PI / 2,
        damage: 2,
        debuffRequirement: null,
        instaKill: null,
        onAnimationEnd: () => {},
        roleRequirement: null,
        source: point(0.5, 0.5),
        split: false,
        width: 2,
        colour: "blue",
      },
      ...getSuperChainDangerPuddles(["Donut"], point(0.5, 0.5), players),
    ];
  }
  if (state.stage === "Explosion3") {
    return [
      {
        type: "line",
        angle: state.trinity[2] === "Left" ? Math.PI / 2 : (3 * Math.PI) / 2,
        damage: 2,
        debuffRequirement: null,
        instaKill: null,
        onAnimationEnd: () => {},
        roleRequirement: null,
        source: point(0.5, 0.5),
        split: false,
        width: 2,
        colour: "blue",
      },
    ];
  }
  if (state.stage === "Explosion4") {
    return [
      ...getSuperChainDangerPuddles(
        [state.long.north],
        point(0.5, 0.25),
        players
      ),
      ...getSuperChainDangerPuddles(
        [state.long.middle],
        point(0.5, 0.5),
        players
      ),
      ...getSuperChainDangerPuddles(
        [state.long.south],
        point(0.5, 0.75),
        players
      ),
    ];
  }
  return [];
};

const addOne = (n: 0 | 1 | 2): 1 | 2 | 3 => {
  return (n + 1) as 1 | 2 | 3;
};

export const nextStep = (
  state: SuperchainTheory2aGameState
): SuperchainTheory2aGameState => {
  if (state.stage === "Initial") {
    return {
      ...state,
      stage: "Trinity",
      displayed: 0,
    };
  }
  if (state.stage === "Trinity") {
    if (state.displayed != 3) {
      return {
        ...state,
        displayed: addOne(state.displayed),
      };
    }
    return {
      ...state,
      stage: "Explosion1",
    };
  }
  if (state.stage === "Explosion1") {
    return {
      ...state,
      stage: "Explosion2",
    };
  }
  if (state.stage === "Explosion2") {
    return {
      ...state,
      stage: "Explosion3",
    };
  }
  if (state.stage === "Explosion3") {
    return {
      ...state,
      stage: "Explosion4",
    };
  }
  return state;
};

export const getTargetSpot = (
  state: SuperchainTheory2aGameState,
  _players: Player[],
  player: Player
): Point => {
  if (state.stage === "Initial") {
    const ys =
      state.short.north === "Circle"
        ? [0.7, 0.73, 0.76, 0.8]
        : [0.3, 0.27, 0.24, 0.2];
    switch (player.designation) {
      case "MT":
      case "M1":
        return point(0.5, ys[0]);
      case "OT":
      case "M2":
        return point(0.5, ys[1]);
      case "H1":
      case "R1":
        return point(0.5, ys[2]);
      case "H2":
      case "R2":
        return point(0.5, ys[3]);
    }
  }
  if (state.stage === "Trinity") {
    const xs = state.trinity[0] === "Left" ? [0.55, 0.6] : [0.45, 0.4];
    const ys =
      state.short.north === "Circle"
        ? [0.7, 0.73, 0.76, 0.8]
        : [0.3, 0.27, 0.24, 0.2];
    switch (player.designation) {
      case "MT":
      case "M1":
        return point(xs[0], ys[0]);
      case "OT":
      case "M2":
        return point(xs[1], ys[1]);
      case "H1":
      case "R1":
        return point(xs[1], ys[2]);
      case "H2":
      case "R2":
        return point(xs[0], ys[3]);
    }
  }
  if (state.stage === "Explosion1") {
    return point(state.trinity[1] === "Left" ? 0.4 : 0.6, 0.5);
  }
  if (state.stage === "Explosion2") {
    return point(
      state.trinity[2] === "Left" ? 0.6 : 0.4,
      state.long.north === "Circle" ? 0.75 : 0.25
    );
  }
  if (state.stage === "Explosion3") {
    let off = vector();
    const pairs = state.long.north === "Pair" || state.long.south === "Pair";
    switch (player.designation) {
      case "MT":
        off = pairs ? vector(0.7, 0.7) : vector(0.4, 0.9);
        break;
      case "OT":
        off = pairs ? vector(-0.7, 0.7) : vector(-0.4, 0.9);
        break;
      case "H1":
        off = pairs ? vector(0.7, -0.7) : vector(0.9, -0.4);
        break;
      case "H2":
        off = pairs ? vector(-0.7, -0.7) : vector(-0.9, -0.4);
        break;
      case "M1":
        off = pairs ? vector(0.7, 0.7) : vector(0.9, 0.4);
        break;
      case "M2":
        off = pairs ? vector(-0.7, 0.7) : vector(-0.9, 0.4);
        break;
      case "R1":
        off = pairs ? vector(0.7, -0.7) : vector(0.4, -0.9);
        break;
      case "R2":
        off = pairs ? vector(-0.7, -0.7) : vector(-0.4, -0.9);
        break;
    }
    if (state.long.north === "Circle") {
      off = off.rotate(Math.PI);
    }
    return point(0.5, state.long.north !== "Circle" ? 0.25 : 0.75).translate(
      off.scale(0.05, 0.05)
    );
  }

  return player.position;
};
