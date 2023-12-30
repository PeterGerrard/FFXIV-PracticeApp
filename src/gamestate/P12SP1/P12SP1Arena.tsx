/// <reference types="vite-plugin-svgr/client" />

import { PropsWithChildren } from "react";
import arenaPng from "./assets/arena.png";
import { Athena } from "./Athena";
import { Player, PlayerComponent } from "../Player";
import { DangerPuddle, DangerPuddlesDisplay } from "../Mechanics/DangerPuddles";
import { Point } from "@flatten-js/core";
import { Arena } from "../../components/Arena";

export const P12P1Arena = (
  props: PropsWithChildren<{
    players: Player[];
    moveTo: (p: Point) => void;
    dangerPuddles: DangerPuddle[];
    bossDirection?: "North" | "South"
  }>
) => {
  return (
    <Arena dangerPuddles={props.dangerPuddles} moveTo={props.moveTo} players={props.players}>
      <img src={arenaPng} height="100%" width="100%"></img>
      <Athena direction={props.bossDirection ?? "North"} />
      {props.children}
      {props.players.map((p, i) => (
        <PlayerComponent key={i} player={p} />
      ))}
      <DangerPuddlesDisplay puddles={props.dangerPuddles} />
    </Arena>
  );
};
