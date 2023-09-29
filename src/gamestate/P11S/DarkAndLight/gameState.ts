import { Player } from "../../Player";
import {
  GameState,
  Position,
  Role,
  distanceTo,
  getRandomPos,
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
  tetheredRole: Role;
};

export type DarkAndLightGameState = GameState & {
  bossColour: "Dark" | "Light" | null;
};

export const isTetherSafe = (
  p1: DarkAndLightPlayer,
  p2: DarkAndLightPlayer
) => {
  const d = distanceTo(p1.position, p2.position);

  return p1.debuff === p2.debuff ? d > 0.34 : d < 0.17;
};

export const createPlayer = (role: Role): DarkAndLightPlayer => {
  return {
    role: role,
    position: getRandomPos(),
    debuff: Math.random() <= 0.5 ? "Light" : "Dark",
    tetherLength: Math.random() <= 0.5 ? "Long" : "Short",
    tetheredRole:
      role === "DPS" ? (Math.random() <= 0.5 ? "Tank" : "Healer") : "DPS",
  };
};

export const createPartner = (
  player: DarkAndLightPlayer
): DarkAndLightPlayer => {
  return {
    role: player.tetheredRole,
    position: getRandomPos(),
    debuff:
      player.tetherLength === "Long"
        ? player.debuff
        : player.debuff === "Dark"
        ? "Light"
        : "Dark",
    tetherLength: player.tetherLength,
    tetheredRole: player.role,
  };
};

export const getDefaultPos = (player: DarkAndLightPlayer): Position => {
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
  if (player.tetheredRole === "Tank" && player.tetherLength === "Short") {
    return Marker4;
  }
  if (player.tetheredRole === "Tank" && player.tetherLength === "Long") {
    return Marker3;
  }
  if (player.tetheredRole === "Healer" && player.tetherLength === "Short") {
    return Marker2;
  }
  if (player.tetheredRole === "Healer" && player.tetherLength === "Long") {
    return Marker1;
  }
  throw "Something went wrong";
};
