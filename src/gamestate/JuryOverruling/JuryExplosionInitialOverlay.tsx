import { Grow } from "@mui/material";
import { Action } from "../gameState";
import { useEffect } from "react";

export const JuryOverrulingInitialExplosionOverlay = (props: {
  bossColour: "Dark" | "Light";
  dispatch: (action: Action) => void;
}) => {
  const { bossColour, dispatch } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: "ANIMATIONEND" });
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => {
        return (
          <Grow in timeout={1500} key={d}>
            <svg
              height="1000"
              width="200"
              style={{
                position: "absolute",
                left: `50%`,
                top: `50%`,
                transformOrigin: "0 0",
                transform: `rotate(${d}deg) translate(-50%,0)`,
              }}
            >
              <rect
                width={200}
                height={1000}
                fill={bossColour === "Dark" ? "purple" : "yellow"}
                opacity={0.4}
              />
            </svg>
          </Grow>
        );
      })}
    </>
  );
};
