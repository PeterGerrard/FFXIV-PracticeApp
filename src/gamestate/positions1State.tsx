import { DeathClass } from "./Death/DeathOverlay";
import {
  Action,
  IGameState,
  Marker1,
  Marker2,
  Marker3,
  Marker4,
  MarkerA,
  MarkerB,
  MarkerC,
  MarkerD,
  Player,
  Position,
  Role,
  distanceTo,
} from "./gameState";
import { RevelationState } from "./Revelation/revelationsState";

type Positions1GameState = {
  player: Player;
  tetheredTo: Player;
};

const getCorrectPos = (
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

const move = (
  gameState: Positions1GameState,
  position: Position
): IGameState => {
  const safeLocation = getCorrectPos(
    gameState.player.role,
    gameState.player.debuff === gameState.tetheredTo.debuff ? "Long" : "Short",
    gameState.tetheredTo.role
  );
  if (distanceTo(position, safeLocation) < 0.1) {
    return new RevelationState({
      player: {
        ...gameState.player,
        position: position,
      },
      tetheredTo: {
        ...gameState.tetheredTo,
        position: getCorrectPos(
          gameState.tetheredTo.role,
          gameState.player.debuff === gameState.tetheredTo.debuff
            ? "Long"
            : "Short",
          gameState.player.role
        ),
      },
      bossColour: Math.random() < 0.5 ? "Dark" : "Light",
      topBomb: Math.random() < 0.5 ? "Dark" : "Light",
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
        position: getCorrectPos(
          gameState.tetheredTo.role,
          gameState.player.debuff === gameState.tetheredTo.debuff
            ? "Long"
            : "Short",
          gameState.player.role
        ),
      },
      safeLocation,
      bossColour: Math.random() < 0.5 ? "Dark" : "Light",
    });
  }
};

export class Positions1 implements IGameState {
  player: Player;
  tetheredTo: Player;
  bossColour: null;
  cast = null;
  constructor(state: Positions1GameState) {
    this.state = state;
    this.player = state.player;
    this.tetheredTo = state.tetheredTo;
    this.bossColour = null;
  }
  private state: Positions1GameState;
  overlay = () => <></>;
  reduce = (action: Action) => {
    if (action.type === "MOVE") {
      const nextState = move(this.state, action.target);
      return nextState;
    }
    return this;
  };
}
