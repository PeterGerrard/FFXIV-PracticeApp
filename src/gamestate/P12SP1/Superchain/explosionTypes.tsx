import circlePng from "./assets/circle.png";
import donutPng from "./assets/donut.png";
import proteanPng from "./assets/protean.png";
import pairPng from "./assets/pair.png";
import { DangerPuddle } from "../../Mechanics/DangerPuddles";
import { Player } from "../../Player";
import { Point, point, vector } from "@flatten-js/core";

export type SuperchainExplosion = SuperchainExplosionInOut | "Protean" | "Pair";
export type SuperchainExplosionInOut = "Circle" | "Donut";

export const getSrc = (e: SuperchainExplosion): string => {
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
export const getChainColour = (e: SuperchainExplosion): string => {
  switch (e) {
    case "Circle":
      return "green";
    case "Donut":
      return "blue";
    case "Protean":
      return "orange";
    case "Pair":
      return "purple";
  }
};

const getDangerInfo = (
  explosion: SuperchainExplosion,
  position: Point,
  players: Player[]
): DangerPuddle[] => {
  switch (explosion) {
    case "Circle":
      return [
        {
          type: "circle",
          source: position,
          radius: 0.2,
          split: false,
          damage: 1,
          roleRequirement: null,
          debuffRequirement: null,
          instaKill: null,
        },
      ];
    case "Donut":
      return [
        {
          type: "donut",
          source: position,
          innerRadius: 0.2,
          outerRadius: 5,
          split: false,
          damage: 1,
          roleRequirement: null,
          debuffRequirement: null,
          instaKill: null,
        },
      ];
    case "Protean":
      return players.map((a) => ({
        type: "cone",
        source: position,
        angle: vector(position, point(position.x, position.y - 1)).angleTo(
          vector(position, a.position)
        ),
        width: Math.PI / 6,
        split: false,
        damage: 0.8,
        roleRequirement: null,
        debuffRequirement: null,
        instaKill: null,
      }));
    case "Pair":
      return players
        .filter((x) => x.role !== "DPS")
        .map((a) => ({
          type: "cone",
          source: position,
          angle: vector(position, point(position.x, position.y - 1)).angleTo(
            vector(position, a.position)
          ),
          width: Math.PI / 3,
          split: true,
          damage: 1.6,
          roleRequirement: null,
          debuffRequirement: null,
          instaKill: null,
        }));
  }
};

export const getSuperChainDangerPuddles = (
  explosions: SuperchainExplosion[],
  position: Point,
  players: Player[]
): DangerPuddle[] => {
  const xs = explosions.flatMap((e) => getDangerInfo(e, position, players));
  return xs;
};
