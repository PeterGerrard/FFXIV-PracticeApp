import { Positions3 } from "../Positions3/positions3State";
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
  Role,
  Marker2,
  Marker4,
  MarkerB,
  MarkerD,
} from "../gameState";
import { JuryOverrulingInitialExplosionOverlay } from "./JuryExplosionInitialOverlay";
import { JuryOverrulingPostExplosionOverlay } from "./JuryExplosionPostOverlay";

type JuryOverrulingGameState = {
  bossColour: "Dark" | "Light";
};

export type JuryOverrulingInitialExplosionGameState = {
  bossColour: "Dark" | "Light";
  nextState: IGameState;
};

export type JuryOverrulingPostExplosionGameState = {
  bossColour: "Dark" | "Light";
  nextState: IGameState;
};

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

const getCorrectInitialPos = (
  role: Role,
  tether: "Short" | "Long",
  tetheredRole: Role
): Position => {
  if (role === "Healer" && tether === "Short") {
    return MarkerB;
  }
  if (role === "Healer" && tether === "Long") {
    return MarkerC;
  }
  if (role === "Tank" && tether === "Short") {
    return MarkerD;
  }
  if (role === "Tank" && tether === "Long") {
    return MarkerA;
  }
  if (tetheredRole === "Tank" && tether === "Short") {
    return Marker4;
  }
  if (tetheredRole === "Tank" && tether === "Long") {
    return Marker3;
  }
  if (tetheredRole === "Healer" && tether === "Short") {
    return Marker2;
  }
  if (tetheredRole === "Healer" && tether === "Long") {
    return Marker1;
  }
  throw "Something went wrong";
};

export class JuryOverrulingInitialExplosionState implements IGameState {
  bossColour: "Dark" | "Light";
  cast = {
    name: "Jury Overruling",
    value: 0,
  };
  constructor(state: JuryOverrulingInitialExplosionGameState) {
    this.state = state;
    this.bossColour = state.bossColour;
  }
  private state: JuryOverrulingInitialExplosionGameState;
  overlay = (dispatch: (action: Action) => void) => (
    <JuryOverrulingInitialExplosionOverlay
      state={this.state}
      dispatch={dispatch}
    />
  );
  nextState = () => {
    return this.state.nextState;
  };
  isSafe = (player: Player) =>
    distanceTo(
      player.position,
      getCorrectInitialPos(
        player.role,
        player.tetherLength,
        player.tetheredRole
      )
    ) < 0.1;
  getSafeSpot = (player: Player): Position =>
    getCorrectInitialPos(player.role, player.tetherLength, player.tetheredRole);
}

export class JuryOverrulingState implements IGameState {
  bossColour: "Dark" | "Light";
  cast = {
    name: "Jury Overruling",
    value: 50,
  };
  constructor(state: JuryOverrulingGameState) {
    this.bossColour = state.bossColour;
  }
  overlay = () => <></>;
  nextState = () => {
    const nextState = new Positions3();
    return new JuryOverrulingExplosionState({
      ...nextState,
      nextState,
      bossColour: this.bossColour,
    });
  };
  isSafe = (player: Player) =>
    distanceTo(player.position, getSafeSpot(player, this.bossColour)) < 0.1;
  getSafeSpot = (player: Player): Position =>
    getSafeSpot(player, this.bossColour);
}

export class JuryOverrulingExplosionState implements IGameState {
  bossColour: "Dark" | "Light";
  cast = {
    name: "Jury Overruling",
    value: 100,
  };
  constructor(state: JuryOverrulingPostExplosionGameState) {
    this.state = state;
    this.bossColour = state.bossColour;
  }
  private state: JuryOverrulingPostExplosionGameState;
  overlay = (dispatch: (action: Action) => void) => (
    <JuryOverrulingPostExplosionOverlay
      state={this.state}
      dispatch={dispatch}
    />
  );
  nextState = () => this.state.nextState;
  isSafe = (player: Player) =>
    distanceTo(player.position, getSafeSpot(player, this.bossColour)) < 0.1;
  getSafeSpot = (player: Player): Position =>
    getSafeSpot(player, this.bossColour);
}
