import { DivisiveOverrulingState } from "../DivisiveOverruling/divisiveOverrulingState";
import {
  Position,
  Action,
  distanceTo,
  MarkerC,
  MarkerA,
  Marker1,
  Marker3,
  Player,
  IGameState,
  Cast,
  getDefaultPos,
} from "../gameState";
import { JuryOverrulingInitialExplosionOverlay } from "./JuryExplosionInitialOverlay";
import { JuryOverrulingPostExplosionOverlay } from "./JuryExplosionPostOverlay";

const getSafeSpot = (
  player: Player,
  bossColour: "Dark" | "Light"
): Position => {
  const short = player.tetherLength === "Short";
  if (bossColour === "Dark") {
    if (
      short &&
      (player.role === "Healer" || player.tetheredRole === "Healer")
    ) {
      return MarkerC;
    }
    if (short && (player.role === "Tank" || player.tetheredRole === "Tank")) {
      return MarkerA;
    }

    if (player.role === "Tank" || player.tetheredRole === "Healer") {
      return Marker1;
    }
    return Marker3;
  } else {
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

    return leftSafe;
  }
};

export class JuryOverrulingState implements IGameState {
  bossColour: "Dark" | "Light" | null;
  cast: Cast | null;
  explosions: "Before" | "Lines" | "Move" | "AOE";
  constructor(
    bossColour?: "Dark" | "Light",
    cast?: Cast,
    explosions?: JuryOverrulingState["explosions"]
  ) {
    this.bossColour = bossColour ?? null;
    this.cast = cast ?? null;
    this.explosions = explosions ?? "Before";
  }
  overlay = (dispatch: (action: Action) => void) => (
    <>
      {this.bossColour && this.explosions === "Lines" && (
        <JuryOverrulingInitialExplosionOverlay
          bossColour={this.bossColour}
          dispatch={dispatch}
        />
      )}
      {this.bossColour && this.explosions === "AOE" && (
        <JuryOverrulingPostExplosionOverlay
          bossColour={this.bossColour}
          dispatch={dispatch}
        />
      )}
    </>
  );
  nextState = () => {
    if (this.cast === null) {
      return new JuryOverrulingState(
        Math.random() < 0.5 ? "Dark" : "Light",
        {
          name: "Jury Overruling",
          value: 100,
        },
        "Lines"
      );
    }
    if (this.explosions === "Lines") {
      return new JuryOverrulingState(this.bossColour!, this.cast, "Move");
    }
    if (this.explosions === "Move") {
      return new JuryOverrulingState(this.bossColour!, this.cast, "AOE");
    }
    return new DivisiveOverrulingState();
  };
  isSafe = (player: Player) => {
    if (!this.bossColour) return true;
    if (this.explosions === "AOE")
      return (
        distanceTo(player.position, getSafeSpot(player, this.bossColour)) < 0.1
      );
    if (this.explosions === "Lines")
      return distanceTo(player.position, getDefaultPos(player)) < 0.1;
    return true;
  };

  getSafeSpot = (player: Player): Position => {
    if (!this.bossColour) return getDefaultPos(player);
    if (this.explosions === "AOE") return getSafeSpot(player, this.bossColour);
    return getDefaultPos(player);
  };
}
