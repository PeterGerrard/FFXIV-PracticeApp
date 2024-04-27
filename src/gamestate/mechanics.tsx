import { Point, point } from "@flatten-js/core";
import { Designation } from "./gameState";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Player } from "./Player";

export type Mechanic<TPlayer> = {
  applyDamage: (players: TPlayer[]) => { [designation in Designation]: number };
  getSafeSpots: (players: TPlayer[], player: TPlayer) => Point[];
  autoProgress?: number;
  progress: () => Mechanic<TPlayer> | null;
  display: (disableAnimation: boolean) => React.ReactElement;
};

export const EmptyMechanic: Mechanic<unknown> = {
  applyDamage: () => ({
    H1: 0,
    H2: 0,
    M1: 0,
    M2: 0,
    MT: 0,
    OT: 0,
    R1: 0,
    R2: 0,
  }),
  display: () => <></>,
  getSafeSpots: () => [point(0.5, 0.5)],
  progress: () => null,
};

export const ZeroDamage: { [d in Designation]: number } = {
  MT: 0,
  OT: 0,
  H1: 0,
  H2: 0,
  M1: 0,
  M2: 0,
  R1: 0,
  R2: 0,
};

export const afterMove = <TPlayer extends Player>(
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

export const sequence = <TPlayer extends Player>(
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

export const automatic = <TPlayer extends Player>(
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

export const withSafeSpot = <TPlayer extends Player>(
  mechanic: Mechanic<TPlayer>,
  getSafeSpots: (players: TPlayer[], player: TPlayer) => Point[]
): Mechanic<TPlayer> => {
  return {
    ...mechanic,
    getSafeSpots,
  };
};

export const composeMechanics = <TPlayer extends {}>(
  mechanics: Mechanic<TPlayer>[]
): Mechanic<TPlayer> => {
  return {
    applyDamage: (players) =>
      mechanics
        .map((m) => m.applyDamage(players))
        .reduce(
          (acc, next) => ({
            H1: acc.H1 + next.H1,
            H2: acc.H2 + next.H2,
            R1: acc.R1 + next.R1,
            R2: acc.R2 + next.R2,
            M1: acc.M1 + next.M1,
            M2: acc.M2 + next.M2,
            MT: acc.MT + next.MT,
            OT: acc.OT + next.OT,
          }),
          {
            H1: 0,
            H2: 0,
            R1: 0,
            R2: 0,
            M1: 0,
            M2: 0,
            MT: 0,
            OT: 0,
          }
        ),
    getSafeSpots: (players, player) =>
      mechanics
        .map((m) => m.getSafeSpots(players, player))
        .reduce((acc, next) => acc.filter((a) => next.includes(a))),
    progress: () => null,
    display: (disableAnimation) => (
      <>
        {mechanics.map((m, i) => (
          <Fragment key={i}>{m.display(disableAnimation)}</Fragment>
        ))}
      </>
    ),
  };
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

export const useMechanic = <T extends Player>(
  initialMechanic: Mechanic<T>,
  createPlayers: () => T[]
) => {
  const [mechanic, setMechanic] = useState(initialMechanic);
  const [players, setPlayers] = useState(createPlayers());

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

  const restart = useCallback(() => {
    setMechanic(initialMechanic);
    setPlayers(createPlayers());
  }, [initialMechanic, createPlayers]);

  const move = useCallback(
    (pos: Point) => {
      const [nextMech, nextPs] = onMove(mechanic, players, pos);
      setPlayers(nextPs);
      setMechanic(nextMech);
    },
    [mechanic, players]
  );

  return [mechanic, players, restart, move] as const;
};
