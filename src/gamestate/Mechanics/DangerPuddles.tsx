import { Point } from "@flatten-js/core";
import { CircleAoE, CircleAoEProps, isCircleSafe } from "./CircleAoE";
import { ConeAoE, ConeAoEProps, isConeSafe } from "./ConeAoE";
import { DonutAoE, DonutAoEProps, isDonutSafe } from "./DonutAoE";
import { LineAoE, LineAoEProps, isLineSafe } from "./LineAoE";
import { Role } from "..";
import { Player } from "../Player";

export type DangerPuddle = {
  survivable: number;
  roleRequirement: Role | null;
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
  player: Player
): boolean => {
  const hitBy = puddles.filter(
    (p) =>
      !isSafeFrom(p, player.position) &&
      (p.roleRequirement === null || p.roleRequirement !== player.role)
  );
  return hitBy.every((p) => p.survivable >= hitBy.length);
};
