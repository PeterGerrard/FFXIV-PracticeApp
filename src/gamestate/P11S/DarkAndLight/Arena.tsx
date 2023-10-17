/// <reference types="vite-plugin-svgr/client" />

import { PropsWithChildren } from "react";
import { Arena as P11SArena } from "../P11SArena";
// import { ReactComponent as ForwardArrowSvg } from "./assets/forward-arrow.svg";
// import { ReactComponent as BackwardArrowSvg } from "./assets/backward-arrow.svg";

import { DarkAndLightPlayer, isTetherSafe } from "./gameState";
import { DangerPuddle } from "../../Mechanics/DangerPuddles";
import { Point } from "@flatten-js/core";

const Tether = (props: {
  player: DarkAndLightPlayer;
  tetheredTo: DarkAndLightPlayer;
}) => {
  const { player, tetheredTo } = props;
  return (
    <svg
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        height: "100%",
        width: "100%",
      }}
      viewBox="0 0 1 1"
    >
      <line
        x1={player.position.x}
        y1={player.position.y}
        x2={tetheredTo.position.x}
        y2={tetheredTo.position.y}
        strokeWidth={0.02}
        stroke={
          isTetherSafe(player, tetheredTo)
            ? "blue"
            : player.debuff === "Dark"
            ? "purple"
            : "yellow"
        }
      />
    </svg>
  );
};

export const Arena = (
  props: PropsWithChildren<{
    players: DarkAndLightPlayer[];
    bossColour: "Dark" | "Light" | null;
    dangerPuddles: DangerPuddle[];
    moveTo: (p: Point) => void;
  }>
) => {
  const p = props.players.filter((x) => x.controlled)[0];
  const o = props.players.filter(
    (x) => x.tetheredDesignation === p.designation
  )[0];

  return (
    <P11SArena
      players={props.players}
      moveTo={props.moveTo}
      dangerPuddles={props.dangerPuddles}
      bossColour={props.bossColour}
    >
      <Tether player={p} tetheredTo={o} />
      {props.children}
    </P11SArena>
  );
};
