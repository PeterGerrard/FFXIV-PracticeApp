import { Grow } from "@mui/material";
import { RevelationOverlay } from "./RevelationOverlay";
import { Cast } from "../../gameState";
import { RevelationGameState } from "./revelationsState";

export const RevelationExplosionOverlay = (props: {
  state: RevelationGameState;
  cast: Cast | null;
  animationEnd: () => void;
}) => {
  const { state, cast, animationEnd } = props;

  return (
    <>
      <RevelationOverlay state={state} />
      {state.topBomb === state.bossColour ? (
        <>
          <Grow
            in={cast !== null && cast.value >= 100}
            timeout={1500}
            onEntered={() => {
              animationEnd();
            }}
          >
            <svg
              height="70%"
              width="70%"
              style={{
                position: "absolute",
                left: `50%`,
                top: `20%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <circle
                cx="50%"
                cy="50%"
                r="50%"
                fill={state.bossColour === "Dark" ? "purple" : "yellow"}
                opacity={0.4}
              />
            </svg>
          </Grow>
          <Grow in={cast !== null && cast.value >= 100} timeout={1500}>
            <svg
              height="70%"
              width="70%"
              style={{
                position: "absolute",
                left: `50%`,
                top: `80%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <circle
                cx="50%"
                cy="50%"
                r="50%"
                fill={state.bossColour === "Dark" ? "purple" : "yellow"}
                opacity={0.4}
              />
            </svg>
          </Grow>
        </>
      ) : (
        <>
          <Grow
            in={cast !== null && cast.value >= 100}
            timeout={1500}
            onEntered={() => {
              animationEnd();
            }}
          >
            <svg
              height="70%"
              width="70%"
              style={{
                position: "absolute",
                left: `20%`,
                top: `50%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <circle
                cx="50%"
                cy="50%"
                r="50%"
                fill={state.bossColour === "Dark" ? "purple" : "yellow"}
                opacity={0.4}
              />
            </svg>
          </Grow>
          <Grow in={cast !== null && cast.value >= 100} timeout={1500}>
            <svg
              height="70%"
              width="70%"
              style={{
                position: "absolute",
                left: `80%`,
                top: `50%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <circle
                cx="50%"
                cy="50%"
                r="50%"
                fill={state.bossColour === "Dark" ? "purple" : "yellow"}
                opacity={0.4}
              />
            </svg>
          </Grow>
        </>
      )}
    </>
  );
};
