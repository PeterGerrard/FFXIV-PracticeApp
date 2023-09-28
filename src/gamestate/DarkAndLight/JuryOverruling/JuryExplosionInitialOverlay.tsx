import { useEffect } from "react";
import { LineAoE } from "../../Mechanics/LineAoE";

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
          <LineAoE
            angle={d}
            onAnimationEnd={() => {}}
            source={[0.5, 0.5]}
            width={0.2}
            colour={bossColour === "Dark" ? "purple" : "yellow"}
          />
        );
      })}
    </>
  );
};
