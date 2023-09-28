import { Grow } from "@mui/material";

export const DisvisiveOverrulingInitialExplosionOverlay = (props: {
  bossColour: "Dark" | "Light";
}) => {
  const { bossColour } = props;

  return (
    <Grow in timeout={1500}>
      <svg
        height="100%"
        width="40%"
        style={{
          position: "absolute",
          left: `50%`,
          top: `0%`,
          transformOrigin: "0 0",
          transform: `translate(-50%,0)`,
        }}
      >
        <rect
          width="100%"
          height="100%"
          fill={bossColour === "Dark" ? "purple" : "yellow"}
          opacity={0.4}
        />
      </svg>
    </Grow>
  );
};
