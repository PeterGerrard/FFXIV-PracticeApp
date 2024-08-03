import { Point } from "@flatten-js/core";
import { AttackRing } from "../../../../gamestate/AttackRing";
import blackCatCloneUrl from "./Clone.png";

const blackCatSize = 0.2;

export const BlackCatClone = (props: { position: Point; rotation: number }) => {
  return (
    <g>
      <AttackRing
        position={props.position}
        rotation={props.rotation}
        size={blackCatSize}
      />
      <image
        href={blackCatCloneUrl}
        height={blackCatSize}
        width={blackCatSize}
        preserveAspectRatio="xMidYMid"
        x={0}
        y={0}
        transform={`translate(${props.position.x}, ${props.position.y}) scale(0.5) rotate(${90 - props.rotation}) translate(-${blackCatSize / 2}, -${blackCatSize / 2})`}
      />
    </g>
  );
};
