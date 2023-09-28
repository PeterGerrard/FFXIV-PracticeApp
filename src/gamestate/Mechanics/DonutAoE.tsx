import { Position } from "..";
import { useEffect, useState } from "react";
import { distanceTo } from "../gameState";

export type DonutAoEProps = {
  source: Position;
  innerRadius: number;
  outerRadius: number;
  colour?: string;
  onAnimationEnd: () => void;
};

export const DonutAoE = (props: DonutAoEProps) => {
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
      <mask id="maskInner">
        <rect x="0" y="0" width="100" height="100" fill="white" />
        <circle
          cx={props.source[0]}
          cy={props.source[1]}
          r={props.innerRadius}
          fill="black"
        />
      </mask>
      <circle
        cx={props.source[0]}
        cy={props.source[1]}
        r={props.outerRadius}
        fill={props.colour ?? "orange"}
        opacity={opacity}
        mask="url(#maskInner)"
      />
    </svg>
  );
};

export const isDonutSafe = (
  donut: DonutAoEProps,
  position: Position
): boolean => {
  const distanceToCentre = distanceTo(donut.source, position);
  return (
    distanceToCentre < donut.innerRadius || distanceToCentre > donut.outerRadius
  );
};
