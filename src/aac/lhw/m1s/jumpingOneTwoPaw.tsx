import { Point } from "@flatten-js/core";
import {
  automatic,
  composeMechanics,
  Mechanic,
  repeat,
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
import jumpLocPng from "./JumpLocation.png";
import { Tether } from "../../../components/standard-mechanic-elements/Tether";

const finalPositionMechanic = (
  position: Point,
  rotation: number,
  character: (position: Point, rotation: number) => React.ReactElement
): Mechanic<Player> => {
  return {
    applyDamage: () => ZeroDamage,
    display: () => character(position, rotation),
    getSafeSpot: () => null,
    progress: (ps) => [null, ps],
  };
};

export const jumpingOneTwoPaw = (
  jumpSide: "Left" | "Right",
  side: "Left" | "Right",
  position: Point,
  rotation: number,
  character: (position: Point, rotation: number) => React.ReactElement,
  nextMechanic: (finalPosition: Point) => Mechanic<Player>,
  instant?: boolean
): Mechanic<Player> => {
  const rot = rotation + (side === "Left" ? 0 : 180);
  const jumpLocation = position
    .translate(0, jumpSide === "Left" ? -0.25 : 0.25)
    .rotate((Math.PI * rotation) / 180, position);
  if (instant) {
    return oneTwoPawHit1(side, jumpLocation, rotation, character, nextMechanic);
  }
  return {
    applyDamage: () => ZeroDamage,
    display: () => (
      <>
        <g
          stroke="purple"
          strokeWidth={0.01}
          transform={`translate(${position.x}, ${position.y}) rotate(${rot})`}
        >
          <line x1={-0.01} y1={0.01} x2={-0.03} y2={0.05} />
          <line x1={0} y1={0.01} x2={0} y2={0.05} />
          <line x1={0.01} y1={0.01} x2={0.03} y2={0.05} />
        </g>
        <image
          href={jumpLocPng}
          x={jumpLocation.x}
          y={jumpLocation.y}
          height={0.1}
          width={0.1}
          transform="translate(-0.05, -0.1)"
        />
        <Tether
          source={position}
          target={jumpLocation}
          thickness={0.005}
          color="lightblue"
        />
        {character(position, rotation)}
      </>
    ),
    getSafeSpot: () =>
      jumpLocation
        .translate(0, -0.1)
        .rotate((Math.PI * rot) / 180, jumpLocation),
    progress: (ps) => [
      oneTwoPawHit1(side, jumpLocation, rotation, character, nextMechanic),
      ps,
    ],
  };
};

const oneTwoPawHit1 = (
  side: "Left" | "Right",
  position: Point,
  rotation: number,
  character: (position: Point, rotation: number) => React.ReactElement,
  nextMechanic: (finalPosition: Point) => Mechanic<Player>
): Mechanic<Player> => {
  const rot = rotation + (side === "Left" ? 0 : 180);
  return composeMechanics([
    sequence([
      automatic(
        lineMechanic(position, (Math.PI * rot) / 180, 3, SimpleKillProfile, {
          color: "purple",
        }),
        0
      ),
      withSafeSpot(
        lineMechanic(position, (Math.PI * rot) / 180, 3, ZeroDamageProfile, {
          color: "purple",
        }),
        () => position.translate(0, 0.1).rotate((Math.PI * rot) / 180, position)
      ),
      oneTwoPawHit2(side, position, rotation, character, nextMechanic),
    ]),
    repeat(finalPositionMechanic(position, rotation, character), 2),
  ]);
};

const oneTwoPawHit2 = (
  side: "Left" | "Right",
  position: Point,
  rotation: number,
  character: (position: Point, rotation: number) => React.ReactElement,
  nextMechanic: (finalPosition: Point) => Mechanic<Player>
): Mechanic<Player> => {
  const rot = rotation + (side === "Left" ? 0 : 180);
  return sequence([
    composeMechanics([
      sequence([
        automatic(
          lineMechanic(
            position,
            (Math.PI * (rot + 180)) / 180,
            3,
            SimpleKillProfile,
            {
              color: "purple",
            }
          ),
          0
        ),
        lineMechanic(
          position,
          (Math.PI * (rot + 180)) / 180,
          3,
          ZeroDamageProfile,
          {
            color: "purple",
          }
        ),
      ]),
      repeat(finalPositionMechanic(position, rotation, character), 2),
    ]),
    nextMechanic(position),
  ]);
};
