import { Position } from "..";
import { CircleAoE, CircleAoEProps, isCircleSafe } from "./CircleAoE";
import { ConeAoE, ConeAoEProps, isConeSafe } from "./ConeAoE";
import { DonutAoE, DonutAoEProps, isDonutSafe } from "./DonutAoE";
import { LineAoE, LineAoEProps, isLineSafe } from "./LineAoE";

export type DangerPuddle =
  | ({ type: "line" } & LineAoEProps)
  | ({ type: "donut" } & DonutAoEProps)
  | ({ type: "circle" } & CircleAoEProps)
  | ({ type: "cone" } & ConeAoEProps);

export type DangerPuddles = {
  puddles: DangerPuddle[];
  survivable: number;
};

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

const isSafeFrom = (props: DangerPuddle, position: Position): boolean => {
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
  puddles: DangerPuddles,
  position: Position
): boolean => {
  const hitBy = puddles.puddles.filter((p) => !isSafeFrom(p, position)).length;
  return hitBy <= puddles.survivable;
};
