import { Grow } from "@mui/material";
import { IGameState, Player } from "../gameState";

export const EndOverlay = (props: {
  state: { bossColour: "Dark" | "Light" };
}) => {
  const { state } = props;

  if (state.bossColour === "Dark") {
    return (
      <>
        <Grow in timeout={1500}>
          <svg
            height="1000"
            width="1000"
            style={{
              position: "absolute",
              right: `20%`,
              top: `0%`,
              transform: `translate(-50%,0)`,
            }}
          >
            <rect width={1000} height={1000} fill="purple" opacity={0.4} />
          </svg>
        </Grow>
        <Grow in timeout={1500}>
          <svg
            height="1000"
            width="1000"
            style={{
              position: "absolute",
              left: `120%`,
              top: `0%`,
              transform: `translate(-50%,0)`,
            }}
          >
            <rect width={1000} height={1000} fill="purple" opacity={0.4} />
          </svg>
        </Grow>
      </>
    );
  }

  return (
    <Grow in timeout={1500}>
      <svg
        height="1000"
        width="600"
        style={{
          position: "absolute",
          left: `50%`,
          top: `0%`,
          transformOrigin: "0 0",
          transform: `translate(-50%,0)`,
        }}
      >
        <rect width={600} height={2000} fill="yellow" opacity={0.4} />
      </svg>
    </Grow>
  );
};

export class EndClass implements IGameState {
  player: Player;
  tetheredTo: Player;
  bossColour: "Dark" | "Light";
  cast = null;
  constructor(state: {
    bossColour: "Dark" | "Light";
    player: Player;
    tetheredTo: Player;
  }) {
    this.state = state;
    this.player = state.player;
    this.tetheredTo = state.tetheredTo;
    this.bossColour = state.bossColour;
  }
  private state: {
    bossColour: "Dark" | "Light";
    player: Player;
    tetheredTo: Player;
  };
  overlay = () => <EndOverlay state={this.state} />;
  reduce = () => {
    return this;
  };
}
