import { Ref, forwardRef } from "react";
import healerPng from "./assets/healer.png";
import dpsPng from "./assets/dps.png";
import tankPng from "./assets/tank.png";
import skullPng from "./assets/Skull_and_Crossbones.png";
import { Role } from "./gameState";
import { Point } from "@flatten-js/core";

export type Player = {
  role: Role;
  position: Point;
};

export const PlayerComponent = forwardRef(
  (props: { player: Player; isDead: boolean }, ref: Ref<HTMLImageElement>) => {
    return (
      <img
        ref={ref}
        src={
          props.isDead
            ? skullPng
            : props.player.role === "Healer"
            ? healerPng
            : props.player.role === "Tank"
            ? tankPng
            : dpsPng
        }
        style={{
          position: "absolute",
          left: `${props.player.position.x * 100}%`,
          top: `${props.player.position.y * 100}%`,
          height: "80px",
          width: "80px",
          transform: "translate(-50%, -50%)",
        }}
      ></img>
    );
  }
);
