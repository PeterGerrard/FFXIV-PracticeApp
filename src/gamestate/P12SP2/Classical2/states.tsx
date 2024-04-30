import { Debuff, Player } from "../../Player";
import {
  Mechanic,
  ZeroDamage,
  applyDebuff,
  automatic,
  calculateDamage,
  composeMechanics,
  delay,
  disableAnimation,
  repeat,
  sequence,
  withSafeSpot,
} from "../../mechanics";
import { Designation, Designations } from "../../gameState";
import { Point, point, vector } from "@flatten-js/core";
import { pickOne, shuffle } from "../../helpers";
import alphaSrc from "../assets/alpha.png";
import betaSrc from "../assets/beta.png";
import triangleSrc from "../assets/Triangle.png";
import circleSrc from "../assets/Circle.png";
import crossSrc from "../assets/Cross.png";
import squareSrc from "../assets/Square.png";
import cubeSrc from "../assets/cube.png";
import pyramidSrc from "../assets/pyramid.png";
import octahedronSrc from "../assets/octahedron.png";
import {
  DiePosition,
  validDiePositions,
} from "../Classical1/validDiePositions";
import { coneMechanic } from "../../Mechanics/ConeAoE";
import { P12SP2Waymarks } from "../P12SP2Arena";
import {
  SimpleHeavyDamageProfile,
  SimpleKillProfile,
} from "../../Mechanics/DangerPuddles";

const AlphaDebuff: Debuff = {
  name: "Alpha",
  src: alphaSrc,
};
const BetaDebuff: Debuff = {
  name: "Beta",
  src: betaSrc,
};
const SquareDebuff: Debuff = {
  name: "Square",
  markerSrc: squareSrc,
};
const TriangleDebuff: Debuff = {
  name: "Triangle",
  markerSrc: triangleSrc,
};
const CircleDebuff: Debuff = {
  name: "Circle",
  markerSrc: circleSrc,
};
const CrossDebuff: Debuff = {
  name: "Cross",
  markerSrc: crossSrc,
};

type PSMarkers = {
  crossPair: [Designation, Designation];
  squarePair: [Designation, Designation];
  circlePair: [Designation, Designation];
  trianglePair: [Designation, Designation];
};

type Grid = {
  die1: DiePosition;
  die2: DiePosition;
  die3: DiePosition;
  die4: DiePosition;
};

const GridDisplay = (props: { grid: Grid; flip?: boolean }) => (
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
    <Octahedron pos={props.grid.die1.pos} flip={props.flip} />
    <Octahedron pos={props.grid.die2.pos} flip={props.flip} />
    <Octahedron pos={props.grid.die3.pos} flip={props.flip} />
    <Octahedron pos={props.grid.die4.pos} flip={props.flip} />
    <Cube pos={props.grid.die1.squarePos} flip={props.flip} />
    <Cube pos={props.grid.die2.squarePos} flip={props.flip} />
    <Cube pos={props.grid.die3.squarePos} flip={props.flip} />
    <Cube pos={props.grid.die4.squarePos} flip={props.flip} />
    <Pyramid pos={props.grid.die1.pyramidPos} flip={props.flip} />
    <Pyramid pos={props.grid.die2.pyramidPos} flip={props.flip} />
    <Pyramid pos={props.grid.die3.pyramidPos} flip={props.flip} />
    <Pyramid pos={props.grid.die4.pyramidPos} flip={props.flip} />
  </svg>
);

const getPairTetherDamage = (
  players: Player[],
  psMarkers: PSMarkers,
  designation: Designation
) => {
  const pairDeisgnations = psMarkers.crossPair.includes(designation)
    ? psMarkers.crossPair
    : psMarkers.squarePair.includes(designation)
      ? psMarkers.squarePair
      : psMarkers.circlePair.includes(designation)
        ? psMarkers.circlePair
        : psMarkers.trianglePair;
  const [loc1, loc2] = players
    .filter((p) => pairDeisgnations.includes(p.designation))
    .map((p) => p.position);

  return loc1.distanceTo(loc2)[0] > 0.15 ? 2 : 0;
};

const Tether = (props: {
  source: Point;
  target: Point;
  thickness: number;
  color: string;
}) => {
  return (
    <svg
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        height: "100%",
        width: "100%",
      }}
      viewBox="0 0 1 1"
    >
      <line
        x1={props.source.x}
        y1={props.source.y}
        x2={props.target.x}
        y2={props.target.y}
        strokeWidth={props.thickness}
        stroke={props.color}
      />
    </svg>
  );
};

const pairTether = (psMarkers: PSMarkers): Mechanic<Player> => ({
  applyDamage: (ps) =>
    calculateDamage((d) => getPairTetherDamage(ps, psMarkers, d)),
  getSafeSpot: () => null,
  progress: (ps) => [null, ps],
  display: (players) => {
    const getPlayer = (d: Designation) =>
      players.filter((p) => p.designation === d)[0];
    return (
      <>
        <Tether
          source={getPlayer(psMarkers.circlePair[0]).position}
          target={getPlayer(psMarkers.circlePair[1]).position}
          thickness={0.01}
          color="green"
        />
        <Tether
          source={getPlayer(psMarkers.crossPair[0]).position}
          target={getPlayer(psMarkers.crossPair[1]).position}
          thickness={0.01}
          color="green"
        />
        <Tether
          source={getPlayer(psMarkers.squarePair[0]).position}
          target={getPlayer(psMarkers.squarePair[1]).position}
          thickness={0.01}
          color="green"
        />
        <Tether
          source={getPlayer(psMarkers.trianglePair[0]).position}
          target={getPlayer(psMarkers.trianglePair[1]).position}
          thickness={0.01}
          color="green"
        />
      </>
    );
  },
});

const getInterceptSpot = (grid: Grid, markers: PSMarkers, player: Player) => {
  if (markers.crossPair.includes(player.designation)) {
    return grid.die1.pos.translate(
      vector(
        grid.die1.pos,
        player.debuffs.some((d) => d.name === AlphaDebuff.name)
          ? grid.die1.pyramidPos
          : grid.die1.squarePos
      ).scale(0.1, 0.1)
    );
  }
  if (markers.squarePair.includes(player.designation)) {
    return grid.die2.pos.translate(
      vector(
        grid.die2.pos,
        player.debuffs.some((d) => d.name === AlphaDebuff.name)
          ? grid.die2.pyramidPos
          : grid.die2.squarePos
      ).scale(0.1, 0.1)
    );
  }
  if (markers.circlePair.includes(player.designation)) {
    return grid.die3.pos.translate(
      vector(
        grid.die3.pos,
        player.debuffs.some((d) => d.name === AlphaDebuff.name)
          ? grid.die3.pyramidPos
          : grid.die3.squarePos
      ).scale(0.1, 0.1)
    );
  }
  return grid.die4.pos.translate(
    vector(
      grid.die4.pos,
      player.debuffs.some((d) => d.name === AlphaDebuff.name)
        ? grid.die4.pyramidPos
        : grid.die4.squarePos
    ).scale(0.1, 0.1)
  );
};

const gridMechanic = (grid: Grid, psMarkers: PSMarkers): Mechanic<Player> => {
  return {
    applyDamage: () => ZeroDamage,
    getSafeSpot: (_, p) => getInterceptSpot(grid, psMarkers, p),
    progress: (ps) => [null, ps],
    display: () => <GridDisplay grid={grid} />,
  };
};

const invert = (p: Point) => point(1 - p.x, 1.1 - p.y);

const prepFlipMechanic = (
  grid: Grid,
  psMarkers: PSMarkers
): Mechanic<Player> => {
  const underlying = gridMechanic(grid, psMarkers);
  return withSafeSpot(underlying, (ps, p) => {
    const safe = underlying.getSafeSpot(ps, p);
    return safe === null ? null : invert(safe);
  });
};

type Interceptions = {
  cube1Attach: Designation | null;
  pyramid1Attach: Designation | null;
  cube2Attach: Designation | null;
  pyramid2Attach: Designation | null;
  cube3Attach: Designation | null;
  pyramid3Attach: Designation | null;
  cube4Attach: Designation | null;
  pyramid4Attach: Designation | null;
};

const getAttached = (
  tetherSource: Point,
  tetherTarget: Point,
  players: Player[]
): Designation | null => {
  const [tetherDistance] = tetherSource.distanceTo(tetherTarget);
  const angleTolerance = 0.1;

  const interceptions = players
    .map(
      (p) =>
        [
          p.designation,
          tetherSource.distanceTo(p.position)[0],
          vector(tetherSource, tetherTarget).angleTo(
            vector(tetherSource, p.position)
          ),
        ] as const
    )
    .filter(
      ([_, d, a]) =>
        d < tetherDistance &&
        (a < angleTolerance || a > Math.PI * 2 - angleTolerance)
    );
  interceptions.sort((a, b) => a[1] - b[1]);

  if (interceptions.length > 0) {
    return interceptions[0][0];
  }

  return null;
};

const getInterceptions = (grid: Grid, players: Player[]): Interceptions => {
  return {
    cube1Attach: getAttached(
      invert(grid.die1.squarePos),
      invert(grid.die1.pos),
      players
    ),
    cube2Attach: getAttached(
      invert(grid.die2.squarePos),
      invert(grid.die2.pos),
      players
    ),
    cube3Attach: getAttached(
      invert(grid.die3.squarePos),
      invert(grid.die3.pos),
      players
    ),
    cube4Attach: getAttached(
      invert(grid.die4.squarePos),
      invert(grid.die4.pos),
      players
    ),
    pyramid1Attach: getAttached(
      invert(grid.die1.pyramidPos),
      invert(grid.die1.pos),
      players
    ),
    pyramid2Attach: getAttached(
      invert(grid.die2.pyramidPos),
      invert(grid.die2.pos),
      players
    ),
    pyramid3Attach: getAttached(
      invert(grid.die3.pyramidPos),
      invert(grid.die3.pos),
      players
    ),
    pyramid4Attach: getAttached(
      invert(grid.die4.pyramidPos),
      invert(grid.die4.pos),
      players
    ),
  };
};

const bait1Source = P12SP2Waymarks["Waymark 3"];
const bait2Source = P12SP2Waymarks["Waymark 4"];

type Baits = {
  bait1Targets: Point[];
  bait2Targets: Point[];
};

const BaitDebuff: Debuff = {
  name: "Bait Vuln",
};

const getBaits = (players: Player[]): Baits => {
  const playerPositions = players.map((p) => p.position);
  return {
    bait1Targets: playerPositions
      .sort(
        (p1, p2) =>
          p1.distanceTo(bait1Source)[0] - p2.distanceTo(bait1Source)[0]
      )
      .slice(0, 4),
    bait2Targets: playerPositions
      .sort(
        (p1, p2) =>
          p1.distanceTo(bait2Source)[0] - p2.distanceTo(bait2Source)[0]
      )
      .slice(0, 4),
  };
};

const baitDrop = (psMarkers: PSMarkers): Mechanic<Player> => {
  return {
    applyDamage: () => ZeroDamage,
    display: () => <></>,
    getSafeSpot: (_, player) => {
      let x = 0;
      let y = 0;
      if (psMarkers.crossPair.includes(player.designation)) {
        x = bait2Source.x + 0.03;
      } else if (psMarkers.squarePair.includes(player.designation)) {
        x = bait2Source.x - 0.03;
      } else if (psMarkers.circlePair.includes(player.designation)) {
        x = bait1Source.x + 0.03;
      } else {
        x = bait1Source.x - 0.03;
      }
      if (player.debuffs.some((d) => d.name === AlphaDebuff.name)) {
        y = bait1Source.y - 0.03;
      } else {
        y = bait1Source.y + 0.03;
      }
      return point(x, y);
    },
    progress: (ps) => {
      return [baitHit(psMarkers, getBaits(ps)), ps];
    },
  };
};

const baitHit = (psMarkers: PSMarkers, baits: Baits): Mechanic<Player> => {
  return sequence([
    withSafeSpot(
      applyDebuff(
        composeMechanics([
          ...baits.bait1Targets.map((p) =>
            coneMechanic(
              bait1Source,
              vector(bait1Source, bait1Source.translate(0, -1)).angleTo(
                vector(bait1Source, p)
              ),
              0.4,
              SimpleHeavyDamageProfile
            )
          ),
          ...baits.bait2Targets.map((p) =>
            coneMechanic(
              bait2Source,
              vector(bait2Source, bait2Source.translate(0, -1)).angleTo(
                vector(bait2Source, p)
              ),
              0.4,
              SimpleHeavyDamageProfile
            )
          ),
        ]),
        () => BaitDebuff
      ),
      (_, player) => {
        let x = 0;
        let y = 0;
        if (
          psMarkers.crossPair.includes(player.designation) ||
          psMarkers.squarePair.includes(player.designation)
        ) {
          x = 0.7;
        } else {
          x = 0.3;
        }
        if (player.debuffs.some((d) => d.name === AlphaDebuff.name)) {
          y = 0.45;
        } else {
          y = 0.65;
        }
        return point(x, y);
      }
    ),
    baitDeath(psMarkers, baits),
  ]);
};

const baitDeath = (psMarkers: PSMarkers, baits: Baits): Mechanic<Player> => {
  return disableAnimation(
    withSafeSpot(
      automatic(
        composeMechanics([
          ...baits.bait1Targets.map((p) =>
            coneMechanic(
              bait1Source,
              vector(bait1Source, bait1Source.translate(0, -1)).angleTo(
                vector(bait1Source, p)
              ),
              0.4,
              SimpleKillProfile
            )
          ),
          ...baits.bait2Targets.map((p) =>
            coneMechanic(
              bait2Source,
              vector(bait2Source, bait2Source.translate(0, -1)).angleTo(
                vector(bait2Source, p)
              ),
              0.4,
              SimpleKillProfile
            )
          ),
        ]),
        1500
      ),
      (_, player) => {
        let x = 0;
        let y = 0;
        if (
          psMarkers.crossPair.includes(player.designation) ||
          psMarkers.squarePair.includes(player.designation)
        ) {
          x = 0.7;
        } else {
          x = 0.3;
        }
        if (player.debuffs.some((d) => d.name === AlphaDebuff.name)) {
          y = 0.45;
        } else {
          y = 0.65;
        }
        return point(x, y);
      }
    )
  );
};

const interceptFlippedGrid = (
  grid: Grid,
  interceptions: Interceptions
): Mechanic<Player> => {
  return {
    applyDamage: () => ZeroDamage,
    getSafeSpot: () => null,
    progress: (ps) => [null, ps],
    display: (ps) => {
      const getPlayer = (d: Designation) =>
        ps.filter((p) => p.designation === d)[0].position;
      return (
        <>
          <GridDisplay grid={grid} flip />
          <Tether
            source={invert(grid.die1.pos)}
            target={
              interceptions.cube1Attach === null
                ? invert(grid.die1.squarePos)
                : getPlayer(interceptions.cube1Attach)
            }
            thickness={0.005}
            color="purple"
          />
          <Tether
            source={invert(grid.die1.pos)}
            target={
              interceptions.pyramid1Attach === null
                ? invert(grid.die1.squarePos)
                : getPlayer(interceptions.pyramid1Attach)
            }
            thickness={0.005}
            color="purple"
          />
          <Tether
            source={invert(grid.die2.pos)}
            target={
              interceptions.cube2Attach === null
                ? invert(grid.die2.squarePos)
                : getPlayer(interceptions.cube2Attach)
            }
            thickness={0.005}
            color="purple"
          />
          <Tether
            source={invert(grid.die2.pos)}
            target={
              interceptions.pyramid2Attach === null
                ? invert(grid.die2.squarePos)
                : getPlayer(interceptions.pyramid2Attach)
            }
            thickness={0.005}
            color="purple"
          />
          <Tether
            source={invert(grid.die3.pos)}
            target={
              interceptions.cube3Attach === null
                ? invert(grid.die3.squarePos)
                : getPlayer(interceptions.cube3Attach)
            }
            thickness={0.005}
            color="purple"
          />
          <Tether
            source={invert(grid.die3.pos)}
            target={
              interceptions.pyramid3Attach === null
                ? invert(grid.die3.squarePos)
                : getPlayer(interceptions.pyramid3Attach)
            }
            thickness={0.005}
            color="purple"
          />
          <Tether
            source={invert(grid.die4.pos)}
            target={
              interceptions.cube4Attach === null
                ? invert(grid.die4.squarePos)
                : getPlayer(interceptions.cube4Attach)
            }
            thickness={0.005}
            color="purple"
          />
          <Tether
            source={invert(grid.die4.pos)}
            target={
              interceptions.pyramid4Attach === null
                ? invert(grid.die4.squarePos)
                : getPlayer(interceptions.pyramid4Attach)
            }
            thickness={0.005}
            color="purple"
          />
        </>
      );
    },
  };
};

const flipGridMechanic = (
  grid: Grid,
  psMarkers: PSMarkers
): Mechanic<Player> => {
  return {
    applyDamage: () => ZeroDamage,
    getSafeSpot: (_, p) => {
      const safe = getInterceptSpot(grid, psMarkers, p);
      return point(1 - safe.x, 1.1 - safe.y);
    },
    autoProgress: 500,
    progress: (ps) => [
      repeat(interceptFlippedGrid(grid, getInterceptions(grid, ps)), 2),
      ps,
    ],
    display: () => <GridDisplay grid={grid} flip />,
  };
};

const markersAssigns = (grid: Grid, psMarkers: PSMarkers): Mechanic<Player> =>
  composeMechanics([
    sequence([
      gridMechanic(grid, psMarkers),
      prepFlipMechanic(grid, psMarkers),
      flipGridMechanic(grid, psMarkers),
    ]),
    repeat(pairTether(psMarkers), 2),
    delay(baitDrop(psMarkers), 3),
  ]);

const toDisplayPos = (gridPos: Point): Point =>
  point(gridPos.x * 0.2 + 0.2, gridPos.y * 0.2 + 0.35);

const toDice = (state: DiePosition): DiePosition => {
  return {
    pos: toDisplayPos(state.pos),
    pyramidPos: toDisplayPos(state.pyramidPos),
    squarePos: toDisplayPos(state.squarePos),
  };
};

const getRandomDies = (): Grid => {
  const dieState = pickOne(validDiePositions);

  return {
    die1: toDice(dieState[0]),
    die2: toDice(dieState[1]),
    die3: toDice(dieState[2]),
    die4: toDice(dieState[3]),
  };
};

const Octahedron = (props: { pos: Point; flip?: boolean }) => {
  return (
    <image
      href={octahedronSrc}
      x={props.flip ? 0.95 - props.pos.x : props.pos.x - 0.05}
      y={props.flip ? 1.05 - props.pos.y : props.pos.y - 0.05}
      height={0.1}
      width={0.1}
    />
  );
};
const Cube = (props: { pos: Point; flip?: boolean }) => {
  return (
    <image
      href={cubeSrc}
      x={props.flip ? 0.95 - props.pos.x : props.pos.x - 0.05}
      y={props.flip ? 1.05 - props.pos.y : props.pos.y - 0.05}
      height={0.1}
      width={0.1}
    />
  );
};
const Pyramid = (props: { pos: Point; flip?: boolean }) => {
  return (
    <image
      href={pyramidSrc}
      x={props.flip ? 0.95 - props.pos.x : props.pos.x - 0.05}
      y={props.flip ? 1.05 - props.pos.y : props.pos.y - 0.05}
      height={0.1}
      width={0.1}
    />
  );
};

export const initialState = (): Mechanic<Player> => {
  const grid = getRandomDies();
  return {
    applyDamage: () => ZeroDamage,
    getSafeSpot: () => null,
    autoProgress: 0,
    progress: (ps) => {
      const shuffledDesignation = shuffle(Designations);
      const psMarkers: PSMarkers = {
        crossPair: [shuffledDesignation[0], shuffledDesignation[1]],
        squarePair: [shuffledDesignation[2], shuffledDesignation[3]],
        circlePair: [shuffledDesignation[4], shuffledDesignation[5]],
        trianglePair: [shuffledDesignation[6], shuffledDesignation[7]],
      };
      return [
        markersAssigns(grid, psMarkers),
        ps.map((p) => ({
          ...p,
          debuffs: [
            [
              psMarkers.crossPair[0],
              psMarkers.squarePair[0],
              psMarkers.circlePair[0],
              psMarkers.trianglePair[0],
            ].includes(p.designation)
              ? AlphaDebuff
              : BetaDebuff,
            psMarkers.circlePair.includes(p.designation)
              ? CircleDebuff
              : psMarkers.squarePair.includes(p.designation)
                ? SquareDebuff
                : psMarkers.crossPair.includes(p.designation)
                  ? CrossDebuff
                  : TriangleDebuff,
          ],
        })),
      ];
    },
    display: () => <GridDisplay grid={grid} />,
  };
};
