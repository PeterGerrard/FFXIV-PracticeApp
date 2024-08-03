import { Point, point } from "@flatten-js/core";
import { BlackCat } from "../boss/BlackCat";
import { Mechanic, ZeroDamage } from "../../../../gamestate/mechanics";
import { Player } from "../../../../gamestate/Player";
import { BlackCatClone } from "../clone/BlackCatClone";
import { Tether } from "../../../../components/standard-mechanic-elements/Tether";
import { tempetuosTear1 } from "./tempetuousTear";

export const shenanigansStore2 = (
  _jumpSide: "Left" | "Right",
  bossPosition: Point,
  store1: {
    position: Point;
    rotation: number;
    jumpSide: "Left" | "Right";
    side: "Left" | "Right";
  }
): Mechanic<Player> => {
  const cloneLoc = point(store1.position.x, 1 - store1.position.y);
  const cloneRot = store1.rotation + 180;

  return {
    applyDamage: () => ZeroDamage,
    display: () => (
      <>
        <BlackCat position={bossPosition} rotation={90} />
        <BlackCatClone position={store1.position} rotation={store1.rotation} />
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
    progress: (ps) => [tempetuosTear1(store1), ps],
  };
};
