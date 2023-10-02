import { Position } from "..";
import { useEffect, useState } from "react";
import { getAngle } from "../helpers";

export type ConeAoEProps = {
  source: Position;
  angle: number;
  width: number;
  colour?: string;
  onAnimationEnd: () => void;
};

export const ConeAoE = (props: ConeAoEProps) => {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setHeight(5);
    setTimeout(props.onAnimationEnd, 1500);
  });
  const a = (Math.PI * (180 - props.angle)) / 180;
  const d2 = (Math.PI * props.width) / 360;
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
      <polygon
        points={`${props.source[0]} ${props.source[1]} ${
          props.source[0] +
          height * Math.sin(a) * Math.cos(d2) -
          height * Math.sin(d2) * Math.cos(a)
        } ${
          props.source[1] +
          height * Math.sin(a) * Math.sin(d2) +
          height * Math.cos(d2) * Math.cos(a)
        } ${
          props.source[0] +
          height * Math.sin(a) * Math.cos(-d2) -
          height * Math.sin(-d2) * Math.cos(a)
        } ${
          props.source[1] +
          height * Math.sin(a) * Math.sin(-d2) +
          height * Math.cos(-d2) * Math.cos(a)
        }`}
        fill={props.colour ?? "orange"}
        opacity={0.4}
      />
    </svg>
  );
};

export const isConeSafe = (cone: ConeAoEProps, position: Position): boolean => {
  const a = position[0] - cone.source[0];
  const b = position[1] - cone.source[1];
  const theta = getAngle([a, b]);
  const lower = cone.angle - cone.width / 2;
  const upper = cone.angle + cone.width / 2;

  if (lower < 0) {
    if (theta > lower + 360) {
      return false;
    }
  }

  if (upper >= 360) {
    if (theta < upper - 360) {
      return false;
    }
  }

  return theta < lower || theta > upper;
};
