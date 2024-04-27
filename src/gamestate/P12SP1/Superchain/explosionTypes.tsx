import circlePng from "./assets/circle.png";
import donutPng from "./assets/donut.png";
import proteanPng from "./assets/protean.png";
import pairPng from "./assets/pair.png";
import { Player } from "../../Player";
import { Point, point, vector } from "@flatten-js/core";
import { Mechanic, composeMechanics } from "../../mechanics";
import { circleMechanic } from "../../Mechanics/CircleAoE";
import {
  SimpleHeavyDamageProfile,
  SimpleKillProfile,
} from "../../Mechanics/DangerPuddles";
import { donutMechanic } from "../../Mechanics/DonutAoE";
import { coneMechanic } from "../../Mechanics/ConeAoE";

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
): Mechanic<Player> => {
  switch (explosion) {
    case "Circle":
      return circleMechanic(position, 0.2, SimpleKillProfile);
    case "Donut":
      return donutMechanic(position, 0.2, 5, SimpleKillProfile);
    case "Protean":
      return composeMechanics(
        players.map((a) =>
          coneMechanic(
            position,
            vector(position, point(position.x, position.y - 1)).angleTo(
              vector(position, a.position)
            ),
            Math.PI / 6,
            SimpleHeavyDamageProfile
          )
        )
      );
    case "Pair":
      return composeMechanics(
        players
          .filter((x) => x.role !== "DPS")
          .map((a) =>
            coneMechanic(
              position,
              vector(position, point(position.x, position.y - 1)).angleTo(
                vector(position, a.position)
              ),
              Math.PI / 3,
              {
                split: true,
                damage: 1.6,
                roleRequirement: null,
                debuffRequirement: null,
                instaKill: null,
              }
            )
          )
      );
  }
};

export const getSuperChainDangerPuddles = (
  explosions: SuperchainExplosion[],
  position: Point,
  players: Player[]
): Mechanic<Player> => {
  const xs = explosions.flatMap((e) => getDangerInfo(e, position, players));
  return composeMechanics(xs);
};
