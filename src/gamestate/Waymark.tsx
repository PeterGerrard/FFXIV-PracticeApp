import WaymarkA from "./assets/WaymarkA.png";
import WaymarkB from "./assets/WaymarkB.png";
import WaymarkC from "./assets/WaymarkC.png";
import WaymarkD from "./assets/WaymarkD.png";
import Waymark1 from "./assets/Waymark1.png";
import Waymark2 from "./assets/Waymark2.png";
import Waymark3 from "./assets/Waymark3.png";
import Waymark4 from "./assets/Waymark4.png";
import { Point } from "@flatten-js/core";

export type Waymark =
  | "Waymark A"
  | "Waymark B"
  | "Waymark C"
  | "Waymark D"
  | "Waymark 1"
  | "Waymark 2"
  | "Waymark 3"
  | "Waymark 4";

export type PlacedWaymark = {
  waymark: Waymark;
  position: Point;
};

const getSrc = (x: Waymark): string => {
  switch (x) {
    case "Waymark A":
      return WaymarkA;
    case "Waymark B":
      return WaymarkB;
    case "Waymark C":
      return WaymarkC;
    case "Waymark D":
      return WaymarkD;
    case "Waymark 1":
      return Waymark1;
    case "Waymark 2":
      return Waymark2;
    case "Waymark 3":
      return Waymark3;
    case "Waymark 4":
      return Waymark4;
  }
};

export const WaymarkDisplay = (props: { waymark: PlacedWaymark }) => {
  const src = getSrc(props.waymark.waymark);

  return (
    <img
      src={src}
      height="5%"
      width="5%"
      style={{
        position: "absolute",
        left: `${(props.waymark.position.x - 0.025) * 100}%`,
        top: `${(props.waymark.position.y - 0.025) * 100}%`,
      }}
    />
  );
};
