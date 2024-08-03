import { Point } from "@flatten-js/core";
import {
  automatic,
  Mechanic,
  sequence,
  withSafeSpot,
  ZeroDamage,
} from "../../../gamestate/mechanics";
import { Player } from "../../../gamestate/Player";
import { lineMechanic } from "../../../gamestate/Mechanics/LineAoE";
import {
  SimpleKillProfile,
  ZeroDamageProfile,
} from "../../../gamestate/Mechanics/DangerPuddles";

export const oneTwoPaw = (
  side: "Left" | "Right",
  position: Point,
  rotation: number
): Mechanic<Player> => {
  const rot = rotation + (side === "Left" ? 90 : 270);
  return {
    applyDamage: () => ZeroDamage,
    display: () => (
      <g
        stroke="purple"
        strokeWidth={0.01}
        transform={`translate(${position.x}, ${position.y}) rotate(${rot})`}
      >
        <line x1={-0.01} y1={0.01} x2={-0.03} y2={0.05} />
        <line x1={0} y1={0.01} x2={0} y2={0.05} />
        <line x1={0.01} y1={0.01} x2={0.03} y2={0.05} />
      </g>
    ),
    getSafeSpot: () =>
      position.translate(0, -0.1).rotate((Math.PI * rot) / 180, position),
    progress: (ps) => [oneTwoPawHit1(position, rot), ps],
    debugger: "One Two Paw setup",
  };
};

const oneTwoPawHit1 = (position: Point, rotation: number): Mechanic<Player> => {
  return sequence([
    automatic(
      lineMechanic(position, (Math.PI * rotation) / 180, 3, SimpleKillProfile, {
        color: "purple",
      }),
      0
    ),
    withSafeSpot(
      lineMechanic(position, (Math.PI * rotation) / 180, 3, ZeroDamageProfile, {
        color: "purple",
      }),
      () =>
        position.translate(0, 0.1).rotate((Math.PI * rotation) / 180, position)
    ),
    oneTwoPawHit2(position, rotation + 180),
  ]);
};

const oneTwoPawHit2 = (position: Point, rotation: number): Mechanic<Player> => {
  return sequence([
    automatic(
      lineMechanic(position, (Math.PI * rotation) / 180, 3, SimpleKillProfile, {
        color: "purple",
      }),
      0
    ),
    lineMechanic(position, (Math.PI * rotation) / 180, 3, ZeroDamageProfile, {
      color: "purple",
    }),
  ]);
};
