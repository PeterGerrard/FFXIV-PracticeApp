import {
  IGameState,
  Marker1,
  Marker2,
  Marker3,
  Marker4,
  MarkerA,
  MarkerB,
  MarkerC,
  MarkerD,
  Player,
  Position,
  Role,
  distanceTo,
} from "./gameState";
import { RevelationState } from "./Revelation/revelationsState";

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

export class Positions1 implements IGameState {
  bossColour = null;
  cast = null;
  overlay = () => <></>;
  nextState = () => {
    return new RevelationState({
      bossColour: Math.random() < 0.5 ? "Dark" : "Light",
      topBomb: Math.random() < 0.5 ? "Dark" : "Light",
    });
  };
  isSafe = (player: Player) =>
    distanceTo(
      player.position,
      getCorrectPos(player.role, player.tetherLength, player.tetheredRole)
    ) < 0.1;
  getSafeSpot = (player: Player): Position =>
    getCorrectPos(player.role, player.tetherLength, player.tetheredRole);
}
