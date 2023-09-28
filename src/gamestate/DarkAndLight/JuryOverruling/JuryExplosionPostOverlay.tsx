import { Grow } from "@mui/material";
import { useEffect } from "react";
import {
  Marker1,
  Marker2,
  Marker3,
  Marker4,
  MarkerA,
  MarkerB,
  MarkerC,
  MarkerD,
} from "../gameState";

export const JuryOverrulingPostExplosionOverlay = (props: {
  bossColour: "Dark" | "Light";
  animationEnd: () => void;
}) => {
  const { bossColour, animationEnd } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      animationEnd();
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {[
        Marker1,
        Marker2,
        Marker3,
        Marker4,
        MarkerA,
        MarkerB,
        MarkerC,
        MarkerD,
      ].map((d, i) => {
        return (
          <Grow in timeout={1500} key={i}>
            {bossColour === "Dark" ? (
              <svg
                height="400"
                width="400"
                style={{
                  position: "absolute",
                  left: `${d[0] * 100}%`,
                  top: `${d[1] * 100}%`,
                  transform: `translate(-50%,-50%)`,
                }}
              >
                <circle
                  cx={200}
                  cy={200}
                  r={112.5}
                  strokeWidth={125}
                  stroke="purple"
                  opacity={0.4}
                />
              </svg>
            ) : (
              <svg
                height="200"
                width="200"
                style={{
                  position: "absolute",
                  left: `${d[0] * 100}%`,
                  top: `${d[1] * 100}%`,
                  transform: `translate(-50%,-50%)`,
                }}
              >
                <circle
                  cx={100}
                  cy={100}
                  r={100}
                  strokeWidth={50}
                  fill="yellow"
                  opacity={0.4}
                />
              </svg>
            )}
          </Grow>
        );
      })}
    </>
  );
};
