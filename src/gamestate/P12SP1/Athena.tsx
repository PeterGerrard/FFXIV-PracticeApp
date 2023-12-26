import bossPng from "./assets/boss.png";
import indicatorPng from "../assets/indicator.png";

export const Athena = (props: { direction: "North" | "South" }) => (
  <>
    <img
      src={indicatorPng}
      height="52%"
      width="52%"
      style={{
        position: "absolute",
        left: `50%`,
        top: `50%`,
        transformOrigin: "50% 62%",
        transform: `translate(-50%, -62%) scale(1,${props.direction === "North" ? 1 : -1})`,
      }}
    ></img>
    <img
      src={bossPng}
      height="35%"
      width="40%"
      style={{
        position: "absolute",
        left: `50%`,
        top: `50%`,
        transform: `translate(-50%, -50%) scale(1,${props.direction === "North" ? 1 : -1})`,
      }}
    ></img>
  </>
);
