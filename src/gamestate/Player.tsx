import { Ref, forwardRef } from "react";
import healerPng from "./DarkAndLight/assets/healer.png";
import dpsPng from "./DarkAndLight/assets/dps.png";
import tankPng from "./DarkAndLight/assets/tank.png";
import skullPng from "./DarkAndLight/assets/Skull_and_Crossbones.png";
import { Position, Role } from "./gameState";

export type Player = {
  role: Role;
  position: Position;
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
          left: `${props.player.position[0] * 100}%`,
          top: `${props.player.position[1] * 100}%`,
          height: "80px",
          width: "80px",
          transform: "translate(-50%, -50%)",
        }}
      ></img>
    );
  }
);
