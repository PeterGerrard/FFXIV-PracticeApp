import { CSSProperties } from "react";
import { Designation, LightPartyDesignation, getRole } from "./gameState";

export const DesignationDisplay = (props: {
  designation: Designation | LightPartyDesignation;
  style: CSSProperties;
}) => {
  const role = getRole(props.designation);
  return (
    <>
      <svg style={props.style} viewBox="0 0 100 100">
        <rect
          fill={
            role === "Healer"
              ? "green"
              : role === "Tank"
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
          {props.designation}
        </text>
      </svg>
    </>
  );
};
