import { Point, point, vector } from "@flatten-js/core";
import { BlackCat } from "../boss/BlackCat";
import {
  composeMechanics,
  emptyMechanic,
  Mechanic,
  ZeroDamage,
} from "../../../../gamestate/mechanics";
import { BlackCatClone } from "../clone/BlackCatClone";
import { Tether } from "../../../../components/standard-mechanic-elements/Tether";
import { Debuff, Player } from "../../../../gamestate/Player";
import nailChipperMarker from "./nailchipper.png";
import {
  Designation,
  distanceTo,
  isDps,
} from "../../../../gamestate/gameState";
import { getJumpLocation } from "../getJumpLocation";
import { coneMechanic } from "../../../../gamestate/Mechanics/ConeAoE";
import { SimpleHeavyDamageProfile } from "../../../../gamestate/Mechanics/DangerPuddles";
import { circleMechanic } from "../../../../gamestate/Mechanics/CircleAoE";
import { tempetuosTear } from "./tempetuousTear";

const NailChipperDebuff: Debuff = {
  name: "Nailchipper",
  markerSrc: nailChipperMarker,
};

export const nailchipper = (
  store1: {
    position: Point;
    rotation: number;
    jumpSide: "Left" | "Right";
    side: "Left" | "Right";
  } | null,
  store2: {
    position: Point;
    rotation: number;
    jumpSide: "Left" | "Right";
    dpsFirst: boolean;
  }
): Mechanic<Player> => {
  return {
    applyDamage: () => ZeroDamage,
    display: () => (
      <>
        <BlackCat position={point(0.5, 0.5)} rotation={90} />
        <BlackCatClone position={store2.position} rotation={store2.rotation} />
        {store1 && (
          <BlackCatClone
            position={store1.position}
            rotation={store1.rotation}
          />
        )}
        <Tether
          source={point(0.5, 0.5)}
          target={store2.position}
          color="red"
          thickness={0.01}
        />
      </>
    ),
    autoProgress: 0,
    getSafeSpot: (_ps, _p) => null,
    progress: (ps) => [
      nailchipperStart(store1, store2),
      ps.map((p) => ({
        ...p,
        debuffs:
          store2.dpsFirst === isDps(p.designation) ? [NailChipperDebuff] : [],
      })),
    ],
  };
};

const nailchipperStart = (
  store1: {
    position: Point;
    rotation: number;
    jumpSide: "Left" | "Right";
    side: "Left" | "Right";
  } | null,
  store2: {
    position: Point;
    rotation: number;
    jumpSide: "Left" | "Right";
    dpsFirst: boolean;
  }
): Mechanic<Player> => {
  const jumpLocation = getJumpLocation(
    store2.position,
    store2.rotation,
    store2.jumpSide
  );

  return {
    applyDamage: () => ZeroDamage,
    display: () => (
      <>
        <BlackCat position={point(0.5, 0.5)} rotation={90} />
        <BlackCatClone position={store2.position} rotation={store2.rotation} />
        {store1 && (
          <BlackCatClone
            position={store1.position}
            rotation={store1.rotation}
          />
        )}
        <Tether
          source={point(0.5, 0.5)}
          target={store2.position}
          color="red"
          thickness={0.01}
        />
      </>
    ),
    getSafeSpot: (_ps, p) => {
      const offset = (
        store2.dpsFirst
          ? trueNorthVectorSupportBait(p.designation)
          : trueNorthVectorDpsBait(p.designation)
      ).multiply(store2.dpsFirst == isDps(p.designation) ? 0.2 : 0.02);
      return jumpLocation.translate(offset);
    },
    progress: (ps) => [
      nailchipperBait1(store1, store2, jumpLocation, ps),
      ps.map((p) => ({
        ...p,
        debuffs:
          store2.dpsFirst === isDps(p.designation) ? [NailChipperDebuff] : [],
      })),
    ],
  };
};

const nailchipperBait1 = (
  store1: {
    position: Point;
    rotation: number;
    jumpSide: "Left" | "Right";
    side: "Left" | "Right";
  } | null,
  store2: {
    position: Point;
    rotation: number;
    jumpSide: "Left" | "Right";
    dpsFirst: boolean;
  },
  jumpLocation: Point,
  players: Player[]
): Mechanic<Player> => {
  const playersByDistance = players.sort(
    (p1, p2) =>
      distanceTo(jumpLocation, p1.position) -
      distanceTo(jumpLocation, p2.position)
  );
  const angles = playersByDistance
    .slice(0, 4)
    .map((p) => p.position)
    .map((p) =>
      vector(1, 0).angleTo(vector(p.x - jumpLocation.x, p.y - jumpLocation.y))
    );
  const circles = players
    .filter((p) => isDps(p.designation) === store2.dpsFirst)
    .map((p) => p.position);

  return composeMechanics([
    {
      applyDamage: () => ZeroDamage,
      display: () => (
        <>
          <BlackCat position={point(0.5, 0.5)} rotation={90} />
          <BlackCatClone position={jumpLocation} rotation={store2.rotation} />
          {store1 && (
            <BlackCatClone
              position={store1.position}
              rotation={store1.rotation}
            />
          )}
        </>
      ),
      getSafeSpot: (_ps, _p) => null,
      progress: (ps) => [
        nailchipperInter(store1, store2, jumpLocation, angles),
        ps.map((p) => ({
          ...p,
          debuffs: [],
        })),
      ],
    },
    ...angles.map((a) => getCone(jumpLocation, a)),
    ...circles.map((p) => getCircle(p)),
  ]);
};

const nailchipperInter = (
  store1: {
    position: Point;
    rotation: number;
    jumpSide: "Left" | "Right";
    side: "Left" | "Right";
  } | null,
  store2: {
    position: Point;
    rotation: number;
    jumpSide: "Left" | "Right";
    dpsFirst: boolean;
  },
  jumpLocation: Point,
  angles1: number[]
): Mechanic<Player> => {
  return {
    applyDamage: () => ZeroDamage,
    display: () => (
      <>
        <BlackCat position={point(0.5, 0.5)} rotation={90} />
        <BlackCatClone position={jumpLocation} rotation={store2.rotation} />
        {store1 && (
          <BlackCatClone
            position={store1.position}
            rotation={store1.rotation}
          />
        )}
      </>
    ),
    getSafeSpot: (_ps, p) => {
      const offset = (
        store2.dpsFirst
          ? trueNorthVectorDpsBait(p.designation)
          : trueNorthVectorSupportBait(p.designation)
      ).multiply(store2.dpsFirst == isDps(p.designation) ? 0.02 : 0.2);
      return jumpLocation.translate(offset);
    },
    progress: (ps) => [
      nailchipperBait2(store1, store2, jumpLocation, angles1, ps),
      ps.map((p) => ({
        ...p,
        debuffs:
          store2.dpsFirst === isDps(p.designation) ? [] : [NailChipperDebuff],
      })),
    ],
  };
};

const nailchipperBait2 = (
  store1: {
    position: Point;
    rotation: number;
    jumpSide: "Left" | "Right";
    side: "Left" | "Right";
  } | null,
  store2: {
    position: Point;
    rotation: number;
    jumpSide: "Left" | "Right";
    dpsFirst: boolean;
  },
  jumpLocation: Point,
  angles1: number[],
  players: Player[]
): Mechanic<Player> => {
  const playersByDistance = players.sort(
    (p1, p2) =>
      distanceTo(jumpLocation, p1.position) -
      distanceTo(jumpLocation, p2.position)
  );
  const angles = playersByDistance
    .slice(0, 4)
    .map((p) => p.position)
    .map((p) =>
      vector(1, 0).angleTo(vector(p.x - jumpLocation.x, p.y - jumpLocation.y))
    );

  return composeMechanics([
    {
      applyDamage: () => ZeroDamage,
      display: () => (
        <>
          <BlackCat position={point(0.5, 0.5)} rotation={90} />
          <BlackCatClone position={jumpLocation} rotation={store2.rotation} />
          {store1 && (
            <BlackCatClone
              position={store1.position}
              rotation={store1.rotation}
            />
          )}
        </>
      ),
      getSafeSpot: (_ps, p) => {
        const offset = trueNorthSafe(p.designation).multiply(
          store2.dpsFirst == isDps(p.designation) ? 0.02 : 0.2
        );
        return jumpLocation.translate(offset);
      },
      progress: (ps) => [
        nailchipperRehit1(store1, store2, jumpLocation, angles1, angles),
        ps,
      ],
    },
    ...angles.map((a) => getCone(jumpLocation, a)),
  ]);
};

const nailchipperRehit1 = (
  store1: {
    position: Point;
    rotation: number;
    jumpSide: "Left" | "Right";
    side: "Left" | "Right";
  } | null,
  store2: {
    position: Point;
    rotation: number;
    jumpSide: "Left" | "Right";
    dpsFirst: boolean;
  },
  jumpLocation: Point,
  angles1: number[],
  angles2: number[]
): Mechanic<Player> => {
  return composeMechanics([
    {
      applyDamage: () => ZeroDamage,
      display: () => (
        <>
          <BlackCat position={point(0.5, 0.5)} rotation={90} />
          {store1 && (
            <BlackCatClone
              position={store1.position}
              rotation={store1.rotation}
            />
          )}
        </>
      ),
      getSafeSpot: (_ps, _p) => null,
      progress: (ps) => [
        nailchipperFinal(store1, store2, ps, jumpLocation, angles2),
        ps.map((p) => ({
          ...p,
          debuffs: [],
        })),
      ],
    },
    ...angles1.map((a) => getCone(jumpLocation, a)),
  ]);
};
const nailchipperFinal = (
  store1: {
    position: Point;
    rotation: number;
    jumpSide: "Left" | "Right";
    side: "Left" | "Right";
  } | null,
  store2: {
    position: Point;
    rotation: number;
    jumpSide: "Left" | "Right";
    dpsFirst: boolean;
  },
  players: Player[],
  jumpLocation: Point,
  angles: number[]
): Mechanic<Player> => {
  const circles = players
    .filter((p) => isDps(p.designation) !== store2.dpsFirst)
    .map((p) => p.position);

  return composeMechanics([
    {
      applyDamage: () => ZeroDamage,
      display: () => (
        <>
          <BlackCat position={point(0.5, 0.5)} rotation={90} />
          {store1 && (
            <BlackCatClone
              position={store1.position}
              rotation={store1.rotation}
            />
          )}
        </>
      ),
      getSafeSpot: (_ps, _p) => null,
      progress: (ps) => [
        store1 === null ? emptyMechanic() : tempetuosTear(store1, null!),
        ps.map((p) => ({
          ...p,
          debuffs: [],
        })),
      ],
    },
    ...angles.map((a) => getCone(jumpLocation, a)),
    ...circles.map((p) => getCircle(p)),
  ]);
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

const getCircle = (position: Point) => {
  return circleMechanic(position, 0.1, SimpleHeavyDamageProfile, {
    includeContainer: false,
  });
};

const trueNorthVectorSupportBait = (d: Designation) => {
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
