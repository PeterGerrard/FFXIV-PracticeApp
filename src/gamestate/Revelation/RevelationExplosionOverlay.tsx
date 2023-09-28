import { Grow } from "@mui/material";
import { RevelationOverlay } from "./RevelationOverlay";
import { Action, Cast } from "../gameState";
import { RevelationGameState } from "./revelationsState";

export const RevelationExplosionOverlay = (props: {
  state: RevelationGameState;
  cast: Cast | null;
  dispatch: (action: Action) => void;
}) => {
  const { state, cast, dispatch } = props;

  return (
    <>
      <RevelationOverlay state={state} />
      {state.topBomb === state.bossColour ? (
        <>
          <Grow
            in={cast !== null && cast.value >= 100}
            timeout={1500}
            onEntered={() => {
              dispatch({ type: "ANIMATIONEND" });
            }}
          >
            <svg
              height="700"
              width="700"
              style={{
                position: "absolute",
                left: `50%`,
                top: `20%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <circle
                cx="350"
                cy="350"
                r="350"
                fill={state.bossColour === "Dark" ? "purple" : "yellow"}
                opacity={0.4}
              />
            </svg>
          </Grow>
          <Grow in={cast !== null && cast.value >= 100} timeout={1500}>
            <svg
              height="700"
              width="700"
              style={{
                position: "absolute",
                left: `50%`,
                top: `80%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <circle
                cx="350"
                cy="350"
                r="350"
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
              dispatch({ type: "ANIMATIONEND" });
            }}
          >
            <svg
              height="700"
              width="700"
              style={{
                position: "absolute",
                left: `20%`,
                top: `50%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <circle
                cx="350"
                cy="350"
                r="350"
                fill={state.bossColour === "Dark" ? "purple" : "yellow"}
                opacity={0.4}
              />
            </svg>
          </Grow>
          <Grow in={cast !== null && cast.value >= 100} timeout={1500}>
            <svg
              height="700"
              width="700"
              style={{
                position: "absolute",
                left: `80%`,
                top: `50%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <circle
                cx="350"
                cy="350"
                r="350"
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
