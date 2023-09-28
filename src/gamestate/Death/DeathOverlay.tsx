import { PropsWithChildren } from "react";
import { IGameState, Player, Position } from "../gameState";

export const DeathOverlay = (
  props: PropsWithChildren<{ safeLocation: Position }>
) => (
  <>
    {props.children}
    <svg
      height="100"
      width="100"
      style={{
        position: "absolute",
        left: `${props.safeLocation[0] * 100}%`,
        top: `${props.safeLocation[1] * 100}%`,
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
  </>
);

export class DeathClass {
  player: Player;
  otherPlayer: Player;
  bossColour: "Dark" | "Light" | null;
  private underlyingState: IGameState;
  cast = null;
  constructor(
    player: Player,
    otherPlayer: Player,
    underlyingState: IGameState
  ) {
    this.player = player;
    this.otherPlayer = otherPlayer;
    this.bossColour = underlyingState.bossColour;
    this.underlyingState = underlyingState;
  }
  overlay = () => (
    <DeathOverlay safeLocation={this.getSafeSpot(this.player)}>
      {this.underlyingState.overlay(() => {})}
    </DeathOverlay>
  );
  reduce = () => {
    return this;
  };
  isSafe = () => false;
  getSafeSpot = (player: Player) => this.underlyingState.getSafeSpot(player);
  nextState = () => this;
}
