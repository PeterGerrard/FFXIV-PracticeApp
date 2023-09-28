import { IterateGames1 } from "..";
import {
  GameLoop1,
  InterCardinal,
  InterCardinals,
  Position,
  Setup,
  distanceTo,
} from "../gameState";
import { Arena } from "./Arena";
import {
  LetterOfTheLawPlayer,
  LetterOfTheLawState,
  createPlayer,
} from "./gameState";
import bossPng from "../DarkAndLight/assets/boss.png";
import { Ref, forwardRef, useEffect, useRef, useState } from "react";
import Xarrow, { useXarrow } from "react-xarrows";
import { Bombs } from "../Bombs";
import Slide from "@mui/material/Slide";

type LetterOfTheLawGame = IterateGames1<
  LetterOfTheLawPlayer,
  HeartOfJudgementState
>;

type HeartOfJudgementState = LetterOfTheLawState & {
  topBomb: "Dark" | "Light";
  darkAddLocation: InterCardinal;
  lightAddLocation: InterCardinal;
  darkBoxLocation: InterCardinal;
  lightBoxLocation: InterCardinal;
};

const addPosition = (inter: InterCardinal): Position => {
  switch (inter) {
    case "North East":
      return [0.875, 0.125];
    case "South East":
      return [0.875, 0.875];
    case "South West":
      return [0.125, 0.875];
    case "North West":
      return [0.125, 0.125];
  }
};

const Add = forwardRef(
  (props: { inter: InterCardinal }, ref: Ref<HTMLImageElement>) => {
    const pos = addPosition(props.inter);
    return (
      <img
        ref={ref}
        src={bossPng}
        height="15%"
        width="15%"
        style={{
          position: "absolute",
          left: `${pos[0] * 100}%`,
          top: `${pos[1] * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
      ></img>
    );
  }
);

const heartOfJudgement: GameLoop1<LetterOfTheLawPlayer, HeartOfJudgementState> =
  {
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
    isSafe: (
      gameState: HeartOfJudgementState,
      player: LetterOfTheLawPlayer
    ) => {
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
      const hitByBomb = bombs.some(
        (b) => distanceTo(player.position, b) < 0.35
      );
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

const pickOne = <T extends unknown>(items: T[]) => {
  return items[(items.length * Math.random()) | 0];
};

export const startLetterOfTheLaw = (setup: Setup): LetterOfTheLawGame => {
  const player = createPlayer(setup.role, setup.clockSpot);
  const paired = InterCardinals.map<[InterCardinal, InterCardinal]>((_, i) => [
    InterCardinals[i],
    InterCardinals[(i + 1) % InterCardinals.length],
  ]);
  const adds = pickOne<[InterCardinal, InterCardinal]>(paired);
  const empty = InterCardinals.filter((a) => !adds.includes(a));
  const darkBox = pickOne(empty);
  const i = Math.round(Math.random());
  return {
    player,
    otherPlayers: [],
    game: heartOfJudgement,
    gameState: {
      hasFinished: false,
      cast: null,
      darkAddLocation: adds[i],
      lightAddLocation: adds[1 - i],
      bossColour: pickOne(["Dark", "Light"]),
      topBomb: pickOne(["Dark", "Light"]),
      darkBoxLocation: darkBox,
      lightBoxLocation: empty.filter((x) => x !== darkBox)[0],
    },
    isSafe: () => true,
    isDead: false,
    next: [],
    loop: 1,
  };
};
