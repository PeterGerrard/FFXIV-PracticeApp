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
  useMechanic,
} from "../../mechanics";
import { P12P2Arena, P12SP2Waymarks } from "../P12SP2Arena";
import fireMarkerSrc from "./assets/fire-marker.png";
import windMarkerSrc from "./assets/wind-marker.png";
import entropification8Src from "./assets/entropification8.png";
import { Point, point } from "@flatten-js/core";
import { circleMechanic } from "../../Mechanics/CircleAoE";
import { SimpleHeavyDamageProfile } from "../../Mechanics/DangerPuddles";
import fireSrc from "../assets/fire.png";
import { shuffle } from "../../helpers";
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

const caloricStackMechanic = (
  priorPlayers: Caloric2Player[],
  times: number
): Mechanic<Caloric2Player> => {
  return {
    applyDamage: (ps) =>
      calculateDamage(() => (ps.some((p) => p.caloricStack >= 5) ? 10 : 0)),
    display: () => <></>,
    getSafeSpot: () => null,
    autoProgress: times % 2 === 1 ? 0 : undefined,
    progress: (newPlayers) => {
      const updatedPlayers = newPlayers.map((p) => {
        const d =
          p.distance +
          distanceTo(
            priorPlayers.filter((q) => q.designation === p.designation)[0]
              .position,
            p.position
          );
        const caloricStack = p.caloricStack + Math.trunc(d / 0.2);
        return {
          ...p,
          distance: d % 0.2,
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
const entropification8Debuff: Debuff = {
  name: "Entropification 8",
  src: entropification8Src,
  markerSrc: fireSrc,
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

const debuffExplosions = (players: Player[]): Mechanic<Caloric2Player> =>
  automatic(
    composeMechanics(
      players.map((p) =>
        circleMechanic(p.position, 0.175, SimpleHeavyDamageProfile, {
          color: p.debuffs.includes(fireDebuff) ? "orange" : "lightgreen",
        })
      )
    ),
    1500
  );

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
            const initialTarget = shuffle(
              ps.filter((p) => p.debuffs.includes(windDebuff))
            )[0].designation;
            return [
              debuffExplosions(ps),
              ps.map((p) => ({
                ...p,
                caloricStack: p.debuffs.includes(fireDebuff) ? 3 : 2,
                debuffs:
                  initialTarget === p.designation
                    ? [entropification8Debuff]
                    : [],
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
    () =>
      Designations.map((d) => ({
        alive: true,
        controlled: setup.state.designation === d,
        debuffs: [d === "H1" ? fireDebuff : windDebuff],
        designation: d,
        position: getRandomPos((p) => p.y > 0.3),
        role: getRole(d),
        distanceTravelled: 0,
        distance: 0,
        caloricStack: 2,
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
      <P12P2Arena
        players={players}
        mechanic={mechanic}
        moveTo={move}
        showCaloricGrid={true}
      ></P12P2Arena>
    </div>
  );
};
