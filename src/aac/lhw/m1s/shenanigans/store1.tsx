import { Point, point } from "@flatten-js/core";
import { pickOne } from "../../../../gamestate/helpers";
import { BlackCat } from "../boss/BlackCat";
import { Mechanic, ZeroDamage } from "../../../../gamestate/mechanics";
import { Player } from "../../../../gamestate/Player";
import { BlackCatClone } from "../clone/BlackCatClone";
import { Tether } from "../../../../components/standard-mechanic-elements/Tether";

export const shenanigansStore1 = (
  _jumpSide: "Left" | "Right",
  _side: "Left" | "Right",
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
    progress: (ps) => [null, ps],
  };
};
