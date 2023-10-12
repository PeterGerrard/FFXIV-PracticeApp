import { CSSProperties, Ref, forwardRef } from "react";
import healerPng from "./assets/healer.png";
import dpsPng from "./assets/dps.png";
import tankPng from "./assets/tank.png";
import skullPng from "./assets/Skull_and_Crossbones.png";
import { Designation, Role } from "./gameState";
import { Point } from "@flatten-js/core";

export type Player = {
  role: Role;
  position: Point;
};

export type DesignatedPlayer = Player & {
  designation: Designation;
};

export const PlayerComponent = forwardRef(
  (
    props: { player: Player | DesignatedPlayer; isDead: boolean },
    ref: Ref<HTMLImageElement>
  ) => {
    const imgStyle: CSSProperties = {
      position: "absolute",
      left: `${props.player.position.x * 100}%`,
      top: `${props.player.position.y * 100}%`,
      height: "80px",
      width: "80px",
      transform: "translate(-50%, -50%)",
    };

    if (props.isDead) {
      return <img ref={ref} src={skullPng} style={imgStyle}></img>;
    }

    if ("designation" in props.player) {
      return (
        <svg style={imgStyle} viewBox="0 0 100 100">
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
            dominant-baseline="central"
            text-anchor="middle"
            fill="white"
            fontSize="3rem"
          >
            {props.player.designation}
          </text>
        </svg>
      );
    }

    return (
      <img
        ref={ref}
        src={
          props.player.role === "Healer"
            ? healerPng
            : props.player.role === "Tank"
            ? tankPng
            : dpsPng
        }
        style={imgStyle}
      ></img>
    );
  }
);
