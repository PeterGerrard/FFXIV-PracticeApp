import { Position } from "..";
import { useEffect, useState } from "react";
import { distanceTo } from "../gameState";

export type CircleAoEProps = {
  source: Position;
  radius: number;
  colour?: string;
  onAnimationEnd: () => void;
};

export const CircleAoE = (props: CircleAoEProps) => {
  const [opacity, setOpacity] = useState(0);
  useEffect(() => {
    setOpacity(0.4);
    setTimeout(props.onAnimationEnd, 1500);
  });
  return (
    <svg
      height="100%"
      width="100%"
      style={{
        position: "absolute",
        left: 0,
        top: 0,
      }}
      viewBox="0 0 1 1"
    >
      <circle
        cx={props.source[0]}
        cy={props.source[1]}
        r={props.radius}
        fill={props.colour ?? "orange"}
        opacity={opacity}
      />
    </svg>
  );
};

export const isCircleSafe = (
  circle: CircleAoEProps,
  position: Position
): boolean => {
  const distanceToCentre = distanceTo(circle.source, position);
  return distanceToCentre > circle.radius;
};
