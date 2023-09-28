import {
  Position,
  MarkerB,
  MarkerD,
  Marker3,
  Marker1,
  IGameState,
  Player,
} from "../gameState";
import { DisvisiveOverrulingInitialExplosionOverlay } from "./DivisiveOverullingInitialExplosionOverlay";
import { EndClass } from "./EndOverlay";

type DivisiveOverrulingPostExplosionGameState = {
  bossColour: "Dark" | "Light";
};

const getSafeSpot = (
  player: Player,
  bossColour: "Dark" | "Light"
): Position => {
  const short = player.tetherLength === "Short";
  if (bossColour === "Light") {
    const leftSafe: Position = [0.2, 0.5];
    const rightSafe: Position = [0.8, 0.5];
    if (
      short &&
      (player.role === "Healer" || player.tetheredRole === "Healer")
    ) {
      return rightSafe;
    }
    if (
      !short &&
      (player.role === "Tank" || player.tetheredRole === "Healer")
    ) {
      return rightSafe;
    }

    if (short) {
      return leftSafe;
    }

    return leftSafe;
  }

  if (short && (player.role === "Healer" || player.tetheredRole === "Healer")) {
    return [MarkerB[0], Marker3[1]];
  }
  if (!short && (player.role === "Tank" || player.tetheredRole === "Healer")) {
    return [MarkerB[0], Marker1[1]];
  }

  if (short) {
    return [MarkerD[0], Marker1[1]];
  }

  return [MarkerD[0], Marker3[1]];
};

const isSafe = (player: Player, bossColour: "Dark" | "Light") => {
  return (
    (bossColour === "Dark" && Math.abs(0.5 - player.position[0]) < 0.2) ||
    (bossColour === "Light" && Math.abs(0.5 - player.position[0]) > 0.3)
  );
};

export class DivisivePostState implements IGameState {
  bossColour: "Dark" | "Light";
  cast = {
    name: "Divisive Overruling",
    value: 100,
  };
  constructor(state: DivisiveOverrulingPostExplosionGameState) {
    this.state = state;
    this.bossColour = state.bossColour;
  }
  private state: DivisiveOverrulingPostExplosionGameState;
  overlay = () => (
    <DisvisiveOverrulingInitialExplosionOverlay
      state={this.state}
    />
  );
  nextState = () => {
    return new EndClass({
      bossColour: this.bossColour,
    });
  };
  isSafe = (player: Player) => isSafe(player, this.bossColour);
  getSafeSpot = (player: Player): Position =>
    getSafeSpot(player, this.bossColour);
}
