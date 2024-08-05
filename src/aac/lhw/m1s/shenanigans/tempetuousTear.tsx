import { Point, point, vector } from "@flatten-js/core";
import { jumpingOneTwoPaw } from "../jumpingOneTwoPaw";
import { BlackCat } from "../boss/BlackCat";
import {
  automatic,
  composeMechanics,
  Mechanic,
  withBackgroundMechanic,
  ZeroDamage,
} from "../../../../gamestate/mechanics";
import { BlackCatClone } from "../clone/BlackCatClone";
import { getGroup, getRole } from "../../../../gamestate/gameState";
import { Tether } from "../../../../components/standard-mechanic-elements/Tether";
import { Player } from "../../../../gamestate/Player";
import { lineMechanic } from "../../../../gamestate/Mechanics/LineAoE";

export const tempetuosTear = (
  store1: {
    position: Point;
    rotation: number;
    jumpSide: "Left" | "Right";
    side: "Left" | "Right";
  },
  store2?: {
    position: Point;
    rotation: number;
    jumpSide: "Left" | "Right";
  }
): Mechanic<Player> => {
  const bossLoc = point(
    (store1.jumpSide === "Left" && store1.position.y > 0.5) ||
      (store1.jumpSide !== "Left" && store1.position.y < 0.5)
      ? 0.25
      : 0.75,
    0.5
  );
  console.log({ store1, bossLoc });
  const safeCol =
    (store1.rotation < 180 && store1.side === "Right") ||
    (store1.rotation > 180 && store1.side === "Left")
      ? bossLoc.x - 0.1
      : bossLoc.x + 0.1;
  return {
    applyDamage: () => ZeroDamage,
    display: () => (
      <>
        <BlackCat position={point(0.5, 0.5)} rotation={90} />
        <BlackCatClone position={store1.position} rotation={store1.rotation} />
        {store2 && (
          <BlackCatClone
            position={store2.position}
            rotation={store2.rotation}
          />
        )}
        <Tether
          source={point(0.5, 0.5)}
          target={store1.position}
          color="red"
          thickness={0.01}
        />
      </>
    ),
    getSafeSpot: (_ps, p) =>
      point(safeCol, getGroup(p.designation) === "Group1" ? 0.4 : 0.6),
    progress: (ps) => [
      withBackgroundMechanic(
        composeMechanics([
          ...ps
            .filter((p) => getRole(p.designation) === "Healer")
            .map<Mechanic<Player>>((p) =>
              automatic(
                lineMechanic(
                  bossLoc,
                  vector(0, 1).angleTo(vector(bossLoc, p.position)),
                  0.1,
                  {
                    damage: 3.5,
                    debuffRequirement: null,
                    instaKill: null,
                    roleRequirement: null,
                    split: true,
                  }
                ),
                1500
              )
            ),
          jumpingOneTwoPaw(
            store1.jumpSide,
            store1.side,
            store1.position,
            store1.rotation,
            (p, r) => <BlackCatClone position={p} rotation={r} />,
            () => null,
            true
          ),
        ]),
        {
          applyDamage: () => ZeroDamage,
          display: () => (
            <>
              <BlackCat position={bossLoc} rotation={90} />
              {store2 && (
                <BlackCatClone
                  position={store2.position}
                  rotation={store2.rotation}
                />
              )}
            </>
          ),
          getSafeSpot: () => null,
          progress: (ps) => [null, ps],
        }
      ),
      ps,
    ],
  };
};
