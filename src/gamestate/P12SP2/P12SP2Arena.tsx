/// <reference types="vite-plugin-svgr/client" />

import { PropsWithChildren } from "react";
import arenaPng from "./assets/arena.png";
import { Point, point } from "@flatten-js/core";
import { Arena, PlayerWithMarker } from "../../components/Arena";
import { Waymark, WaymarkDisplay } from "../Waymark";
import { Mechanic } from "../mechanics";

export const P12SP2Waymarks: { [w in Waymark]: Point } = {
  "Waymark A": point((100 - 80) / 40, (89 - 70) / 40),
  "Waymark B": point((104 - 80) / 40, (93 - 70) / 40),
  "Waymark C": point((100 - 80) / 40, (97 - 70) / 40),
  "Waymark D": point((96 - 80) / 40, (93 - 70) / 40),
  "Waymark 1": point((87 - 80) / 40, (93 - 70) / 40),
  "Waymark 2": point((113 - 80) / 40, (93 - 70) / 40),
  "Waymark 3": point((92 - 80) / 40, (92 - 70) / 40),
  "Waymark 4": point((108 - 80) / 40, (92 - 70) / 40),
};

export const P12P2Arena = (
  props: PropsWithChildren<{
    players: PlayerWithMarker[];
    moveTo: (p: Point) => void;
    mechanic: Mechanic<PlayerWithMarker>;
    showCaloricGrid?: boolean;
  }>
) => {
  return (
    <Arena
      mechanic={props.mechanic}
      moveTo={props.moveTo}
      players={props.players}
      showPartyList
    >
      <img src={arenaPng} height="100%" width="100%"></img>
      {props.showCaloricGrid && (
        <svg
          height="100%"
          width="100%"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
          }}
          viewBox="0 0 1 1"
        >
          <>
            {[1, 2, 3, 4, 5].map((i) => {
              const x = i / 5.65 - 0.03;
              return (
                <line
                  key={i}
                  x1={x}
                  y1={0.25}
                  x2={x}
                  y2={1}
                  stroke="lightblue"
                  strokeWidth={0.005}
                />
              );
            })}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
              const y = i / 10 + 11 / 40;
              return (
                <line
                  key={i}
                  x1={0}
                  y1={y}
                  x2={1}
                  y2={y}
                  stroke="lightblue"
                  strokeWidth={0.005}
                />
              );
            })}
          </>
        </svg>
      )}
      {Object.entries(P12SP2Waymarks).map(([w, p]) => (
        <WaymarkDisplay
          key={w}
          waymark={{ waymark: w as Waymark, position: p }}
        />
      ))}
      {props.children}
    </Arena>
  );
};
