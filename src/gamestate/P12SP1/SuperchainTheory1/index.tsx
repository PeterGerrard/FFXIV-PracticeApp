import { Point, point, vector } from "@flatten-js/core";
import { useGameState1 } from "../..";
import {
  DangerPuddles,
  DangerPuddlesDisplay,
  survivePuddles,
} from "../../Mechanics/DangerPuddles";
import { DesignatedPlayer, PlayerComponent } from "../../Player";
import { GameLoop, GameState, Role, getRandomPos } from "../../gameState";
import { pickOne } from "../../helpers";
import { Arena } from "../P12SP1Arena";
import {
  SuperchainExplosion,
  SuperchainExplosionDisplay,
  getSuperChainDangerPuddles,
} from "./explosionTypes";

export const superchainTheory1: GameLoop<
  SuperchainTheory1Player,
  SuperchainTheoryGameState
> = {
  arena: (
    player: SuperchainTheory1Player,
    otherPlayers: SuperchainTheory1Player[],
    isDead: boolean,
    gameState: SuperchainTheoryGameState,
    moveTo: (p: Point) => void,
    animationEnd: () => void
  ) => (
    <SuperchainTheory1Arena
      player={player}
      otherPlayers={otherPlayers}
      isDead={isDead}
      gameState={gameState}
      moveTo={moveTo}
      animationEnd={animationEnd}
    />
  ),
  getSafeSpot: (gameState, player) => {
    if (gameState.stage === "Initial" || gameState.stage === "Explosion1") {
      // TODO: melee, tank, healer, ranged on group side
      let offset: Point;
      if (gameState.initialExplosions[0] === "Protean") {
        switch (player.designation) {
          case "H1":
            offset = new Point(-0.05, -0.02);
            break;
          case "H2":
            offset = new Point(0.05, -0.02);
            break;
          case "MT":
            offset = new Point(-0.05, 0.02);
            break;
          case "OT":
            offset = new Point(0.05, 0.02);
            break;
          case "M1":
            offset = new Point(-0.02, 0.05);
            break;
          case "M2":
            offset = new Point(0.02, 0.05);
            break;
          case "R1":
            offset = new Point(-0.02, -0.05);
            break;
          case "R2":
            offset = new Point(0.02, -0.05);
            break;
        }
      } else {
        switch (player.designation) {
          case "H1":
          case "R1":
            offset = new Point(-0.05, -0.05);
            break;
          case "H2":
          case "R2":
            offset = new Point(0.05, -0.05);
            break;
          case "MT":
          case "M1":
            offset = new Point(-0.05, 0.05);
            break;
          case "OT":
          case "M2":
            offset = new Point(0.05, 0.05);
            break;
        }
      }
      const scaleValue = gameState.initialExplosions[0] === "Donut" ? 1 : 4;
      return gameState.initialCorner.translate(
        vector(point(), offset.scale(scaleValue, scaleValue))
      );
    }

    return new Point(0.5, 0.5);
  },
  isSafe: (gameState, player, otherPlayers) => {
    const dangerPuddles = getDangerPuddles(gameState, () => {}, [
      player,
      ...otherPlayers,
    ]);
    if (!survivePuddles(dangerPuddles, player.position)) return false;

    return true;
  },
  nextState: (s) => {
    if (s.stage === "Initial") {
      return {
        ...s,
        stage: "Explosion1",
        hasFinished: true,
      };
    }
    return s;
  },
};

type SuperchainTheory1Player = DesignatedPlayer & {
  show: boolean;
};

type SuperchainTheoryGameState = GameState &
  (
    | {
        stage: "Initial";
        initialCorner: Point;
        initialExplosions: [SuperchainExplosion, SuperchainExplosion];
      }
    | {
        stage: "Explosion1";
        initialCorner: Point;
        initialExplosions: [SuperchainExplosion, SuperchainExplosion];
      }
  );

const getDangerPuddles = (
  gameState: SuperchainTheoryGameState,
  animationEnd: () => void,
  players: SuperchainTheory1Player[]
): DangerPuddles => {
  if (gameState.stage === "Explosion1")
    return getSuperChainDangerPuddles(
      gameState.initialExplosions,
      gameState.initialCorner,
      players,
      animationEnd
    );

  return { puddles: [], survivable: 0 };
};

const SuperchainTheory1Arena = (props: {
  player: SuperchainTheory1Player;
  otherPlayers: SuperchainTheory1Player[];
  isDead: boolean;
  gameState: SuperchainTheoryGameState;
  moveTo: (p: Point) => void;
  animationEnd: () => void;
}) => {
  return (
    <Arena
      player={props.player}
      isDead={props.isDead}
      moveTo={props.moveTo}
      dangerPuddles={{
        puddles: [],
        survivable: 0,
      }}
    >
      {props.gameState.stage === "Initial" && (
        <>
          <SuperchainExplosionDisplay
            explosion={props.gameState.initialExplosions[0]}
            position={props.gameState.initialCorner.translate(-0.1, 0)}
            target={props.gameState.initialCorner}
          />
          <SuperchainExplosionDisplay
            explosion={props.gameState.initialExplosions[1]}
            position={props.gameState.initialCorner.translate(0, -0.1)}
            target={props.gameState.initialCorner}
          />
        </>
      )}

      <DangerPuddlesDisplay
        puddles={
          getDangerPuddles(props.gameState, props.animationEnd, [
            props.player,
            ...props.otherPlayers,
          ]).puddles
        }
      />

      {props.otherPlayers
        .filter((p) => p.show)
        .map((p, i) => (
          <PlayerComponent key={i} player={p} isDead={false} />
        ))}
    </Arena>
  );
};

export const SuperchainTheory1 = () => {
  const [_gameState, _restart, arena] = useGameState1<
    SuperchainTheory1Player,
    SuperchainTheoryGameState
  >((setup) => {
    const rs: [Role, SuperchainTheory1Player["designation"]][] = [
      ["DPS", "M1"],
      ["DPS", "M2"],
      ["DPS", "R1"],
      ["DPS", "R2"],
      ["Healer", "H2"],
      ["Healer", "H1"],
      ["Tank", "MT"],
      ["Tank", "OT"],
    ];
    const i = rs.findIndex((r) => r[0] === setup.role);
    return {
      game: superchainTheory1,
      gameState: {
        cast: null,
        hasFinished: false,
        stage: "Initial",
        initialCorner: pickOne([
          new Point(0.26, 0.26),
          new Point(0.74, 0.26),
          new Point(0.26, 0.74),
          new Point(0.74, 0.74),
        ]),
        initialExplosions: [
          pickOne(["Donut", "Circle"]),
          pickOne(["Protean", "Pair"]),
        ],
      },
      isDead: false,
      isSafe: () => true,
      loop: 1,
      next: [],
      player: {
        position: getRandomPos(),
        role: setup.role,
        show: true,
        designation: "H2",
      },
      otherPlayers: rs
        .filter((_, j) => j !== i)
        .map((r) => ({
          position: getRandomPos(),
          role: r[0],
          show: true,
          designation: r[1],
        })),
    };
  });

  return arena();
};
