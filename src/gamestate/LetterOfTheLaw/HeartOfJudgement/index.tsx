import { Slide } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import Xarrow, { useXarrow } from "react-xarrows";
import { Position } from "../..";
import { Bombs } from "../../Bombs";
import { InterCardinal, GameLoop1, distanceTo } from "../../gameState";
import { Add } from "../Add";
import { Arena } from "../Arena";
import { LetterOfTheLawState, LetterOfTheLawPlayer } from "../gameState";

export type HeartOfJudgementState = LetterOfTheLawState & {
  topBomb: "Dark" | "Light";
  darkAddLocation: InterCardinal;
  lightAddLocation: InterCardinal;
  darkBoxLocation: InterCardinal;
  lightBoxLocation: InterCardinal;
};

export const heartOfJudgement: GameLoop1<
  LetterOfTheLawPlayer,
  HeartOfJudgementState
> = {
  arena: (player, _, isDead, gameState, moveTo, animationEnd) => {
    const updateXarrow = useXarrow();
    const playerRef = useRef<HTMLImageElement>(null);
    const addRef = useRef<HTMLImageElement>(null);
    const innerBox =
      gameState.bossColour === "Dark"
        ? gameState.darkBoxLocation
        : gameState.lightBoxLocation;
    const outerBox =
      gameState.bossColour === "Dark"
        ? gameState.lightBoxLocation
        : gameState.darkBoxLocation;
    const rotation = (inter: InterCardinal): number => {
      switch (inter) {
        case "North East":
          return 45;
        case "South East":
          return 135;
        case "South West":
          return 225;
        case "North West":
          return 315;
      }
    };

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
        <Add
          ref={player.role === "Tank" ? addRef : null}
          inter={gameState.darkAddLocation}
        />
        <Add
          ref={player.role !== "Tank" ? addRef : null}
          inter={gameState.lightAddLocation}
        />
        {player.isTethered && (
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

        {gameState.cast && (
          <>
            <Bombs
              topBomb={gameState.topBomb}
              bossColour={gameState.bossColour}
              explode={gameState.cast !== null && gameState.cast.value >= 100}
              animationEnd={animationEnd}
            />
            <svg
              height="100%"
              width="100%"
              style={{
                position: "absolute",
                transformOrigin: "50% 50%",
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) rotate(${rotation(
                  innerBox
                )}deg)`,
              }}
            >
              <rect
                height="5%"
                width="5%"
                x="11.6875%"
                y="5%"
                fill={gameState.bossColour === "Dark" ? "yellow" : "purple"}
              />
              <rect
                height="5%"
                width="5%"
                x="35.5625%"
                y="5%"
                fill={gameState.bossColour === "Dark" ? "purple" : "yellow"}
              />
              <rect
                height="5%"
                width="5%"
                x="59.4375%"
                y="5%"
                fill={gameState.bossColour === "Dark" ? "purple" : "yellow"}
              />
              <rect
                height="5%"
                width="5%"
                x="83.3125%"
                y="5%"
                fill={gameState.bossColour === "Dark" ? "yellow" : "purple"}
              />
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
                  fill={gameState.bossColour === "Dark" ? "purple" : "yellow"}
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
                  outerBox
                )}deg)`,
              }}
            >
              <rect
                height="5%"
                width="5%"
                x="11.6875%"
                y="5%"
                fill={gameState.bossColour === "Dark" ? "purple" : "yellow"}
              />
              <rect
                height="5%"
                width="5%"
                x="35.5625%"
                y="5%"
                fill={gameState.bossColour === "Dark" ? "yellow" : "purple"}
              />
              <rect
                height="5%"
                width="5%"
                x="59.4375%"
                y="5%"
                fill={gameState.bossColour === "Dark" ? "yellow" : "purple"}
              />
              <rect
                height="5%"
                width="5%"
                x="83.3125%"
                y="5%"
                fill={gameState.bossColour === "Dark" ? "purple" : "yellow"}
              />
              <Slide in={gameState.cast.value >= 100} timeout={1500}>
                <rect
                  height="100%"
                  width="26.5%"
                  x="73.5%"
                  y="0"
                  fill={gameState.bossColour === "Dark" ? "purple" : "yellow"}
                  opacity={0.4}
                />
              </Slide>
              <Slide in={gameState.cast.value >= 100} timeout={1500}>
                <rect
                  height="100%"
                  width="26.5%"
                  x="0"
                  y="0"
                  fill={gameState.bossColour === "Dark" ? "purple" : "yellow"}
                  opacity={0.4}
                />
              </Slide>
            </svg>
          </>
        )}
      </Arena>
    );
  },
  getSafeSpot: (
    gameState: HeartOfJudgementState,
    player: LetterOfTheLawPlayer
  ) => {
    const innerBox =
      gameState.bossColour === "Dark"
        ? gameState.darkBoxLocation
        : gameState.lightBoxLocation;
    if (gameState.topBomb === gameState.bossColour) {
      if (player.isTethered && player.role === "Tank") {
        return [
          0.83,
          innerBox === "North West" || innerBox === "South East" ? 0.4 : 0.6,
        ];
      } else {
        return [
          0.17,
          innerBox === "North West" || innerBox === "South East" ? 0.6 : 0.4,
        ];
      }
    } else {
      if (player.isTethered && player.role === "Tank") {
        return [
          innerBox === "North West" || innerBox === "South East" ? 0.6 : 0.4,
          0.17,
        ];
      } else {
        return [
          innerBox === "North West" || innerBox === "South East" ? 0.4 : 0.6,
          0.83,
        ];
      }
    }
  },
  isSafe: (gameState: HeartOfJudgementState, player: LetterOfTheLawPlayer) => {
    if (!gameState.cast || gameState.cast.value < 100) {
      return true;
    }
    const bombs: Position[] =
      gameState.bossColour == gameState.topBomb
        ? [
            [0.5, 0.2],
            [0.5, 0.8],
          ]
        : [
            [0.2, 0.5],
            [0.8, 0.5],
          ];
    const innerBox =
      gameState.bossColour === "Dark"
        ? gameState.darkBoxLocation
        : gameState.lightBoxLocation;
    const outerBox =
      gameState.bossColour === "Dark"
        ? gameState.lightBoxLocation
        : gameState.darkBoxLocation;
    const hitByBomb = bombs.some((b) => distanceTo(player.position, b) < 0.35);
    const hitByInner =
      innerBox === "North West" || innerBox === "South East"
        ? player.position[0] + player.position[1] < 0.668 ||
          player.position[0] + player.position[1] > 1.332
        : player.position[1] - player.position[0] < -0.332 ||
          player.position[1] - player.position[0] > 0.332;
    const hitByOuter =
      outerBox === "North West" || outerBox === "South East"
        ? player.position[0] + player.position[1] > 0.668 &&
          player.position[0] + player.position[1] < 1.332
        : player.position[1] - player.position[0] > -0.332 &&
          player.position[1] - player.position[0] < 0.332;
    return !hitByBomb && !hitByInner && !hitByOuter;
  },
  nextState: (s) => {
    if (s.cast === null) {
      return {
        ...s,
        cast: {
          name: "Heart of Judgment",
          value: 50,
        },
      };
    }
    if (s.cast.value < 100) {
      return {
        ...s,
        cast: {
          ...s.cast,
          value: 100,
        },
        hasFinished: true,
      };
    }
    return s;
  },
};
