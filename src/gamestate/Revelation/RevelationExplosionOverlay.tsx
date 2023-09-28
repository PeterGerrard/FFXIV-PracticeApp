import { Grow } from "@mui/material";
import { RevelationOverlay } from "./RevelationOverlay";
import { RevelationExplosionGameState } from "./revelationsState";
import { Action } from "../gameState";
import { useEffect } from "react";

export const RevelationExplosionOverlay = (props: {
  state: RevelationExplosionGameState;
  dispatch: (action: Action) => void;
}) => {
  const { state, dispatch } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: "ANIMATIONEND" });
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <RevelationOverlay state={{ ...state, stage: "revelation" }} />
      {state.topBomb === state.bossColour ? (
        <>
          <Grow in timeout={1500}>
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
          <Grow in timeout={1500}>
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
          <Grow in timeout={1500}>
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
          <Grow in timeout={1500}>
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
