import { Positions2 } from "../Positions2/positions2State";
import { Position, Action, distanceTo, Player, IGameState } from "../gameState";
import { RevelationExplosionOverlay } from "./RevelationExplosionOverlay";
import { RevelationOverlay } from "./RevelationOverlay";

export type RevelationGameState = {
  bossColour: "Dark" | "Light";
  topBomb: "Dark" | "Light";
};
export type RevelationExplosionGameState = {
  bossColour: "Dark" | "Light";
  topBomb: "Dark" | "Light";
  nextState: IGameState;
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
  bossColour: "Dark" | "Light";
  cast = {
    name: "Arcane Revelation",
    value: 50,
  };
  constructor(state: RevelationGameState) {
    this.state = state;
    this.bossColour = state.bossColour;
  }
  private state: RevelationGameState;
  overlay = () => <RevelationOverlay state={this.state} />;
  nextState = () => {
    const nextState = new Positions2();
    return new RevelationExplosionState({
      ...this.state,
      nextState,
    });
  };
  isSafe = (player: Player) =>
    isSafe(player, this.bossColour, this.state.topBomb);
  getSafeSpot = (player: Player): Position =>
    getSafeRevelationSpot(player, this.bossColour, this.state.topBomb);
}
export class RevelationExplosionState implements IGameState {
  bossColour: "Dark" | "Light";
  cast = {
    name: "Arcane Revelation",
    value: 100,
  };
  constructor(state: RevelationExplosionGameState) {
    this.state = state;
    this.bossColour = state.bossColour;
  }
  private state: RevelationExplosionGameState;
  overlay = (dispatch: (action: Action) => void) => (
    <RevelationExplosionOverlay state={this.state} dispatch={dispatch} />
  );
  nextState = () => this.state.nextState;
  isSafe = (player: Player) =>
    isSafe(player, this.bossColour, this.state.topBomb);
  getSafeSpot = (player: Player): Position =>
    getSafeRevelationSpot(player, this.bossColour, this.state.topBomb);
}
