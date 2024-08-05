import { useTitle } from "../../../components/useTitle";
import {
  Designations,
  getRandomPos,
  getRole,
} from "../../../gamestate/gameState";
import { pickOne, shuffle } from "../../../gamestate/helpers";
import { useMechanic } from "../../../gamestate/mechanics";
import { Player } from "../../../gamestate/Player";
import { useFullPartyProfile } from "../../../gamestate/Setup/ProfileContext";
import { FullMouser1Arena } from "./arena/FullArena";
import { shenanigans1Jump } from "./shenanigans/jump1";

export const BlackCatClones = () => {
  const currentFullPartyProfile = useFullPartyProfile();
  useTitle("Clone Shenanigans");

  const [mechanic, players, restart, moveTo] = useMechanic(
    () => {
      const storeLocs = shuffle(["North", "South"] as const);
      return shenanigans1Jump(
        {
          jumpSide: pickOne(["Left", "Right"] as const),
          swipeSide: pickOne(["Left", "Right"] as const),
          storeLocation: storeLocs[0],
        },
        {
          jumpSide: pickOne(["Left", "Right"] as const),
          storeLocation: storeLocs[1],
        }
      );
    },
    () =>
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
    ></FullMouser1Arena>
  );
};
