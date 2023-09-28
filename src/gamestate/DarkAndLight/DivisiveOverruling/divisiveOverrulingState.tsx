import { Player, Position } from "../..";
import { FinalLoop } from "../../gameState";
import { Arena } from "../Arena";
import {
  Marker3,
  Marker1,
  MarkerB,
  MarkerD,
  getDefaultPos,
  DarkAndLightPlayer,
  DarkAndLightGameState,
} from "../gameState";
import { DisvisiveOverrulingInitialExplosionOverlay } from "./DivisiveOverullingInitialExplosionOverlay";
import { EndOverlay } from "./EndOverlay";

const getSafeSpot1 = (
  player: DarkAndLightPlayer,
  bossColour: "Dark" | "Light"
): Position => {
  const short = player.tetherLength === "Short";
  const leftSafe: Position = [0.2, 0.5];
  const rightSafe: Position = [0.8, 0.5];
  if (short && (player.role === "Healer" || player.tetheredRole === "Healer")) {
    return bossColour === "Light" ? rightSafe : [rightSafe[0], Marker3[1]];
  }
  if (!short && (player.role === "Tank" || player.tetheredRole === "Healer")) {
    return bossColour === "Light" ? rightSafe : [rightSafe[0], Marker1[1]];
  }

  if (short) {
    return bossColour === "Light" ? leftSafe : [leftSafe[0], Marker1[1]];
  }

  return bossColour === "Light" ? leftSafe : [leftSafe[0], Marker3[1]];
};

const getSafeSpot2 = (
  player: DarkAndLightPlayer,
  bossColour: "Dark" | "Light"
): Position => {
  const short = player.tetherLength === "Short";
  if (bossColour === "Light") {
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

    if (short) {
      return leftSafe;
    }

    return leftSafe;
  }

  if (short && (player.role === "Healer" || player.tetheredRole === "Healer")) {
    return [MarkerB[0], Marker3[1]];
  }
  if (!short && (player.role === "Tank" || player.tetheredRole === "Healer")) {
    return [MarkerB[0], Marker1[1]];
  }

  if (short) {
    return [MarkerD[0], Marker1[1]];
  }

  return [MarkerD[0], Marker3[1]];
};

const isSafe1 = (player: Player) => {
  return Math.abs(0.5 - player.position[0]) > 0.2;
};

const isSafe2 = (player: Player, bossColour: "Dark" | "Light") => {
  return (
    (bossColour === "Dark" && Math.abs(0.5 - player.position[0]) < 0.2) ||
    (bossColour === "Light" && Math.abs(0.5 - player.position[0]) > 0.3)
  );
};

export type DivisiveOverrulingGameState = DarkAndLightGameState & {
  stage: "Before" | "Explosion1" | "Explosion2";
};

export const initialDivisiveState: DivisiveOverrulingGameState = {
  bossColour: null,
  cast: null,
  hasFinished: false,
  stage: "Before",
};

export const DivisiveOverrulingState: FinalLoop<
  DarkAndLightPlayer,
  DivisiveOverrulingGameState
> = {
  arena: (
    player: DarkAndLightPlayer,
    otherPlayer: DarkAndLightPlayer,
    isDead: boolean,
    gameState: DivisiveOverrulingGameState,
    moveTo: (p: Position) => void
  ) => (
    <Arena
      player={player}
      otherPlayer={otherPlayer}
      bossColour={gameState.bossColour}
      isDead={isDead}
      moveTo={moveTo}
    >
      <>
        {gameState.stage === "Explosion1" && (
          <DisvisiveOverrulingInitialExplosionOverlay
            bossColour={gameState.bossColour!}
          />
        )}
        {gameState.stage === "Explosion2" && (
          <EndOverlay bossColour={gameState.bossColour!} />
        )}
      </>
    </Arena>
  ),
  nextState: (
    gameState: DivisiveOverrulingGameState
  ): DivisiveOverrulingGameState => {
    if (gameState.cast === null) {
      return {
        bossColour: Math.random() < 0.5 ? "Dark" : "Light",
        cast: {
          name: "Divisive Overruling",
          value: 50,
        },
        stage: "Before",
        hasFinished: false,
      };
    }
    if (gameState.stage === "Before") {
      return {
        ...gameState,
        cast: {
          name: "Divisive Overruling",
          value: 100,
        },
        stage: "Explosion1",
      };
    }
    if (gameState.stage === "Explosion1") {
      return {
        ...gameState,
        stage: "Explosion2",
        hasFinished: true,
      };
    }
    return {
      ...gameState,
      hasFinished: true,
    };
  },
  isSafe: (gameState: DivisiveOverrulingGameState, player: Player) => {
    if (!gameState.bossColour) return true;
    if (gameState.stage === "Explosion1") return isSafe1(player);
    if (gameState.stage === "Explosion2")
      return isSafe2(player, gameState.bossColour);
    return true;
  },
  getSafeSpot: (
    gameState: DivisiveOverrulingGameState,
    player: DarkAndLightPlayer
  ): Position => {
    if (!gameState.bossColour) return getDefaultPos(player);
    if (gameState.stage === "Explosion1")
      return getSafeSpot1(player, gameState.bossColour);
    if (gameState.stage === "Explosion2")
      return getSafeSpot2(player, gameState.bossColour);
    return getDefaultPos(player);
  },
};
