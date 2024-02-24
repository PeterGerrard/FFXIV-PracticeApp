/// <reference types="vite-plugin-svgr/client" />

import { PropsWithChildren } from "react";
import arenaPng from "./assets/arena.png";
import { Player } from "../Player";
import { DangerPuddle } from "../Mechanics/DangerPuddles";
import { Point, point } from "@flatten-js/core";
import { Arena, PlayerWithMarker } from "../../components/Arena";
import { Waymark, WaymarkDisplay } from "../Waymark";

export const P12SP2Waymarks: { [w in Waymark]: Point } = {
  "Waymark A": point((100 - 80) / 40, (89 - 70) / 40),
  "Waymark B": point((104 - 80) / 40, (93 - 70) / 40),
  "Waymark C": point((100 - 80) / 40, (97 - 70) / 40),
  "Waymark D": point((96 - 80) / 40, (93 - 70) / 40),
  "Waymark 1": point((87 - 80) / 40, (93 - 70) / 40),
  "Waymark 2": point((113 - 80) / 40, (93 - 70) / 40),
  "Waymark 3": point((92 - 80) / 40, (92 - 70) / 40),
  "Waymark 4": point((108 - 80) / 40, (92 - 70) / 40),
};

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
      {Object.entries(P12SP2Waymarks).map(([w, p]) => (
        <WaymarkDisplay
          key={w}
          waymark={{ waymark: w as Waymark, position: p }}
        />
      ))}
      {props.children}
    </Arena>
  );
};
