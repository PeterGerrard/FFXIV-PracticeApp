import { Point } from "@flatten-js/core";
import { useEffect, useState } from "react";

export type LineAoEProps = {
  source: Point;
  angle: number;
  width: number;
  length?: number;
  colour?: string;
  onAnimationEnd: () => void;
};

export const LineAoE = (props: LineAoEProps) => {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setHeight(props.length ? props.length : 2);
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
          transform: `rotate(${props.angle - 180}deg)`,
        }}
      />
    </svg>
  );
};

export const isLineSafe = (line: LineAoEProps, position: Point): boolean => {
  const w = line.width;
  const [i, j] = [line.source.x, line.source.y];
  const [x, y] = [position.x, position.y];
  const a = (Math.PI * (180 - line.angle)) / 180;
  const adjustedPosition: Point = new Point(
    w / 2 -
      i * Math.cos(a) +
      x * Math.cos(a) +
      j * Math.sin(a) -
      y * Math.sin(a),
    -j * Math.cos(a) + y * Math.cos(a) - i * Math.sin(a) + x * Math.sin(a)
  );
  return (
    adjustedPosition.x < 0 ||
    adjustedPosition.x > w ||
    adjustedPosition.y < 0 ||
    (line.length ? adjustedPosition.y > line.length : false)
  );
};
