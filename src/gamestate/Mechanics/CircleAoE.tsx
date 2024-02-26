import { Circle, Point } from "@flatten-js/core";

export type CircleAoEProps = {
  source: Point;
  radius: number;
  colour?: string;
};

export const CircleAoE = (props: CircleAoEProps) => {
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
        cx={props.source.x}
        cy={props.source.y}
        r={props.radius}
        fill={props.colour ?? "orange"}
        opacity="0.4"
        stroke-width="0"
        stroke="black"
      >
        <animate
          attributeName="opacity"
          values="0;0.4"
          dur="1s"
          repeatCount={0}
        />
      </circle>
    </svg>
  );
};

export const isCircleSafe = (
  circle: CircleAoEProps,
  position: Point
): boolean => {
  const points = new Circle(circle.source, circle.radius).intersect(position);
  return points.length == 0;
};
