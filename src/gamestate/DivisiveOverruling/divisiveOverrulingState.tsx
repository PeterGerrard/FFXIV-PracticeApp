import { Position, Marker1, Marker3, Player, IGameState } from "../gameState";
import { DivisivePostState } from "./divisiveOverrulingPostExplosionState";

export type DivisiveOverrulingGameState = {
  bossColour: "Dark" | "Light";
};
export type DivisiveOverrulingInitialExplosionGameState = {
  bossColour: "Dark" | "Light";
};

const getSafeSpot = (
  player: Player,
  bossColour: "Dark" | "Light"
): Position => {
  const short = player.tetherLength === "Short";
  const leftSafe: Position = [0.2, 0.5];
  const rightSafe: Position = [0.8, 0.5];
  if (short && (player.role === "Healer" || player.tetheredRole === "Healer")) {
    return bossColour === "Light" ? rightSafe : [rightSafe[0], Marker3[1]];
  }
  if (!short && (player.role === "Tank" || player.tetheredRole === "Healer")) {
    return bossColour === "Light" ? rightSafe : [rightSafe[0], Marker1[1]];
  }

  if (short) {
    return bossColour === "Light" ? leftSafe : [leftSafe[0], Marker1[1]];
  }

  return bossColour === "Light" ? leftSafe : [leftSafe[0], Marker3[1]];
};

const isSafe = (player: Player) => {
  return Math.abs(0.5 - player.position[0]) > 0.2;
};

export class DivisiveOverrulingInitialExplosionState implements IGameState {
  bossColour: "Dark" | "Light";
  cast = {
    name: "Divisive Overruling",
    value: 50,
  };
  constructor(state: DivisiveOverrulingInitialExplosionGameState) {
    this.bossColour = state.bossColour;
  }
  overlay = () => <></>;
  nextState = () => {
    return new DivisivePostState({
      bossColour: this.bossColour,
    });
  };
  isSafe = isSafe;
  getSafeSpot = (player: Player): Position =>
    getSafeSpot(player, this.bossColour);
}
