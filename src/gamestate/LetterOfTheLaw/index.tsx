import { IterateGames2 } from "..";
import { InterCardinal, InterCardinals, Setup } from "../gameState";
import { HeartOfJudgementState, heartOfJudgement } from "./HeartOfJudgement";
import {
  TwofoldRevelationState,
  twofoldRevelation,
} from "./Twofold Revelation";
import { LetterOfTheLawPlayer, createPlayer } from "./gameState";

type LetterOfTheLawGame = IterateGames2<
  LetterOfTheLawPlayer,
  HeartOfJudgementState,
  TwofoldRevelationState
>;

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
      topBomb: pickOne<"Dark" | "Light">(["Dark", "Light"]),
      darkBoxLocation: darkBox,
      lightBoxLocation: empty.filter((x) => x !== darkBox)[0],
    },
    isSafe: () => true,
    isDead: false,
    next: [
      [
        twofoldRevelation,
        {
          bossColour: null,
          cast: null,
          darkAddLocation: adds[i],
          lightAddLocation: adds[1 - i],
          hasFinished: false,
        },
      ],
    ],
    loop: 2,
  };
};
