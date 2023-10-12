import { useEffect, useState } from "react";
import { Circle, Point } from "@flatten-js/core";

export type CircleAoEProps = {
  source: Point;
  radius: number;
  colour?: string;
  onAnimationEnd: () => void;
};

export const CircleAoE = (props: CircleAoEProps) => {
  const [opacity, setOpacity] = useState(0);
  var c = new Circle(new Point(props.source.x, props.source.y), props.radius);
  useEffect(() => {
    let mounted = true;
    setOpacity(0.4);
    setTimeout(() => mounted && props.onAnimationEnd(), 1500);
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
      dangerouslySetInnerHTML={{
        __html: c.svg({
          fill: props.colour ?? "orange",
          fillOpacity: opacity,
          strokeWidth: 0,
        }),
      }}
    />
  );
};

export const isCircleSafe = (
  circle: CircleAoEProps,
  position: Point
): boolean => {
  var points = new Circle(circle.source, circle.radius).intersect(position);
  return points.length == 0;
};
