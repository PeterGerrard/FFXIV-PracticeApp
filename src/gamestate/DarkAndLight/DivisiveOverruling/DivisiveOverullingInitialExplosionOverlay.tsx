import { LineAoE } from "../../Mechanics/LineAoE";

export const DisvisiveOverrulingInitialExplosionOverlay = (props: {
  bossColour: "Dark" | "Light";
}) => {
  const { bossColour } = props;

  return (
    <LineAoE
      angle={0}
      onAnimationEnd={() => {}}
      source={[0.5, 1]}
      width={0.4}
      colour={bossColour === "Dark" ? "purple" : "yellow"}
    />
  );
};
