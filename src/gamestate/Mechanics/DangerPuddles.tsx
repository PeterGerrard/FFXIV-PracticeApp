import { Position } from "..";
import { CircleAoE, CircleAoEProps, isCircleSafe } from "./CircleAoE";
import { DonutAoE, DonutAoEProps, isDonutSafe } from "./DonutAoE";
import { LineAoE, LineAoEProps, isLineSafe } from "./LineAoE";

export type DangerPuddle =
  | ({ type: "line" } & LineAoEProps)
  | ({ type: "donut" } & DonutAoEProps)
  | ({ type: "circle" } & CircleAoEProps);

export const DangerPuddleDisplay = (props: DangerPuddle): JSX.Element => {
  switch (props.type) {
    case "line":
      return <LineAoE {...props} />;
    case "donut":
      return <DonutAoE {...props} />;
    case "circle":
      return <CircleAoE {...props} />;
  }
};

export const isSafeFrom = (
  props: DangerPuddle,
  position: Position
): boolean => {
  switch (props.type) {
    case "line":
      return isLineSafe(props, position);
    case "donut":
      return isDonutSafe(props, position);
    case "circle":
      return isCircleSafe(props, position);
  }
};
