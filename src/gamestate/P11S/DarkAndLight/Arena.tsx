/// <reference types="vite-plugin-svgr/client" />

import { PropsWithChildren } from "react";
import { Arena as P11SArena } from "../P11SArena";
// import { ReactComponent as ForwardArrowSvg } from "./assets/forward-arrow.svg";
// import { ReactComponent as BackwardArrowSvg } from "./assets/backward-arrow.svg";

import { DarkAndLightPlayer, isTetherSafe } from "./gameState";
import { DangerPuddle } from "../../Mechanics/DangerPuddles";
import { Point, vector } from "@flatten-js/core";

const Tether = (props: {
  player: DarkAndLightPlayer;
  tetheredTo: DarkAndLightPlayer;
}) => {
  const { player, tetheredTo } = props;
  const halfwayX = (player.position.x + tetheredTo.position.x) / 2;
  const halfwayY = (player.position.y + tetheredTo.position.y) / 2;

  const angle = vector(
    player.position,
    player.position.translate(0, 1)
  ).angleTo(vector(player.position, tetheredTo.position));

  const source =
    player.tetherLength === "Long"
      ? player.position
      : player.position.translate(0, 0.05).rotate(angle, player.position);
  const angle2 = player.tetherLength === "Long" ? angle : Math.PI + angle;
  const t1 = source.translate(0, 0.05).rotate(angle2 + 0.5, source);
  const t2 = source.translate(0, 0.05).rotate(angle2 - 0.5, source);

  const tetheredSource =
    player.tetherLength === "Long"
      ? tetheredTo.position
      : tetheredTo.position
          .translate(0, 0.05)
          .rotate(Math.PI + angle, tetheredTo.position);
  const s1 = tetheredSource
    .translate(0, 0.05)
    .rotate(Math.PI + angle2 + 0.5, tetheredSource);
  const s2 = tetheredSource
    .translate(0, 0.05)
    .rotate(Math.PI + angle2 - 0.5, tetheredSource);

  const safe = isTetherSafe(player, tetheredTo);
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
        x2={halfwayX}
        y2={halfwayY}
        strokeWidth={0.01}
        stroke={safe ? "blue" : player.debuff === "Dark" ? "purple" : "yellow"}
      />
      {!safe && (
        <>
          <line
            x1={source.x}
            y1={source.y}
            x2={t1.x}
            y2={t1.y}
            strokeWidth={0.01}
            stroke={
              safe ? "blue" : player.debuff === "Dark" ? "purple" : "yellow"
            }
          />
          <line
            x1={source.x}
            y1={source.y}
            x2={t2.x}
            y2={t2.y}
            strokeWidth={0.01}
            stroke={
              safe ? "blue" : player.debuff === "Dark" ? "purple" : "yellow"
            }
          />
        </>
      )}
      <line
        x1={tetheredTo.position.x}
        y1={tetheredTo.position.y}
        x2={halfwayX}
        y2={halfwayY}
        strokeWidth={0.01}
        stroke={
          safe ? "blue" : tetheredTo.debuff === "Dark" ? "purple" : "yellow"
        }
      />
      {!safe && (
        <>
          <line
            x1={tetheredSource.x}
            y1={tetheredSource.y}
            x2={s1.x}
            y2={s1.y}
            strokeWidth={0.01}
            stroke={
              safe ? "blue" : tetheredTo.debuff === "Dark" ? "purple" : "yellow"
            }
          />
          <line
            x1={tetheredSource.x}
            y1={tetheredSource.y}
            x2={s2.x}
            y2={s2.y}
            strokeWidth={0.01}
            stroke={
              safe ? "blue" : tetheredTo.debuff === "Dark" ? "purple" : "yellow"
            }
          />
        </>
      )}
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
