/// <reference types="vite-plugin-svgr/client" />

import { PropsWithChildren, Ref, forwardRef, useRef } from "react";
import arenaPng from "./assets/arena.png";
import healerPng from "./assets/healer.png";
import dpsPng from "./assets/dps.png";
import tankPng from "./assets/tank.png";
import skullPng from "./assets/Skull_and_Crossbones.png";
import { ReactComponent as ForwardArrowSvg } from "./assets/forward-arrow.svg";
import { ReactComponent as BackwardArrowSvg } from "./assets/backward-arrow.svg";

import Xarrow from "react-xarrows";
import { Position, Player } from "..";
import { DarkAndLightPlayer, isTetherSafe } from "./gameState";
import { Themis } from "../Themis";

// helper function to get an element's exact position
function getPosition(e: HTMLElement): Position {
  let el: HTMLElement | null = e;
  var xPosition = 0;
  var yPosition = 0;
  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
      var yScrollPos = el.scrollTop || document.documentElement.scrollTop;
      xPosition += el.offsetLeft - xScrollPos + el.clientLeft;
      yPosition += el.offsetTop - yScrollPos + el.clientTop;
    } else {
      xPosition += el.offsetLeft - el.scrollLeft + el.clientLeft;
      yPosition += el.offsetTop - el.scrollTop + el.clientTop;
    }
    el = el.offsetParent as HTMLElement | null;
  }
  return [xPosition, yPosition];
}

const Player = forwardRef(
  (props: { player: Player; isDead: boolean }, ref: Ref<HTMLImageElement>) => {
    return (
      <img
        ref={ref}
        src={
          props.isDead
            ? skullPng
            : props.player.role === "Healer"
            ? healerPng
            : props.player.role === "Tank"
            ? tankPng
            : dpsPng
        }
        style={{
          position: "absolute",
          left: `${props.player.position[0] * 100}%`,
          top: `${props.player.position[1] * 100}%`,
          height: "80px",
          width: "80px",
          transform: "translate(-50%, -50%)",
        }}
      ></img>
    );
  }
);

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
    moveTo: (p: Position) => void;
  }>
) => {
  const playerRef = useRef<HTMLImageElement>(null);
  const tetheredRef = useRef<HTMLImageElement>(null);

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        overflow: "hidden",
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
        <Player ref={tetheredRef} player={props.otherPlayer} isDead={false} />
        <Player ref={playerRef} player={props.player} isDead={props.isDead} />
        {!props.isDead && (
          <Tether
            playerRef={playerRef}
            tetheredRef={tetheredRef}
            player={props.player}
            tetheredTo={props.otherPlayer}
          />
        )}
        {props.children}
      </>
    </div>
  );
};