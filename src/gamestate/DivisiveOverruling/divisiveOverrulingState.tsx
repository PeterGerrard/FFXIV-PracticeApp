import { DeathClass } from "../Death/DeathOverlay";
import {
  Position,
  Action,
  Marker1,
  Marker3,
  Player,
  IGameState,
} from "../gameState";
import { DivisivePostState } from "./divisiveOverrulingPostExplosionState";

export type DivisiveOverrulingGameState = {
  player: Player;
  tetheredTo: Player;
  bossColour: "Dark" | "Light";
};
export type DivisiveOverrulingInitialExplosionGameState = {
  player: Player;
  tetheredTo: Player;
  bossColour: "Dark" | "Light";
};

const getSafeSpot = (gameState: DivisiveOverrulingGameState): Position => {
  const short = gameState.player.debuff !== gameState.tetheredTo.debuff;
  const leftSafe: Position = [0.2, 0.5];
  const rightSafe: Position = [0.8, 0.5];
  if (
    short &&
    (gameState.player.role === "Healer" ||
      gameState.tetheredTo.role === "Healer")
  ) {
    return gameState.bossColour === "Light"
      ? rightSafe
      : [rightSafe[0], Marker3[1]];
  }
  if (
    !short &&
    (gameState.player.role === "Tank" || gameState.tetheredTo.role === "Healer")
  ) {
    return gameState.bossColour === "Light"
      ? rightSafe
      : [rightSafe[0], Marker1[1]];
  }

  if (short) {
    return gameState.bossColour === "Light"
      ? leftSafe
      : [leftSafe[0], Marker1[1]];
  }

  return gameState.bossColour === "Light"
    ? leftSafe
    : [leftSafe[0], Marker3[1]];
};

const move = (
  gameState: DivisiveOverrulingInitialExplosionGameState,
  position: Position
): IGameState => {
  const safeLocation = getSafeSpot(gameState);
  if (Math.abs(0.5 - position[0]) > 0.2) {
    return new DivisivePostState({
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
      bossColour: gameState.bossColour,
    });
  } else {
    return new DeathClass({
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
      safeLocation: safeLocation,
      bossColour: gameState.bossColour,
    });
  }
};

export class DivisiveOverrulingInitialExplosionState implements IGameState {
  player: Player;
  tetheredTo: Player;
  bossColour: "Dark" | "Light";
  cast = {
    name: "Divisive Overruling",
    value: 50,
  };
  constructor(state: DivisiveOverrulingInitialExplosionGameState) {
    this.state = state;
    this.player = state.player;
    this.tetheredTo = state.tetheredTo;
    this.bossColour = state.bossColour;
  }
  private state: DivisiveOverrulingInitialExplosionGameState;
  overlay = () => <></>;
  reduce = (action: Action) => {
    if (action.type === "MOVE") {
      return move(this.state, action.target);
    }
    return this;
  };
}
