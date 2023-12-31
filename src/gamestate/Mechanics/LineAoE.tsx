import { Point } from "@flatten-js/core";
import { useEffect, useState } from "react";

export type LineAoEProps = {
  source: Point;
  angle: number;
  width: number;
  colour?: string;
  onAnimationEnd: () => void;
};

export const LineAoE = (props: LineAoEProps) => {
  const [height, setHeight] = useState(0);
  const { onAnimationEnd } = props;
  useEffect(() => {
    let mounted = true;
    setHeight(5);
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
      <rect
        height={height}
        width={`${props.width}`}
        x={props.source.x - props.width / 2}
        y={props.source.y}
        fill={props.colour ?? "orange"}
        style={{
          transitionDuration: "1500ms",
          transition: "height 1500ms",
          opacity: 0.4,
          transformOrigin: `${props.source.x}px ${props.source.y}px`,
          transform: `rotate(${props.angle}rad)`,
        }}
      />
    </svg>
  );
};

export const isLineSafe = (line: LineAoEProps, position: Point): boolean => {
  if (position.distanceTo(line.source)[0] < 0.00001) return false;

  const p = position.rotate(-line.angle, line.source);

  return Math.abs(p.x - line.source.x) > line.width / 2 || p.y < line.source.y;
};
