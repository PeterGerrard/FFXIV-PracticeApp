import { createLazyFileRoute } from "@tanstack/react-router";
import { Arena } from "../../components/Arena";
import { useEffect, useState } from "react";
import { circleMechanic } from "../../gamestate/Mechanics/CircleAoE";
import { Point, point } from "@flatten-js/core";
import { SimpleKillProfile } from "../../gamestate/Mechanics/DangerPuddles";
import { Mechanic, composeMechanics } from "../../gamestate/mechanics";
import { Designation, getRandomPos } from "../../gamestate/gameState";
import { Player } from "../../gamestate/Player";

const ZeroDamage: { [d in Designation]: number } = {
  MT: 0,
  OT: 0,
  H1: 0,
  H2: 0,
  M1: 0,
  M2: 0,
  R1: 0,
  R2: 0,
};

const afterMove = <TPlayer extends Player>(
  mechanic: Mechanic<TPlayer>
): Mechanic<TPlayer> => {
  return {
    applyDamage: () => ZeroDamage,
    display: () => <></>,
    getSafeSpots: mechanic.getSafeSpots,
    autoProgress: undefined,
    progress: () => mechanic,
  };
};

const sequence = <TPlayer extends Player>(
  mechanic1: Mechanic<TPlayer>,
  mechanic2: Mechanic<TPlayer>
): Mechanic<TPlayer> => {
  return {
    applyDamage: mechanic1.applyDamage,
    display: mechanic1.display,
    getSafeSpots: mechanic1.getSafeSpots,
    autoProgress: mechanic1.autoProgress,
    progress: () => {
      const next = mechanic1.progress();
      if (next === null) {
        return mechanic2;
      } else {
        return sequence(next, mechanic2);
      }
    },
  };
};

const automatic = <TPlayer extends Player>(
  mechanic: Mechanic<TPlayer>,
  delay: number
): Mechanic<TPlayer> => {
  return {
    applyDamage: mechanic.applyDamage,
    display: mechanic.display,
    getSafeSpots: mechanic.getSafeSpots,
    autoProgress: delay,
    progress: mechanic.progress,
  };
};

const withSafeSpot = <TPlayer extends Player>(
  mechanic: Mechanic<TPlayer>,
  getSafeSpots: (players: TPlayer[], player: TPlayer) => Point[]
): Mechanic<TPlayer> => {
  return {
    ...mechanic,
    getSafeSpots,
  };
};

const sampleSafeSpots = (_players: Player[], player: Player): Point[] => {
  switch (player.role) {
    case "Tank":
      return [point(0.5, 0.1)];
    case "Healer":
      return [point(0.5, 0.9)];
    case "DPS":
      return [point(0.9, 0.5)];
  }
};

const FinishedMechanic: Mechanic<Player> = {
  applyDamage: () => ZeroDamage,
  display: () => (
    <div
      style={{
        position: "absolute",
        display: "grid",
        left: 0,
        top: 0,
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignContent: "center",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <h1
        style={{
          fontSize: "min(12vi, 12vb)",
          color: "hotpink",
        }}
      >
        Finished!
      </h1>
    </div>
  ),
  getSafeSpots: (_, p) => [p.position],
  progress: () => FinishedMechanic,
};

const progress = <TPlayer extends Player>(
  mechanic: Mechanic<TPlayer>,
  players: TPlayer[]
): [Mechanic<TPlayer>, TPlayer[]] => {
  if (players.some((p) => !p.alive)) {
    return [mechanic, players];
  }
  const damageMap = mechanic.applyDamage(players);
  const damagedPlayers = players.map((p) => ({
    ...p,
    alive: p.alive && damageMap[p.designation] < 1,
  }));
  if (damagedPlayers.some((p) => !p.alive)) {
    return [deathMechanic(mechanic, damagedPlayers), damagedPlayers];
  }
  return [mechanic.progress() ?? FinishedMechanic, damagedPlayers];
};

const onMove = <TPlayer extends Player>(
  mechanic: Mechanic<TPlayer>,
  players: TPlayer[],
  targetPos: Point
): [Mechanic<TPlayer>, TPlayer[]] => {
  if (mechanic.autoProgress !== undefined) {
    return [mechanic, players];
  }
  const movedPlayers = players.map((p) => {
    if (!p.alive) {
      return p;
    }
    if (p.controlled) {
      return {
        ...p,
        position: targetPos,
      };
    }
    const targetSpots = mechanic.getSafeSpots(players, p);
    return {
      ...p,
      position: targetSpots.length > 0 ? targetSpots[0] : p.position,
    };
  });
  return progress(mechanic, movedPlayers);
};

const deathMechanic = <TPlayer extends Player>(
  failedMechanic: Mechanic<TPlayer>,
  players: TPlayer[]
): Mechanic<TPlayer> => {
  const controlledPlayer = players.filter((p) => p.controlled)[0];
  const safeSpot = failedMechanic.getSafeSpots(players, controlledPlayer)[0];
  return {
    applyDamage: () => ZeroDamage,
    display: () => (
      <>
        {failedMechanic.display(true)}
        <svg
          height="100%"
          width="100%"
          style={{
            position: "absolute",
            left: `${safeSpot.x * 100}%`,
            top: `${safeSpot.y * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="black"
            strokeWidth="3"
            fill="green"
            opacity={0.8}
          />
        </svg>
      </>
    ),
    getSafeSpots: failedMechanic.getSafeSpots,
    progress: () => deathMechanic(failedMechanic, players),
  };
};

export const Route = createLazyFileRoute("/dev/simpleaoe")({
  component: () => {
    const [mechanic, setMechanic] = useState(
      sequence(
        afterMove(
          withSafeSpot(
            circleMechanic(point(0.5, 0.5), 0.25, SimpleKillProfile),
            sampleSafeSpots
          )
        ),
        afterMove(
          withSafeSpot(
            automatic(
              composeMechanics([
                circleMechanic(point(0, 0), 0.25, SimpleKillProfile),
                circleMechanic(point(0, 1), 0.25, SimpleKillProfile),
                circleMechanic(point(1, 0), 0.25, SimpleKillProfile),
                circleMechanic(point(1, 1), 0.25, SimpleKillProfile),
              ]),
              1000
            ),
            sampleSafeSpots
          )
        )
      )
    );
    useEffect(() => {
      let mounted = true;
      if (mechanic.autoProgress !== undefined) {
        setTimeout(() => {
          if (mounted) {
            const [nextMech, nextPs] = progress(mechanic, players);
            setPlayers(nextPs);
            setMechanic(nextMech);
          }
        }, mechanic.autoProgress);
      }
      return () => {
        mounted = false;
      };
    });
    const [players, setPlayers] = useState<Player[]>([
      {
        alive: true,
        controlled: true,
        debuffs: [],
        designation: "H2",
        distanceTravelled: 0,
        position: getRandomPos(() => true),
        role: "Healer",
      },
      {
        alive: true,
        controlled: false,
        debuffs: [],
        designation: "MT",
        distanceTravelled: 0,
        position: getRandomPos(() => true),
        role: "Tank",
      },
    ]);
    return (
      <Arena
        players={players}
        mechanic={mechanic}
        moveTo={(pos) => {
          const [nextMech, nextPs] = onMove(mechanic, players, pos);
          setPlayers(nextPs);
          setMechanic(nextMech);
        }}
        showPartyList={false}
      >
        <svg viewBox="0 0 1 1">
          <rect x={0} y={0} width={1} height={1} fill="lightblue" />
        </svg>
      </Arena>
    );
  },
});
