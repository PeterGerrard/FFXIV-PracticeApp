/// <reference types="vite-plugin-svgr/client" />

import { PropsWithChildren } from "react";
import arenaPng from "./assets/arena.png";
import { Athena } from "./Athena";
import { Player } from "../Player";
import { Point } from "@flatten-js/core";
import { Arena } from "../../components/Arena";
import { Mechanic } from "../mechanics";

export const P12P1Arena = (
  props: PropsWithChildren<{
    players: Player[];
    moveTo: (p: Point) => void;
    mechanic: Mechanic<Player>;
    bossDirection?: "North" | "South"
  }>
) => {
  return (
    <Arena mechanic={props.mechanic} moveTo={props.moveTo} players={props.players} showPartyList>
      <img src={arenaPng} height="100%" width="100%"></img>
      <Athena direction={props.bossDirection ?? "North"} />
      {props.children}
    </Arena>
  );
};
