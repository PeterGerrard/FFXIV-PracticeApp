/// <reference types="vite-plugin-svgr/client" />

import { PropsWithChildren, Ref, forwardRef } from "react";
import arenaPng from "../DarkAndLight/assets/arena.png";
import { Position } from "..";
import { LetterOfTheLawPlayer } from "./gameState";
import { Themis } from "../Themis";
import { getPosition } from "../htmlHelpers";
import { PlayerComponent } from "../Player";

export const Arena = forwardRef(
  (
    props: PropsWithChildren<{
      player: LetterOfTheLawPlayer;
      isDead: boolean;
      moveTo: (p: Position) => void;
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
          <Themis bossColour={props.bossColour} />
          <PlayerComponent
            ref={ref}
            player={props.player}
            isDead={props.isDead}
          />
          {props.children}
        </>
      </div>
    );
  }
);
