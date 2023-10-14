import { IterateGames3 } from "../..";
import {
  Designations,
  GameLoop,
  InterCardinal,
  InterCardinals,
  Setup,
  getRandomPos,
  getRole,
} from "../../gameState";
import { HeartOfJudgementState, heartOfJudgement } from "./HeartOfJudgement";
import {
  TwofoldRevelationState,
  twofoldRevelation,
} from "./Twofold Revelation";
import { LetterOfTheLawPlayer } from "./gameState";
import { pickOne, split } from "../../helpers";
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
  const [tanks, others] = split(Designations, (d) => getRole(d) === "Tank");
  const tetheredTank = pickOne(tanks);
  const tetheredNonTank = pickOne(others);
  const players = Designations.map((d) => {
    const role = getRole(d);
    return {
      role: role,
      position: getRandomPos(),
      isTethered: d === tetheredTank || d === tetheredNonTank,
      debuffs: [],
      controlled: d === setup.designation,
      designation: d,
      show: true,
      alive: true,
    };
  });
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
      players: players,
    },
    next: [
      [
        twofoldRevelation,
        (
          _g: GameLoop<LetterOfTheLawPlayer, HeartOfJudgementState>,
          s: HeartOfJudgementState
        ): TwofoldRevelationState => ({
          bossColour: null,
          cast: null,
          darkAddLocation: adds1[i],
          lightAddLocation: adds1[1 - i],
          hasFinished: false,
          players: s.players,
        }),
      ],
      [
        dismissalOverruling,
        (
          _g: GameLoop<LetterOfTheLawPlayer, TwofoldRevelationState>,
          s: TwofoldRevelationState
        ): DismissalOverrulingState => ({
          stage: "Initial",
          cast: null,
          hasFinished: false,
          bossColour: null,
          darkAddLocation: adds2[j],
          lightAddLocation: adds2[1 - j],
          players: s.players,
        }),
      ],
    ],
    loop: 3,
  };
};
