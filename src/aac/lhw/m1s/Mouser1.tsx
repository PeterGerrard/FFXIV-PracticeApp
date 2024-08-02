import { point, Point, vector } from "@flatten-js/core";
import { useTitle } from "../../../components/useTitle";
import {
  Designation,
  Designations,
  getGroup,
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
  ZeroDamage,
} from "../../../gamestate/mechanics";
import { Button } from "@/components/ui/button";
import { Mouser1Arena } from "./arena/Arena";
import { ReloadIcon } from "@radix-ui/react-icons";
import { pickOne, shuffle } from "../../../gamestate/helpers";
import { PunchTargetDebuff } from "./PunchTargetDebuff";
import { lineMechanic } from "../../../gamestate/Mechanics/LineAoE";
import { Arena } from "../../../components/Arena";
import { Mouser1ArenaSection } from "./arena/ArenaSection";

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

const pickSpot = (sections: Mouser1ArenaSection[]): Point => {
  const { x, y } = pickOne(sections.filter((s) => s.status === "Safe"));

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
  sections: Mouser1ArenaSection[],
  knockback: boolean,
  direction: "Vertical" | "Horizontal"
): Mechanic<Player> => {
  return withSafeSpot(
    withProgress(missingFloorMechanic(sections), (ps) => {
      const safeSquare = getOppositeSection(
        ps.filter((p) => p.designation === targetDesignation)[0].position
      );
      return [
        punchMechanicRestMove(
          targetDesignation,
          nextTargets,
          sections,
          safeSquare,
          knockback,
          direction
        ),
        ps,
      ];
    }),
    (_ps, p) =>
      p.designation === targetDesignation ? pickSpot(sections) : p.position
  );
};

const punchMechanicRestMove = (
  targetDesignation: Designation,
  nextTargets: Designation[],
  sections: Mouser1ArenaSection[],
  safeSection: Section,
  knockback: boolean,
  direction: "Vertical" | "Horizontal"
): Mechanic<Player> => {
  return withSafeSpot(
    withProgress(missingFloorMechanic(sections), (ps) => {
      const nextPlayer = ps.filter(
        (p) => p.designation === targetDesignation
      )[0];
      return [
        punchMechanicHit(
          nextPlayer,
          nextTargets,
          sections,
          knockback,
          direction
        ),
        ps,
      ];
    }),
    (_ps, p) =>
      p.designation === targetDesignation
        ? p.position
        : point(0.125 + safeSection[0] * 0.25, 0.125 + safeSection[1] * 0.25)
  );
};

const applyDamageToSection = (
  s: Mouser1ArenaSection["status"]
): Mouser1ArenaSection["status"] => {
  switch (s) {
    case "Safe":
      return "Damaged";
    case "Damaged":
      return "Destroyed";
    case "Destroyed":
    case "Repair":
    case "SlowRepair":
      return s;
  }
};

const punchMechanicHit = (
  targetPlayer: Player,
  nextTargets: Designation[],
  sections: Mouser1ArenaSection[],
  knockback: boolean,
  direction: "Vertical" | "Horizontal"
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
      composeMechanics([missingFloorMechanic(sections), hitMechanic]),
      (ps) => {
        const kbPlayer = ps.filter(
          (p) => p.designation === targetPlayer.designation
        )[0];
        const targetLocation = knockback
          ? getKnockbackLocation(kbPlayer.position)
          : kbPlayer.position;
        const targetSection = getSection(targetLocation);
        const updatedSections = sections.map((s) =>
          matchingSection([s.x, s.y], targetSection)
            ? { ...s, status: applyDamageToSection(s.status) }
            : s
        );
        if (nextTargets.length > 0) {
          return [
            punchMechanicTargetMove(
              nextTargets[0],
              nextTargets.splice(1),
              updatedSections,
              !knockback,
              direction
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
            composeMechanics([repairKnockback(updatedSections, direction)]),
            ps.map((p) => ({ ...p, debuffs: [] })),
          ];
        }
      }
    ),
    1000
  );
};

const missingFloorMechanic = (
  sections: Mouser1ArenaSection[]
): Mechanic<Player> => {
  return {
    applyDamage: calculateDamageForPlayer((p) =>
      ["Destroyed", "Repair", "SlowRepair"].includes(
        sections.filter((s) => onSection(p.position, [s.x, s.y]))[0].status
      )
        ? 2
        : 0
    ),
    display: () => <Mouser1Arena sections={sections} />,
    getSafeSpot: () => null,
    progress: (ps) => [null, ps],
  };
};

const isFastRepairVertical = (
  section: Mouser1ArenaSection,
  northFast: "E" | "W"
) => {
  if (section.x === 0) {
    if (northFast === "W" && (section.y === 0 || section.y === 1)) {
      return true;
    }
    if (northFast === "E" && (section.y === 2 || section.y === 3)) {
      return true;
    }
    return false;
  }
  if (section.x === 3) {
    if (northFast === "E" && (section.y === 0 || section.y === 1)) {
      return true;
    }
    if (northFast === "W" && (section.y === 2 || section.y === 3)) {
      return true;
    }
    return false;
  }
  return false;
};
const isFastRepairHorizontal = (
  section: Mouser1ArenaSection,
  northFast: "E" | "W"
) => {
  if (section.y === 0) {
    if (northFast === "W" && (section.x === 0 || section.x === 1)) {
      return true;
    }
    if (northFast === "E" && (section.x === 2 || section.x === 3)) {
      return true;
    }
    return false;
  }
  if (section.y === 3) {
    if (northFast === "E" && (section.x === 0 || section.x === 1)) {
      return true;
    }
    if (northFast === "W" && (section.x === 2 || section.x === 3)) {
      return true;
    }
    return false;
  }
  return false;
};
const isFastRepair = (
  section: Mouser1ArenaSection,
  direction: "Vertical" | "Horizontal",
  northFast: "E" | "W"
) => {
  switch (direction) {
    case "Vertical":
      return isFastRepairVertical(section, northFast);
    case "Horizontal":
      return isFastRepairHorizontal(section, northFast);
  }
};
const isRepair = (
  section: Mouser1ArenaSection,
  direction: "Vertical" | "Horizontal"
) => {
  switch (direction) {
    case "Vertical":
      return section.x === 0 || section.x === 3;
    case "Horizontal":
      return section.y === 0 || section.y === 3;
  }
};

const KnockbackArrow = (props: { d: number; rot: number }) => {
  return (
    <g
      transform={`translate(0.5,0.5) rotate(${props.rot * 45}) scale(${props.d}) translate(-0.5,-0.5)`}
      style={{
        transformOrigin: "0.5,0.5",
      }}
    >
      <polyline
        points="0.6,0.475 0.615,0.5 0.6,0.525"
        fill="none"
        stroke="purple"
        strokeWidth={0.01}
      />
      <polyline
        points="0.62,0.475 0.635,0.5 0.62,0.525"
        fill="none"
        stroke="purple"
        strokeWidth={0.01}
      />
    </g>
  );
};

const getCentralKnockbackLocation = (p: Point): Point => {
  return p.translate(vector(point(0.5, 0.5), p).normalize().multiply(0.62));
};

const repairKnockback = (
  sections: Mouser1ArenaSection[],
  direction: "Vertical" | "Horizontal"
): Mechanic<Player> => {
  return {
    applyDamage: (_) => ZeroDamage,
    display: () => {
      return (
        <Mouser1Arena sections={sections}>
          <KnockbackArrow d={1} rot={0} />
          <KnockbackArrow d={1} rot={1} />
          <KnockbackArrow d={1} rot={2} />
          <KnockbackArrow d={1} rot={3} />
          <KnockbackArrow d={1} rot={4} />
          <KnockbackArrow d={1} rot={5} />
          <KnockbackArrow d={1} rot={6} />
          <KnockbackArrow d={1} rot={7} />
        </Mouser1Arena>
      );
    },
    autoProgress: 0,
    getSafeSpot: () => null,
    progress: (ps) => {
      const northFast = pickOne(["W", "E"] as const);
      const updatedSections = sections.map<Mouser1ArenaSection>((s) => ({
        ...s,
        status: isRepair(s, direction)
          ? isFastRepair(s, direction, northFast)
            ? "Repair"
            : "SlowRepair"
          : s.status,
      }));
      return [
        {
          applyDamage: (_) => ZeroDamage,
          display: () => (
            <Mouser1Arena sections={updatedSections}>
              <KnockbackArrow d={1} rot={0} />
              <KnockbackArrow d={1} rot={1} />
              <KnockbackArrow d={1} rot={2} />
              <KnockbackArrow d={1} rot={3} />
              <KnockbackArrow d={1} rot={4} />
              <KnockbackArrow d={1} rot={5} />
              <KnockbackArrow d={1} rot={6} />
              <KnockbackArrow d={1} rot={7} />
              <KnockbackArrow d={3} rot={0} />
              <KnockbackArrow d={3} rot={1} />
              <KnockbackArrow d={3} rot={2} />
              <KnockbackArrow d={3} rot={3} />
              <KnockbackArrow d={3} rot={4} />
              <KnockbackArrow d={3} rot={5} />
              <KnockbackArrow d={3} rot={6} />
              <KnockbackArrow d={3} rot={7} />
            </Mouser1Arena>
          ),
          getSafeSpot: (_ps, p) =>
            getGroup(p.designation) === "Group1"
              ? northFast === "E"
                ? point(0.52, 0.48)
                : point(0.52, 0.52)
              : northFast === "E"
                ? point(0.48, 0.52)
                : point(0.48, 0.48),
          progress: (ps) => [
            composeMechanics([FinishedMechanic, finishedState]),
            ps.map((p) => ({
              ...p,
              position: getCentralKnockbackLocation(p.position),
            })),
          ],
        },
        ps,
      ];
    },
  };
};

const initialState = (): Mechanic<Player> => {
  const d = pickOne(["Horizontal", "Vertical"] as const);
  const dps = pickOne([true, false]);
  const targets = shuffle(
    Designations.filter((d) => (dps ? isDps(d) : !isDps(d)))
  );

  const pattern = shuffle([
    ["Safe", "Damaged", "Safe", "Damaged"] as const,
    ["Damaged", "Safe", "Damaged", "Safe"] as const,
  ]);
  const sections = [0, 1, 2, 3].flatMap((x) =>
    [0, 1, 2, 3].map<Mouser1ArenaSection>((y) => ({
      x,
      y,
      status:
        (d === "Vertical" && (x === 0 || x === 3)) ||
        (d === "Horizontal" && (y === 0 || y === 3))
          ? "Destroyed"
          : pattern[d === "Vertical" ? x - 1 : y - 1][d === "Vertical" ? y : x],
    }))
  );

  return withProgress(missingFloorMechanic(sections), (ps) => [
    punchMechanicTargetMove(targets[0], targets.slice(1), sections, true, d),
    ps.map((p) => ({
      ...p,
      debuffs: p.designation === targets[0] ? [PunchTargetDebuff] : [],
    })),
  ]);
};

const finishedState: Mechanic<Player> = {
  applyDamage: (_) => ZeroDamage,
  display: () => (
    <Mouser1Arena
      sections={[0, 1, 2, 3].flatMap((x) =>
        [0, 1, 2, 3].map<Mouser1ArenaSection>((y) => ({
          x,
          y,
          status: "Safe",
        }))
      )}
    />
  ),
  getSafeSpot: (_ps, p) => p.position,
  progress: (ps) => [finishedState, ps],
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
