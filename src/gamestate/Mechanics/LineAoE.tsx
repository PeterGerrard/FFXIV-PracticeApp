import { Point } from "@flatten-js/core";
import { Player } from "../Player";
import { Designation } from "../gameState";
import { Mechanic } from "../mechanics";
import { DamageProfile, DisplayOptions, calculateDamageProfile } from "./DangerPuddles";

type LineAoEProps = {
  source: Point;
  angle: number;
  width: number;
  colour?: string;
};

const LineAoE = (props: LineAoEProps) => {
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
      <rect
        height={5}
        width={`${props.width}`}
        x={props.source.x - props.width / 2}
        y={props.source.y}
        fill={props.colour ?? "orange"}
        style={{
          opacity: 0.4,
          transformOrigin: `${props.source.x}px ${props.source.y}px`,
          transform: `rotate(${props.angle}rad)`,
        }}
      >
        <animate
          attributeName="height"
          values="0;5;"
          dur="1s"
          repeatCount={0}
        />
      </rect>
    </svg>
  );
};

const isLineSafe = (line: LineAoEProps, position: Point): boolean => {
  if (position.distanceTo(line.source)[0] < 0.00001) return false;

  const p = position.rotate(-line.angle, line.source);

  return Math.abs(p.x - line.source.x) > line.width / 2 || p.y < line.source.y;
};

export const lineMechanic = <TPlayer extends Player>(
  source: Point,
  angle: number,
  width: number,
  damageProfile: DamageProfile,
  displayOptions?: DisplayOptions
): Mechanic<TPlayer> => {
  return {
    applyDamage: (players) => {
      const hits = players
        .filter((p) => !isLineSafe({ source, angle, width }, p.position))
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
    display: () => <LineAoE source={source} angle={angle} width={width} colour={displayOptions?.color ?? "orange"} />,
    progress: () => null,
  };
};
