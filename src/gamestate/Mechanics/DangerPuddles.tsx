import { Point } from "@flatten-js/core";
import { CircleAoE, CircleAoEProps, isCircleSafe } from "./CircleAoE";
import { ConeAoE, ConeAoEProps, isConeSafe } from "./ConeAoE";
import { DonutAoE, DonutAoEProps, isDonutSafe } from "./DonutAoE";
import { LineAoE, LineAoEProps, isLineSafe } from "./LineAoE";
import { Role } from "..";
import { Debuff, Player } from "../Player";
import { Designation } from "../gameState";

export type DangerPuddle = {
  split: boolean;
  damage: number;
  instaKill: Debuff | null;
  debuffRequirement: Debuff | null;
  roleRequirement: Role | null;
  delay?: number;
} & (
  | ({ type: "line" } & LineAoEProps)
  | ({ type: "donut" } & DonutAoEProps)
  | ({ type: "circle" } & CircleAoEProps)
  | ({ type: "cone" } & ConeAoEProps)
);

const DangerPuddleDisplay = (props: DangerPuddle): JSX.Element => {
  switch (props.type) {
    case "line":
      return <LineAoE {...props} />;
    case "donut":
      return <DonutAoE {...props} />;
    case "circle":
      return <CircleAoE {...props} />;
    case "cone":
      return <ConeAoE {...props} />;
  }
};

const isSafeFrom = (props: DangerPuddle, position: Point): boolean => {
  if (props.delay !== undefined && props.delay > 0) {
    return true;
  }
  switch (props.type) {
    case "line":
      return isLineSafe(props, position);
    case "donut":
      return isDonutSafe(props, position);
    case "circle":
      return isCircleSafe(props, position);
    case "cone":
      return isConeSafe(props, position);
  }
};

export const DangerPuddlesDisplay = (props: {
  puddles: DangerPuddle[];
}): JSX.Element => {
  return (
    <>
      {props.puddles.map((dp, i) => (
        <DangerPuddleDisplay key={i} {...dp} />
      ))}
    </>
  );
};

export const survivePuddles = (
  puddles: DangerPuddle[],
  players: Player[]
): Designation[] => {
  const hits = puddles.map<[DangerPuddle, Designation[]]>((dp) => [
    dp,
    players
      .filter((p) => !isSafeFrom(dp, p.position))
      .map((x) => x.designation),
  ]);
  const hitBy = players.map<[Designation, DangerPuddle[]]>((p) => [
    p.designation,
    puddles.filter((dp) => !isSafeFrom(dp, p.position)),
  ]);
  return players
    .filter((p) => {
      const dps = hitBy.filter((x) => x[0] === p.designation)[0][1];

      const totalDamage = dps
        .map((dp) => {
          if (
            dp.debuffRequirement !== null &&
            p.debuffs.every((deb) => deb.name !== dp.debuffRequirement?.name)
          ) {
            return 2;
          }
          if (
            dp.instaKill !== null &&
            p.debuffs.some((deb) => deb === dp.instaKill)
          ) {
            return 2;
          }
          if (dp.roleRequirement != null && p.role !== dp.roleRequirement) {
            return 2;
          }
          if (dp.split) {
            return dp.damage / hits.filter((h) => h[0] === dp)[0][1].length;
          }

          return dp.damage;
        })
        .reduce((a: number, b: number) => a + b, 0);

      console.log({ name: p.designation, p, totalDamage, dps });
      return totalDamage < 1;
    })
    .map((p) => p.designation);
};
