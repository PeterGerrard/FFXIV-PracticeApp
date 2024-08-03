import { Point } from "@flatten-js/core";
import { pickOne } from "../../../../gamestate/helpers";
import {
  composeMechanics,
  Mechanic,
  ZeroDamage,
} from "../../../../gamestate/mechanics";
import { Player } from "../../../../gamestate/Player";
import { BlackCat } from "../boss/BlackCat";
import { BlackCatClone } from "../clone/BlackCatClone";
import { jumpingQuadrupleCrossing } from "../jumpingQuadrupleCrossing";
import { shenanigansStore2 } from "./store2";

export const shenanigansJump2 = (
  store1: {
    position: Point;
    rotation: number;
    jumpSide: "Left" | "Right";
    side: "Left" | "Right";
  },
  bossPosition: Point
): Mechanic<Player> => {
  const jumpLoc = pickOne(["Left", "Right"] as const);
  const bossRot = store1.jumpSide === "Left" ? 180 : 0;

  return composeMechanics([
    jumpingQuadrupleCrossing(
      jumpLoc,
      bossPosition,
      bossRot,
      (p, r) => <BlackCat position={p} rotation={r} />,
      (p) => shenanigansStore2(jumpLoc, p, store1)
    ),
    {
      applyDamage: () => ZeroDamage,
      display: () => (
        <BlackCatClone position={store1.position} rotation={store1.rotation} />
      ),
      getSafeSpot: () => null,
      progress: (ps) => [null, ps],
    },
  ]);
};
