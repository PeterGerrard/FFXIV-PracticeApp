import { useEffect, useId, useState } from "react";
import { distanceTo } from "../gameState";
import { Point } from "@flatten-js/core";

export type DonutAoEProps = {
  source: Point;
  innerRadius: number;
  outerRadius: number;
  colour?: string;
  onAnimationEnd: () => void;
};

export const DonutAoE = (props: DonutAoEProps) => {
  const [opacity, setOpacity] = useState(0);
  const id = useId();
  const { onAnimationEnd } = props;
  useEffect(() => {
    let mounted = true;
    setOpacity(0.4);
    setTimeout(() => mounted && onAnimationEnd(), 1500);
    return () => {
      mounted = false;
    };
  }, []);
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
      <mask id={id}>
        <rect x="0" y="0" width="100" height="100" fill="white" />
        <circle
          cx={props.source.x}
          cy={props.source.y}
          r={props.innerRadius}
          fill="black"
        />
      </mask>
      <circle
        cx={props.source.x}
        cy={props.source.y}
        r={props.outerRadius}
        fill={props.colour ?? "orange"}
        opacity={opacity}
        mask={`url(#${id})`}
      />
    </svg>
  );
};

export const isDonutSafe = (donut: DonutAoEProps, position: Point): boolean => {
  const distanceToCentre = distanceTo(donut.source, position);
  return (
    distanceToCentre < donut.innerRadius || distanceToCentre > donut.outerRadius
  );
};
