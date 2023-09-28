import { DeathClass } from "../Death/DeathOverlay";
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
} from "../gameState";
import { JuryOverrulingInitialExplosionOverlay } from "./JuryExplosionInitialOverlay";
import { JuryOverrulingPostExplosionOverlay } from "./JuryExplosionPostOverlay";

type JuryOverrulingGameState = {
  player: Player;
  tetheredTo: Player;
  bossColour: "Dark" | "Light";
};

export type JuryOverrulingInitialExplosionGameState = {
  player: Player;
  tetheredTo: Player;
  bossColour: "Dark" | "Light";
  nextState: IGameState;
};

export type JuryOverrulingPostExplosionGameState = {
  player: Player;
  tetheredTo: Player;
  bossColour: "Dark" | "Light";
  nextState: IGameState;
};

const getSafeSpot = (gameState: JuryOverrulingGameState): Position => {
  const short = gameState.player.debuff !== gameState.tetheredTo.debuff;
  if (gameState.bossColour === "Dark") {
    if (
      short &&
      (gameState.player.role === "Healer" ||
        gameState.tetheredTo.role === "Healer")
    ) {
      return MarkerC;
    }
    if (
      short &&
      (gameState.player.role === "Tank" || gameState.tetheredTo.role === "Tank")
    ) {
      return MarkerA;
    }

    if (
      gameState.player.role === "Tank" ||
      gameState.tetheredTo.role === "Healer"
    ) {
      return Marker1;
    }
    return Marker3;
  } else {
    const leftSafe: Position = [0.2, 0.5];
    const rightSafe: Position = [0.8, 0.5];
    if (
      short &&
      (gameState.player.role === "Healer" ||
        gameState.tetheredTo.role === "Healer")
    ) {
      return rightSafe;
    }
    if (
      !short &&
      (gameState.player.role === "Tank" ||
        gameState.tetheredTo.role === "Healer")
    ) {
      return rightSafe;
    }

    return leftSafe;
  }
};

const move = (
  gameState: JuryOverrulingGameState,
  position: Position
): [IGameState, "Dark" | "Light"] => {
  const safeLocation = getSafeSpot(gameState);
  if (distanceTo(position, safeLocation) < 0.1) {
    return [
      new Positions3({
        player: {
          ...gameState.player,
          position: position,
        },
        tetheredTo: {
          ...gameState.tetheredTo,
          position: getSafeSpot({
            ...gameState,
            player: gameState.tetheredTo,
            tetheredTo: gameState.player,
          }),
        },
      }),
      gameState.bossColour,
    ];
  } else {
    return [
      new DeathClass({
        player: {
          ...gameState.player,
          alive: false,
          position: position,
        },
        tetheredTo: {
          ...gameState.tetheredTo,
          alive: false,
          position: getSafeSpot({
            ...gameState,
            player: gameState.tetheredTo,
            tetheredTo: gameState.player,
          }),
        },
        safeLocation: getSafeSpot(gameState),
        bossColour: null,
      }),
      gameState.bossColour,
    ];
  }
};

export class JuryOverrulingInitialExplosionState implements IGameState {
  player: Player;
  tetheredTo: Player;
  bossColour: "Dark" | "Light";
  cast = {
    name: "Jury Overruling",
    value: 0,
  };
  constructor(state: JuryOverrulingInitialExplosionGameState) {
    this.state = state;
    this.player = state.player;
    this.tetheredTo = state.tetheredTo;
    this.bossColour = state.bossColour;
  }
  private state: JuryOverrulingInitialExplosionGameState;
  overlay = (dispatch: (action: Action) => void) => (
    <JuryOverrulingInitialExplosionOverlay
      state={this.state}
      dispatch={dispatch}
    />
  );
  reduce = (action: Action) => {
    if (action.type === "ANIMATIONEND") {
      return this.state.nextState;
    }
    return this;
  };
}

export class JuryOverrulingState implements IGameState {
  player: Player;
  tetheredTo: Player;
  bossColour: "Dark" | "Light";
  cast = {
    name: "Jury Overruling",
    value: 50,
  };
  constructor(state: JuryOverrulingGameState) {
    this.state = state;
    this.player = state.player;
    this.tetheredTo = state.tetheredTo;
    this.bossColour = state.bossColour;
  }
  private state: JuryOverrulingGameState;
  overlay = () => <></>;
  reduce = (action: Action) => {
    if (action.type === "MOVE") {
      const [nextState, bossColour] = move(this.state, action.target);
      return new JuryOverrulingExplosionState({
        ...nextState,
        nextState,
        bossColour,
      });
    }
    return this;
  };
}
export class JuryOverrulingExplosionState implements IGameState {
  player: Player;
  tetheredTo: Player;
  bossColour: "Dark" | "Light";
  cast = {
    name: "Jury Overruling",
    value: 100,
  };
  constructor(state: JuryOverrulingPostExplosionGameState) {
    this.state = state;
    this.player = state.player;
    this.tetheredTo = state.tetheredTo;
    this.bossColour = state.bossColour;
  }
  private state: JuryOverrulingPostExplosionGameState;
  overlay = (dispatch: (action: Action) => void) => (
    <JuryOverrulingPostExplosionOverlay
      state={this.state}
      dispatch={dispatch}
    />
  );
  reduce = (action: Action) => {
    if (action.type === "ANIMATIONEND") {
      return this.state.nextState;
    }
    return this;
  };
}
