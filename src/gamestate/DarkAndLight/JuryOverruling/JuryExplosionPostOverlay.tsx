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
} from "../../p11sMarkers";

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
                height="40%"
                width="40%"
                style={{
                  position: "absolute",
                  left: `${d[0] * 100}%`,
                  top: `${d[1] * 100}%`,
                  transform: `translate(-50%,-50%)`,
                }}
              >
                <circle
                  cx="50%"
                  cy="50%"
                  r="28.125%"
                  strokeWidth="31.25%"
                  stroke="purple"
                  opacity={0.4}
                />
              </svg>
            ) : (
              <svg
                height="20%"
                width="20%"
                style={{
                  position: "absolute",
                  left: `${d[0] * 100}%`,
                  top: `${d[1] * 100}%`,
                  transform: `translate(-50%,-50%)`,
                }}
              >
                <circle cx="50%" cy="50%" r="50%" fill="yellow" opacity={0.4} />
              </svg>
            )}
          </Grow>
        );
      })}
    </>
  );
};
