import { Point } from "@flatten-js/core";
import indicatorPng from "./assets/indicator2.png";

export const AttackRing = (props: {
  position: Point;
  size: number;
  rotation: number;
}) => (
  <image
    href={indicatorPng}
    height={props.size}
    width={props.size}
    preserveAspectRatio="xMidYMid"
    x={0}
    y={0}
    transform={`translate(${props.position.x}, ${props.position.y}) rotate(${90 - props.rotation}) translate(-${props.size / 2}, -${props.size / 2})`}
  />
);
