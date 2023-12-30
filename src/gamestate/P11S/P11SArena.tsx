/// <reference types="vite-plugin-svgr/client" />

import { PropsWithChildren } from "react";
import arenaPng from "./assets/arena.png";
import { Themis } from "./Themis";
import { Player } from "../Player";
import { DangerPuddle } from "../Mechanics/DangerPuddles";
import { Point } from "@flatten-js/core";
import { Arena } from "../../components/Arena";

export const P11SArena = (
  props: PropsWithChildren<{
    players: Player[];
    moveTo: (p: Point) => void;
    dangerPuddles: DangerPuddle[];
    bossColour: "Dark" | "Light" | null;
  }>
) => {
  return (
    <Arena
      dangerPuddles={props.dangerPuddles}
      moveTo={props.moveTo}
      players={props.players}
      showPartyList={false}
    >
      <img src={arenaPng} height="100%"></img>
      <Themis bossColour={props.bossColour} />
      {props.children}
    </Arena>
  );
};
