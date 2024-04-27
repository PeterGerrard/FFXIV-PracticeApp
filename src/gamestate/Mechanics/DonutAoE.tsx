import { useId } from "react";
import { Designation, distanceTo } from "../gameState";
import { Point } from "@flatten-js/core";
import { Player } from "../Player";
import { Mechanic } from "../mechanics";
import { DamageProfile, DisplayOptions, calculateDamageProfile } from "./DangerPuddles";

type DonutAoEProps = {
  source: Point;
  innerRadius: number;
  outerRadius: number;
  colour?: string;
};

const DonutAoE = (props: DonutAoEProps) => {
  const id = useId();
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
      <mask id={id}>
        <rect x="0" y="0" width="100" height="100" fill="white" />
        <circle
          cx={props.source.x}
          cy={props.source.y}
          r={props.innerRadius}
          fill="black"
        />
      </mask>
      <circle
        cx={props.source.x}
        cy={props.source.y}
        r={props.outerRadius}
        fill={props.colour ?? "orange"}
        opacity="0.4"
        mask={`url(#${id})`}
      >
        <animate
          attributeName="opacity"
          values="0;0.4;"
          dur="1s"
          repeatCount={0}
        />
      </circle>
    </svg>
  );
};

const isDonutSafe = (donut: DonutAoEProps, position: Point): boolean => {
  const distanceToCentre = distanceTo(donut.source, position);
  return (
    distanceToCentre < donut.innerRadius || distanceToCentre > donut.outerRadius
  );
};

export const donutMechanic = <TPlayer extends Player>(
  source: Point,
  innerRadius: number,
  outerRadius: number,
  damageProfile: DamageProfile,
  displayOptions?: DisplayOptions
): Mechanic<TPlayer> => {
  return {
    applyDamage: (players) => {
      const hits = players
        .filter((p) => !isDonutSafe({ source, innerRadius, outerRadius }, p.position))
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
    getSafeSpots: () => [],
    display: () => <DonutAoE source={source} innerRadius={innerRadius} outerRadius={outerRadius} colour={displayOptions?.color ?? "orange"} />,
    progress: () => null,
  };
};

