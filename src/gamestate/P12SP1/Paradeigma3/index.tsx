import { Point, point, vector } from "@flatten-js/core";
import { useGameState1 } from "../..";
import { DangerPuddle, survivePuddles } from "../../Mechanics/DangerPuddles";
import { Debuff, Player } from "../../Player";
import {
  Designation,
  Designations,
  GameLoop,
  GameState,
  getRandomPos,
  getRole,
} from "../../gameState";
import { pickOne, shuffle, split } from "../../helpers";
import { Arena } from "../P12SP1Arena";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import LinearProgress from "@mui/material/LinearProgress";
import { CrossDebuff, LightTowerDebuff, PlusDebuff } from "../debuffs";

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
      if (player.debuffs.some((x) => x.name === PlusDebuff.name)) {
        return gameState.topFall === "East"
          ? point(0.1, 0.125)
          : point(0.9, 0.125);
      } else if (player.debuffs.some((x) => x.name === CrossDebuff.name)) {
        return gameState.topFall === "East"
          ? point(0.9, 0.875)
          : point(0.1, 0.875);
      } else if (player.debuffs.some((x) => x.name === LightTowerDebuff.name)) {
        return point(
          player.designation === gameState.eastPriority ? 0.1 : 0.9,
          (player.designation === gameState.eastPriority) !==
            (gameState.topFall === "East")
            ? 0.375
            : 0.625
        );
      }
      if (player.designation === gameState.northWestAddTether) {
        return gameState.topFall === "East"
          ? point(0.75, 0.45)
          : point(0.72, 0.74);
      }
      if (player.designation === gameState.northEastAddTether) {
        return gameState.topFall === "West"
          ? point(0.25, 0.45)
          : point(0.28, 0.74);
      }
      if (player.designation === gameState.southWestAddTether) {
        return gameState.topFall === "East"
          ? point(0.72, 0.26)
          : point(0.75, 0.55);
      }
      return gameState.topFall === "West"
        ? point(0.28, 0.26)
        : point(0.25, 0.55);
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
      console.log({ players: gameState.players, towers });
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
        darkSide: "East" | "West";
        topFall: "East" | "West";
        northEastAddTether: Designation;
        southEastAddTether: Designation;
        southWestAddTether: Designation;
        northWestAddTether: Designation;
        eastPriority: Designation;
      }
    | {
        stage: "Fall";
        cast: {
          name: "Engravement of Souls";
          value: 100;
        };
        hasFinished: true;
        darkSide: "East" | "West";
        topFall: "East" | "West";
        northEastAddTether: Designation;
        southEastAddTether: Designation;
        southWestAddTether: Designation;
        northWestAddTether: Designation;
        eastPriority: Designation;
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
    const nwPlayer = getPlayer(gameState.northWestAddTether);
    const swAdd = point(0, 0.55);
    const swPlayer = getPlayer(gameState.southWestAddTether);
    const neAdd = point(1, 0.45);
    const nePlayer = getPlayer(gameState.northEastAddTether);
    const seAdd = point(1, 0.55);
    const sePlayer = getPlayer(gameState.southEastAddTether);
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
            tetheredTo={getPlayer(props.gameState.northWestAddTether).position}
            colour={props.gameState.darkSide === "West" ? "purple" : "yellow"}
          />
          <Tether
            add={point(0, 0.55)}
            tetheredTo={getPlayer(props.gameState.southWestAddTether).position}
            colour={props.gameState.darkSide === "West" ? "purple" : "yellow"}
          />
          <Tether
            add={point(1, 0.45)}
            tetheredTo={getPlayer(props.gameState.northEastAddTether).position}
            colour={props.gameState.darkSide === "East" ? "purple" : "yellow"}
          />
          <Tether
            add={point(1, 0.55)}
            tetheredTo={getPlayer(props.gameState.southEastAddTether).position}
            colour={props.gameState.darkSide === "East" ? "purple" : "yellow"}
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
    const supportDebuffs = shuffle([
      CrossDebuff,
      PlusDebuff,
      LightTowerDebuff,
      LightTowerDebuff,
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
        darkSide: pickOne(["East", "West"]),
        topFall: pickOne(["East", "West"]),
        northEastAddTether: dps[0],
        southEastAddTether: dps[1],
        southWestAddTether: dps[2],
        northWestAddTether: dps[3],
        eastPriority: (["H1", "MT", "OT", "H2"] as const).filter(
          (d: Designation) =>
            soupDebuffs[d] &&
            soupDebuffs[d]?.some((db) => db?.name === LightTowerDebuff.name)
        )[0],
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
