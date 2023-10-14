import { Point } from "@flatten-js/core";
import { DangerPuddle, survivePuddles } from "../../../Mechanics/DangerPuddles";
import { GameLoop, getRole } from "../../../gameState";
import { Arena } from "../Arena";
import {
  DarkAndLightPlayer,
  DarkAndLightGameState,
  getDefaultPos,
  isTetherSafe,
} from "../gameState";
import { Marker3, Marker1, MarkerB, MarkerD } from "../../p11sMarkers";

const getSafeSpot1 = (
  player: DarkAndLightPlayer,
  bossColour: "Dark" | "Light"
): Point => {
  const short = player.tetherLength === "Short";
  const leftSafe = new Point(0.2, 0.5);
  const rightSafe = new Point(0.8, 0.5);
  if (
    short &&
    (player.role === "Healer" ||
      getRole(player.tetheredDesignation) === "Healer")
  ) {
    return bossColour === "Light"
      ? rightSafe
      : new Point(rightSafe.x, Marker3.y);
  }
  if (
    !short &&
    (player.role === "Tank" || getRole(player.tetheredDesignation) === "Healer")
  ) {
    return bossColour === "Light"
      ? rightSafe
      : new Point(rightSafe.x, Marker1.y);
  }

  if (short) {
    return bossColour === "Light" ? leftSafe : new Point(leftSafe.x, Marker1.y);
  }

  return bossColour === "Light" ? leftSafe : new Point(leftSafe.x, Marker3.y);
};

const getSafeSpot2 = (
  player: DarkAndLightPlayer,
  bossColour: "Dark" | "Light"
): Point => {
  const short = player.tetherLength === "Short";
  if (bossColour === "Light") {
    const leftSafe = new Point(0.18, 0.5);
    const rightSafe = new Point(0.82, 0.5);
    if (
      short &&
      (player.role === "Healer" ||
        getRole(player.tetheredDesignation) === "Healer")
    ) {
      return rightSafe;
    }
    if (
      !short &&
      (player.role === "Tank" ||
        getRole(player.tetheredDesignation) === "Healer")
    ) {
      return rightSafe;
    }

    if (short) {
      return leftSafe;
    }

    return leftSafe;
  }

  if (
    short &&
    (player.role === "Healer" ||
      getRole(player.tetheredDesignation) === "Healer")
  ) {
    return new Point(MarkerB.x, Marker3.y);
  }
  if (
    !short &&
    (player.role === "Tank" || getRole(player.tetheredDesignation) === "Healer")
  ) {
    return new Point(MarkerB.x, Marker1.y);
  }

  if (short) {
    return new Point(MarkerD.x, Marker1.y);
  }

  return new Point(MarkerD.x, Marker3.y);
};

export type DivisiveOverrulingGameState = DarkAndLightGameState & {
  stage: "Before" | "Explosion1" | "Explosion2";
};

export const initialDivisiveState = (
  players: DarkAndLightPlayer[]
): DivisiveOverrulingGameState => ({
  bossColour: null,
  cast: null,
  players: players,
  hasFinished: false,
  stage: "Before",
});

const getDangerPuddles = (
  gameState: DivisiveOverrulingGameState
): DangerPuddle[] => {
  if (gameState.stage === "Explosion1") {
    return [
      {
        type: "line",
        angle: Math.PI,
        onAnimationEnd: () => {},
        source: new Point(0.5, 1),
        width: 0.4,
        colour: gameState.bossColour === "Dark" ? "purple" : "yellow",
        split: null,
        roleRequirement: null,
        debuffRequirement: null,
        instaKill: null,
      },
    ];
  }
  if (gameState.stage === "Explosion2") {
    if (gameState.bossColour === "Dark") {
      return [
        {
          type: "line",
          angle: Math.PI,
          onAnimationEnd: () => {},
          source: new Point(0.15, 1),
          width: 0.3,
          colour: "purple",
          split: null,
          roleRequirement: null,
          debuffRequirement: null,
          instaKill: null,
        },
        {
          type: "line",
          angle: Math.PI,
          onAnimationEnd: () => {},
          source: new Point(0.85, 1),
          width: 0.3,
          colour: "purple",
          split: null,
          roleRequirement: null,
          debuffRequirement: null,
          instaKill: null,
        },
      ];
    } else {
      return [
        {
          type: "line",
          angle: Math.PI,
          onAnimationEnd: () => {},
          source: new Point(0.5, 1),
          width: 0.6,
          colour: "yellow",
          split: null,
          roleRequirement: null,
          debuffRequirement: null,
          instaKill: null,
        },
      ];
    }
  }
  return [];
};

export const DivisiveOverrulingState: GameLoop<
  DarkAndLightPlayer,
  DivisiveOverrulingGameState
> = {
  arena: (
    gameState: DivisiveOverrulingGameState,
    moveTo: (p: Point) => void
  ) => (
    <Arena
      players={gameState.players}
      bossColour={gameState.bossColour}
      dangerPuddles={getDangerPuddles(gameState)}
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
        players: gameState.players,
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
  applyDamage: (
    gameState: DivisiveOverrulingGameState
  ): DivisiveOverrulingGameState => {
    const survivingPlayers = survivePuddles(
      getDangerPuddles(gameState),
      gameState.players
    );
    return {
      ...gameState,
      players: gameState.players.map((p) => ({
        ...p,
        alive:
          survivingPlayers.includes(p.designation) &&
          isTetherSafe(
            p,
            gameState.players.filter(
              (o) => o.designation === p.tetheredDesignation
            )[0]
          ),
      })),
    };
  },
  getSafeSpot: (
    gameState: DivisiveOverrulingGameState,
    player: DarkAndLightPlayer
  ): Point => {
    if (!gameState.bossColour) return getDefaultPos(player);
    if (gameState.stage === "Explosion1")
      return getSafeSpot1(player, gameState.bossColour);
    if (gameState.stage === "Explosion2")
      return getSafeSpot2(player, gameState.bossColour);
    return getDefaultPos(player);
  },
};
