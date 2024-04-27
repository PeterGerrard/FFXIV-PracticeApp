/// <reference types="vite-plugin-svgr/client" />

import { PropsWithChildren } from "react";
import arenaPng from "./assets/arena.png";
import { Themis } from "./Themis";
import { Player } from "../Player";
import { Point } from "@flatten-js/core";
import { Arena } from "../../components/Arena";
import { Mechanic } from "../mechanics";

export const P11SArena = <TPlayer extends Player>(
  props: PropsWithChildren<{
    players: TPlayer[];
    moveTo: (p: Point) => void;
    mechanic: Mechanic<TPlayer>;
    bossColour: "Dark" | "Light" | null;
  }>
) => {
  return (
    <Arena
      mechanic={props.mechanic}
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
