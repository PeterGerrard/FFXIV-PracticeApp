import { Grow } from "@mui/material";
import { LineAoE } from "../../Mechanics/LineAoE";

const Explosions = (props: { bossColour: "Dark" | "Light" }) => {
  if (props.bossColour === "Dark") {
    return (
      <>
        <LineAoE
          angle={0}
          onAnimationEnd={() => {}}
          source={[0.15, 1]}
          width={0.3}
          colour="purple"
        />
        <LineAoE
          angle={0}
          onAnimationEnd={() => {}}
          source={[0.85, 1]}
          width={0.3}
          colour="purple"
        />
      </>
    );
  }

  return (
    <LineAoE
      angle={0}
      onAnimationEnd={() => {}}
      source={[0.5, 1]}
      width={0.6}
      colour="yellow"
    />
  );
};

export const EndOverlay = (props: { bossColour: "Dark" | "Light" }) => (
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
