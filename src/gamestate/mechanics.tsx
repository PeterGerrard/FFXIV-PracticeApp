import { Point, point } from "@flatten-js/core";
import { Designation } from "./gameState";

export type Mechanic<TPlayer> = {
  applyDamage: (players: TPlayer[]) => { [designation in Designation]: number };
  getSafeSpots: (players: TPlayer[], player: TPlayer) => Point[];
  progress: () => Mechanic<TPlayer> | null;
  display: () => React.ReactElement;
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

const notNull = <T extends {}>(item: T | null): item is T => item !== null;

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
    progress: () =>
      composeMechanics(mechanics.map((m) => m.progress()).filter(notNull)),
    display: () => <>{mechanics.map((m) => m.display())}</>,
  };
};
