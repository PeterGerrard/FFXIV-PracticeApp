import { Point, point, vector } from "@flatten-js/core";
import { useGameState1 } from "../..";
import { DangerPuddle, survivePuddles } from "../../Mechanics/DangerPuddles";
import { Debuff, Player } from "../../Player";
import {
  Designation,
  Designations,
  GameLoop,
  GameState,
  InterCardinal,
  distanceTo,
  getRandomPos,
  getRole,
} from "../../gameState";
import { pickOne, shuffle, split } from "../../helpers";
import { Arena } from "../P12SP1Arena";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import LinearProgress from "@mui/material/LinearProgress";
import {
  CrossDebuff,
  LightTowerDebuff,
  PlusDebuff,
  RedTowerDebuff,
} from "../debuffs";

const getTetheredPlayer = (
  addPos: InterCardinal,
  gameState: Paradeigma3GameState
) => {
  switch (addPos) {
    case "North East":
      return gameState.topFall === "East"
        ? gameState.row3Cross
        : gameState.row2Straight;
    case "South East":
      return gameState.topFall === "East"
        ? gameState.row3Straight
        : gameState.row2Cross;
    case "South West":
      return gameState.topFall === "East"
        ? gameState.row2Cross
        : gameState.row3Straight;
    case "North West":
      return gameState.topFall === "East"
        ? gameState.row2Straight
        : gameState.row3Cross;
  }
};

export const paradeigma3: GameLoop<Paradeigma3Player, Paradeigma3GameState> = {
  arena: (
    gameState: Paradeigma3GameState,
    moveTo: (p: Point) => void,
    animationEnd: () => void
  ) => (
    <Paradeigma3Arena
      players={gameState.players}
      gameState={gameState}
      moveTo={moveTo}
      animationEnd={animationEnd}
    />
  ),
  getSafeSpot: (gameState, player) => {
    if (gameState.stage === "Fall") {
      if (player.designation === gameState.row1Support) {
        return gameState.topFall === "East"
          ? point(0.1, 0.125)
          : point(0.9, 0.125);
      }
      if (player.designation === gameState.row2Support) {
        return point(gameState.topFall === "East" ? 0.9 : 0.1, 0.375);
      }
      if (player.designation === gameState.row3Support) {
        return point(gameState.topFall === "East" ? 0.1 : 0.9, 0.625);
      }
      if (player.designation === gameState.row4Support) {
        return gameState.topFall === "East"
          ? point(0.9, 0.875)
          : point(0.1, 0.875);
      }

      if (player.designation === gameState.row2Cross) {
        return point(gameState.topFall === "East" ? 0.73 : 0.27, 0.26);
      }
      if (player.designation === gameState.row2Straight) {
        return point(gameState.topFall === "East" ? 0.77 : 0.23, 0.45);
      }

      if (player.designation === gameState.row3Cross) {
        return point(gameState.topFall === "East" ? 0.27 : 0.73, 0.74);
      }
      if (player.designation === gameState.row3Straight) {
        return point(gameState.topFall === "East" ? 0.23 : 0.77, 0.55);
      }
    }

    if (gameState.stage === "Inter" || gameState.stage === "PlusCross") {
      if (player.designation === gameState.row1Support) {
        return gameState.topFall === "East"
          ? point(0.05, 0.05)
          : point(0.95, 0.05);
      }

      if (player.designation === gameState.row4Support) {
        return gameState.topFall === "East"
          ? point(0.55, 0.95)
          : point(0.45, 0.95);
      }
    }
    if (
      gameState.stage === "Inter" ||
      gameState.stage === "PlusCross" ||
      gameState.stage === "TowerDrop"
    ) {
      const baitSide =
        (gameState.darkAdds === "East" && gameState.darkTowers) ||
        (gameState.darkAdds === "West" && !gameState.darkTowers)
          ? "West"
          : "East";
      if (player.designation === gameState.row1Support) {
        return gameState.topFall === "East"
          ? point(0.25, 0.23)
          : point(0.75, 0.23);
      }
      if (
        (gameState.darkTowers && gameState.darkAdds === "West") ||
        (!gameState.darkTowers && gameState.darkAdds === "East")
      ) {
        if (player.designation === gameState.row2Support) {
          return gameState.topFall === "East"
            ? point(0.52, 0.48)
            : point(0.35, 0.375);
        }
        if (player.designation === gameState.row3Support) {
          return gameState.topFall === "East"
            ? point(0.35, 0.625)
            : point(0.52, 0.52);
        }
      } else {
        if (player.designation === gameState.row2Support) {
          return gameState.topFall === "East"
            ? point(0.65, 0.375)
            : point(0.48, 0.48);
        }
        if (player.designation === gameState.row3Support) {
          return gameState.topFall === "East"
            ? point(0.48, 0.52)
            : point(0.65, 0.625);
        }
      }
      if (player.designation === gameState.row4Support) {
        return gameState.topFall === "East" ? point(0.8, 0.8) : point(0.2, 0.8);
      }

      if (baitSide === "East") {
        if (player.designation === gameState.row2Cross) {
          return gameState.topFall === "East"
            ? point(0.51, 0.26)
            : point(0.48, 0.3);
        }
        if (player.designation === gameState.row2Straight) {
          return gameState.topFall === "East"
            ? point(0.75, 0.49)
            : point(0.25, 0.45);
        }
        if (player.designation === gameState.row3Straight) {
          return gameState.topFall === "East"
            ? point(0.3, 0.55)
            : point(0.75, 0.51);
        }
        if (player.designation === gameState.row3Cross) {
          return gameState.topFall === "East"
            ? point(0.45, 0.7)
            : point(0.51, 0.74);
        }
      } else {
        if (player.designation === gameState.row2Cross) {
          return gameState.topFall === "East"
            ? point(0.55, 0.3)
            : point(0.48, 0.26);
        }
        if (player.designation === gameState.row2Straight) {
          return gameState.topFall === "East"
            ? point(0.73, 0.45)
            : point(0.25, 0.49);
        }
        if (player.designation === gameState.row3Straight) {
          return gameState.topFall === "East"
            ? point(0.25, 0.51)
            : point(0.7, 0.55);
        }
        if (player.designation === gameState.row3Cross) {
          return gameState.topFall === "East"
            ? point(0.49, 0.74)
            : point(0.55, 0.7);
        }
      }
    }

    return new Point(0.5, 0.5);
  },
  applyDamage: (gameState) => {
    const dangerPuddles = getDangerPuddles(
      gameState,
      () => {},
      gameState.players
    );
    let survivingPlayers = survivePuddles(dangerPuddles, gameState.players);
    if (gameState.stage === "Fall") {
      const towers =
        gameState.topFall === "East"
          ? [
              point(0.1, 0.125),
              point(0.9, 0.375),
              point(0.1, 0.625),
              point(0.9, 0.875),
            ]
          : [
              point(0.9, 0.125),
              point(0.1, 0.375),
              point(0.9, 0.625),
              point(0.1, 0.875),
            ];
      if (
        towers.some((t) =>
          gameState.players.every((p) => p.position.distanceTo(t)[0] > 0.075)
        )
      ) {
        survivingPlayers = [];
      }
    }

    return {
      ...gameState,
      players: gameState.players.map((p) => ({
        ...p,
        alive: survivingPlayers.includes(p.designation),
      })),
    };
  },
  nextState: (s): Paradeigma3GameState => {
    if (s.stage === "Initial") {
      return {
        ...s,
        stage: "Fall",
        cast: {
          name: "Engravement of Souls",
          value: 100,
        },
      };
    }
    if (s.stage === "Fall") {
      return {
        ...s,
        stage: "Inter",
        cast: null,
      };
    }
    if (s.stage === "Inter") {
      return {
        ...s,
        stage: "PlusCross",
        cast: null,
        plusLocation: s.players.filter((p) =>
          p.debuffs.some((d) => d.name === PlusDebuff.name)
        )[0].position,
        crossLocation: s.players.filter((p) =>
          p.debuffs.some((d) => d.name === CrossDebuff.name)
        )[0].position,
      };
    }
    if (s.stage === "PlusCross") {
      return {
        ...s,
        stage: "TowerDrop",
        hasFinished: true,
      };
    }
    return s;
  },
};

type Paradeigma3Player = Player;

type Paradeigma3GameState = GameState<Paradeigma3Player> &
  (
    | {
        stage: "Initial";
        cast: {
          name: "Engravement of Souls";
          value: 25;
        };
        hasFinished: false;
        darkAdds: "East" | "West";
        darkTowers: boolean;
        topFall: "East" | "West";
        row1Support: Designation;
        row2Support: Designation;
        row2Cross: Designation;
        row2Straight: Designation;
        row3Support: Designation;
        row3Cross: Designation;
        row3Straight: Designation;
        row4Support: Designation;
      }
    | {
        stage: "Fall";
        cast: {
          name: "Engravement of Souls";
          value: 100;
        };
        hasFinished: false;
        darkAdds: "East" | "West";
        darkTowers: boolean;
        topFall: "East" | "West";
        row1Support: Designation;
        row2Support: Designation;
        row2Cross: Designation;
        row2Straight: Designation;
        row3Support: Designation;
        row3Cross: Designation;
        row3Straight: Designation;
        row4Support: Designation;
      }
    | {
        stage: "Inter";
        cast: null;
        hasFinished: false;
        darkAdds: "East" | "West";
        darkTowers: boolean;
        topFall: "East" | "West";
        row1Support: Designation;
        row2Support: Designation;
        row2Cross: Designation;
        row2Straight: Designation;
        row3Support: Designation;
        row3Cross: Designation;
        row3Straight: Designation;
        row4Support: Designation;
      }
    | {
        stage: "PlusCross";
        cast: null;
        hasFinished: false;
        darkAdds: "East" | "West";
        darkTowers: boolean;
        topFall: "East" | "West";
        row1Support: Designation;
        row2Support: Designation;
        row2Cross: Designation;
        row2Straight: Designation;
        row3Support: Designation;
        row3Cross: Designation;
        row3Straight: Designation;
        row4Support: Designation;
        plusLocation: Point;
        crossLocation: Point;
      }
    | {
        stage: "TowerDrop";
        cast: null;
        hasFinished: true;
        darkAdds: "East" | "West";
        darkTowers: boolean;
        topFall: "East" | "West";
        row1Support: Designation;
        row2Support: Designation;
        row2Cross: Designation;
        row2Straight: Designation;
        row3Support: Designation;
        row3Cross: Designation;
        row3Straight: Designation;
        row4Support: Designation;
        plusLocation: Point;
        crossLocation: Point;
      }
  );

const getDangerPuddles = (
  gameState: Paradeigma3GameState,
  _animationEnd: () => void,
  players: Paradeigma3Player[]
): DangerPuddle[] => {
  const getPlayer = (d: Designation): Paradeigma3Player => {
    return players.filter((x) => x.designation === d)[0];
  };
  if (gameState.stage === "Fall") {
    const nwAdd = point(0, 0.45);
    const nwPlayer = getPlayer(getTetheredPlayer("North West", gameState));
    const swAdd = point(0, 0.55);
    const swPlayer = getPlayer(getTetheredPlayer("South West", gameState));
    const neAdd = point(1, 0.45);
    const nePlayer = getPlayer(getTetheredPlayer("North East", gameState));
    const seAdd = point(1, 0.55);
    const sePlayer = getPlayer(getTetheredPlayer("South East", gameState));
    return [
      {
        type: "line",
        damage: 0.8,
        angle: vector(nwAdd, nwAdd.translate(0, 1)).angleTo(
          vector(nwAdd, nwPlayer.position)
        ),
        debuffRequirement: null,
        instaKill: null,
        onAnimationEnd: () => {},
        roleRequirement: null,
        source: nwAdd,
        split: false,
        width: 0.1,
      },
      {
        type: "line",
        damage: 0.8,
        angle: vector(swAdd, swAdd.translate(0, 1)).angleTo(
          vector(swAdd, swPlayer.position)
        ),
        debuffRequirement: null,
        instaKill: null,
        onAnimationEnd: () => {},
        roleRequirement: null,
        source: swAdd,
        split: false,
        width: 0.1,
      },
      {
        type: "line",
        damage: 0.8,
        angle: vector(neAdd, neAdd.translate(0, 1)).angleTo(
          vector(neAdd, nePlayer.position)
        ),
        debuffRequirement: null,
        instaKill: null,
        onAnimationEnd: () => {},
        roleRequirement: null,
        source: neAdd,
        split: false,
        width: 0.1,
      },
      {
        type: "line",
        damage: 0.8,
        angle: vector(seAdd, seAdd.translate(0, 1)).angleTo(
          vector(seAdd, sePlayer.position)
        ),
        debuffRequirement: null,
        instaKill: null,
        onAnimationEnd: () => {},
        roleRequirement: null,
        source: seAdd,
        split: false,
        width: 0.1,
      },
    ];
  }
  if (gameState.stage === "PlusCross") {
    const plusLocation = players.filter((p) =>
      p.debuffs.some((d) => d.name === PlusDebuff.name)
    )[0].position;
    const crossLocation = players.filter((p) =>
      p.debuffs.some((d) => d.name === CrossDebuff.name)
    )[0].position;
    return [
      {
        type: "line",
        damage: 2,
        angle: Math.PI / 2,
        debuffRequirement: null,
        instaKill: null,
        onAnimationEnd: () => {},
        roleRequirement: null,
        source: plusLocation.translate(2, 0),
        split: false,
        width: 0.1,
        delay: 1,
      },
      {
        type: "line",
        damage: 2,
        angle: 0,
        debuffRequirement: null,
        instaKill: null,
        onAnimationEnd: () => {},
        roleRequirement: null,
        source: plusLocation.translate(0, -2),
        split: false,
        width: 0.1,
        delay: 1,
      },
      {
        type: "line",
        damage: 2,
        angle: (3 * Math.PI) / 4,
        debuffRequirement: null,
        instaKill: null,
        onAnimationEnd: () => {},
        roleRequirement: null,
        source: crossLocation.translate(2, 2),
        split: false,
        width: 0.1,
        delay: 1,
      },
      {
        type: "line",
        damage: 2,
        angle: (5 * Math.PI) / 4,
        debuffRequirement: null,
        instaKill: null,
        onAnimationEnd: () => {},
        roleRequirement: null,
        source: crossLocation.translate(-2, 2),
        split: false,
        width: 0.1,
        delay: 1,
      },
    ];
  }
  if (gameState.stage === "TowerDrop") {
    const addLocs =
      gameState.topFall === "East"
        ? [point(0.25, 0.25), point(0.75, 0.75)]
        : [point(0.75, 0.25), point(0.25, 0.75)];

    const addLasers = addLocs.flatMap((a) =>
      players
        .map((p) => [p, distanceTo(a, p.position)] as const)
        .sort(([_, x], [__, y]) => x - y)
        .slice(0, 2)
        .map<DangerPuddle>(([p, _]) => ({
          type: "line",
          angle: vector(a, a.translate(0, 1)).angleTo(vector(a, p.position)),
          damage: 0.8,
          debuffRequirement: null,
          instaKill: null,
          onAnimationEnd: () => {},
          roleRequirement: null,
          source: a,
          split: false,
          width: 0.05,
          colour: "yellow",
        }))
    );

    return addLasers.concat([
      {
        type: "line",
        damage: 2,
        angle: Math.PI / 2,
        debuffRequirement: null,
        instaKill: null,
        onAnimationEnd: () => {},
        roleRequirement: null,
        source: gameState.plusLocation.translate(2, 0),
        split: false,
        width: 0.1,
      },
      {
        type: "line",
        damage: 2,
        angle: 0,
        debuffRequirement: null,
        instaKill: null,
        onAnimationEnd: () => {},
        roleRequirement: null,
        source: gameState.plusLocation.translate(0, -2),
        split: false,
        width: 0.1,
      },
      {
        type: "line",
        damage: 2,
        angle: (3 * Math.PI) / 4,
        debuffRequirement: null,
        instaKill: null,
        onAnimationEnd: () => {},
        roleRequirement: null,
        source: gameState.crossLocation.translate(2, 2),
        split: false,
        width: 0.1,
      },
      {
        type: "line",
        damage: 2,
        angle: (5 * Math.PI) / 4,
        debuffRequirement: null,
        instaKill: null,
        onAnimationEnd: () => {},
        roleRequirement: null,
        source: gameState.crossLocation.translate(-2, 2),
        split: false,
        width: 0.1,
      },
    ]);
  }
  return [];
};

const Tether = (props: { add: Point; tetheredTo: Point; colour: string }) => {
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
        x1={props.add.x}
        y1={props.add.y}
        x2={props.tetheredTo.x}
        y2={props.tetheredTo.y}
        strokeWidth={0.02}
        stroke={props.colour}
      />
    </svg>
  );
};

const Paradeigma3Arena = (props: {
  players: Paradeigma3Player[];
  gameState: Paradeigma3GameState;
  moveTo: (p: Point) => void;
  animationEnd: () => void;
}) => {
  const getPlayer = (d: Designation): Paradeigma3Player => {
    return props.players.filter((x) => x.designation === d)[0];
  };
  return (
    <Arena
      players={props.players}
      moveTo={props.moveTo}
      dangerPuddles={getDangerPuddles(
        props.gameState,
        props.animationEnd,
        props.players
      )}
    >
      {props.gameState.stage !== "Initial" && (
        <svg
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
          }}
          viewBox="0 0 1 1"
        >
          <rect
            x={props.gameState.topFall === "East" ? 0.5 : 0}
            y={0}
            width={0.5}
            height={0.25}
            fill="black"
            fillOpacity={1}
          />
          <rect
            x={props.gameState.topFall === "East" ? 0 : 0.5}
            y={0.25}
            width={0.5}
            height={0.25}
            fill="black"
            fillOpacity={1}
          />
          <rect
            x={props.gameState.topFall === "East" ? 0.5 : 0}
            y={0.5}
            width={0.5}
            height={0.25}
            fill="black"
            fillOpacity={1}
          />
          <rect
            x={props.gameState.topFall === "East" ? 0 : 0.5}
            y={0.75}
            width={0.5}
            height={0.25}
            fill="black"
            fillOpacity={1}
          />
        </svg>
      )}
      {(props.gameState.stage === "Initial" ||
        props.gameState.stage === "Fall") && (
        <>
          <svg
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
            }}
            viewBox="0 0 1 1"
          >
            <circle
              cx={props.gameState.topFall === "East" ? 0.1 : 0.9}
              cy={0.125}
              r={0.075}
              fill="orange"
              fillOpacity={0.4}
            />
            <circle
              cx={props.gameState.topFall === "East" ? 0.9 : 0.1}
              cy={0.375}
              r={0.075}
              fill="orange"
              fillOpacity={0.4}
            />
            <circle
              cx={props.gameState.topFall === "East" ? 0.1 : 0.9}
              cy={0.625}
              r={0.075}
              fill="orange"
              fillOpacity={0.4}
            />
            <circle
              cx={props.gameState.topFall === "East" ? 0.9 : 0.1}
              cy={0.875}
              r={0.075}
              fill="orange"
              fillOpacity={0.4}
            />
            <circle
              cx={props.gameState.topFall === "East" ? 0.75 : 0.25}
              cy={0.125}
              r={0.05}
              fill="pink"
              fillOpacity={1}
            />
            <circle
              cx={props.gameState.topFall === "East" ? 0.25 : 0.75}
              cy={0.375}
              r={0.05}
              fill="pink"
              fillOpacity={1}
            />
            <circle
              cx={props.gameState.topFall === "East" ? 0.75 : 0.25}
              cy={0.625}
              r={0.05}
              fill="pink"
              fillOpacity={1}
            />
            <circle
              cx={props.gameState.topFall === "East" ? 0.25 : 0.75}
              cy={0.875}
              r={0.05}
              fill="pink"
              fillOpacity={1}
            />
          </svg>

          <Tether
            add={point(0, 0.45)}
            tetheredTo={
              getPlayer(getTetheredPlayer("North West", props.gameState))
                .position
            }
            colour={props.gameState.darkAdds === "West" ? "purple" : "yellow"}
          />
          <Tether
            add={point(0, 0.55)}
            tetheredTo={
              getPlayer(getTetheredPlayer("South West", props.gameState))
                .position
            }
            colour={props.gameState.darkAdds === "West" ? "purple" : "yellow"}
          />
          <Tether
            add={point(1, 0.45)}
            tetheredTo={
              getPlayer(getTetheredPlayer("North East", props.gameState))
                .position
            }
            colour={props.gameState.darkAdds === "East" ? "purple" : "yellow"}
          />
          <Tether
            add={point(1, 0.55)}
            tetheredTo={
              getPlayer(getTetheredPlayer("South East", props.gameState))
                .position
            }
            colour={props.gameState.darkAdds === "East" ? "purple" : "yellow"}
          />
        </>
      )}
    </Arena>
  );
};

export const Paradeigma3 = () => {
  const [state, restart, arena] = useGameState1<
    Paradeigma3Player,
    Paradeigma3GameState
  >((setup) => {
    const darkTowers = pickOne([true, false]);
    const supportDebuffs = shuffle([
      CrossDebuff,
      PlusDebuff,
      darkTowers ? RedTowerDebuff : LightTowerDebuff,
      darkTowers ? RedTowerDebuff : LightTowerDebuff,
    ]);
    let [dps, soup] = split(Designations, (d) => getRole(d) === "DPS");
    const soupDebuffs = soup
      .map<[Designation, Debuff[]]>((d, i) => [d, [supportDebuffs[i]]])
      .reduce<{ [d in Designation]?: Debuff[] }>(
        (o, a) => ({ ...o, [a[0]]: a[1] }),
        {}
      );
    dps = shuffle(dps);
    const ps: Paradeigma3Player[] = Designations.map((d) => ({
      position: getRandomPos(),
      role: getRole(d),
      show: true,
      designation: d,
      debuffs: soupDebuffs[d] ?? [],
      controlled: d === setup.designation,
      alive: true,
    }));
    const towerDebuffDesignations = (["H1", "MT", "OT", "H2"] as const).filter(
      (d: Designation) =>
        soupDebuffs[d] &&
        soupDebuffs[d]?.some(
          (db) =>
            db?.name ===
            (darkTowers ? RedTowerDebuff.name : LightTowerDebuff.name)
        )
    );
    const topFallSide = pickOne<"East" | "West">(["East", "West"]);
    return {
      game: paradeigma3,
      gameState: {
        cast: {
          name: "Engravement of Souls",
          value: 25,
        },
        hasFinished: false,
        players: ps,
        stage: "Initial",
        darkAdds: pickOne(["East", "West"]),
        darkTowers: darkTowers,
        topFall: topFallSide,
        row1Support: ps.filter((p) =>
          p.debuffs.some((d) => d.name === PlusDebuff.name)
        )[0].designation,
        row2Support: towerDebuffDesignations[topFallSide === "East" ? 1 : 0],
        row3Support: towerDebuffDesignations[topFallSide === "East" ? 0 : 1],
        row4Support: ps.filter((p) =>
          p.debuffs.some((d) => d.name === CrossDebuff.name)
        )[0].designation,
        row2Straight: dps[0],
        row2Cross: dps[1],
        row3Straight: dps[2],
        row3Cross: dps[3],
      },
      loop: 1,
      next: [],
    };
  });

  return (
    <Stack flexDirection="column">
      <div>
        <Button endIcon={<RestartAltIcon />} onClick={() => restart()}>
          Reset
        </Button>
      </div>
      {arena()}
      <div
        style={{
          maxWidth: "500px",
          paddingBottom: "50px",
        }}
      >
        {state.gameState.cast && (
          <>
            <h1>{state.gameState.cast.name}</h1>
            <LinearProgress
              sx={{ height: "16px" }}
              color="warning"
              variant="determinate"
              value={state.gameState.cast.value}
            />
          </>
        )}
      </div>
    </Stack>
  );
};
