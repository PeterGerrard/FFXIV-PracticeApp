import { Point } from "@flatten-js/core";

export const Tether = (props: {
  source: Point;
  target: Point;
  thickness: number;
  color: string;
}) => {
  return (
    <line
      x1={props.source.x}
      y1={props.source.y}
      x2={props.target.x}
      y2={props.target.y}
      strokeWidth={props.thickness}
      stroke={props.color}
    />
  );
};
