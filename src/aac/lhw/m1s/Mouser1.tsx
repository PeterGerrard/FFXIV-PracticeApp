import { point, Point, vector } from "@flatten-js/core";
import { useTitle } from "../../../components/useTitle";
import {
  Designation,
  Designations,
  getRandomPos,
  getRole,
  isDps,
} from "../../../gamestate/gameState";
import { Player } from "../../../gamestate/Player";
import { useFullPartyProfile } from "../../../gamestate/Setup/ProfileContext";
import {
  automatic,
  calculateDamageForPlayer,
  composeMechanics,
  FinishedMechanic,
  Mechanic,
  useMechanic,
  withProgress,
  withSafeSpot,
} from "../../../gamestate/mechanics";
import { Button } from "@/components/ui/button";
import { Mouser1Arena } from "./arena/Arena";
import { ReloadIcon } from "@radix-ui/react-icons";
import { pickOne, shuffle } from "../../../gamestate/helpers";
import { PunchTargetDebuff } from "./PunchTargetDebuff";
import { lineMechanic } from "../../../gamestate/Mechanics/LineAoE";
import { Arena } from "../../../components/Arena";

type Section = [number, number];

const getSection = (p: Point): Section => {
  return [Math.floor(p.x * 4), Math.floor(p.y * 4)];
};

const getOppositeSection = (p: Point): Section => {
  return [p.x < 0.5 ? 2 : 1, p.y < 0.5 ? 2 : 1];
};

const onSection = (p: Point, section: Section) => {
  const actualSection = getSection(p);
  return matchingSection(actualSection, section);
};

const matchingSection = (s1: Section, s2: Section) => {
  return s1[0] === s2[0] && s1[1] === s2[1];
};

const safeSections = (
  destroyedSections: Section[],
  damagedSections: Section[]
): Section[] => {
  return [0, 1, 2, 3]
    .flatMap((x) => [0, 1, 2, 3].map<Section>((y) => [x, y]))
    .filter(
      (s) =>
        !destroyedSections.some((d) => matchingSection(d, s)) &&
        !damagedSections.some((d) => matchingSection(d, s))
    );
};

const pickSpot = (
  destroyedSections: Section[],
  damagedSections: Section[]
): Point => {
  const [x, y] = pickOne(safeSections(destroyedSections, damagedSections));

  let p1, p2;
  switch (x) {
    case 0:
      p1 = 0.01;
      break;
    case 1:
      p1 = y === 0 || y === 3 ? 0.26 : 0.49;
      break;
    case 2:
      p1 = y === 0 || y === 3 ? 0.74 : 0.51;
      break;
    case 3:
      p1 = 0.99;
      break;
    default:
      throw new Error("Invalid safe spot");
  }
  switch (y) {
    case 0:
      p2 = 0.01;
      break;
    case 1:
      p2 = x === 0 || x === 3 ? 0.26 : 0.49;
      break;
    case 2:
      p2 = x === 0 || x === 3 ? 0.74 : 0.51;
      break;
    case 3:
      p2 = 0.99;
      break;
    default:
      throw new Error("Invalid safe spot");
  }
  return point(p1, p2);
};

const getKnockbackLocation = (p: Point): Point => {
  const [x, y] = getSection(p);
  const v = vector(p, point(0.125 + 0.25 * x, 0.125 + 0.25 * y))
    .normalize()
    .multiply(0.25);
  return p.translate(v);
};

const punchMechanicTargetMove = (
  targetDesignation: Designation,
  nextTargets: Designation[],
  destroyedSections: Section[],
  damagedSections: Section[],
  knockback: boolean
): Mechanic<Player> => {
  return withSafeSpot(
    withProgress(
      missingFloorMechanic(destroyedSections, damagedSections),
      (ps) => {
        const safeSquare = getOppositeSection(
          ps.filter((p) => p.designation === targetDesignation)[0].position
        );
        return [
          punchMechanicRestMove(
            targetDesignation,
            nextTargets,
            destroyedSections,
            damagedSections,
            safeSquare,
            knockback
          ),
          ps,
        ];
      }
    ),
    (_ps, p) =>
      p.designation === targetDesignation
        ? pickSpot(destroyedSections, damagedSections)
        : p.position
  );
};

const punchMechanicRestMove = (
  targetDesignation: Designation,
  nextTargets: Designation[],
  destroyedSections: Section[],
  damagedSections: Section[],
  safeSection: Section,
  knockback: boolean
): Mechanic<Player> => {
  return withSafeSpot(
    withProgress(
      missingFloorMechanic(destroyedSections, damagedSections),
      (ps) => {
        const nextPlayer = ps.filter(
          (p) => p.designation === targetDesignation
        )[0];
        return [
          punchMechanicHit(
            nextPlayer,
            nextTargets,
            destroyedSections,
            damagedSections,
            knockback
          ),
          ps,
        ];
      }
    ),
    (_ps, p) =>
      p.designation === targetDesignation
        ? p.position
        : point(0.125 + safeSection[0] * 0.25, 0.125 + safeSection[1] * 0.25)
  );
};

const punchMechanicHit = (
  targetPlayer: Player,
  nextTargets: Designation[],
  destroyedSections: Section[],
  damagedSections: Section[],
  knockback: boolean
): Mechanic<Player> => {
  const targetSection = getSection(targetPlayer.position);
  const sectionCentre = point(
    0.125 + 0.25 * targetSection[0],
    0.125 + 0.25 * targetSection[1]
  );

  const hitMechanic = composeMechanics(
    [0, 1, 2, 3].map((i) =>
      lineMechanic(sectionCentre, (i * Math.PI) / 2, 0.25, {
        damage: 0,
        debuffRequirement: PunchTargetDebuff,
        instaKill: null,
        roleRequirement: null,
        split: false,
      })
    )
  );

  return automatic(
    withProgress(
      composeMechanics([
        missingFloorMechanic(destroyedSections, damagedSections),
        hitMechanic,
      ]),
      (ps) => {
        const kbPlayer = ps.filter(
          (p) => p.designation === targetPlayer.designation
        )[0];
        const targetLocation = knockback
          ? getKnockbackLocation(kbPlayer.position)
          : kbPlayer.position;
        const targetSection = getSection(targetLocation);
        let damaged = damagedSections;
        let destroyed = destroyedSections;
        if (damagedSections.some((d) => matchingSection(targetSection, d))) {
          damaged = damagedSections.filter(
            (d) => !matchingSection(targetSection, d)
          );
          destroyed.push(targetSection);
        }
        if (!destroyedSections.some((d) => matchingSection(targetSection, d))) {
          damaged.push(targetSection);
        }
        if (nextTargets.length > 0) {
          return [
            punchMechanicTargetMove(
              nextTargets[0],
              nextTargets.splice(1),
              destroyed,
              damaged,
              !knockback
            ),
            ps.map((p) => ({
              ...p,
              position: p === kbPlayer ? targetLocation : p.position,
              debuffs:
                p.designation === nextTargets[0] ? [PunchTargetDebuff] : [],
            })),
          ];
        } else {
          return [
            composeMechanics([
              missingFloorMechanic(destroyed, damaged),
              FinishedMechanic,
            ]),
            ps.map((p) => ({ ...p, debuffs: [] })),
          ];
        }
      }
    ),
    1000
  );
};

const missingFloorMechanic = (
  destroyedSections: Section[],
  damagedSections: Section[]
): Mechanic<Player> => {
  return {
    applyDamage: calculateDamageForPlayer((p) =>
      destroyedSections.some((s) => onSection(p.position, s)) ? 2 : 0
    ),
    display: () => (
      <Mouser1Arena
        damagedSections={damagedSections}
        destroyedSections={destroyedSections}
      />
    ),
    getSafeSpot: () => null,
    progress: (ps) => [null, ps],
  };
};

const initialState = (): Mechanic<Player> => {
  const d = pickOne(["Horizontal", "Vertical"] as const);
  const side = pickOne([false, true]);
  const getDamaged = side
    ? (n: number) => 2 - (n % 2)
    : (n: number) => 1 + (n % 2);
  const dps = pickOne([true, false]);
  const targets = shuffle(
    Designations.filter((d) => (dps ? isDps(d) : !isDps(d)))
  );

  const damagedSections = [0, 1, 2, 3].map<Section>((z) =>
    d === "Horizontal" ? [getDamaged(z), z] : [z, getDamaged(z)]
  );
  const destroyedSections = [0, 1, 2, 3].flatMap<Section>((z) =>
    d === "Horizontal"
      ? [
          [0, z],
          [3, z],
        ]
      : [
          [z, 0],
          [z, 3],
        ]
  );

  return withProgress(
    missingFloorMechanic(destroyedSections, damagedSections),
    (ps) => [
      punchMechanicTargetMove(
        targets[0],
        targets.slice(1),
        destroyedSections,
        damagedSections,
        true
      ),
      ps.map((p) => ({
        ...p,
        debuffs: p.designation === targets[0] ? [PunchTargetDebuff] : [],
      })),
    ]
  );
};

export const Mouser1 = () => {
  const setup = useFullPartyProfile();
  useTitle("Mouser 1");

  const [mechanic, players, restart, move] = useMechanic(initialState, () =>
    Designations.map((d) => ({
      type: "Full",
      alive: true,
      controlled: setup.designation === d,
      debuffs: [],
      designation: d,
      position: getRandomPos(
        (p) => p.x > 0.25 && p.x < 0.75 && p.y > 0.25 && p.y < 0.75
      ),
      role: getRole(d),
      distanceTravelled: 0,
    }))
  );

  return (
    <div className="flex flex-col">
      <div>
        <Button onClick={() => restart()}>
          Reset
          <ReloadIcon />
        </Button>
      </div>
      <Arena
        players={players}
        moveTo={move}
        mechanic={mechanic}
        showPartyList={false}
      ></Arena>
    </div>
  );
};
