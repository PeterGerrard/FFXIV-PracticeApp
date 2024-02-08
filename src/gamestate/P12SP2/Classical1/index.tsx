import { useContext } from "react";
import {
  Classical1GameState,
  createInitialState,
  getDangerPuddles,
  getTargetSpot,
  nextStep,
} from "./states";
import { Debuff, Player } from "../../Player";
import { Designations, getRandomPos, getRole } from "../../gameState";
import { survivePuddles } from "../../Mechanics/DangerPuddles";
import { SetupContext } from "../../Setup/Setup";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useGame } from "../../gameHooks";
import { Overlay } from "../../Overlay";
import { useTitle } from "../../../components/useTitle";
import { P12P2Arena } from "../P12SP2Arena";
import alphaSrc from "../assets/alpha.png";
import betaSrc from "../assets/beta.png";
import triangleSrc from "../assets/Triangle.png";
import circleSrc from "../assets/Circle.png";
import crossSrc from "../assets/Cross.png";
import squareSrc from "../assets/Square.png";
import { point } from "@flatten-js/core";

const autoProgress = (_state: Classical1GameState) => false as const;

const AlphaDebuff: Debuff = {
  name: "Alpha",
  src: alphaSrc,
};
const BetaDebuff: Debuff = {
  name: "Beta",
  src: betaSrc,
};

const getDebuffs = (state: Classical1GameState, player: Player) => [
  [
    state.crossPair[0],
    state.squarePair[0],
    state.circlePair[0],
    state.trianglePair[0],
  ].includes(player.designation)
    ? AlphaDebuff
    : BetaDebuff,
];

export const ClassicalConcepts1 = () => {
  const setup = useContext(SetupContext);
  useTitle("Classical Concepts 1");

  const { state, players, restart, onMove, safeLocation } = useGame<
    Player,
    Classical1GameState
  >(
    (s, p) => survivePuddles(getDangerPuddles(s, p), p),
    (s) => s.stage === "Initial",
    () =>
      Designations.map((d) => ({
        alive: true,
        controlled: setup.state.designation === d,
        debuffs: [],
        designation: d,
        position: getRandomPos((p) => p.y > 0.3),
        role: getRole(d),
      })),
    getTargetSpot,
    createInitialState,
    autoProgress,
    nextStep,
    getDebuffs
  );

  const dangerPuddles = getDangerPuddles(state, players);

  return (
    <div className="flex flex-col">
      <div>
        <Button onClick={() => restart()}>
          Reset
          <ReloadIcon />
        </Button>
      </div>
      <P12P2Arena
        players={players.map((p) => ({
          ...p,
          marker: {
            src: state.circlePair.includes(p.designation)
              ? circleSrc
              : state.crossPair.includes(p.designation)
                ? crossSrc
                : state.squarePair.includes(p.designation)
                  ? squareSrc
                  : triangleSrc,
            offset: point(0, -0.05),
          },
        }))}
        dangerPuddles={dangerPuddles}
        moveTo={onMove}
      >
        <Overlay
          players={players}
          finished={false}
          safeLocation={safeLocation}
        />
      </P12P2Arena>
    </div>
  );
};
