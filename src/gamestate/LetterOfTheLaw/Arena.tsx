/// <reference types="vite-plugin-svgr/client" />

import { PropsWithChildren } from "react";
import arenaPng from "../DarkAndLight/assets/arena.png";
import healerPng from "../DarkAndLight/assets/healer.png";
import dpsPng from "../DarkAndLight/assets/dps.png";
import tankPng from "../DarkAndLight/assets/tank.png";
import skullPng from "../DarkAndLight/assets/Skull_and_Crossbones.png";
import bossPng from "../DarkAndLight/assets/boss.png";
import { Position, Player } from "..";
import { LetterOfTheLawPlayer } from "./gameState";
import { InterCardinal } from "../gameState";
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

const addPosition = (pos: InterCardinal): Position => {
  switch (pos) {
    case "North East":
      return [0.875, 0.125];
    case "South East":
      return [0.875, 0.875];
    case "South West":
      return [0.125, 0.875];
    case "North West":
      return [0.125, 0.125];
  }
};

const Add = (props: { pos: Position }) => (
  <img
    src={bossPng}
    height="15%"
    width="15%"
    style={{
      position: "absolute",
      left: `${props.pos[0] * 100}%`,
      top: `${props.pos[1] * 100}%`,
      transform: "translate(-50%, -50%)",
    }}
  ></img>
);

export const Arena = (
  props: PropsWithChildren<{
    player: LetterOfTheLawPlayer;
    isDead: boolean;
    moveTo: (p: Position) => void;
    adds: InterCardinal[];
    bossColour: "Dark" | "Light";
  }>
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
        {props.adds.map((a) => (
          <Add key={a} pos={addPosition(a)} />
        ))}
        <Themis bossColour={props.bossColour} />
        <Player player={props.player} isDead={props.isDead} />
        {props.children}
      </>
    </div>
  );
};
