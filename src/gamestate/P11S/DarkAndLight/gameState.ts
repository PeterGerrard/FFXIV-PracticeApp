import { Point } from "@flatten-js/core";
import { Player } from "../../Player";
import {
  Cast,
  Designation,
  distanceTo,
  getRandomPos,
  getRole,
} from "../../gameState";
import {
  Marker1,
  Marker2,
  Marker3,
  Marker4,
  MarkerA,
  MarkerB,
  MarkerC,
  MarkerD,
} from "../p11sMarkers";

export type DarkAndLightPlayer = Player & {
  debuff: "Light" | "Dark";
  tetherLength: "Short" | "Long";
  tetheredDesignation: Designation;
};

export type DarkAndLightGameState = {
  hasFinished: boolean;
  cast: Cast | null;
  bossColour: "Dark" | "Light" | null;
};

export const isTetherSafe = (
  p1: DarkAndLightPlayer,
  p2: DarkAndLightPlayer
) => {
  const d = distanceTo(p1.position, p2.position);

  return p1.debuff === p2.debuff ? d > 0.34 : d < 0.17;
};

export const createPlayer = (
  designation: Designation,
  debuff: "Dark" | "Light",
  targetDesignation: Designation,
  targetDebuff: "Dark" | "Light",
  controlled: boolean
): DarkAndLightPlayer => {
  const role = getRole(designation);
  return {
    role: role,
    position: getRandomPos(),
    debuff: debuff,
    tetherLength: debuff == targetDebuff ? "Long" : "Short",
    tetheredDesignation: targetDesignation,
    debuffs: [],
    controlled: controlled,
    designation: designation,
    alive: true,
    distanceTravelled: 0,
  };
};

export const getDefaultPos = (player: DarkAndLightPlayer): Point => {
  if (player.role === "Healer" && player.tetherLength === "Short") {
    return MarkerB;
  }
  if (player.role === "Healer" && player.tetherLength === "Long") {
    return MarkerC;
  }
  if (player.role === "Tank" && player.tetherLength === "Short") {
    return MarkerD;
  }
  if (player.role === "Tank" && player.tetherLength === "Long") {
    return MarkerA;
  }
  if (
    getRole(player.tetheredDesignation) === "Tank" &&
    player.tetherLength === "Short"
  ) {
    return Marker4;
  }
  if (
    getRole(player.tetheredDesignation) === "Tank" &&
    player.tetherLength === "Long"
  ) {
    return Marker3;
  }
  if (
    getRole(player.tetheredDesignation) === "Healer" &&
    player.tetherLength === "Short"
  ) {
    return Marker2;
  }
  if (
    getRole(player.tetheredDesignation) === "Healer" &&
    player.tetherLength === "Long"
  ) {
    return Marker1;
  }
  throw "Something went wrong";
};
