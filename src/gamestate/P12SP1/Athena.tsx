import bossPng from "./assets/boss.png";
import indicatorPng from "../assets/indicator.png";

export const Athena = () => (
  <>
    <img
      src={indicatorPng}
      height="52%"
      width="52%"
      style={{
        position: "absolute",
        left: `50%`,
        top: `42.5%`,
        transform: "translate(-50%, -50%)",
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
        transform: "translate(-50%, -50%)",
      }}
    ></img>
  </>
);
