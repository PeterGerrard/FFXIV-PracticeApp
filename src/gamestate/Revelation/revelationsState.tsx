import { JuryOverrulingState } from "../JuryOverruling/juryOverrulingState";
import {
  Position,
  Action,
  distanceTo,
  Player,
  IGameState,
  Cast,
  getDefaultPos,
} from "../gameState";
import { RevelationExplosionOverlay } from "./RevelationExplosionOverlay";

export type RevelationGameState = {
  bossColour: "Dark" | "Light";
  topBomb: "Dark" | "Light";
};

const getSafeRevelationSpot = (
  player: Player,
  bossColour: "Dark" | "Light",
  topBomb: "Dark" | "Light"
): Position => {
  if (bossColour === topBomb) {
    const leftSafe: Position = [0.2, 0.5];
    const rightSafe: Position = [0.8, 0.5];
    if (
      player.tetherLength === "Short" &&
      (player.role === "Healer" || player.tetheredRole === "Healer")
    ) {
      return rightSafe;
    }
    if (player.tetherLength === "Long" && player.role === "Tank") {
      return rightSafe;
    }
    if (player.tetherLength === "Long" && player.tetheredRole === "Healer") {
      return rightSafe;
    }
    return leftSafe;
  }
  const topSafe: Position = [0.5, 0.2];
  const bottomSafe: Position = [0.5, 0.8];
  if (player.role === "Healer") {
    return bottomSafe;
  }
  if (player.role === "Tank") {
    return topSafe;
  }
  if (player.tetherLength === "Long") {
    return player.tetheredRole === "Healer" ? topSafe : bottomSafe;
  } else {
    return player.tetheredRole === "Healer" ? bottomSafe : topSafe;
  }
};

const isSafe = (
  player: Player,
  bossColour: "Dark" | "Light",
  topBomb: "Dark" | "Light"
) => {
  const bombLocations: Position[] =
    bossColour === topBomb
      ? [
          [0.5, 0.2],
          [0.5, 0.8],
        ]
      : [
          [0.2, 0.5],
          [0.8, 0.5],
        ];
  return bombLocations.every((p) => distanceTo(player.position, p) > 0.4);
};

export class RevelationState implements IGameState {
  bossColour: "Dark" | "Light" | null;
  cast: Cast | null;
  constructor(
    cast?: Cast,
    state?: RevelationGameState,
    bossColour?: "Dark" | "Light"
  ) {
    this.cast = cast ?? null;
    this.state = state ?? {
      bossColour: Math.random() ? "Dark" : "Light",
      topBomb: Math.random() ? "Dark" : "Light",
    };
    this.bossColour = bossColour ?? null;
  }
  private state: RevelationGameState;
  progress = () => {
    if (this.cast === null) {
      this.cast = {
        name: "Arcane Revelation",
        value: 50,
      };
      this.bossColour = this.state.bossColour;
    } else {
      this.cast.value += 50;
    }
  };
  overlay = (dispatch: (action: Action) => void) => {
    return this.cast !== null ? (
      <RevelationExplosionOverlay
        state={this.state}
        cast={this.cast}
        dispatch={dispatch}
      />
    ) : (
      <></>
    );
  };
  nextState = () => {
    if (this.cast === null) {
      return new RevelationState(
        {
          name: "Arcane Revelation",
          value: 50,
        },
        this.state,
        this.state.bossColour
      );
    } else if (this.cast.value < 100) {
      return new RevelationState(
        {
          name: "Arcane Revelation",
          value: this.cast.value + 50,
        },
        this.state,
        this.state.bossColour
      );
    }
    return new JuryOverrulingState();
  };
  isSafe = (player: Player) =>
    this.bossColour === null ||
    this.cast === null ||
    this.cast.value < 100 ||
    isSafe(player, this.bossColour, this.state.topBomb);
  getSafeSpot = (player: Player): Position => {
    return this.bossColour === null ||
      this.cast === null ||
      this.cast.value < 100
      ? getDefaultPos(player)
      : getSafeRevelationSpot(player, this.bossColour, this.state.topBomb);
  };
}
