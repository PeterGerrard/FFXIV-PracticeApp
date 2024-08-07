import { Point, point } from "@flatten-js/core";
import { pickOne } from "../../../../gamestate/helpers";
import { BlackCat } from "../boss/BlackCat";
import { Mechanic, ZeroDamage } from "../../../../gamestate/mechanics";
import { Player } from "../../../../gamestate/Player";
import { BlackCatClone } from "../clone/BlackCatClone";
import { Tether } from "../../../../components/standard-mechanic-elements/Tether";
import { shenanigansJump2 } from "./jump2";

export const shenanigansStore1 = (
  jumpSide: "Left" | "Right",
  side: "Left" | "Right",
  bossPosition: Point
): Mechanic<Player> => {
  const storeClone = pickOne(["North", "South"] as const);
  const cloneLoc = point(0.5, storeClone === "North" ? 0.375 : 0.625);
  const cloneRot = storeClone === "North" ? 270 : 90;

  return {
    applyDamage: () => ZeroDamage,
    display: () => (
      <>
        <BlackCat position={bossPosition} rotation={90} />
        <BlackCatClone position={cloneLoc} rotation={cloneRot} />
        <Tether
          source={bossPosition}
          target={cloneLoc}
          color="lightblue"
          thickness={0.005}
        />
      </>
    ),
    getSafeSpot: () => null,
    progress: (ps) => [
      shenanigansJump2(
        {
          jumpSide: jumpSide,
          position: cloneLoc,
          rotation: cloneRot,
          side: side,
        },
        bossPosition
      ),
      ps,
    ],
  };
};
