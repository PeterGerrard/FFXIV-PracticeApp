import { Point, point } from "@flatten-js/core";
import { Designation } from "./gameState";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Debuff, LightPlayer, Player } from "./Player";

export type Mechanic<TPlayer> = {
  applyDamage: (players: TPlayer[]) => { [designation in Designation]: number };
  getSafeSpot: (players: TPlayer[], player: TPlayer) => Point | null;
  autoProgress?: number;
  progress: (players: TPlayer[]) => [Mechanic<TPlayer> | null, TPlayer[]];
  display: (
    players: TPlayer[],
    disableAnimation: boolean
  ) => React.ReactElement;
};

export const emptyMechanic = <TPlayer extends Player | LightPlayer>(): Mechanic<TPlayer> => ({
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
  getSafeSpot: (_, p) => p.position,
  progress: (ps) => [null, ps],
});

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

export const calculateDamage = (f: (d: Designation) => number) => ({
  MT: f("MT"),
  OT: f("OT"),
  H1: f("H1"),
  H2: f("H2"),
  M1: f("M1"),
  M2: f("M2"),
  R1: f("R1"),
  R2: f("R2"),
});

export const afterMove = <TPlayer extends Player>(
  mechanic: Mechanic<TPlayer>
): Mechanic<TPlayer> => {
  return {
    applyDamage: () => ZeroDamage,
    display: () => <></>,
    getSafeSpot: mechanic.getSafeSpot,
    autoProgress: undefined,
    progress: (ps) => [mechanic, ps],
  };
};

export const automatic = <TPlayer extends Player>(
  mechanic: Mechanic<TPlayer>,
  delay: number
): Mechanic<TPlayer> => {
  return {
    applyDamage: mechanic.applyDamage,
    display: mechanic.display,
    getSafeSpot: mechanic.getSafeSpot,
    autoProgress: delay,
    progress: mechanic.progress,
  };
};

export const delay = <TPlayer extends Player>(
  mechanic: Mechanic<TPlayer>,
  amount: number
): Mechanic<TPlayer> => {
  if (amount <= 0) {
    return mechanic;
  }
  return {
    applyDamage: () => ZeroDamage,
    display: () => <></>,
    getSafeSpot: () => null,
    progress: (ps) => [delay(mechanic, amount - 1), ps],
  };
};

export const withSafeSpot = <TPlayer extends Player>(
  mechanic: Mechanic<TPlayer>,
  getSafeSpot: (players: TPlayer[], player: TPlayer) => Point | null
): Mechanic<TPlayer> => {
  return {
    ...mechanic,
    getSafeSpot,
  };
};

export const applyDebuff = <TPlayer extends Player>(
  mechanic: Mechanic<TPlayer>,
  getDebuff: (player: TPlayer) => Debuff | undefined
): Mechanic<TPlayer> => {
  return {
    ...mechanic,
    progress: (ps) => {
      const [next, nps] = mechanic.progress(ps);
      return [
        next,
        nps.map((p) => ({ ...p, debuffs: [...p.debuffs, getDebuff(p)] })),
      ];
    },
  };
};

export const repeat = <TPlayer extends Player>(
  mechanic: Mechanic<TPlayer>,
  times: number
): Mechanic<TPlayer> => {
  return {
    ...mechanic,
    progress: (ps) => {
      const [ns, nps] = mechanic.progress(ps);
      if (ns === null) {
        if (times <= 1) {
          return [null, nps];
        } else {
          return [repeat(mechanic, times - 1), nps];
        }
      }
      return [ns, nps];
    },
  };
};

export const sequence = <TPlayer extends Player>(
  mechanics: Mechanic<TPlayer>[]
): Mechanic<TPlayer> => {
  const [m, ...ms] = mechanics;
  return {
    ...m,
    progress: (ps) => {
      const [ns, nps] = m.progress(ps);
      if (ns === null) {
        if (ms.length == 1) {
          return [ms[0], nps];
        } else {
          return [sequence(ms), nps];
        }
      }
      return [sequence([ns, ...ms]), nps];
    },
  };
};

export const composeMechanics = <TPlayer extends {}>(
  mechanics: Mechanic<TPlayer>[]
): Mechanic<TPlayer> => {
  let value: undefined | number = undefined;
  for (const m of mechanics) {
    if (value === undefined) {
      value = m.autoProgress;
    }
  }
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
    getSafeSpot: (players, player) =>
      mechanics
        .map((m) => m.getSafeSpot(players, player))
        .reduce((acc, next) => acc ?? next),
    autoProgress: value,
    progress: (ps) => {
      let players = ps;
      let subMechanics = [];
      for (const m of mechanics) {
        const [nm, nextPs] = m.progress(players);
        players = nextPs;
        if (nm !== null) {
          subMechanics.push(nm);
        }
      }
      if (subMechanics.length == 0) {
        return [null, players];
      }
      if (subMechanics.length == 1) {
        return [subMechanics[0], players];
      }
      return [composeMechanics(subMechanics), players];
    },
    display: (ps, disableAnimation) => (
      <>
        {mechanics.map((m, i) => (
          <Fragment key={i}>{m.display(ps, disableAnimation)}</Fragment>
        ))}
      </>
    ),
  };
};

const FinishedMechanic: Mechanic<any> = {
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
  getSafeSpot: (_, p) => p.position,
  progress: (ps) => [FinishedMechanic, ps],
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
  const [next, nextPs] = mechanic.progress(damagedPlayers);
  return [next ?? FinishedMechanic, nextPs];
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
    const targetSpot = mechanic.getSafeSpot(players, p);
    return {
      ...p,
      position: targetSpot ?? p.position,
    };
  });
  return progress(mechanic, movedPlayers);
};

export const disableAnimation = <T extends {}>(
  mechanic: Mechanic<T>
): Mechanic<T> => ({
  ...mechanic,
  display: (ps) => mechanic.display(ps, true),
});

const deathMechanic = <TPlayer extends Player>(
  failedMechanic: Mechanic<TPlayer>,
  players: TPlayer[]
): Mechanic<TPlayer> => {
  const controlledPlayer = players.filter((p) => p.controlled)[0];
  const safeSpot =
    failedMechanic.getSafeSpot(players, controlledPlayer) ?? point(0, 0);
  return {
    applyDamage: () => ZeroDamage,
    display: (ps) => (
      <>
        {failedMechanic.display(ps, true)}
        <svg
          height="100%"
          width="100%"
          style={{
            position: "absolute",
            left: "0",
            top: "0",
          }}
          viewBox="0 0 1 1"
          onClick={(e) => e.stopPropagation()}
        >
          <circle
            cx={safeSpot.x}
            cy={safeSpot.y}
            r={0.04}
            stroke="black"
            strokeWidth={0.003}
            fill="green"
            opacity={0.8}
          />
        </svg>
      </>
    ),
    getSafeSpot: failedMechanic.getSafeSpot,
    progress: () => [deathMechanic(failedMechanic, players), players],
  };
};

export const useMechanic = <T extends Player>(
  initialMechanic: () => Mechanic<T>,
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
