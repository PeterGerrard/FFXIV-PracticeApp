import { Position } from "..";
import { LineAoE, LineAoEProps, isLineSafe } from "./LineAoE";

export type DangerPuddle = { type: "line" } & LineAoEProps;

export const DangerPuddleDisplay = (props: DangerPuddle): JSX.Element => {
  switch (props.type) {
    case "line":
      return <LineAoE {...props} />;
  }
};

export const isSafeFrom = (
  props: DangerPuddle,
  position: Position
): boolean => {
  switch (props.type) {
    case "line":
      return isLineSafe(props, position);
  }
};
