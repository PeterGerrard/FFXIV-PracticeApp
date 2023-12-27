import { CSSProperties } from "react";
import { Player } from "./Player";

export const DesignationDisplay = (props: {
  player: Player;
  style: CSSProperties;
}) => {
  return (
    <svg style={props.style} viewBox="0 0 100 100">
      <rect
        fill={
          props.player.role === "Healer"
            ? "green"
            : props.player.role === "Tank"
              ? "blue"
              : "red"
        }
        x={5}
        y={5}
        width={90}
        height={90}
        rx={15}
        stroke="white"
        strokeWidth={5}
      />
      <text
        x="50%"
        y="50%"
        height="80%"
        dominantBaseline="central"
        textAnchor="middle"
        fill="white"
        fontSize="3rem"
      >
        {props.player.designation}
      </text>
    </svg>
  );
};
