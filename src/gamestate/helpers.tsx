import { Position } from ".";

export const pickOne = <T extends unknown>(items: T[]) => {
  return items[(items.length * Math.random()) | 0];
};

export const getAngle = (position: Position): number => {
  return (180 - (180 * Math.atan2(position[0], position[1])) / Math.PI) % 360;
};

export const translateSub = (a: Position, b: Position): Position => {
  return [a[0] - b[0], a[1] - b[1]];
};
