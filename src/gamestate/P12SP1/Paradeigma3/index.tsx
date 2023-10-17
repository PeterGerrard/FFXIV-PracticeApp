import { Point, point } from "@flatten-js/core";
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
  getSafeSpot: (_gameState, _player) => {
    return new Point(0.5, 0.5);
  },
  applyDamage: (gameState) => {
    const dangerPuddles = getDangerPuddles(
      gameState,
      () => {},
      gameState.players
    );
    const survivingPlayers = survivePuddles(dangerPuddles, gameState.players);

    return {
      ...gameState,
      players: gameState.players.map((p) => ({
        ...p,
        alive: survivingPlayers.includes(p.designation),
      })),
    };
  },
  nextState: (s): Paradeigma3GameState => {
    return s;
  },
};

type Paradeigma3Player = Player;

type Paradeigma3GameState = GameState<Paradeigma3Player> & {
  stage: "Initial";
  cast: {
    name: "Engravement of Souls";
    value: 100;
  };
  darkSide: "East" | "West";
  northEastAddTether: Designation;
  southEastAddTether: Designation;
  southWestAddTether: Designation;
  northWestAddTether: Designation;
};

const getDangerPuddles = (
  _gameState: Paradeigma3GameState,
  _animationEnd: () => void,
  _players: Paradeigma3Player[]
): DangerPuddle[] => {
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
    let [dps, soup] = split(Designations, (d) => getRole(d) !== "DPS");
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
          value: 100,
        },
        hasFinished: false,
        players: ps,
        stage: "Initial",
        darkSide: pickOne(["East", "West"]),
        northEastAddTether: dps[0],
        southEastAddTether: dps[1],
        southWestAddTether: dps[2],
        northWestAddTether: dps[3],
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
