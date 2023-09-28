export type Role = "Tank" | "Healer" | "DPS";
export type Position = [number, number];

export type Player = {
  role: Role;
  position: Position;
  debuff: "Light" | "Dark";
  alive: boolean;
};

export type GameState =
  | {
      stage: "setup";
      role: Role;
    }
  | {
      stage: "positions1";
      player: Player;
      tetheredTo: Player;
    }
  | {
      stage: "revelation";
      player: Player;
      tetheredTo: Player;
      topBomb: "Light" | "Dark";
      bossColour: "Light" | "Dark";
    }
  | {
      stage: "positions2";
      player: Player;
      tetheredTo: Player;
    }
  | {
      stage: "jury-overruling";
      player: Player;
      tetheredTo: Player;
      bossColour: "Light" | "Dark";
    }
  | {
      stage: "positions3";
      player: Player;
      tetheredTo: Player;
    }
  | {
      stage: "divisive-overruling";
      player: Player;
      tetheredTo: Player;
      bossColour: "Light" | "Dark";
    }
  | {
      stage: "divisive-overruling-dark";
      player: Player;
      tetheredTo: Player;
    }
  | {
      stage: "end";
      player: Player;
      tetheredTo: Player;
    }
  | {
      stage: "dead";
      player: Player;
      tetheredTo: Player;
      safeLocation: Position;
    };

export type Action =
  | { type: "RESET" }
  | { type: "START" }
  | { type: "MOVE"; target: Position }
  | { type: "SELECTROLE"; role: Role };

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

export const isTetherSafe = (p1: Player, p2: Player) => {
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

export const defaultReducer = (
  gameState: GameState,
  action: Action
): GameState | undefined => {
  if (action.type === "RESET") {
    return {
      stage: "setup",
      role:
        gameState.stage === "setup" ? gameState.role : gameState.player.role,
    };
  }
  return undefined;
};
