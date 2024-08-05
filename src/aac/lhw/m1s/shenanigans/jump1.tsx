import { point } from "@flatten-js/core";
import { jumpingOneTwoPaw } from "../jumpingOneTwoPaw";
import { BlackCat } from "../boss/BlackCat";
import { shenanigansStore1 } from "./store1";

export const shenanigans1Jump = (
  jump1: {
    jumpSide: "Left" | "Right";
    swipeSide: "Left" | "Right";
    storeLocation: "North" | "South";
  },
  jump2: {
    jumpSide: "Left" | "Right";
    storeLocation: "North" | "South";
  }
) => {
  return jumpingOneTwoPaw(
    jump1.jumpSide,
    jump1.swipeSide,
    point(0.5, 0.5),
    90,
    (pos, rot) => <BlackCat position={pos} rotation={rot} />,
    (p) =>
      shenanigansStore1(jump1.jumpSide, jump1.swipeSide, jump1.storeLocation, p, jump2)
  );
};
