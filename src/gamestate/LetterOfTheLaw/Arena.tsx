/// <reference types="vite-plugin-svgr/client" />

import { PropsWithChildren } from "react";
import arenaPng from "../DarkAndLight/assets/arena.png";
import healerPng from "../DarkAndLight/assets/healer.png";
import dpsPng from "../DarkAndLight/assets/dps.png";
import tankPng from "../DarkAndLight/assets/tank.png";
import skullPng from "../DarkAndLight/assets/Skull_and_Crossbones.png";
import bossPng from "../DarkAndLight/assets/boss.png";
import indicatorPng from "../DarkAndLight/assets/indicator.png";
import { Position, Player } from "..";
import { LetterOfTheLawPlayer } from "./gameState";

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

const Player = (props: { player: Player; isDead: boolean }) => {
  return (
    <img
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
};
const Boss = () => (
  <>
    <img
      src={bossPng}
      height="25%"
      width="25%"
      style={{
        position: "absolute",
        left: `50%`,
        top: `50%`,
        transform: "translate(-50%, -50%)",
      }}
    ></img>
    <img
      src={indicatorPng}
      height="52%"
      width="52%"
      style={{
        position: "absolute",
        left: `50%`,
        top: `42.5%`,
        transform: "translate(-50%, -50%)",
      }}
    ></img>
  </>
);

export const Arena = (
  props: PropsWithChildren<{
    player: LetterOfTheLawPlayer;
    otherPlayer: LetterOfTheLawPlayer;
    isDead: boolean;
    moveTo: (p: Position) => void;
  }>
) => {
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
        <Boss />
        <Player player={props.otherPlayer} isDead={false} />
        {props.children}
      </>
    </div>
  );
};
