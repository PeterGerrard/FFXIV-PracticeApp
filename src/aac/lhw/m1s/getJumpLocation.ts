import { Point } from "@flatten-js/core";

export const getJumpLocation = (position: Point, rotation: number, jumpSide: "Left" | "Right") => position
.translate(0, jumpSide === "Left" ? -0.25 : 0.25)
    .rotate(-(Math.PI * rotation) / 180, position);
