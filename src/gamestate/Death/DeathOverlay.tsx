import { IGameState, Player, Position } from "../gameState";

export const DeathOverlay = (props: {
  state: {
    player: Player;
    tetheredTo: Player;
    bossColour: "Dark" | "Light" | null;
    safeLocation: Position;
  };
}) => (
  <svg
    height="100"
    width="100"
    style={{
      position: "absolute",
      left: `${props.state.safeLocation[0] * 100}%`,
      top: `${props.state.safeLocation[1] * 100}%`,
      transform: "translate(-50%, -50%)",
    }}
  >
    <circle
      cx="50"
      cy="50"
      r="40"
      stroke="black"
      stroke-width="3"
      fill="green"
      opacity={0.8}
    />
  </svg>
);

export class DeathClass implements IGameState {
  player: Player;
  tetheredTo: Player;
  bossColour: "Dark" | "Light" | null;
  cast = null;
  constructor(state: {
    player: Player;
    tetheredTo: Player;
    bossColour: "Dark" | "Light" | null;
    safeLocation: Position;
  }) {
    this.state = state;
    this.player = state.player;
    this.tetheredTo = state.tetheredTo;
    this.bossColour = state.bossColour;
  }
  private state: {
    player: Player;
    tetheredTo: Player;
    bossColour: "Dark" | "Light" | null;
    safeLocation: Position;
  };
  overlay = () => <DeathOverlay state={this.state} />;
  reduce = () => {
    return this;
  };
}
