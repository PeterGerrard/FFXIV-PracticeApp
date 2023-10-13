import { CSSProperties, Ref, forwardRef } from "react";
import healerPng from "./assets/healer.png";
import dpsPng from "./assets/dps.png";
import tankPng from "./assets/tank.png";
import skullPng from "./assets/Skull_and_Crossbones.png";
import { Designation, Role } from "./gameState";
import { Point } from "@flatten-js/core";
import { DesignationDisplay } from "./Designation";

export type Debuff = {
  src: string;
};

export type Player = {
  role: Role;
  position: Point;
  debuffs: Debuff[];
};

export type DesignatedPlayer = Player & {
  designation: Designation;
  show: boolean;
};

export const PlayerComponent = forwardRef(
  (
    props: {
      player: Player | DesignatedPlayer;
      isDead: boolean;
      mainPlayer?: boolean;
    },
    ref: Ref<HTMLImageElement>
  ) => {
    const imgStyle: CSSProperties = {
      position: "absolute",
      left: `${props.player.position.x * 100}%`,
      top: `${props.player.position.y * 100}%`,
      height: "80px",
      width: "80px",
      transform: "translate(-50%, -50%)",
      opacity: props.mainPlayer ? 1 : 0.5,
    };

    if (props.isDead) {
      return <img ref={ref} src={skullPng} style={imgStyle}></img>;
    }

    if ("designation" in props.player) {
      return <DesignationDisplay player={props.player} style={imgStyle} />;
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
