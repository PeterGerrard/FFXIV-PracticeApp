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
    <div
      style={{
        display: "grid",
        gridTemplateAreas: `
      'arena debuffs'
      'cast empty'
`,
        gridTemplateColumns: "min(75vw,75vh) 25vw",
        gridTemplateRows: "min(75vw,75vh) auto",
      }}
    >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          aspectRatio: "1 / 1",
          gridArea: "arena",
          maxHeight: "100%",
          maxWidth: "100%",
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
        <img src={arenaPng} height="100%" width="100%"></img>
        <>
          <Athena />
          {props.children}
          {props.players.map((p, i) => (
            <PlayerComponent key={i} player={p} />
          ))}
          <DangerPuddlesDisplay puddles={props.dangerPuddles} />
        </>
      </div>
      <div style={{ gridArea: "debuffs" }}>
        <PartyList players={props.players} />
      </div>
    </div>
  );
};
