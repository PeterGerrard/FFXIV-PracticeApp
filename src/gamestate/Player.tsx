import { CSSProperties, useContext } from "react";
import skullPng from "./assets/Skull_and_Crossbones.png";
import { Designation, Role } from "./gameState";
import { Point } from "@flatten-js/core";
import { DesignationDisplay } from "./Designation";
import { SetupContext } from "./Setup/Setup";

export type Debuff = {
  name: string;
  src?: string;
  markerSrc?: string;
};

export type Player = {
  role: Role;
  alive: boolean;
  position: Point;
  debuffs: Debuff[];
  controlled: boolean;
  designation: Designation;
  distanceTravelled: number;
};

export const PlayerComponent = (props: { player: Player }) => {
  const {
    state: { playerIconSize },
  } = useContext(SetupContext);

  const imgStyle: CSSProperties = {
    position: "absolute",
    left: `${props.player.position.x * 100}%`,
    top: `${props.player.position.y * 100}%`,
    height: `${playerIconSize * 100}%`,
    width: `${playerIconSize * 100}%`,
    transform: "translate(-50%, -50%)",
    opacity: props.player.controlled ? 1 : 0.5,
  };

  if (!props.player.alive) {
    return <img src={skullPng} style={imgStyle}></img>;
  }

  return <DesignationDisplay player={props.player} style={imgStyle} />;
};
