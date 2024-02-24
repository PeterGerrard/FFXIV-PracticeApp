import { Point, point } from "@flatten-js/core";

export type DiePosition = {
  pos: Point;
  squarePos: Point;
  pyramidPos: Point;
};

export const validDiePositions: [
  DiePosition,
  DiePosition,
  DiePosition,
  DiePosition,
][] = [
  [
    {
      pos: point(0, 0),
      pyramidPos: point(1, 0),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(1, 0),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(1, 0),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(1, 0),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(1, 0),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(1, 0),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(1, 0),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(1, 0),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(0, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(0, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(0, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(0, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(0, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(0, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(0, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(0, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(1, 0),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 2),
      squarePos: point(2, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(1, 0),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 2),
      squarePos: point(2, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(1, 0),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 0),
      squarePos: point(2, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(1, 0),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 0),
      squarePos: point(2, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(1, 0),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 2),
      squarePos: point(2, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(1, 0),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 2),
      squarePos: point(2, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(0, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 2),
      squarePos: point(2, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(0, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 2),
      squarePos: point(2, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(0, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 0),
      squarePos: point(2, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(0, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 0),
      squarePos: point(2, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(0, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 2),
      squarePos: point(2, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(0, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 2),
      squarePos: point(2, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(1, 0),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(3, 1),
      squarePos: point(2, 0),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(1, 0),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(2, 0),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(1, 0),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(3, 1),
      squarePos: point(2, 0),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(1, 0),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(2, 0),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(1, 0),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(3, 1),
      squarePos: point(2, 0),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(1, 0),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(2, 0),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(1, 0),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(3, 1),
      squarePos: point(2, 0),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(1, 0),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(2, 0),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(0, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(3, 1),
      squarePos: point(2, 0),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(0, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(2, 0),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(0, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(3, 1),
      squarePos: point(2, 0),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(0, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(2, 0),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(0, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(3, 1),
      squarePos: point(2, 0),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(0, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(2, 0),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(0, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(3, 1),
      squarePos: point(2, 0),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(0, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(2, 0),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(1, 0),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(2, 2),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(1, 1),
      squarePos: point(2, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(1, 0),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(2, 2),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(1, 1),
      squarePos: point(2, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(1, 0),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(2, 2),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(1, 0),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(2, 2),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(1, 0),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(2, 2),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(1, 1),
      squarePos: point(2, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(1, 0),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(2, 2),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(1, 1),
      squarePos: point(2, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(0, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(2, 2),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(1, 1),
      squarePos: point(2, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(0, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(2, 2),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(1, 1),
      squarePos: point(2, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(0, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(2, 2),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(0, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(2, 2),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(0, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(2, 2),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(1, 1),
      squarePos: point(2, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 0),
      pyramidPos: point(0, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(2, 2),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(1, 1),
      squarePos: point(2, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(2, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(2, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(2, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(1, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(2, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(2, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(2, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(1, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(2, 2),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(2, 2),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(2, 2),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(1, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(2, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(1, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(2, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(1, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(2, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(2, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(1, 0),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(2, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(1, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(2, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(1, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(2, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(0, 2),
      squarePos: point(2, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(1, 0),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(2, 2),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(1, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(2, 2),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(1, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(2, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(2, 2),
      squarePos: point(0, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(1, 0),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(2, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(2, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(2, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(1, 2),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(2, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(2, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(2, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(1, 2),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(2, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(2, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(2, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(1, 2),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(2, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(1, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(2, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(1, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(2, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(1, 2),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(2, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(1, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(2, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(1, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(2, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(1, 2),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(2, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(1, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(2, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(1, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(2, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(1, 2),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(1, 2),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(3, 1),
      squarePos: point(2, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(1, 2),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(2, 0),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(2, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(1, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(3, 1),
      squarePos: point(2, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(2, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(1, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(2, 0),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(2, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(1, 2),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(3, 1),
      squarePos: point(2, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(2, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(1, 2),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(2, 0),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(1, 2),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(3, 1),
      squarePos: point(2, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(1, 2),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(2, 0),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(2, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(1, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(3, 1),
      squarePos: point(2, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(2, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(1, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(2, 0),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(2, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(1, 2),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(3, 1),
      squarePos: point(2, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(2, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(1, 2),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(2, 0),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 0),
      squarePos: point(1, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 0),
      squarePos: point(1, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 0),
      squarePos: point(1, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 0),
      squarePos: point(1, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 2),
      squarePos: point(1, 0),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 2),
      squarePos: point(1, 0),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 0),
      squarePos: point(1, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 0),
      squarePos: point(1, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 0),
      squarePos: point(1, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 0),
      squarePos: point(1, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 2),
      squarePos: point(1, 0),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 2),
      squarePos: point(1, 0),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 0),
      squarePos: point(1, 2),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 2),
      squarePos: point(2, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 0),
      squarePos: point(1, 2),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 2),
      squarePos: point(2, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 0),
      squarePos: point(1, 2),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 0),
      squarePos: point(2, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 0),
      squarePos: point(1, 2),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 0),
      squarePos: point(2, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 2),
      squarePos: point(1, 0),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 2),
      squarePos: point(2, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 2),
      squarePos: point(1, 0),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 2),
      squarePos: point(2, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 2),
      squarePos: point(1, 0),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 0),
      squarePos: point(2, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 2),
      squarePos: point(1, 0),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 0),
      squarePos: point(2, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 0),
      squarePos: point(1, 2),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 2),
      squarePos: point(2, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 0),
      squarePos: point(1, 2),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 2),
      squarePos: point(2, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 0),
      squarePos: point(1, 2),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 0),
      squarePos: point(2, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 0),
      squarePos: point(1, 2),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 0),
      squarePos: point(2, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 2),
      squarePos: point(1, 0),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 2),
      squarePos: point(2, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 2),
      squarePos: point(1, 0),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 2),
      squarePos: point(2, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 2),
      squarePos: point(1, 0),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 0),
      squarePos: point(2, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 2),
      squarePos: point(1, 0),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 0),
      squarePos: point(2, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 0),
      squarePos: point(1, 2),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(3, 1),
      squarePos: point(2, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 0),
      squarePos: point(1, 2),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(2, 0),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 2),
      squarePos: point(1, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(3, 1),
      squarePos: point(2, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 2),
      squarePos: point(1, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(2, 0),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 2),
      squarePos: point(1, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(3, 1),
      squarePos: point(2, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 2),
      squarePos: point(1, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(2, 0),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 0),
      squarePos: point(1, 2),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(3, 1),
      squarePos: point(2, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 0),
      squarePos: point(1, 2),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(2, 0),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 2),
      squarePos: point(1, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(3, 1),
      squarePos: point(2, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 2),
      squarePos: point(1, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(2, 0),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 2),
      squarePos: point(1, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(3, 1),
      squarePos: point(2, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 2),
      squarePos: point(1, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(2, 0),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(2, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(1, 0),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(2, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(1, 0),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(2, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(1, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(2, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(1, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 2),
      squarePos: point(2, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(1, 0),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 2),
      squarePos: point(2, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(1, 0),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(2, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(1, 0),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(2, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(1, 0),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(2, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(1, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(2, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(1, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 2),
      squarePos: point(2, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(1, 0),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 1),
      pyramidPos: point(1, 2),
      squarePos: point(2, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(1, 0),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(2, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(2, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(2, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(1, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(2, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(2, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(2, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(1, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(2, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(2, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(1, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(2, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(1, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(2, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(1, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(2, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(2, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(1, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 0),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(2, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(1, 0),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(2, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(1, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(2, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(2, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(1, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(2, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(1, 0),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(2, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(1, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(2, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(2, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(1, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(0, 0),
    },
    {
      pos: point(1, 2),
      pyramidPos: point(1, 1),
      squarePos: point(2, 2),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(1, 0),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(2, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(2, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(2, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(1, 2),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(2, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(2, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(2, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(1, 2),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(2, 0),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(2, 0),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(2, 0),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(1, 2),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(2, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(1, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(2, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(1, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(0, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(2, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(1, 2),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(2, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(1, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(2, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(1, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(2, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(1, 2),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(2, 0),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(1, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(2, 0),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(1, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
  ],
  [
    {
      pos: point(0, 1),
      pyramidPos: point(1, 1),
      squarePos: point(0, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(2, 0),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(1, 2),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(2, 0),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(3, 1),
      squarePos: point(2, 0),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(2, 0),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(3, 1),
      squarePos: point(2, 0),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(2, 0),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(3, 1),
      squarePos: point(2, 0),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(2, 0),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(3, 1),
      squarePos: point(2, 0),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(2, 0),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(3, 1),
      squarePos: point(2, 0),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(2, 0),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(3, 1),
      squarePos: point(2, 0),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(2, 0),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(3, 2),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(3, 1),
      squarePos: point(2, 0),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(2, 0),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 2),
      pyramidPos: point(2, 1),
      squarePos: point(3, 2),
    },
    {
      pos: point(3, 0),
      pyramidPos: point(3, 1),
      squarePos: point(2, 0),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 0),
      squarePos: point(2, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 0),
      squarePos: point(2, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 0),
      squarePos: point(2, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 0),
      squarePos: point(2, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 2),
      squarePos: point(2, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 2),
      squarePos: point(2, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 0),
      squarePos: point(2, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 0),
      squarePos: point(2, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 0),
      squarePos: point(2, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 0),
      squarePos: point(2, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 2),
      squarePos: point(2, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 2),
      squarePos: point(2, 0),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(1, 1),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(2, 1),
      squarePos: point(3, 0),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(3, 1),
      squarePos: point(2, 2),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(1, 1),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 0),
      pyramidPos: point(3, 0),
      squarePos: point(2, 1),
    },
    {
      pos: point(3, 2),
      pyramidPos: point(2, 2),
      squarePos: point(3, 1),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(2, 0),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(1, 1),
      squarePos: point(2, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(2, 0),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(1, 1),
      squarePos: point(2, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(2, 0),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(2, 0),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(2, 0),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(1, 1),
      squarePos: point(2, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(1, 2),
      squarePos: point(0, 1),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(2, 0),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(1, 1),
      squarePos: point(2, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(2, 0),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(1, 1),
      squarePos: point(2, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(0, 0),
      squarePos: point(2, 0),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(1, 1),
      squarePos: point(2, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(2, 0),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(2, 0),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(2, 2),
      squarePos: point(1, 1),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(2, 0),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(1, 1),
      squarePos: point(2, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 0),
      squarePos: point(3, 2),
    },
  ],
  [
    {
      pos: point(0, 2),
      pyramidPos: point(0, 1),
      squarePos: point(1, 2),
    },
    {
      pos: point(1, 0),
      pyramidPos: point(2, 0),
      squarePos: point(0, 0),
    },
    {
      pos: point(2, 1),
      pyramidPos: point(1, 1),
      squarePos: point(2, 2),
    },
    {
      pos: point(3, 1),
      pyramidPos: point(3, 2),
      squarePos: point(3, 0),
    },
  ],
];
