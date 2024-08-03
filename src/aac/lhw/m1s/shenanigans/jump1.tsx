import { point } from "@flatten-js/core";
import { jumpingOneTwoPaw } from "../jumpingOneTwoPaw";
import { pickOne } from "../../../../gamestate/helpers";
import { BlackCat } from "../boss/BlackCat";

export const shenanigans1Jump = () => {
  const side = pickOne(["Left", "Right"] as const);
  const jumpSide = pickOne(["Left", "Right"] as const);

  return jumpingOneTwoPaw(jumpSide, side, point(0.5, 0.5), 90, (pos, rot) => (
    <BlackCat position={pos} rotation={rot} />
  ));
};
