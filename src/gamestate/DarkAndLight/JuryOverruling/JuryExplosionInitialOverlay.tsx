import { Grow } from "@mui/material";
import { useEffect } from "react";

export const JuryOverrulingInitialExplosionOverlay = (props: {
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
      {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => {
        return (
          <Grow in timeout={1500} key={d}>
            <svg
              height="100%"
              width="20%"
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
