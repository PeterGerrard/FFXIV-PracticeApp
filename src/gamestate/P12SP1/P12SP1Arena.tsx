/// <reference types="vite-plugin-svgr/client" />

import { PropsWithChildren } from "react";
import arenaPng from "./assets/arena.png";
import { Athena } from "./Athena";
import { getPosition } from "../htmlHelpers";
import { Player, PlayerComponent } from "../Player";
import { DangerPuddle, DangerPuddlesDisplay } from "../Mechanics/DangerPuddles";
import { Point } from "@flatten-js/core";
import { PartyList } from "../PartyList/PartyList";
import { Stack } from "@mui/material";

export const Arena = (
  props: PropsWithChildren<{
    players: Player[];
    moveTo: (p: Point) => void;
    dangerPuddles: DangerPuddle[];
  }>
) => {
  return (
    <Stack flexDirection="row">
      <div
        style={{
          position: "relative",
          display: "inline-block",
          height: "75vh%",
          width: "75vh",
          overflow: "hidden",
          flexGrow: 0,
          flexShrink: 0,
          aspectRatio: "1 / 1",
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
      <div style={{ display: "inline-block" }}>
        <PartyList players={props.players} />
      </div>
    </Stack>
  );
};
