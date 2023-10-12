import { Point } from "@flatten-js/core";
import { InterCardinal } from "../../gameState";
import bossPng from "../assets/boss.png";
import { Ref, forwardRef } from "react";

const addPosition = (inter: InterCardinal): Point => {
  switch (inter) {
    case "North East":
      return new Point(0.875, 0.125);
    case "South East":
      return new Point(0.875, 0.875);
    case "South West":
      return new Point(0.125, 0.875);
    case "North West":
      return new Point(0.125, 0.125);
  }
};

export const Add = forwardRef(
  (
    props: { inter: InterCardinal; colour: "Dark" | "Light" },
    ref: Ref<HTMLImageElement>
  ) => {
    const pos = addPosition(props.inter);
    return (
      <>
        <img
          ref={ref}
          src={bossPng}
          height="15%"
          width="15%"
          style={{
            position: "absolute",
            left: `${pos.x * 100}%`,
            top: `${pos.y * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        ></img>
        <svg
          height="15%"
          width="15%"
          style={{
            position: "absolute",
            left: `${pos.x * 100}%`,
            top: `${pos.y * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke={props.colour === "Dark" ? "purple" : "yellow"}
            strokeWidth="5"
            opacity={0.8}
            fill="transparent"
          />
        </svg>
      </>
    );
  }
);
