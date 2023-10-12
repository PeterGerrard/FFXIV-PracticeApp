/// <reference types="vite-plugin-svgr/client" />

import { PropsWithChildren, Ref, forwardRef } from "react";
import arenaPng from "./assets/arena.png";
import { Athena } from "./Athena";
import { getPosition } from "../htmlHelpers";
import { DesignatedPlayer, PlayerComponent } from "../Player";
import {
  DangerPuddles,
  DangerPuddlesDisplay,
} from "../Mechanics/DangerPuddles";
import { Point } from "@flatten-js/core";

export const Arena = forwardRef(
  (
    props: PropsWithChildren<{
      player: DesignatedPlayer;
      isDead: boolean;
      moveTo: (p: Point) => void;
      dangerPuddles: DangerPuddles;
    }>,
    ref: Ref<HTMLImageElement>
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
          <Athena />
          <PlayerComponent
            ref={ref}
            player={props.player}
            isDead={props.isDead}
            mainPlayer
          />
          {props.children}
          <DangerPuddlesDisplay puddles={props.dangerPuddles.puddles} />
        </>
      </div>
    );
  }
);
