/// <reference types="vite-plugin-svgr/client" />

import { PropsWithChildren, useRef } from "react";
import { Arena as P11SArena } from "../P11SArena";
import { ReactComponent as ForwardArrowSvg } from "./assets/forward-arrow.svg";
import { ReactComponent as BackwardArrowSvg } from "./assets/backward-arrow.svg";

import Xarrow from "react-xarrows";
import { DarkAndLightPlayer, isTetherSafe } from "./gameState";
import { PlayerComponent } from "../../Player";
import {
  DangerPuddle,
} from "../../Mechanics/DangerPuddles";
import { Point } from "@flatten-js/core";

const Tether = (props: {
  playerRef: React.MutableRefObject<unknown>;
  tetheredRef: React.MutableRefObject<unknown>;
  player: DarkAndLightPlayer;
  tetheredTo: DarkAndLightPlayer;
}) => {
  const { playerRef, tetheredRef, player, tetheredTo } = props;
  return (
    <Xarrow
      start={tetheredRef}
      startAnchor="middle"
      end={playerRef}
      endAnchor="middle"
      path="straight"
      strokeWidth={20}
      lineColor={
        isTetherSafe(player, tetheredTo)
          ? "blue"
          : player.debuff === "Dark"
          ? "purple"
          : "yellow"
      }
      showHead={!isTetherSafe(player, tetheredTo)}
      headColor={tetheredTo.debuff === "Dark" ? "purple" : "yellow"}
      headShape={{
        svgElem:
          player.debuff === tetheredTo.debuff ? (
            <ForwardArrowSvg />
          ) : (
            <BackwardArrowSvg />
          ),
        offsetForward: 1,
      }}
      showTail={!isTetherSafe(player, tetheredTo)}
      tailColor={player.debuff === "Dark" ? "purple" : "yellow"}
      tailShape={{
        svgElem:
          player.debuff === tetheredTo.debuff ? (
            <ForwardArrowSvg />
          ) : (
            <BackwardArrowSvg />
          ),
        offsetForward: 1,
      }}
    />
  );
};

export const Arena = (
  props: PropsWithChildren<{
    player: DarkAndLightPlayer;
    otherPlayer: DarkAndLightPlayer;
    bossColour: "Dark" | "Light" | null;
    isDead: boolean;
    dangerPuddles: DangerPuddle[];
    moveTo: (p: Point) => void;
  }>
) => {
  const playerRef = useRef<HTMLImageElement>(null);
  const tetheredRef = useRef<HTMLImageElement>(null);

  return (
    <P11SArena
      player={props.player}
      isDead={props.isDead}
      moveTo={props.moveTo}
      dangerPuddles={props.dangerPuddles}
      bossColour={props.bossColour}
      ref={playerRef}
    >
      <PlayerComponent
        ref={tetheredRef}
        player={props.otherPlayer}
        isDead={false}
      />
      {!props.isDead && (
        <Tether
          playerRef={playerRef}
          tetheredRef={tetheredRef}
          player={props.player}
          tetheredTo={props.otherPlayer}
        />
      )}
      {props.children}
    </P11SArena>
  );
};
