import { Point } from "@flatten-js/core";
import {
  displayOnlyMechanic,
  Mechanic,
  sequence2,
  withBackgroundMechanic,
} from "../../../../gamestate/mechanics";
import { Player } from "../../../../gamestate/Player";
import { BlackCat } from "../boss/BlackCat";
import { BlackCatClone } from "../clone/BlackCatClone";
import { jumpingQuadrupleCrossing } from "../jumpingQuadrupleCrossing";
import { shenanigansStore2 } from "./store2";
import { getJumpLocation } from "../getJumpLocation";

export const shenanigansJump2 = (
  store1: {
    position: Point;
    rotation: number;
    jumpSide: "Left" | "Right";
    side: "Left" | "Right";
  },
  bossPosition: Point,
  jump2: {
    jumpSide: "Left" | "Right";
    storeLocation: "North" | "South";
  },
  tearFirst: boolean,
  nailchipperDpsFirst: boolean
): Mechanic<Player> => {
  const bossRot = store1.jumpSide === "Left" ? 0 : 180;

  return sequence2(
    withBackgroundMechanic(
      jumpingQuadrupleCrossing(
        jump2.jumpSide,
        bossPosition,
        bossRot,
        (p, r) => <BlackCat position={p} rotation={r} />
      ),
      displayOnlyMechanic(() => (
        <BlackCatClone position={store1.position} rotation={store1.rotation} />
      ))
    ),
    () =>
      shenanigansStore2(
        jump2.jumpSide,
        getJumpLocation(bossPosition, bossRot, jump2.jumpSide),
        store1,
        tearFirst,
        nailchipperDpsFirst
      )
  );
};
