/// <reference types="vite-plugin-svgr/client" />

import { PropsWithChildren } from "react";
import arenaPng from "./assets/arena.png";
import { Themis } from "./Themis";
import { getPosition } from "../htmlHelpers";
import { Player, PlayerComponent } from "../Player";
import { DangerPuddle, DangerPuddlesDisplay } from "../Mechanics/DangerPuddles";
import { Point } from "@flatten-js/core";

export const Arena = (
  props: PropsWithChildren<{
    players: Player[];
    moveTo: (p: Point) => void;
    dangerPuddles: DangerPuddle[];
    bossColour: "Dark" | "Light" | null;
  }>
) => {
  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        height: "100%",
        overflow: "hidden",
      }}
      onClick={(e) => {
        const p = getPosition(e.currentTarget);
        return props.moveTo(
          new Point(
            (e.clientX - p.x) / e.currentTarget.offsetWidth,
            (e.clientY - p.y) / e.currentTarget.offsetHeight
          )
        );
      }}
    >
      <img src={arenaPng} height="100%"></img>
      <>
        <Themis bossColour={props.bossColour} />
        {props.players.map((p) => (
          <PlayerComponent key={p.designation} player={p} />
        ))}
        {props.children}
        <DangerPuddlesDisplay puddles={props.dangerPuddles} />
      </>
    </div>
  );
};
