import { useId } from "react";
import { Point, Polygon } from "@flatten-js/core";
import { Player } from "../Player";
import { Designation } from "../gameState";
import { Mechanic } from "../mechanics";
import {
  DamageProfile,
  DisplayOptions,
  calculateDamageProfile,
} from "./DangerPuddles";

type ConeAoEProps = {
  source: Point;
  angle: number;
  width: number;
  colour?: string;
  disableAnimation: boolean;
  inlcudeContainer: boolean;
};

const ConeAoE = (props: ConeAoEProps) => {
  const id = useId();

  const h = 3 * Math.tan(props.width / 2);

  const Poly = () => (
    <g
      transform={`translate(${props.source.x},${props.source.y}) rotate(${(180 * props.angle) / Math.PI})`}
    >
      <polygon
        points={`0,0, 3,${h} 3,${-h}`}
        fill={props.colour ?? "orange"}
        opacity="0.4"
        mask={`url(#${id})`}
      >
        {!props.disableAnimation && (
          <animate
            attributeName="points"
            values={`${props.source.x},${props.source.y} ${props.source.x},${props.source.y} ${props.source.x},${props.source.y};0,0, 3,${h} 3,${-h};`}
            dur="1s"
            repeatCount={0}
          />
        )}
      </polygon>
    </g>
  );

  return props.inlcudeContainer ? (
    <svg
      height="100%"
      width="100%"
      style={{
        position: "absolute",
        left: 0,
        top: 0,
      }}
      viewBox="0 0 1 1"
    >
      <Poly />
    </svg>
  ) : (
    <Poly />
  );
};

const isConeSafe = (cone: ConeAoEProps, position: Point): boolean => {
  const c = new Polygon([
    cone.source,
    cone.source.translate(0, -5),
    cone.source.translate(0, -5).rotate(cone.width, cone.source),
  ]).rotate(cone.angle - cone.width / 2, cone.source);

  return c.intersect(position).length === 0;
};

export const coneMechanic = <TPlayer extends Player>(
  source: Point,
  angle: number,
  width: number,
  damageProfile: DamageProfile,
  displayOptions?: DisplayOptions
): Mechanic<TPlayer> => {
  return {
    applyDamage: (players) => {
      const hits = players
        .filter(
          (p) =>
            !isConeSafe(
              {
                source,
                angle,
                width,
                disableAnimation: false,
                inlcudeContainer: false,
              },
              p.position
            )
        )
        .map((x) => x.designation);

      return Object.fromEntries(
        players.map((p) => {
          if (hits.includes(p.designation)) {
            return [
              p.designation,
              calculateDamageProfile(p, damageProfile, hits.length),
            ];
          }

          return [p.designation, 0];
        })
      ) as { [designation in Designation]: number };
    },
    getSafeSpot: () => null,
    display: (_, disableAnimation) => (
      <ConeAoE
        source={source}
        angle={angle}
        width={width}
        colour={displayOptions?.color ?? "orange"}
        disableAnimation={disableAnimation}
        inlcudeContainer={displayOptions?.includeContainer ?? true}
      />
    ),
    progress: (ps) => [null, ps],
  };
};
