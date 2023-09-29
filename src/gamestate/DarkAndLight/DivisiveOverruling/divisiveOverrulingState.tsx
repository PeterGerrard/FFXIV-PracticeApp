import { Position } from "../..";
import { DangerPuddles, survivePuddles } from "../../Mechanics/DangerPuddles";
import { FinalLoop } from "../../gameState";
import { Marker3, Marker1, MarkerB, MarkerD } from "../../p11sMarkers";
import { Arena } from "../Arena";
import {
  getDefaultPos,
  DarkAndLightPlayer,
  DarkAndLightGameState,
} from "../gameState";

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

export type DivisiveOverrulingGameState = DarkAndLightGameState & {
  stage: "Before" | "Explosion1" | "Explosion2";
};

export const initialDivisiveState: DivisiveOverrulingGameState = {
  bossColour: null,
  cast: null,
  hasFinished: false,
  stage: "Before",
};

const getDangerPuddles = (
  gameState: DivisiveOverrulingGameState
): DangerPuddles => {
  if (gameState.stage === "Explosion1") {
    return {
      puddles: [
        {
          type: "line",
          angle: 0,
          onAnimationEnd: () => {},
          source: [0.5, 1],
          width: 0.4,
          colour: gameState.bossColour === "Dark" ? "purple" : "yellow",
        },
      ],
      survivable: 0,
    };
  }
  if (gameState.stage === "Explosion2") {
    if (gameState.bossColour === "Dark") {
      return {
        puddles: [
          {
            type: "line",
            angle: 0,
            onAnimationEnd: () => {},
            source: [0.15, 1],
            width: 0.3,
            colour: "purple",
          },
          {
            type: "line",
            angle: 0,
            onAnimationEnd: () => {},
            source: [0.85, 1],
            width: 0.3,
            colour: "purple",
          },
        ],
        survivable: 0,
      };
    } else {
      return {
        puddles: [
          {
            type: "line",
            angle: 0,
            onAnimationEnd: () => {},
            source: [0.5, 1],
            width: 0.6,
            colour: "yellow",
          },
        ],
        survivable: 0,
      };
    }
  }
  return { puddles: [], survivable: 0 };
};

export const DivisiveOverrulingState: FinalLoop<
  DarkAndLightPlayer,
  DivisiveOverrulingGameState
> = {
  arena: (
    player: DarkAndLightPlayer,
    otherPlayers: DarkAndLightPlayer[],
    isDead: boolean,
    gameState: DivisiveOverrulingGameState,
    moveTo: (p: Position) => void
  ) => (
    <Arena
      player={player}
      otherPlayer={otherPlayers[0]}
      bossColour={gameState.bossColour}
      dangerPuddles={getDangerPuddles(gameState)}
      isDead={isDead}
      moveTo={moveTo}
    >
      {gameState.hasFinished && (
        <h1
          style={{
            position: "absolute",
            left: `50%`,
            top: `50%`,
            transformOrigin: "0 0",
            transform: `translate(-50%,0)`,
            fontSize: "10rem",
            color: "hotpink",
          }}
        >
          Finished!
        </h1>
      )}
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
  isSafe: (
    gameState: DivisiveOverrulingGameState,
    player: DarkAndLightPlayer
  ) => {
    return survivePuddles(getDangerPuddles(gameState), player.position);
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
