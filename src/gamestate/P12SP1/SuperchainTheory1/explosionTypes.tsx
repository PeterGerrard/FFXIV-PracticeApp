import { Position } from "../..";
import circlePng from "./assets/circle.png";
import donutPng from "./assets/donut.png";
import proteanPng from "./assets/protean.png";
import pairPng from "./assets/pair.png";
import { DangerPuddle, DangerPuddles } from "../../Mechanics/DangerPuddles";
import { Player } from "../../Player";
import { getAngle, translateSub } from "../../helpers";

export type SuperchainExplosion = "Circle" | "Donut" | "Protean" | "Pair";

const getSrc = (e: SuperchainExplosion): string => {
  switch (e) {
    case "Circle":
      return circlePng;
    case "Donut":
      return donutPng;
    case "Protean":
      return proteanPng;
    case "Pair":
      return pairPng;
  }
};

export const SuperchainExplosionDisplay = (props: {
  explosion: SuperchainExplosion;
  position: Position;
  target: Position;
}): JSX.Element => {
  return (
    <>
      <svg
        height="100%"
        width="100%"
        style={{
          position: "absolute",
          left: `0`,
          top: `0`,
        }}
        viewBox="0 0 1 1"
      >
        <line
          x1={props.position[0]}
          y1={props.position[1]}
          x2={props.target[0]}
          y2={props.target[1]}
          stroke="green"
          strokeWidth={0.01}
        />
      </svg>
      <img
        src={getSrc(props.explosion)}
        height="7.5%"
        width="7.5%"
        style={{
          position: "absolute",
          left: `${props.position[0] * 100}%`,
          top: `${props.position[1] * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
};

const getDangerInfo = (
  explosion: SuperchainExplosion,
  position: Position,
  players: Player[]
): [DangerPuddle[], number] => {
  switch (explosion) {
    case "Circle":
      return [
        [
          {
            type: "circle",
            source: position,
            onAnimationEnd: () => {},
            radius: 0.2,
          },
        ],
        0,
      ];
    case "Donut":
      return [
        [
          {
            type: "donut",
            source: position,
            onAnimationEnd: () => {},
            innerRadius: 0.2,
            outerRadius: 0.6,
          },
        ],
        0,
      ];
    case "Protean":
      return [
        players.map((a) => ({
          type: "cone",
          source: position,
          onAnimationEnd: () => {},
          angle: getAngle(translateSub(a.position, position)),
          width: 30,
        })),
        1,
      ];
    case "Pair":
      return [
        players
          .filter((x) => x.role !== "DPS")
          .map((a) => ({
            type: "cone",
            source: position,
            onAnimationEnd: () => {},
            angle: getAngle(translateSub(a.position, position)),
            width: 60,
          })),
        1,
      ];
  }
};

export const getSuperChainDangerPuddles = (
  explosions: SuperchainExplosion[],
  position: Position,
  players: Player[]
): DangerPuddles => {
  const xs = explosions.map((e) => getDangerInfo(e, position, players));
  return {
    puddles: xs.flatMap((x) => x[0]),
    survivable: xs.map((x) => x[1]).reduce((a, b) => a + b),
  };
};
