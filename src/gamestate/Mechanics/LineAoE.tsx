import Slide from "@mui/material/Slide";
import { Position } from "..";
import { useEffect, useState } from "react";

export type LineAoEProps = {
  source: Position;
  angle: number;
  width: number;
  length: number | undefined;
  colour?: "string";
  onAnimationEnd: () => void;
};

export const LineAoE = (props: LineAoEProps) => {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setHeight(props.length ? props.length : 1);
    setTimeout(props.onAnimationEnd, 1500);
  });
  return (
    <svg
      height="100%"
      width="100%"
      style={{
        position: "absolute",
      }}
      viewBox="0 0 1 1"
    >
      <rect
        height={height}
        width={`${props.width}`}
        x={props.source[0] - props.width / 2}
        y={props.source[1]}
        fill={props.colour ?? "orange"}
        style={{
          transitionDuration: "1500ms",
          transition: "height 1500ms",
          opacity: 0.4,
          transformOrigin: `${props.source[0]}px ${props.source[1]}px`,
          transform: `rotate(${props.angle - 180}deg)`,
        }}
      />
    </svg>
  );
};

export const isLineSafe = (line: LineAoEProps, position: Position) => {
  const w = line.width;
  const [i, j] = line.source;
  const [x, y] = position;
  const a = (Math.PI * (180 - line.angle)) / 180;
  const adjustedPosition: Position = [
    w / 2 -
      i * Math.cos(a) +
      x * Math.cos(a) +
      j * Math.sin(a) -
      y * Math.sin(a),
    -j * Math.cos(a) + y * Math.cos(a) - i * Math.sin(a) + x * Math.sin(a),
  ];
  return (
    adjustedPosition[0] < 0 ||
    adjustedPosition[0] > w ||
    adjustedPosition[1] < 0 ||
    (line.length && adjustedPosition[1] > line.length)
  );
};
