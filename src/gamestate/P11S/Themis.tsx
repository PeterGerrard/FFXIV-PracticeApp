import bossPng from "./assets/boss.png";
import indicatorPng from "../assets/indicator.png";

export const Themis = (props: { bossColour: "Light" | "Dark" | null }) => (
  <>
    <img
      src={bossPng}
      height="25%"
      width="25%"
      style={{
        position: "absolute",
        left: `50%`,
        top: `50%`,
        transform: "translate(-50%, -50%)",
      }}
    ></img>
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
    {props.bossColour !== null && (
      <svg
        height="180"
        width="180"
        style={{
          position: "absolute",
          left: `50%`,
          top: `43%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <circle
          cx="90"
          cy="90"
          r="85"
          stroke={props.bossColour === "Dark" ? "purple" : "yellow"}
          strokeWidth="5"
          opacity={0.8}
          fill="transparent"
        />
      </svg>
    )}
  </>
);
