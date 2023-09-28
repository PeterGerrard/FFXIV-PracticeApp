import {
  Action,
  GameState,
  Marker1,
  Marker2,
  Marker3,
  Marker4,
  MarkerA,
  MarkerB,
  MarkerC,
  MarkerD,
  Position,
  Role,
  distanceTo,
} from "./gameState";

type Positions1GameState = GameState & { stage: "positions1" };

const getCorrectPos = (
  role: Role,
  tether: "Short" | "Long",
  tetheredRole: Role
): Position => {
  if (role === "Healer" && tether === "Short") {
    return MarkerB;
  }
  if (role === "Healer" && tether === "Long") {
    return MarkerC;
  }
  if (role === "Tank" && tether === "Short") {
    return MarkerD;
  }
  if (role === "Tank" && tether === "Long") {
    return MarkerA;
  }
  if (tetheredRole === "Tank" && tether === "Short") {
    return Marker4;
  }
  if (tetheredRole === "Tank" && tether === "Long") {
    return Marker3;
  }
  if (tetheredRole === "Healer" && tether === "Short") {
    return Marker2;
  }
  if (tetheredRole === "Healer" && tether === "Long") {
    return Marker1;
  }
  throw "Something went wrong";
};

const move = (
  gameState: Positions1GameState,
  position: Position
): GameState => {
  const safeLocation = getCorrectPos(
    gameState.player.role,
    gameState.player.debuff === gameState.tetheredTo.debuff ? "Long" : "Short",
    gameState.tetheredTo.role
  );
  if (distanceTo(position, safeLocation) < 0.1) {
    return {
      stage: "revelation",
      player: {
        ...gameState.player,
        position: position,
      },
      tetheredTo: {
        ...gameState.tetheredTo,
        position: getCorrectPos(
          gameState.tetheredTo.role,
          gameState.player.debuff === gameState.tetheredTo.debuff
            ? "Long"
            : "Short",
          gameState.player.role
        ),
      },
      bossColour: Math.random() < 0.5 ? "Dark" : "Light",
      topBomb: Math.random() < 0.5 ? "Dark" : "Light",
    };
  } else {
    return {
      stage: "dead",
      player: {
        ...gameState.player,
        alive: false,
        position: position,
      },
      tetheredTo: {
        ...gameState.tetheredTo,
        alive: false,
        position: getCorrectPos(
          gameState.tetheredTo.role,
          gameState.player.debuff === gameState.tetheredTo.debuff
            ? "Long"
            : "Short",
          gameState.player.role
        ),
      },
      safeLocation,
    };
  }
};

export const positions1Reducer = (
  gameState: Positions1GameState,
  action: Action
): GameState | undefined => {
  if (action.type === "MOVE") {
    return move(gameState, action.target);
  }
  return undefined;
};
