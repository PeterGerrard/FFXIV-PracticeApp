import { useState } from "react";
import { CircleAoE, CircleAoEProps, isCircleSafe } from "./CircleAoE";
import Slider from "@mui/material/Slider";

export const CircleTest = () => {
  const [x, setX] = useState(0.5);
  const [y, setY] = useState(0.5);
  const [inner, setInner] = useState(0.1);
  const Circle: CircleAoEProps = {
    source: [x, y],
    radius: inner,
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
        aria-label="Radius"
        value={inner}
        onChange={(_, v) => setInner(v as number)}
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
        <CircleAoE {...Circle} />
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
                fill={isCircleSafe(Circle, [x, y]) ? "green" : "red"}
              />
            </svg>
          ))
        )}
      </div>
    </>
  );
};
