import { CSSProperties } from "react";
import skullPng from "./assets/Skull_and_Crossbones.png";
import { Designation, LightPartyDesignation, Role } from "./gameState";
import { Point } from "@flatten-js/core";
import { DesignationDisplay } from "./Designation";
import {
  useFullPartyProfile,
  useLightPartyProfile,
} from "./Setup/ProfileContext";

export type Debuff = {
  name: string;
  src?: string;
  markerSrc?: string;
};

export type Player = {
  type: "Full";
  role: Role;
  alive: boolean;
  position: Point;
  debuffs: Debuff[];
  controlled: boolean;
  designation: Designation;
  distanceTravelled: number;
};

export type LightPlayer = {
  type: "Light";
  role: Role;
  alive: boolean;
  position: Point;
  debuffs: Debuff[];
  controlled: boolean;
  designation: LightPartyDesignation;
};

export const PlayerComponent = (props: { player: Player | LightPlayer }) => {
  const { playerIconSize } =
    props.player.type === "Full"
      ? useFullPartyProfile()
      : useLightPartyProfile();

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

  return (
    <DesignationDisplay
      designation={props.player.designation}
      style={imgStyle}
    />
  );
};
