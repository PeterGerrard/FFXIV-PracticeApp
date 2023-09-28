import { GameState, Player, Position, Role } from "../gameState";

export type DarkAndLightPlayer = Player & {
  debuff: "Light" | "Dark";
  tetherLength: "Short" | "Long";
  tetheredRole: Role;
};

export type DarkAndLightGameState = GameState & {
  bossColour: "Dark" | "Light" | null;
};

export const MarkerA: Position = [0.498, 0.206];
export const Marker1: Position = [0.714, 0.289];
export const MarkerB: Position = [0.664, 0.502];
export const Marker2: Position = [0.617, 0.621];
export const MarkerC: Position = [0.498, 0.816];
export const Marker3: Position = [0.278, 0.719];
export const MarkerD: Position = [0.332, 0.502];
export const Marker4: Position = [0.383, 0.391];

export const distanceTo = (source: Position, target: Position) =>
  Math.sqrt(
    Math.pow(target[0] - source[0], 2) + Math.pow(target[1] - source[1], 2)
  );

export const isTetherSafe = (
  p1: DarkAndLightPlayer,
  p2: DarkAndLightPlayer
) => {
  const d = distanceTo(p1.position, p2.position);

  return p1.debuff === p2.debuff ? d > 0.34 : d < 0.17;
};

export const getRandomPos = (): Position => {
  const p: Position = [Math.random(), Math.random()];
  if (distanceTo(p, [0.5, 0.5]) < 0.35) {
    return p;
  }
  return getRandomPos();
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
