/// <reference types="vite-plugin-svgr/client" />

import { PropsWithChildren, Ref, forwardRef } from "react";
import arenaPng from "./assets/arena.png";
import { Position } from "..";
import { Athena } from "./Athena";
import { getPosition } from "../htmlHelpers";
import { Player, PlayerComponent } from "../Player";
import {
  DangerPuddles,
  DangerPuddlesDisplay,
} from "../Mechanics/DangerPuddles";

export const Arena = forwardRef(
  (
    props: PropsWithChildren<{
      player: Player;
      isDead: boolean;
      moveTo: (p: Position) => void;
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
          const [xOff, yOff] = getPosition(e.currentTarget);
          return props.moveTo([
            (e.clientX - xOff) / e.currentTarget.offsetWidth,
            (e.clientY - yOff) / e.currentTarget.offsetHeight,
          ]);
        }}
      >
        <img src={arenaPng} height="100%"></img>
        <>
          <Athena />
          <PlayerComponent
            ref={ref}
            player={props.player}
            isDead={props.isDead}
          />
          {props.children}
          <DangerPuddlesDisplay puddles={props.dangerPuddles.puddles} />
        </>
      </div>
    );
  }
);
