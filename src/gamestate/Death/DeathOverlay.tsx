import { Point } from "@flatten-js/core";
import { PropsWithChildren } from "react";

export const DeathOverlay = (
  props: PropsWithChildren<{ safeLocation: Point }>
) => (
  <>
    {props.children}
    <svg
      height="100"
      width="100"
      style={{
        position: "absolute",
        left: `${props.safeLocation.x * 100}%`,
        top: `${props.safeLocation.y * 100}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="black"
        stroke-width="3"
        fill="green"
        opacity={0.8}
      />
    </svg>
  </>
);
