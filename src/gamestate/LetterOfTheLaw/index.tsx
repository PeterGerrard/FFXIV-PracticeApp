import { IterateGames1 } from "..";
import { GameLoop1, InterCardinal, InterCardinals, Setup } from "../gameState";
import { Arena } from "./Arena";
import {
  LetterOfTheLawPlayer,
  LetterOfTheLawState,
  createPlayer,
} from "./gameState";

type LetterOfTheLawGame = IterateGames1<
  LetterOfTheLawPlayer,
  HeartOfJudgementState
>;

type HeartOfJudgementState = LetterOfTheLawState & {
  topBomb: "Dark" | "Light";
  darkBoxLocation: InterCardinal;
  lightBoxLocation: InterCardinal;
};

const heartOfJudgement: GameLoop1<LetterOfTheLawPlayer, HeartOfJudgementState> =
  {
    arena: (player, _, isDead, gameState, moveTo) => {
      const [bombSpot1, bombSpot2] =
        gameState.bossColour == gameState.topBomb
          ? [
              [50, 20],
              [50, 80],
            ]
          : [
              [20, 50],
              [80, 50],
            ];
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
      return (
        <Arena
          player={player}
          isDead={isDead}
          moveTo={moveTo}
          adds={[gameState.add1Location, gameState.add2Location]}
          bossColour={gameState.bossColour}
        >
          <svg
            height="70%"
            width="70%"
            style={{
              position: "absolute",
              left: `${bombSpot1[0]}%`,
              top: `${bombSpot1[1]}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <circle
              cx="50%"
              cy="50%"
              r="50%"
              fill={gameState.bossColour === "Dark" ? "purple" : "yellow"}
              opacity={0.4}
            />
          </svg>
          <svg
            height="70%"
            width="70%"
            style={{
              position: "absolute",
              left: `${bombSpot2[0]}%`,
              top: `${bombSpot2[1]}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <circle
              cx="50%"
              cy="50%"
              r="50%"
              fill={gameState.bossColour === "Dark" ? "purple" : "yellow"}
              opacity={0.4}
            />
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
            <rect
              height="100%"
              width="47.5%"
              x="26.5%"
              y="0"
              fill={gameState.bossColour === "Dark" ? "purple" : "yellow"}
              opacity={0.4}
            />
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
            <rect
              height="100%"
              width="26.5%"
              x="0"
              y="0"
              fill={gameState.bossColour === "Dark" ? "purple" : "yellow"}
              opacity={0.4}
            />
            <rect
              height="100%"
              width="26.5%"
              x="73.5%"
              y="0"
              fill={gameState.bossColour === "Dark" ? "purple" : "yellow"}
              opacity={0.4}
            />
          </svg>
        </Arena>
      );
    },
    getSafeSpot: () => [0.5, 0.5],
    isSafe: () => true,
    nextState: (s) => s,
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
  return {
    player,
    otherPlayers: [],
    game: heartOfJudgement,
    gameState: {
      hasFinished: false,
      cast: null,
      add1Location: adds[0],
      add2Location: adds[1],
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
