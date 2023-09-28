import { DeathClass } from "../Death/DeathOverlay";
import { Positions2 } from "../Positions2/positions2State";
import { Position, Action, distanceTo, Player, IGameState } from "../gameState";
import { RevelationExplosionOverlay } from "./RevelationExplosionOverlay";
import { RevelationOverlay } from "./RevelationOverlay";

export type RevelationGameState = {
  player: Player;
  tetheredTo: Player;
  bossColour: "Dark" | "Light";
  topBomb: "Dark" | "Light";
};
export type RevelationExplosionGameState = {
  player: Player;
  tetheredTo: Player;
  bossColour: "Dark" | "Light";
  topBomb: "Dark" | "Light";
  nextState: IGameState;
};

const getSafeRevelationSpot = (gameState: RevelationGameState): Position => {
  if (gameState.bossColour === gameState.topBomb) {
    const leftSafe: Position = [0.2, 0.5];
    const rightSafe: Position = [0.8, 0.5];
    if (
      gameState.player.debuff !== gameState.tetheredTo.debuff &&
      (gameState.player.role === "Healer" ||
        gameState.tetheredTo.role === "Healer")
    ) {
      return rightSafe;
    }
    if (
      gameState.player.debuff === gameState.tetheredTo.debuff &&
      gameState.player.role === "Tank"
    ) {
      return rightSafe;
    }
    if (
      gameState.player.debuff === gameState.tetheredTo.debuff &&
      gameState.player.role === "Tank"
    ) {
      return rightSafe;
    }
    if (
      gameState.player.debuff === gameState.tetheredTo.debuff &&
      gameState.tetheredTo.role === "Healer"
    ) {
      return rightSafe;
    }
    return leftSafe;
  }
  const topSafe: Position = [0.5, 0.2];
  const bottomSafe: Position = [0.5, 0.8];
  if (gameState.player.role === "Healer") {
    return bottomSafe;
  }
  if (gameState.player.role === "Tank") {
    return topSafe;
  }
  if (gameState.player.debuff === gameState.tetheredTo.debuff) {
    return gameState.tetheredTo.role === "Healer" ? topSafe : bottomSafe;
  } else {
    return gameState.tetheredTo.role === "Healer" ? bottomSafe : topSafe;
  }
};

const move = (
  gameState: RevelationGameState,
  position: Position
): IGameState => {
  const bombLocations: Position[] =
    gameState.bossColour === gameState.topBomb
      ? [
          [0.5, 0.2],
          [0.5, 0.8],
        ]
      : [
          [0.2, 0.5],
          [0.8, 0.5],
        ];
  if (bombLocations.every((p) => distanceTo(position, p) > 0.4)) {
    return new Positions2({
      player: {
        ...gameState.player,
        position: position,
      },
      tetheredTo: {
        ...gameState.tetheredTo,
        position: getSafeRevelationSpot({
          ...gameState,
          player: gameState.tetheredTo,
          tetheredTo: gameState.player,
        }),
      },
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
        position: getSafeRevelationSpot({
          ...gameState,
          player: gameState.tetheredTo,
          tetheredTo: gameState.player,
        }),
      },
      safeLocation: getSafeRevelationSpot(gameState),
      bossColour: Math.random() < 0.5 ? "Dark" : "Light",
    });
  }
};

export class RevelationState implements IGameState {
  player: Player;
  tetheredTo: Player;
  bossColour: "Dark" | "Light";
  cast = {
    name: "Arcane Revelation",
    value: 50,
  };
  constructor(state: RevelationGameState) {
    this.state = state;
    this.player = state.player;
    this.tetheredTo = state.tetheredTo;
    this.bossColour = state.bossColour;
  }
  private state: RevelationGameState;
  overlay = () => <RevelationOverlay state={this.state} />;
  reduce = (action: Action) => {
    if (action.type === "MOVE") {
      const nextState = move(this.state, action.target);
      return new RevelationExplosionState({
        ...this.state,
        player: nextState.player,
        tetheredTo: nextState.tetheredTo,
        nextState,
      });
    }
    return this;
  };
}
export class RevelationExplosionState implements IGameState {
  player: Player;
  tetheredTo: Player;
  bossColour: "Dark" | "Light";
  cast = {
    name: "Arcane Revelation",
    value: 100,
  };
  constructor(state: RevelationExplosionGameState) {
    this.state = state;
    this.player = state.player;
    this.tetheredTo = state.tetheredTo;
    this.bossColour = state.bossColour;
  }
  private state: RevelationExplosionGameState;
  overlay = (dispatch: (action: Action) => void) => (
    <RevelationExplosionOverlay state={this.state} dispatch={dispatch} />
  );
  reduce = (action: Action) => {
    if (action.type === "ANIMATIONEND") {
      return this.state.nextState;
    }
    return this;
  };
}
