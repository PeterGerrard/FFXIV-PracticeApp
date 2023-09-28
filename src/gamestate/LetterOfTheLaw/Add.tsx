import { InterCardinal, Position } from "../gameState";
import bossPng from "../DarkAndLight/assets/boss.png";
import { Ref, forwardRef } from "react";

const addPosition = (inter: InterCardinal): Position => {
  switch (inter) {
    case "North East":
      return [0.875, 0.125];
    case "South East":
      return [0.875, 0.875];
    case "South West":
      return [0.125, 0.875];
    case "North West":
      return [0.125, 0.125];
  }
};

export const Add = forwardRef(
  (props: { inter: InterCardinal }, ref: Ref<HTMLImageElement>) => {
    const pos = addPosition(props.inter);
    return (
      <img
        ref={ref}
        src={bossPng}
        height="15%"
        width="15%"
        style={{
          position: "absolute",
          left: `${pos[0] * 100}%`,
          top: `${pos[1] * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
      ></img>
    );
  }
);
