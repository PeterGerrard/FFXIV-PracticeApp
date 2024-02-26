import { useEffect, useId, useState } from "react";
import { Point, Polygon } from "@flatten-js/core";

export type ConeAoEProps = {
  source: Point;
  angle: number;
  width: number;
  colour?: string;
};

export const ConeAoE = (props: ConeAoEProps) => {
  const id = useId();
  const [height, setHeight] = useState(0.01);
  useEffect(() => {
    setHeight(5);
  }, []);
  const p2 = props.source
    .translate(0, -height)
    .rotate(props.angle - props.width / 2);
  const p3 = p2.rotate(props.width, props.source);
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
        points={`${props.source.x},${props.source.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`}
        fill={props.colour ?? "orange"}
        opacity="0.4"
        mask={`url(#${id})`}
      >
        <animate
          attributeName="points"
          values={`${props.source.x},${props.source.y} ${props.source.x},${props.source.y} ${props.source.x},${props.source.y};${props.source.x},${props.source.y} ${p2.x},${p2.y} ${p3.x},${p3.y};`}
          dur="1s"
          repeatCount={0}
        />
      </polygon>
    </svg>
  );
};

export const isConeSafe = (cone: ConeAoEProps, position: Point): boolean => {
  const c = new Polygon([
    cone.source,
    cone.source.translate(0, -5),
    cone.source.translate(0, -5).rotate(cone.width, cone.source),
  ]).rotate(cone.angle - cone.width / 2, cone.source);

  return c.intersect(position).length === 0;
};
