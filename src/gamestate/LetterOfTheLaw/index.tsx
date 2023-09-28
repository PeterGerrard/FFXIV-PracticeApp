import { IterateGames3 } from "..";
import { InterCardinal, InterCardinals, Setup } from "../gameState";
import { HeartOfJudgementState, heartOfJudgement } from "./HeartOfJudgement";
import {
  TwofoldRevelationState,
  twofoldRevelation,
} from "./Twofold Revelation";
import { LetterOfTheLawPlayer, createPlayer } from "./gameState";
import { pickOne } from "../helpers";
import {
  DismissalOverrulingState,
  dismissalOverruling,
} from "./DismissalOverruling";

type LetterOfTheLawGame = IterateGames3<
  LetterOfTheLawPlayer,
  HeartOfJudgementState,
  TwofoldRevelationState,
  DismissalOverrulingState
>;

export const startLetterOfTheLaw = (setup: Setup): LetterOfTheLawGame => {
  const player = createPlayer(setup.role, setup.clockSpot);
  const paired = InterCardinals.map<[InterCardinal, InterCardinal]>((_, i) => [
    InterCardinals[i],
    InterCardinals[(i + 1) % InterCardinals.length],
  ]);
  const adds1 = pickOne<[InterCardinal, InterCardinal]>(paired);
  const adds2 = pickOne<[InterCardinal, InterCardinal]>(paired);
  const empty = InterCardinals.filter((a) => !adds1.includes(a));
  const darkBox = pickOne(empty);
  const i = Math.round(Math.random());
  const j = Math.round(Math.random());
  return {
    player,
    otherPlayers: [],
    game: heartOfJudgement,
    gameState: {
      hasFinished: false,
      cast: null,
      darkAddLocation: adds1[i],
      lightAddLocation: adds1[1 - i],
      bossColour: pickOne<"Dark" | "Light">(["Dark", "Light"]),
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
          darkAddLocation: adds1[i],
          lightAddLocation: adds1[1 - i],
          hasFinished: false,
        },
      ],
      [
        dismissalOverruling,
        {
          stage: "Tower",
          cast: null,
          hasFinished: false,
          bossColour: null,
          darkAddLocation: adds2[j],
          lightAddLocation: adds2[1 - j],
        },
      ],
    ],
    loop: 3,
  };
};
