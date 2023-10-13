/// <reference types="vite-plugin-svgr/client" />

import { PropsWithChildren, Ref, forwardRef } from "react";
import arenaPng from "./assets/arena.png";
import { Athena } from "./Athena";
import { getPosition } from "../htmlHelpers";
import { DesignatedPlayer, PlayerComponent } from "../Player";
import { DangerPuddle, DangerPuddlesDisplay } from "../Mechanics/DangerPuddles";
import { Point } from "@flatten-js/core";
import { PartyList } from "../PartyList/PartyList";

export const Arena = forwardRef(
  (
    props: PropsWithChildren<{
      player: DesignatedPlayer;
      otherPlayers: DesignatedPlayer[];
      isDead: boolean;
      moveTo: (p: Point) => void;
      dangerPuddles: DangerPuddle[];
    }>,
    ref: Ref<HTMLImageElement>
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
            <PlayerComponent
              ref={ref}
              player={props.player}
              isDead={props.isDead}
              mainPlayer
            />
            {props.otherPlayers
              .filter((p) => p.show)
              .map((p, i) => (
                <PlayerComponent key={i} player={p} isDead={false} />
              ))}
            <DangerPuddlesDisplay puddles={props.dangerPuddles} />
          </>
        </div>
        <div style={{ display: "inline-block" }}>
          <PartyList players={[props.player, ...props.otherPlayers]} />
        </div>
      </div>
    );
  }
);
