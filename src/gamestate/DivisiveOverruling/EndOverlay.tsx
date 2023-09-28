import { Grow } from "@mui/material";
import {
  IGameState,
  Marker1,
  Marker3,
  MarkerB,
  MarkerD,
  Player,
  Position,
} from "../gameState";

const Explosions = (props: { bossColour: "Dark" | "Light" }) => {
  if (props.bossColour === "Dark") {
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

const EndOverlay = (props: { bossColour: "Dark" | "Light" }) => (
  <>
    <Explosions bossColour={props.bossColour} />
    <h1
      style={{
        position: "absolute",
        left: `50%`,
        top: `50%`,
        transformOrigin: "0 0",
        transform: `translate(-50%,0)`,
        fontSize: "10rem",
        color: "hotpink",
      }}
    >
      Finished!
    </h1>
  </>
);
const isSafe = (player: Player, bossColour: "Dark" | "Light") => {
  return (
    (bossColour === "Dark" && Math.abs(0.5 - player.position[0]) < 0.2) ||
    (bossColour === "Light" && Math.abs(0.5 - player.position[0]) > 0.3)
  );
};

const getSafeSpot = (
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

export class EndClass implements IGameState {
  bossColour: "Dark" | "Light";
  cast = null;
  constructor(state: { bossColour: "Dark" | "Light" }) {
    this.state = state;
    this.bossColour = state.bossColour;
  }
  private state: {
    bossColour: "Dark" | "Light";
  };
  overlay = () => <EndOverlay bossColour={this.state.bossColour} />;
  nextState = () => {
    return this;
  };
  isSafe = (player: Player) => isSafe(player, this.bossColour);
  getSafeSpot = (player: Player): Position =>
    getSafeSpot(player, this.bossColour);
}
