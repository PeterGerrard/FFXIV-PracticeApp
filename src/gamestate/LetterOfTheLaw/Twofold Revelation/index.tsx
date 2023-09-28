import { useRef, useState, useEffect } from "react";
import Xarrow, { useXarrow } from "react-xarrows";
import {
  InterCardinal,
  GameLoop1,
  distanceTo,
  Position,
  Cast,
  InterCardinals,
  getGroup,
  rotation,
} from "../../gameState";
import { Add } from "../Add";
import { Arena } from "../Arena";
import { LetterOfTheLawState, LetterOfTheLawPlayer } from "../gameState";
import Grow from "@mui/material/Grow";
import { Tower } from "./Tower";
import { pickOne } from "../../helpers";
import Slide from "@mui/material/Slide";

export type TwofoldRevelationState = LetterOfTheLawState & {
  bossColour: null;
} & (
    | {
        cast: null;
        darkAddLocation: InterCardinal;
        lightAddLocation: InterCardinal;
      }
    | {
        darkAddLocation: InterCardinal;
        lightAddLocation: InterCardinal;
        cast: Cast;
        tankPosition: Position;
        nonTankPosition: Position;
        stage: "Inner";
      }
    | {
        cast: Cast;
        tankPosition: Position;
        nonTankPosition: Position;
        stage: "Space1" | "Outer" | "Space2";
      }
    | {
        cast: Cast;
        darkAddLocation: InterCardinal;
        lightAddLocation: InterCardinal;
        stage: "Tower" | "Lines";
      }
  );

const towerPos = (inter: InterCardinal): Position => {
  switch (inter) {
    case "North East":
      return [0.69, 0.31];
    case "South East":
      return [0.69, 0.69];
    case "South West":
      return [0.31, 0.69];
    case "North West":
      return [0.32, 0.31];
  }
};

export const twofoldRevelation: GameLoop1<
  LetterOfTheLawPlayer,
  TwofoldRevelationState
> = {
  arena: (player, _, isDead, gameState, moveTo, animationEnd) => {
    const updateXarrow = useXarrow();
    const playerRef = useRef<HTMLImageElement>(null);
    const addRef = useRef<HTMLImageElement>(null);

    const [moved, setMoved] = useState(0);
    useEffect(() => updateXarrow(), [moved, player, gameState]);

    return (
      <Arena
        ref={playerRef}
        player={player}
        isDead={isDead}
        moveTo={(p) => {
          setMoved((x) => x + 1);
          moveTo(p);
        }}
        bossColour={gameState.bossColour}
      >
        <Tower position={towerPos("North East")} />
        <Tower position={towerPos("South East")} />
        <Tower position={towerPos("North West")} />
        <Tower position={towerPos("South West")} />
        {(!gameState.cast ||
          gameState.stage === "Inner" ||
          gameState.stage === "Tower") && (
          <>
            <Add
              ref={player.role === "Tank" ? addRef : null}
              inter={gameState.darkAddLocation}
              colour="Dark"
            />
            <Add
              ref={player.role !== "Tank" ? addRef : null}
              inter={gameState.lightAddLocation}
              colour="Light"
            />
          </>
        )}
        {(!gameState.cast || gameState.stage === "Inner") &&
          player.isTethered && (
            <Xarrow
              start={playerRef}
              end={addRef}
              showHead={false}
              endAnchor="middle"
              startAnchor="middle"
              showTail={false}
              path="straight"
            />
          )}

        {gameState.cast && gameState.stage === "Inner" && (
          <Grow
            in={gameState.cast.value >= 100}
            timeout={1500}
            onEntered={animationEnd}
          >
            <svg
              height="55%"
              width="55%"
              style={{
                position: "absolute",
                left: `50%`,
                top: `50%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <circle cx="50%" cy="50%" r="50%" fill="purple" opacity={0.4} />
            </svg>
          </Grow>
        )}

        {gameState.cast && gameState.stage === "Lines" && (
          <>
            <svg
              height="100%"
              width="100%"
              style={{
                position: "absolute",
                transformOrigin: "50% 50%",
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) rotate(${rotation(
                  gameState.darkAddLocation
                )}deg)`,
              }}
            >
              <Slide
                in={gameState.cast.value >= 100}
                timeout={1500}
                onEntered={animationEnd}
              >
                <rect
                  height="100%"
                  width="47.5%"
                  x="26.5%"
                  y="0"
                  fill="purple"
                  style={{
                    opacity: 0.4,
                  }}
                />
              </Slide>
            </svg>
            <svg
              height="100%"
              width="100%"
              style={{
                position: "absolute",
                transformOrigin: "50% 50%",
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) rotate(${rotation(
                  gameState.lightAddLocation
                )}deg)`,
              }}
            >
              <Slide in={gameState.cast.value >= 100} timeout={1500}>
                <rect
                  height="100%"
                  width="47.5%"
                  x="26.5%"
                  y="0"
                  fill="yellow"
                  style={{
                    opacity: 0.4,
                  }}
                />
              </Slide>
            </svg>
          </>
        )}

        {gameState.cast && gameState.stage === "Outer" && (
          <>
            <Grow
              in={gameState.cast.value >= 100}
              timeout={1500}
              onEntered={animationEnd}
            >
              <svg
                height="100%"
                width="100%"
                style={{
                  position: "absolute",
                  left: `${gameState.tankPosition[0] * 100}%`,
                  top: `${gameState.tankPosition[1] * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <circle
                  cx="50%"
                  cy="50%"
                  r="35%"
                  stroke="purple"
                  fill="transparent"
                  strokeWidth="35%"
                  opacity={0.4}
                />
              </svg>
            </Grow>
            <Grow in={gameState.cast.value >= 100} timeout={1500}>
              <svg
                height="45%"
                width="45%"
                style={{
                  position: "absolute",
                  left: `${gameState.nonTankPosition[0] * 100}%`,
                  top: `${gameState.nonTankPosition[1] * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <circle cx="50%" cy="50%" r="50%" fill="yellow" opacity={0.4} />
              </svg>
            </Grow>
          </>
        )}
      </Arena>
    );
  },
  getSafeSpot: (
    gameState: TwofoldRevelationState,
    player: LetterOfTheLawPlayer
  ) => {
    if (gameState.cast && gameState.stage === "Inner") {
      return [0.55, 0.45];
    }
    if (gameState.cast && gameState.stage === "Tower") {
      return getTowerPosition(player);
    }
    if (gameState.cast && gameState.stage === "Lines") {
      if (getGroup(player.clockSpot) === "Group1") {
        return [0.1, 0.5];
      } else {
        return [0.9, 0.5];
      }
    }
    if (player.isTethered && player.role === "Tank") {
      return [0.5, 0.5];
    } else {
      return [0.4, 0.8];
    }
  },
  isSafe: (gameState: TwofoldRevelationState, player: LetterOfTheLawPlayer) => {
    if (
      !gameState.cast ||
      gameState.cast.value < 100 ||
      gameState.stage === "Space1" ||
      gameState.stage === "Space2"
    ) {
      return true;
    }
    if (gameState.stage === "Inner") {
      if (player.isTethered && player.role === "Tank") {
        return player.position[1] <= 0.55;
      } else {
        return distanceTo(player.position, [0.5, 0.5]) > 0.275;
      }
    }
    if (gameState.stage === "Tower") {
      return distanceTo(player.position, getTowerPosition(player)) < 0.2;
    }
    if (gameState.stage === "Lines") {
      const hitByLines =
        (player.position[0] + player.position[1] > 0.668 &&
          player.position[0] + player.position[1] < 1.332) ||
        (player.position[1] - player.position[0] > -0.332 &&
          player.position[1] - player.position[0] < 0.332);
      if (getGroup(player.clockSpot) === "Group1") {
        return player.position[0] < 0.5 && !hitByLines;
      } else {
        return player.position[0] > 0.5 && !hitByLines;
      }
    }
    if (gameState.stage === "Outer") {
      return (
        distanceTo(player.position, gameState.tankPosition) < 0.175 &&
        distanceTo(player.position, gameState.nonTankPosition) > 0.225
      );
    }
    return true;
  },
  nextState: (s, player) => {
    if (s.cast === null) {
      return {
        ...s,
        cast: {
          name: "Twofold Revelation",
          value: 100,
        },
        tankPosition:
          player.isTethered && player.role === "Tank"
            ? player.position
            : [0.5, 0.5],
        nonTankPosition:
          player.isTethered && player.role !== "Tank"
            ? player.position
            : [0.3, 0.7],
        stage: "Inner",
        hasFinished: false,
      };
    }
    if (s.stage === "Inner") {
      return {
        ...s,
        stage: "Space1",
      };
    }
    if (s.stage === "Space1") {
      return {
        ...s,
        stage: "Outer",
      };
    }
    if (s.stage === "Outer") {
      return {
        ...s,
        stage: "Space2",
      };
    }
    if (s.stage === "Space2") {
      const paired = InterCardinals.map<[InterCardinal, InterCardinal]>(
        (_, i) => [
          InterCardinals[i],
          InterCardinals[(i + 1) % InterCardinals.length],
        ]
      );
      const adds = pickOne<[InterCardinal, InterCardinal]>(paired);
      const i = Math.round(Math.random());
      return {
        ...s,
        stage: "Tower",
        darkAddLocation: adds[i],
        lightAddLocation: adds[1 - i],
      };
    }
    if (s.stage === "Tower") {
      return {
        ...s,
        stage: "Lines",
        hasFinished: true,
      };
    }
    return s;
  },
};
function getTowerPosition(player: LetterOfTheLawPlayer) {
  switch (player.clockSpot) {
    case "North East":
    case "East":
      return towerPos("North East");
    case "South East":
    case "South":
      return towerPos("South East");
    case "South West":
    case "West":
      return towerPos("South West");
    case "North West":
    case "North":
      return towerPos("North West");
  }
}
