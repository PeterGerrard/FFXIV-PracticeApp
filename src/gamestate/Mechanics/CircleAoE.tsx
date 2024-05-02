import { Circle, Point } from "@flatten-js/core";
import { Player } from "../Player";
import { Designation } from "../gameState";
import { Mechanic } from "../mechanics";
import {
  DamageProfile,
  DisplayOptions,
  calculateDamageProfile,
} from "./DangerPuddles";

type CircleAoEProps = {
  source: Point;
  radius: number;
  disableAnimation: boolean;
  colour?: string;
};

export const CircleAoE = (props: CircleAoEProps) => {
  return (
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
      <circle
        cx={props.source.x}
        cy={props.source.y}
        r={props.radius}
        fill={props.colour ?? "orange"}
        opacity="0.4"
        strokeWidth="0"
        stroke="black"
      >
        {!props.disableAnimation && (
          <animate
            attributeName="opacity"
            values="0;0.4"
            dur="1s"
            repeatCount={0}
          />
        )}
      </circle>
    </svg>
  );
};

const isCircleSafe = (circle: CircleAoEProps, position: Point): boolean => {
  const points = new Circle(circle.source, circle.radius).intersect(position);
  return points.length == 0;
};

export const circleMechanic = <TPlayer extends Player>(
  source: Point,
  radius: number,
  damageProfile: DamageProfile,
  displayOptions?: DisplayOptions
): Mechanic<TPlayer> => {
  return {
    applyDamage: (players) => {
      const hits = players
        .filter(
          (p) =>
            !isCircleSafe(
              { source, radius, disableAnimation: false },
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
    autoProgress: 1000,
    display: (_, disableAnimation) => (
      <CircleAoE
        source={source}
        radius={radius}
        disableAnimation={disableAnimation}
        colour={displayOptions?.color ?? "orange"}
      />
    ),
    progress: (ps) => [null, ps],
  };
};
