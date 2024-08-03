import { Point, vector } from "@flatten-js/core";
import {
  composeMechanics,
  Mechanic,
  sequence2,
  withSafeSpot,
  ZeroDamage,
} from "../../../gamestate/mechanics";
import { Player } from "../../../gamestate/Player";
import { SimpleHeavyDamageProfile } from "../../../gamestate/Mechanics/DangerPuddles";
import jumpLocPng from "./JumpLocation.png";
import { Tether } from "../../../components/standard-mechanic-elements/Tether";
import { Designation, distanceTo, isDps } from "../../../gamestate/gameState";
import { coneMechanic } from "../../../gamestate/Mechanics/ConeAoE";

const trueNorthVector = (d: Designation) => {
  switch (d) {
    case "MT":
      return vector(0, 1);
    case "OT":
      return vector(0, -1);
    case "H1":
      return vector(-1, 0);
    case "H2":
      return vector(1, 0);
    case "M1":
      return vector(-1, 1).normalize();
    case "M2":
      return vector(1, 1).normalize();
    case "R1":
      return vector(-1, -1).normalize();
    case "R2":
      return vector(1, -1).normalize();
  }
};

const trueNorthVectorDpsBait = (d: Designation) => {
  switch (d) {
    case "MT":
      return vector(-1, -1).normalize();
    case "OT":
      return vector(1, 1).normalize();
    case "H1":
      return vector(-1, 1).normalize();
    case "H2":
      return vector(1, -1).normalize();
    case "M1":
      return vector(-1, 0);
    case "M2":
      return vector(0, -1);
    case "R1":
      return vector(0, 1);
    case "R2":
      return vector(1, 0);
  }
};

const trueNorthSafe = (d: Designation) => {
  switch (d) {
    case "MT":
    case "R1":
      return vector(-1, -1).normalize();
    case "OT":
    case "M2":
      return vector(1, 1).normalize();
    case "H1":
    case "M1":
      return vector(-1, 1).normalize();
    case "H2":
    case "R2":
      return vector(1, -1).normalize();
  }
};

const getCone = (position: Point, angle: number) => {
  const d = Math.round((angle * 180) / Math.PI);
  return coneMechanic(
    position,
    (d * Math.PI) / 180,
    Math.PI / 8,
    SimpleHeavyDamageProfile,
    {
      includeContainer: false,
    }
  );
};

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

export const jumpingQuadrupleCrossing = (
  jumpSide: "Left" | "Right",
  position: Point,
  rotation: number,
  character: (position: Point, rotation: number) => React.ReactElement,
  nextMechanic: (finalPosition: Point) => Mechanic<Player>
): Mechanic<Player> => {
  const jumpLocation = position
    .translate(0, jumpSide === "Left" ? -0.25 : 0.25)
    .rotate((Math.PI * rotation) / 180, position);
  return {
    applyDamage: () => ZeroDamage,
    display: () => (
      <>
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
    getSafeSpot: (_ps, p) => {
      const offset = trueNorthVector(p.designation).multiply(
        isDps(p.designation) ? 0.1 : 0.02
      );
      return jumpLocation.translate(offset);
    },
    progress: (ps) => [
      jumpingQuadrupleCrossingBait1(
        jumpSide,
        jumpLocation,
        rotation,
        character,
        nextMechanic,
        ps
      ),
      ps,
    ],
  };
};

const jumpingQuadrupleCrossingBait1 = (
  jumpSide: "Left" | "Right",
  position: Point,
  rotation: number,
  character: (position: Point, rotation: number) => React.ReactElement,
  nextMechanic: (finalPosition: Point) => Mechanic<Player>,
  players: Player[]
): Mechanic<Player> => {
  const angles = players
    .map((p) => p.position)
    .sort((p1, p2) => distanceTo(position, p1) - distanceTo(position, p2))
    .slice(0, 4)
    .map((p) =>
      vector(position, position.translate(0, 1)).angleTo(vector(position, p))
    );

  return sequence2(
    withSafeSpot(
      composeMechanics(
        angles
          .map((a) => getCone(position, a))
          .concat([finalPositionMechanic(position, rotation, character)])
      ),
      (_ps, p) => {
        const offset = trueNorthVectorDpsBait(p.designation).multiply(
          isDps(p.designation) ? 0.02 : 0.1
        );
        return position.translate(offset);
      }
    ),
    (ps) =>
      jumpingQuadrupleCrossingBait2(
        jumpSide,
        position,
        rotation,
        character,
        nextMechanic,
        ps,
        angles
      )
  );
};

const jumpingQuadrupleCrossingBait2 = (
  jumpSide: "Left" | "Right",
  position: Point,
  rotation: number,
  character: (position: Point, rotation: number) => React.ReactElement,
  nextMechanic: (finalPosition: Point) => Mechanic<Player>,
  players: Player[],
  bait1: number[]
): Mechanic<Player> => {
  const angles = players
    .map((p) => p.position)
    .sort((p1, p2) => distanceTo(position, p1) - distanceTo(position, p2))
    .slice(0, 4)
    .map((p) =>
      vector(position, position.translate(0, 1)).angleTo(vector(position, p))
    );

  return sequence2(
    withSafeSpot(
      composeMechanics(
        angles
          .map((a) => getCone(position, a))
          .concat([finalPositionMechanic(position, rotation, character)])
      ),
      (_ps, p) => {
        const offset = trueNorthSafe(p.designation).multiply(0.1);
        return position.translate(offset);
      }
    ),
    (_) =>
      jumpingQuadrupleCrossingRehits(
        jumpSide,
        position,
        rotation,
        character,
        nextMechanic,
        [bait1, angles]
      )
  );
};

const jumpingQuadrupleCrossingRehits = (
  jumpSide: "Left" | "Right",
  position: Point,
  rotation: number,
  character: (position: Point, rotation: number) => React.ReactElement,
  nextMechanic: (finalPosition: Point) => Mechanic<Player>,
  baits: number[][]
) => {
  const [b, ...rest] = baits;

  return sequence2(
    withSafeSpot(
      composeMechanics(
        b
          .map((a) => getCone(position, a))
          .concat([finalPositionMechanic(position, rotation, character)])
      ),
      (_ps, p) => {
        const offset = trueNorthSafe(p.designation).multiply(0.1);
        return position.translate(offset);
      }
    ),
    (): Mechanic<Player> =>
      rest.length > 0
        ? jumpingQuadrupleCrossingRehits(
            jumpSide,
            position,
            rotation,
            character,
            nextMechanic,
            rest
          )
        : nextMechanic(position)
  );
};
