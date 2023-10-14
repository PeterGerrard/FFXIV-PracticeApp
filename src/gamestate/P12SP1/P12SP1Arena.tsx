/// <reference types="vite-plugin-svgr/client" />

import { PropsWithChildren } from "react";
import arenaPng from "./assets/arena.png";
import { Athena } from "./Athena";
import { getPosition } from "../htmlHelpers";
import { Player, PlayerComponent } from "../Player";
import { DangerPuddle, DangerPuddlesDisplay } from "../Mechanics/DangerPuddles";
import { Point } from "@flatten-js/core";
import { PartyList } from "../PartyList/PartyList";

export const Arena = (
  props: PropsWithChildren<{
    players: Player[];
    moveTo: (p: Point) => void;
    dangerPuddles: DangerPuddle[];
  }>
) => {
  return (
    <div>
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
          <Athena />
          {props.children}
          {props.players.map((p, i) => (
            <PlayerComponent
              key={i}
              player={p}
            />
          ))}
          <DangerPuddlesDisplay puddles={props.dangerPuddles} />
        </>
      </div>
      <div style={{ display: "inline-block" }}>
        <PartyList players={props.players} />
      </div>
    </div>
  );
};
