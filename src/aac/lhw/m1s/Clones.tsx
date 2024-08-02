import { point } from "@flatten-js/core";
import { useTitle } from "../../../components/useTitle";
import {
  Designations,
  getRandomPos,
  getRole,
} from "../../../gamestate/gameState";
import { emptyMechanic, useMechanic } from "../../../gamestate/mechanics";
import { Player } from "../../../gamestate/Player";
import { useFullPartyProfile } from "../../../gamestate/Setup/ProfileContext";
import { FullMouser1Arena } from "./arena/FullArena";
import { BlackCat } from "./boss/BlackCat";

export const BlackCatClones = () => {
  const currentFullPartyProfile = useFullPartyProfile();
  useTitle("Clone Shenanigans");

  const [mechanic, players, restart, moveTo] = useMechanic(emptyMechanic, () =>
    Designations.map<Player>((d) => ({
      alive: true,
      controlled: d === currentFullPartyProfile.designation,
      debuffs: [],
      designation: d,
      distanceTravelled: 0,
      position: getRandomPos(),
      role: getRole(d),
      type: "Full",
    }))
  );

  return (
    <FullMouser1Arena
      mechanic={mechanic}
      moveTo={moveTo}
      players={players}
      restart={restart}
    >
      <BlackCat position={point(0.5, 0.5)} rotation={45} />
    </FullMouser1Arena>
  );
};
