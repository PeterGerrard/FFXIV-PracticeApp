import { Grow } from "@mui/material";
import { DivisiveOverrulingGameState } from "./divisiveOverrulingState";

export const DisvisiveOverrulingInitialExplosionOverlay = (props: {
  state: DivisiveOverrulingGameState;
}) => {
  const { state } = props;

  return (
    <Grow in timeout={1500}>
      <svg
        height="1000"
        width="400"
        style={{
          position: "absolute",
          left: `50%`,
          top: `0%`,
          transformOrigin: "0 0",
          transform: `translate(-50%,0)`,
        }}
      >
        <rect
          width={400}
          height={2000}
          fill={state.bossColour === "Dark" ? "purple" : "yellow"}
          opacity={0.4}
        />
      </svg>
    </Grow>
  );
};
