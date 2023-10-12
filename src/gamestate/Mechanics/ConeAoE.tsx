import { useEffect, useState } from "react";
import { Point, Polygon } from "@flatten-js/core";

export type ConeAoEProps = {
  source: Point;
  angle: number;
  width: number;
  colour?: string;
  onAnimationEnd: () => void;
};

export const ConeAoE = (props: ConeAoEProps) => {
  const [height, setHeight] = useState(0.01);
  useEffect(() => {
    let mounted = true;
    setHeight(5);
    setTimeout(() => mounted && props.onAnimationEnd(), 1500);
    return () => {
      mounted = false;
    };
  }, []);
  const c = new Polygon([
    props.source,
    props.source.translate(0, -height),
    props.source.translate(0, -height).rotate(props.width, props.source),
  ]).rotate(props.angle - props.width / 2, props.source);
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
      dangerouslySetInnerHTML={{
        __html: c.svg({
          strokeWidth: 0,
          fillOpacity: 0.4,
          fill: props.colour ?? "orange",
        }),
      }}
    />
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
