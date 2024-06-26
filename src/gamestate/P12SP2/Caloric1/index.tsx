import {
  Caloric1GameState,
  CaloricStack5Debuff,
  createInitialState,
  getMechanic,
  getDebuffs,
  getTargetSpot,
  nextStep,
} from "./states";
import { Player } from "../../Player";
import { Designations, getRandomPos, getRole } from "../../gameState";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useGame } from "../../gameHooks";
import { Overlay } from "../../Overlay";
import { useTitle } from "../../../components/useTitle";
import { P12P2Arena } from "../P12SP2Arena";
import { useFullPartyProfile } from "../../Setup/ProfileContext";

const autoProgress = (state: Caloric1GameState): false | number =>
  state.autoProgress;

const hasFinished = (s: Caloric1GameState): boolean => s.stage === "Final";
export const CaloricConcepts1 = () => {
  const setup = useFullPartyProfile();
  useTitle("Caloric Concepts 1");

  const { state, players, restart, onMove, safeLocation } = useGame<
    Player,
    Caloric1GameState
  >(
    (s, p) => {
      const damageMap = getMechanic(s, p).applyDamage(players);
      return p.some((p1) =>
        p1.debuffs.some((d) => d.name === CaloricStack5Debuff.name)
      )
        ? []
        : Designations.filter((d) => damageMap[d] < 1);
    },
    hasFinished,
    () =>
      Designations.map((d) => ({
        type: "Full",
        alive: true,
        controlled: setup.designation === d,
        debuffs: [],
        designation: d,
        position: getRandomPos((p) => p.y > 0.3),
        role: getRole(d),
        distanceTravelled: 0,
      })),
    getTargetSpot,
    createInitialState,
    autoProgress,
    nextStep,
    getDebuffs
  );

  const mechanic = getMechanic(state, players);

  return (
    <div className="flex flex-col">
      <div>
        <Button onClick={() => restart()}>
          Reset
          <ReloadIcon />
        </Button>
      </div>
      <P12P2Arena
        players={players}
        mechanic={mechanic}
        moveTo={onMove}
        showCaloricGrid
      >
        <Overlay
          players={players}
          finished={hasFinished(state)}
          safeLocation={safeLocation}
        />
      </P12P2Arena>
    </div>
  );
};
