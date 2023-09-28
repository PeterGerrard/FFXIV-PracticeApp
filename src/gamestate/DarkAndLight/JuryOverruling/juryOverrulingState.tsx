import { Position } from "../..";
import { Loop, distanceTo } from "../../gameState";
import { Arena } from "../Arena";
import { DivisiveOverrulingState } from "../DivisiveOverruling/divisiveOverrulingState";
import {
  MarkerC,
  MarkerA,
  Marker1,
  Marker3,
  getDefaultPos,
  DarkAndLightPlayer,
  DarkAndLightGameState,
} from "../gameState";
import { JuryOverrulingInitialExplosionOverlay } from "./JuryExplosionInitialOverlay";
import { JuryOverrulingPostExplosionOverlay } from "./JuryExplosionPostOverlay";

const getSafeSpot = (
  player: DarkAndLightPlayer,
  bossColour: "Dark" | "Light"
): Position => {
  const short = player.tetherLength === "Short";
  if (bossColour === "Dark") {
    if (
      short &&
      (player.role === "Healer" || player.tetheredRole === "Healer")
    ) {
      return MarkerC;
    }
    if (short && (player.role === "Tank" || player.tetheredRole === "Tank")) {
      return MarkerA;
    }

    if (player.role === "Tank" || player.tetheredRole === "Healer") {
      return Marker1;
    }
    return Marker3;
  } else {
    const leftSafe: Position = [0.2, 0.5];
    const rightSafe: Position = [0.8, 0.5];
    if (
      short &&
      (player.role === "Healer" || player.tetheredRole === "Healer")
    ) {
      return rightSafe;
    }
    if (
      !short &&
      (player.role === "Tank" || player.tetheredRole === "Healer")
    ) {
      return rightSafe;
    }

    return leftSafe;
  }
};

export type JuryOverrulingGameState = DarkAndLightGameState & {
  explosions: "Before" | "Lines" | "Move" | "AOE";
};

export const initialJuryOverrullingState: JuryOverrulingGameState = {
  bossColour: null,
  cast: null,
  explosions: "Before",
  hasFinished: false,
};

export const JuryOverrulingState: Loop<
  DarkAndLightPlayer,
  JuryOverrulingGameState,
  typeof DivisiveOverrulingState
> = {
  arena: (
    player: DarkAndLightPlayer,
    otherPlayers: DarkAndLightPlayer[],
    isDead: boolean,
    gameState: JuryOverrulingGameState,
    moveTo: (p: Position) => void,
    animationEnd: () => void
  ) => (
    <Arena
      player={player}
      otherPlayer={otherPlayers[0]}
      bossColour={gameState.bossColour}
      isDead={isDead}
      moveTo={moveTo}
    >
      <>
      {gameState.bossColour && gameState.explosions === "Lines" && (
        <JuryOverrulingInitialExplosionOverlay
          bossColour={gameState.bossColour}
          animationEnd={animationEnd}
        />
      )}
      {gameState.bossColour && gameState.explosions === "AOE" && (
        <JuryOverrulingPostExplosionOverlay
          bossColour={gameState.bossColour}
          animationEnd={animationEnd}
        />
      )}
    </>
    </Arena>
  ),
  nextState: (gameState: JuryOverrulingGameState): JuryOverrulingGameState => {
    if (gameState.cast === null) {
      return {
        bossColour: Math.random() < 0.5 ? "Dark" : "Light",
        cast: {
          name: "Jury Overruling",
          value: 100,
        },
        explosions: "Lines",
        hasFinished: false,
      };
    }
    if (gameState.explosions === "Lines") {
      return {
        ...gameState,
        explosions: "Move",
      };
    }
    if (gameState.explosions === "Move") {
      return {
        ...gameState,
        explosions: "AOE",
        hasFinished: true,
      };
    }
    return {
      ...gameState,
      hasFinished: true,
    };
  },
  isSafe: (gameState: JuryOverrulingGameState, player: DarkAndLightPlayer) => {
    if (!gameState.bossColour) return true;
    if (gameState.explosions === "AOE")
      return (
        distanceTo(player.position, getSafeSpot(player, gameState.bossColour)) <
        0.1
      );
    if (gameState.explosions === "Lines")
      return distanceTo(player.position, getDefaultPos(player)) < 0.1;
    return true;
  },

  getSafeSpot: (
    gameState: JuryOverrulingGameState,
    player: DarkAndLightPlayer
  ): Position => {
    if (!gameState.bossColour) return getDefaultPos(player);
    if (gameState.explosions === "AOE")
      return getSafeSpot(player, gameState.bossColour);
    return getDefaultPos(player);
  },

  nextLoop: DivisiveOverrulingState,
};
