import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { useTitle } from "../../../components/useTitle";
import { Debuff, Player } from "../../Player";
import { SetupContext } from "../../Setup/Setup";
import {
  Designation,
  Designations,
  distanceTo,
  getRandomPos,
  getRole,
} from "../../gameState";
import {
  Mechanic,
  ZeroDamage,
  automatic,
  calculateDamage,
  composeMechanics,
  sequence,
  useMechanic,
} from "../../mechanics";
import { P12P2Arena, P12SP2Waymarks } from "../P12SP2Arena";
import fireMarkerSrc from "./assets/fire-marker.png";
import windMarkerSrc from "./assets/wind-marker.png";
import entropification1Src from "./assets/entropification1.png";
import entropification2Src from "./assets/entropification2.png";
import entropification3Src from "./assets/entropification3.png";
import entropification4Src from "./assets/entropification4.png";
import entropification5Src from "./assets/entropification5.png";
import entropification6Src from "./assets/entropification6.png";
import entropification7Src from "./assets/entropification7.png";
import entropification8Src from "./assets/entropification8.png";
import { Point, point } from "@flatten-js/core";
import { CircleAoE, circleMechanic } from "../../Mechanics/CircleAoE";
import { SimpleHeavyDamageProfile } from "../../Mechanics/DangerPuddles";
import fireSrc from "../assets/fire.png";
import { pickOne, shuffle } from "../../helpers";
import caloricStack1 from "../assets/CaloricCount1.png";
import caloricStack2 from "../assets/CaloricCount2.png";
import caloricStack3 from "../assets/CaloricCount3.png";
import caloricStack4 from "../assets/CaloricCount4.png";
import caloricStack5 from "../assets/CaloricCount5.png";
const CaloricStack1Debuff: Debuff = {
  name: "Caloric Stack 1",
  src: caloricStack1,
};
const CaloricStack2Debuff: Debuff = {
  name: "Caloric Stack 2",
  src: caloricStack2,
};
const CaloricStack3Debuff: Debuff = {
  name: "Caloric Stack 3",
  src: caloricStack3,
};
const CaloricStack4Debuff: Debuff = {
  name: "Caloric Stack 4",
  src: caloricStack4,
};
const CaloricStack5Debuff: Debuff = {
  name: "Caloric Stack 5",
  src: caloricStack5,
};

type Caloric2Player = Player & {
  distance: number;
  caloricStack: number;
};

const getNextStackCount = (
  priorPlayers: Caloric2Player[],
  p: Caloric2Player
): [number, number] => {
  const d =
    p.distance +
    distanceTo(
      priorPlayers.filter((q) => q.designation === p.designation)[0].position,
      p.position
    );
  const caloricStack = p.caloricStack + Math.trunc(d / 0.21);
  return [caloricStack, d % 0.21];
};

const caloricStackMechanic = (
  priorPlayers: Caloric2Player[],
  times: number
): Mechanic<Caloric2Player> => {
  return {
    applyDamage: (ps) =>
      calculateDamage(() =>
        ps.some((p) => getNextStackCount(priorPlayers, p)[0] >= 5) ? 10 : 0
      ),
    display: () => <></>,
    getSafeSpot: () => null,
    progress: (newPlayers) => {
      const updatedPlayers = newPlayers.map((p) => {
        const [caloricStack, distance] = getNextStackCount(priorPlayers, p);
        return {
          ...p,
          distance: distance,
          caloricStack: caloricStack,
          debuffs: [
            ...p.debuffs.filter(
              (d) =>
                ![
                  CaloricStack1Debuff,
                  CaloricStack2Debuff,
                  CaloricStack3Debuff,
                  CaloricStack4Debuff,
                  CaloricStack5Debuff,
                ].includes(d)
            ),
            getCaloricDebuff(caloricStack),
          ],
        };
      });
      return [
        times <= 1 ? null : caloricStackMechanic(updatedPlayers, times - 1),
        updatedPlayers,
      ];
    },
  };
};

const getCaloricDebuff = (stackCount: number) => {
  if (stackCount === 1) {
    return CaloricStack1Debuff;
  }
  if (stackCount === 2) {
    return CaloricStack2Debuff;
  }
  if (stackCount === 3) {
    return CaloricStack3Debuff;
  }
  if (stackCount === 4) {
    return CaloricStack4Debuff;
  }
  return CaloricStack5Debuff;
};

const fireDebuff: Debuff = {
  name: "Fire",
  markerSrc: fireMarkerSrc,
};
const windDebuff: Debuff = {
  name: "Wind",
  markerSrc: windMarkerSrc,
};
const entropification1Debuff: Debuff = {
  name: "Entropification 1",
  src: entropification1Src,
  markerSrc: fireSrc,
};
const entropification2Debuff: Debuff = {
  name: "Entropification 2",
  src: entropification2Src,
  markerSrc: fireSrc,
};
const entropification3Debuff: Debuff = {
  name: "Entropification 3",
  src: entropification3Src,
  markerSrc: fireSrc,
};
const entropification4Debuff: Debuff = {
  name: "Entropification 4",
  src: entropification4Src,
  markerSrc: fireSrc,
};
const entropification5Debuff: Debuff = {
  name: "Entropification 5",
  src: entropification5Src,
  markerSrc: fireSrc,
};
const entropification6Debuff: Debuff = {
  name: "Entropification 6",
  src: entropification6Src,
  markerSrc: fireSrc,
};
const entropification7Debuff: Debuff = {
  name: "Entropification 7",
  src: entropification7Src,
  markerSrc: fireSrc,
};
const entropification8Debuff: Debuff = {
  name: "Entropification 8",
  src: entropification8Src,
  markerSrc: fireSrc,
};

const entropificationDebuffs = [
  entropification1Debuff,
  entropification2Debuff,
  entropification3Debuff,
  entropification4Debuff,
  entropification5Debuff,
  entropification6Debuff,
  entropification7Debuff,
  entropification8Debuff,
];

const entropificationStart = (
  fireTarget: Designation
): Mechanic<Caloric2Player> => {
  const initialTarget = shuffle(
    Designations.filter((d) => d !== fireTarget)
  )[0];
  return {
    applyDamage: () => ZeroDamage,
    display: () => <></>,
    getSafeSpot: () => null,
    autoProgress: 0,
    progress: (ps) => [
      entropificationMechanic(ps, initialTarget, fireTarget, null, [], 7),
      ps.map((p) => ({
        ...p,
        debuffs:
          p.designation === initialTarget
            ? [...p.debuffs, entropification8Debuff]
            : p.debuffs,
      })),
    ],
  };
};

const getMoveToSpot = (player: Designation, fireTarget: Designation): Point => {
  if (player === fireTarget) {
    return point(0.5, P12SP2Waymarks["Waymark B"].y);
  }
  switch (player) {
    case "MT":
      return getDesignationPos("H1");
    case "OT":
      return getDesignationPos("M2");
    case "H1":
      return getDesignationPos("M1");
    case "H2":
      return getDesignationPos("R2");
    case "M1":
      return getDesignationPos("OT");
    case "M2":
      return getDesignationPos("H2");
    case "R1":
      return getMoveToSpot(fireTarget, player);
    case "R2":
      return getDesignationPos("MT");
  }
};

const getFinalSpot = (player: Designation, fireTarget: Designation): Point => {
  if (player === fireTarget) {
    return point(0.5, P12SP2Waymarks["Waymark B"].y);
  }
  switch (player) {
    case "MT":
      return point(1 / 5.65 - 0.03, 4 / 10 + 11 / 40);
    case "OT":
      return point(5 / 5.65 - 0.03, 1 / 10 + 11 / 40);
    case "H1":
      return point(1 / 5.65 - 0.03, 2 / 10 + 11 / 40);
    case "H2":
      return point(5 / 5.65 - 0.03, 6 / 10 + 11 / 40);
    case "M1":
      return point(2 / 5.65 - 0.03, 0 / 10 + 11 / 40);
    case "M2":
      return point(5 / 5.65 - 0.03, 3 / 10 + 11 / 40);
    case "R1":
      return getFinalSpot(fireTarget, player);
    case "R2":
      return point(2 / 5.65 - 0.03, 6 / 10 + 11 / 40);
  }
};

const entropificationMechanic = (
  players: Caloric2Player[],
  entropificationTarget: Designation,
  fireTarget: Designation,
  priorDrop: Point | null,
  movedPlayers: Designation[],
  stackCount: number
): Mechanic<Caloric2Player> => {
  const droppedPosition = players.filter(
    (p) => p.designation === entropificationTarget
  )[0].position;
  if (stackCount <= 0) {
    return {
      applyDamage: (ps) =>
        calculateDamage((p) =>
          distanceTo(
            ps.filter((q) => q.designation === p)[0].position,
            droppedPosition
          ) > 0.17
            ? 0
            : 10
        ),
      display: () => (
        <>
          <CircleAoE
            radius={0.17}
            source={droppedPosition}
            disableAnimation={false}
          />
          {priorDrop !== null && (
            <CircleAoE
              radius={0.17}
              source={priorDrop}
              disableAnimation={true}
            />
          )}
        </>
      ),
      getSafeSpot: (_, p) => getFinalSpot(p.designation, fireTarget),
      progress: (ps) => [
        composeMechanics<Caloric2Player>(
          ps.map((p) =>
            circleMechanic(p.position, 0.17, SimpleHeavyDamageProfile, {
              color: "lightgreen",
            })
          )
        ),
        ps.map((p) => ({
          ...p,
          debuffs: p.debuffs.filter((d) => !entropificationDebuffs.includes(d)),
        })),
      ],
    };
  }

  return {
    applyDamage: (ps) =>
      calculateDamage((p) =>
        distanceTo(
          ps.filter((q) => q.designation === p)[0].position,
          droppedPosition
        ) > 0.17
          ? 0
          : 10
      ),
    display: () => (
      <>
        <CircleAoE
          radius={0.17}
          source={droppedPosition}
          disableAnimation={false}
        />
        {priorDrop !== null && (
          <CircleAoE radius={0.17} source={priorDrop} disableAnimation={true} />
        )}
      </>
    ),
    getSafeSpot: (ps, p) =>
      movedPlayers.includes(p.designation)
        ? getFinalSpot(p.designation, fireTarget)
        : p.designation === entropificationTarget
          ? getMoveToSpot(p.designation, fireTarget)
          : getStartSpot(ps, p),
    progress: (ps) => {
      const entropPos = ps.filter(
        (p) => p.designation === entropificationTarget
      )[0].position;
      const otherPlayers = ps.filter(
        (p) => p.designation !== entropificationTarget
      );
      otherPlayers.sort(
        (p1, p2) =>
          distanceTo(entropPos, p1.position) -
          distanceTo(entropPos, p2.position)
      );
      const closestPlayer = otherPlayers[0];
      const passed = distanceTo(entropPos, closestPlayer.position) < 0.05;
      const newTarget = passed
        ? closestPlayer.designation
        : entropificationTarget;
      const updatedPlayers = ps.map((p) => {
        const debuffs = p.debuffs.filter(
          (d) => !entropificationDebuffs.includes(d)
        );
        if (p.designation === newTarget) {
          debuffs.push(entropificationDebuffs[stackCount - 1]);
        }
        return { ...p, debuffs };
      });
      return [
        entropificationMechanic(
          updatedPlayers,
          newTarget,
          fireTarget,
          droppedPosition,
          [...movedPlayers, entropificationTarget],
          stackCount - 1
        ),
        updatedPlayers,
      ];
    },
  };
};

const getDesignationPos = (d: Designation): Point => {
  switch (d) {
    case "MT":
      return point(0.5, 5 / 10 + 11 / 40);
    case "OT":
      return point(0.5, 1 / 10 + 11 / 40);
    case "H1":
      return point(2 / 5.65 - 0.03, 4 / 10 + 11 / 40);
    case "H2":
      return point(4 / 5.65 - 0.03, 4 / 10 + 11 / 40);
    case "M1":
      return point(2 / 5.65 - 0.03, 2 / 10 + 11 / 40);
    case "M2":
      return point(4 / 5.65 - 0.03, 2 / 10 + 11 / 40);
    case "R1":
      return point(0.5, P12SP2Waymarks["Waymark B"].y);
    case "R2":
      return point(4 / 5.65 - 0.03, 6 / 10 + 11 / 40);
  }
};
const getStartSpot = (players: Player[], player: Player): Point => {
  if (player.debuffs.includes(fireDebuff)) {
    return point(0.5, P12SP2Waymarks["Waymark B"].y);
  }
  if (player.designation === "R1") {
    return getDesignationPos(
      players.filter((p) => p.debuffs.includes(fireDebuff))[0].designation
    );
  } else {
    return getDesignationPos(player.designation);
  }
};

const debuffExplosions = (
  players: Player[],
  fireTarget: Designation
): Mechanic<Caloric2Player> =>
  sequence([
    automatic(
      composeMechanics(
        players.map((p) =>
          circleMechanic(p.position, 0.175, SimpleHeavyDamageProfile, {
            color: p.debuffs.includes(fireDebuff) ? "orange" : "lightgreen",
          })
        )
      ),
      1500
    ),
    entropificationStart(fireTarget),
  ]);

export const CaloricTheory2 = () => {
  const setup = useContext(SetupContext);
  useTitle("Caloric 2");

  const [mechanic, players, restart, move] = useMechanic<Caloric2Player>(
    () =>
      composeMechanics<Caloric2Player>([
        {
          applyDamage: () => ZeroDamage,
          display: () => <></>,
          getSafeSpot: getStartSpot,
          progress: (ps) => {
            const fireTarget = ps.filter((p) =>
              p.debuffs.includes(fireDebuff)
            )[0].designation;
            return [
              debuffExplosions(ps, fireTarget),
              ps.map((p) => ({
                ...p,
                caloricStack: p.debuffs.includes(fireDebuff) ? 3 : 2,
              })),
            ];
          },
        },
        {
          applyDamage: () => ZeroDamage,
          display: () => <></>,
          getSafeSpot: () => null,
          progress: (ps) => [caloricStackMechanic(ps, 10), ps],
        },
      ]),
    () => {
      const fireMarker = pickOne(Designations);

      return Designations.map((d) => ({
        alive: true,
        controlled: setup.state.designation === d,
        debuffs: [d === fireMarker ? fireDebuff : windDebuff],
        designation: d,
        position: getRandomPos((p) => p.y > 0.3),
        role: getRole(d),
        distanceTravelled: 0,
        distance: 0,
        caloricStack: 2,
      }));
    }
  );

  return (
    <div className="flex flex-col">
      <div>
        <Button onClick={() => restart()}>
          Reset
          <ReloadIcon />
        </Button>
      </div>
      <P12P2Arena
        players={players}
        mechanic={mechanic}
        moveTo={move}
        showCaloricGrid={true}
      ></P12P2Arena>
    </div>
  );
};
