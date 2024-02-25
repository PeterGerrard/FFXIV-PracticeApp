import { useContext } from "react";
import {
  Caloric1GameState,
  createInitialState,
  getDangerPuddles,
  getDebuffs,
  getTargetSpot,
  nextStep,
} from "./states";
import { Player } from "../../Player";
import { Designations, getRandomPos, getRole } from "../../gameState";
import { survivePuddles } from "../../Mechanics/DangerPuddles";
import { SetupContext } from "../../Setup/Setup";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useGame } from "../../gameHooks";
import { Overlay } from "../../Overlay";
import { useTitle } from "../../../components/useTitle";
import { P12P2Arena } from "../P12SP2Arena";
import beaconSrc from "../assets/beacon.png";

const autoProgress = (_state: Caloric1GameState): false | number => false;

const hasFinished = (_s: Caloric1GameState): boolean => false;
export const CaloricConcepts1 = () => {
  const setup = useContext(SetupContext);
  useTitle("Caloric Concepts 1");

  const { state, players, restart, onMove, safeLocation } = useGame<
    Player,
    Caloric1GameState
  >(
    (s, p) => {
      return survivePuddles(getDangerPuddles(s, p), p);
    },
    hasFinished,
    () =>
      Designations.map((d) => ({
        alive: true,
        controlled: setup.state.designation === d,
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
          marker:
            state.stage === "Initial" &&
            [state.supportBeacon, state.dpsBeacon].includes(p.designation)
              ? beaconSrc
              : undefined,
        }))}
        dangerPuddles={dangerPuddles}
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
