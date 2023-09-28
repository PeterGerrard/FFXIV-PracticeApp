import {
  Position,
  Marker1,
  Marker3,
  Player,
  IGameState,
  Cast,
  getDefaultPos,
  MarkerB,
  MarkerD,
} from "../gameState";
import { DisvisiveOverrulingInitialExplosionOverlay } from "./DivisiveOverullingInitialExplosionOverlay";
import { EndOverlay } from "./EndOverlay";

export type DivisiveOverrulingGameState = {
  bossColour: "Dark" | "Light";
};
export type DivisiveOverrulingInitialExplosionGameState = {
  bossColour: "Dark" | "Light";
};

const getSafeSpot1 = (
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

const getSafeSpot2 = (
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

const isSafe1 = (player: Player) => {
  return Math.abs(0.5 - player.position[0]) > 0.2;
};

const isSafe2 = (player: Player, bossColour: "Dark" | "Light") => {
  return (
    (bossColour === "Dark" && Math.abs(0.5 - player.position[0]) < 0.2) ||
    (bossColour === "Light" && Math.abs(0.5 - player.position[0]) > 0.3)
  );
};

export class DivisiveOverrulingState implements IGameState {
  bossColour: "Dark" | "Light" | null;
  cast: Cast | null;
  stage: "Before" | "Explosion1" | "Explosion2";
  constructor(
    bossColour?: "Dark" | "Light",
    cast?: Cast,
    stage?: DivisiveOverrulingState["stage"]
  ) {
    this.bossColour = bossColour ?? null;
    this.cast = cast ?? null;
    this.stage = stage ?? "Before";
  }
  overlay = () => (
    <>
      {this.stage === "Explosion1" && (
        <DisvisiveOverrulingInitialExplosionOverlay
          bossColour={this.bossColour!}
        />
      )}
      {this.stage === "Explosion2" && (
        <EndOverlay bossColour={this.bossColour!} />
      )}
    </>
  );
  nextState = () => {
    if (this.cast === null) {
      return new DivisiveOverrulingState(
        Math.random() < 0.5 ? "Dark" : "Light",
        {
          name: "Divisive Overruling",
          value: 50,
        },
        "Before"
      );
    }
    if (this.stage === "Before") {
      return new DivisiveOverrulingState(
        this.bossColour!,
        {
          name: "Divisive Overruling",
          value: 100,
        },
        "Explosion1"
      );
    }
    if (this.stage === "Explosion1") {
      return new DivisiveOverrulingState(
        this.bossColour!,
        this.cast,
        "Explosion2"
      );
    }
    return this;
  };
  isSafe = (player: Player) => {
    if (!this.bossColour) return true;
    if (this.stage === "Explosion1") return isSafe1(player);
    if (this.stage === "Explosion2") return isSafe2(player, this.bossColour);
    return true;
  };
  getSafeSpot = (player: Player): Position => {
    if (!this.bossColour) return getDefaultPos(player);
    if (this.stage === "Explosion1")
      return getSafeSpot1(player, this.bossColour);
    if (this.stage === "Explosion2")
      return getSafeSpot2(player, this.bossColour);
    return getDefaultPos(player);
  };
}
