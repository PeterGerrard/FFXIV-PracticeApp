import { useContext } from "react";
import { initialState } from "./states";
import { Player } from "../../Player";
import {
  Designations,
  getRandomPos,
  getRole,
} from "../../gameState";
import { SetupContext } from "../../Setup/Setup";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useTitle } from "../../../components/useTitle";
import { P12P2Arena } from "../P12SP2Arena";
import { useMechanic } from "../../mechanics";

export const ClassicalConcepts2 = () => {
  const setup = useContext(SetupContext);
  useTitle("Classical Concepts 2");

  const [mechanic, players, restart, move] = useMechanic<Player>(
    initialState,
    () =>
      Designations.map((d) => ({
        alive: true,
        controlled: setup.state.designation === d,
        debuffs: [],
        designation: d,
        position: getRandomPos((p) => p.y > 0.3),
        role: getRole(d),
        distanceTravelled: 0,
      }))
  );

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
        moveTo={move}
      ></P12P2Arena>
    </div>
  );
};
