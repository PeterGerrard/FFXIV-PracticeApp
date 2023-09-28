/// <reference types="vite-plugin-svgr/client" />

import { PropsWithChildren, Ref, forwardRef } from "react";
import arenaPng from "../DarkAndLight/assets/arena.png";
import healerPng from "../DarkAndLight/assets/healer.png";
import dpsPng from "../DarkAndLight/assets/dps.png";
import tankPng from "../DarkAndLight/assets/tank.png";
import skullPng from "../DarkAndLight/assets/Skull_and_Crossbones.png";
import { Position, Player } from "..";
import { LetterOfTheLawPlayer } from "./gameState";
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

export const Arena = forwardRef(
  (
    props: PropsWithChildren<{
      player: LetterOfTheLawPlayer;
      isDead: boolean;
      moveTo: (p: Position) => void;
      bossColour: "Dark" | "Light";
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
          <Player ref={ref} player={props.player} isDead={props.isDead} />
          {props.children}
        </>
      </div>
    );
  }
);
