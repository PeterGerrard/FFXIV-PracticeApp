import circlePng from "./assets/circle.png";
import donutPng from "./assets/donut.png";
import proteanPng from "./assets/protean.png";
import pairPng from "./assets/pair.png";
import { DangerPuddle } from "../../Mechanics/DangerPuddles";
import { Player } from "../../Player";
import { Point, point, vector } from "@flatten-js/core";

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
  position: Point;
  target: Point;
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
          x1={props.position.x}
          y1={props.position.y}
          x2={props.target.x}
          y2={props.target.y}
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
          left: `${props.position.x * 100}%`,
          top: `${props.position.y * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
};

const getDangerInfo = (
  explosion: SuperchainExplosion,
  position: Point,
  players: Player[],
  animationEnd: () => void
): DangerPuddle[] => {
  switch (explosion) {
    case "Circle":
      return [
        {
          type: "circle",
          source: position,
          onAnimationEnd: animationEnd,
          radius: 0.2,
          survivable: 0,
          roleRequirement: null,
        },
      ];
    case "Donut":
      return [
        {
          type: "donut",
          source: position,
          onAnimationEnd: animationEnd,
          innerRadius: 0.2,
          outerRadius: 0.6,
          survivable: 0,
          roleRequirement: null,
        },
      ];
    case "Protean":
      return players.map((a) => ({
        type: "cone",
        source: position,
        onAnimationEnd: animationEnd,
        angle: vector(position, point(position.x, position.y + 1)).angleTo(
          vector(position, a.position)
        ),
        width: 30,
        survivable: 1,
        roleRequirement: null,
      }));
    case "Pair":
      return players
        .filter((x) => x.role !== "DPS")
        .map((a) => ({
          type: "cone",
          source: position,
          onAnimationEnd: animationEnd,
          angle: vector(position, point(position.x, position.y + 1)).angleTo(
            vector(position, a.position)
          ),
          width: 60,
          survivable: 1,
          roleRequirement: null,
        }));
  }
};

export const getSuperChainDangerPuddles = (
  explosions: SuperchainExplosion[],
  position: Point,
  players: Player[],
  animationEnd: () => void
): DangerPuddle[] => {
  const xs = explosions.map((e, i) =>
    getDangerInfo(e, position, players, i === 0 ? animationEnd : () => {})
  );
  return xs.flatMap((x) => x[0]);
};
