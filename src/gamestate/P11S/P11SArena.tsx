/// <reference types="vite-plugin-svgr/client" />

import { PropsWithChildren, Ref, forwardRef } from "react";
import arenaPng from "./assets/arena.png";
import { Themis } from "./Themis";
import { getPosition } from "../htmlHelpers";
import { Player, PlayerComponent } from "../Player";
import {
  DangerPuddles,
  DangerPuddlesDisplay,
} from "../Mechanics/DangerPuddles";
import { Point } from "@flatten-js/core";

export const Arena = forwardRef(
  (
    props: PropsWithChildren<{
      player: Player;
      isDead: boolean;
      moveTo: (p: Point) => void;
      dangerPuddles: DangerPuddles;
      bossColour: "Dark" | "Light" | null;
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
          <Themis bossColour={props.bossColour} />
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
