/// <reference types="vite-plugin-svgr/client" />

import { PropsWithChildren } from "react";
import arenaPng from "./assets/arena.png";
import { Player } from "../Player";
import { DangerPuddle } from "../Mechanics/DangerPuddles";
import { Point } from "@flatten-js/core";
import { Arena, PlayerWithMarker } from "../../components/Arena";

export const P12P2Arena = (
  props: PropsWithChildren<{
    players: (Player | PlayerWithMarker)[];
    moveTo: (p: Point) => void;
    dangerPuddles: DangerPuddle[];
  }>
) => {
  return (
    <Arena
      dangerPuddles={props.dangerPuddles}
      moveTo={props.moveTo}
      players={props.players}
      showPartyList
    >
      <img src={arenaPng} height="100%" width="100%"></img>
      {props.children}
    </Arena>
  );
};
