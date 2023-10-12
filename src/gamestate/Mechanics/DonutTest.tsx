import { useState } from "react";
import { DonutAoE, DonutAoEProps, isDonutSafe } from "./DonutAoE";
import Slider from "@mui/material/Slider";
import { Point } from "@flatten-js/core";

export const DonutTest = () => {
  const [x, setX] = useState(0.5);
  const [y, setY] = useState(0.5);
  const [inner, setInner] = useState(0.1);
  const [outer, setOuter] = useState(0.2);
  const Donut: DonutAoEProps = {
    source: new Point(x, y),
    innerRadius: inner,
    outerRadius: outer,
    onAnimationEnd: () => {},
  };
  const nums = [
    0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65,
    0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1,
  ];

  return (
    <>
      <Slider
        aria-label="X"
        value={x}
        onChange={(_, v) => setX(v as number)}
        min={0}
        max={1}
        step={0.001}
      />
      <Slider
        aria-label="Y"
        value={y}
        onChange={(_, v) => setY(v as number)}
        min={0}
        max={1}
        step={0.001}
      />
      <Slider
        aria-label="Inner"
        value={inner}
        onChange={(_, v) => setInner(v as number)}
        min={0}
        max={0.5}
        step={0.001}
      />
      <Slider
        aria-label="Outer"
        value={outer}
        onChange={(_, v) => setOuter(v as number)}
        min={0}
        max={0.5}
        step={0.001}
      />
      <div
        style={{
          position: "relative",
          width: "500px",
          height: "500px",
          background: "grey",
        }}
      >
        <DonutAoE {...Donut} />
        {nums.flatMap((x) =>
          nums.map((y) => (
            <svg
              height="100%"
              width="100%"
              style={{ position: "absolute" }}
              viewBox="0 0 1 1"
            >
              <circle
                cx={x}
                cy={y}
                r={0.01}
                fill={isDonutSafe(Donut, new Point(x, y)) ? "green" : "red"}
              />
            </svg>
          ))
        )}
      </div>
    </>
  );
};
