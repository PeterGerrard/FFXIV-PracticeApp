import { Point, point, vector } from "@flatten-js/core";
import { useGameState1 } from "../..";
import { DangerPuddle, survivePuddles } from "../../Mechanics/DangerPuddles";
import { DesignatedPlayer } from "../../Player";
import { GameLoop, GameState, Role, getRandomPos } from "../../gameState";
import { pickOne } from "../../helpers";
import { Arena } from "../P12SP1Arena";
import {
  SuperchainExplosion,
  SuperchainExplosionDisplay,
  SuperchainExplosionInOut,
  getSuperChainDangerPuddles,
} from "./explosionTypes";
import {
  AoeDebuff,
  LightDebuff,
  RedLaserDebuff,
  RedTowerDebuff,
} from "../debuffs";

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
      let offset: Point;
      if (gameState.initialExplosions[1] === "Protean") {
        switch (player.designation) {
          case "M1":
            offset = new Point(-0.02, -0.05);
            break;
          case "MT":
            offset = new Point(-0.05, -0.02);
            break;
          case "H1":
            offset = new Point(-0.05, 0.02);
            break;
          case "R1":
            offset = new Point(-0.02, 0.05);
            break;
          case "M2":
            offset = new Point(0.02, -0.05);
            break;
          case "OT":
            offset = new Point(0.05, -0.02);
            break;
          case "H2":
            offset = new Point(0.05, 0.02);
            break;
          case "R2":
            offset = new Point(0.02, 0.05);
            break;
        }
      } else {
        switch (player.designation) {
          case "H1":
          case "R1":
            offset = new Point(-0.05, 0.05);
            break;
          case "H2":
          case "R2":
            offset = new Point(0.05, 0.05);
            break;
          case "MT":
          case "M1":
            offset = new Point(-0.05, -0.05);
            break;
          case "OT":
          case "M2":
            offset = new Point(0.05, -0.05);
            break;
        }
      }
      const scaleValue = gameState.initialExplosions[0] === "Donut" ? 1 : 4;
      const rotAngle = vector(
        gameState.initialCorner,
        gameState.initialCorner.translate(0, -1)
      ).angleTo(vector(gameState.initialCorner, point(0.5, 0.5)));

      return gameState.initialCorner
        .translate(vector(point(), offset.scale(scaleValue, scaleValue)))
        .rotate(rotAngle, gameState.initialCorner);
    }

    return new Point(0.5, 0.5);
  },
  isSafe: (gameState, player, otherPlayers) => {
    const dangerPuddles = getDangerPuddles(gameState, () => {}, [
      player,
      ...otherPlayers,
    ]);
    if (!survivePuddles(dangerPuddles, player)) return false;

    return true;
  },
  nextState: (s) => {
    if (s.stage === "Initial") {
      return {
        ...s,
        stage: "Explosion1",
      };
    }
    if (s.stage === "Explosion1") {
      return {
        ...s,
        stage: "Inter1",
      };
    }
    if (s.stage === "Inter1") {
      return {
        ...s,
        stage: "Lasers",
        hasFinished: true,
      };
    }
    return s;
  },
};

type SuperchainTheory1Player = DesignatedPlayer;

type SuperchainTheoryGameState = GameState &
  (
    | {
        stage: "Initial";
        initialCorner: Point;
        secondCorners: [
          [Point, SuperchainExplosionInOut],
          [Point, SuperchainExplosionInOut]
        ];
        initialExplosions: [SuperchainExplosion, SuperchainExplosion];
      }
    | {
        stage: "Explosion1";
        initialCorner: Point;
        secondCorners: [
          [Point, SuperchainExplosionInOut],
          [Point, SuperchainExplosionInOut]
        ];
        initialExplosions: [SuperchainExplosion, SuperchainExplosion];
      }
    | {
        stage: "Inter1";
        secondCorners: [
          [Point, SuperchainExplosionInOut],
          [Point, SuperchainExplosionInOut]
        ];
      }
    | {
        stage: "Lasers";
        secondCorners: [
          [Point, SuperchainExplosionInOut],
          [Point, SuperchainExplosionInOut]
        ];
      }
  );

const getDangerPuddles = (
  gameState: SuperchainTheoryGameState,
  animationEnd: () => void,
  players: SuperchainTheory1Player[]
): DangerPuddle[] => {
  if (gameState.stage === "Explosion1") {
    return getSuperChainDangerPuddles(
      gameState.initialExplosions,
      gameState.initialCorner,
      players,
      animationEnd
    );
  }
  if (gameState.stage === "Lasers") {
    return gameState.secondCorners.flatMap((x, i) =>
      getSuperChainDangerPuddles(
        [x[1]],
        x[0],
        players,
        i == 0 ? animationEnd : () => {}
      )
    );
  }

  return [];
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
      otherPlayers={props.otherPlayers}
      moveTo={props.moveTo}
      dangerPuddles={getDangerPuddles(props.gameState, props.animationEnd, [
        props.player,
        ...props.otherPlayers,
      ])}
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

      {(props.gameState.stage === "Explosion1" ||
        props.gameState.stage === "Inter1") && (
        <>
          <SuperchainExplosionDisplay
            explosion={props.gameState.secondCorners[0][1]}
            position={props.gameState.secondCorners[0][0].translate(0.2, 0.2)}
            target={props.gameState.secondCorners[0][0]}
          />
          <SuperchainExplosionDisplay
            explosion={props.gameState.secondCorners[1][1]}
            position={props.gameState.secondCorners[1][0].translate(0.2, 0.2)}
            target={props.gameState.secondCorners[1][0]}
          />
        </>
      )}
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
    const initialCorner = pickOne([
      new Point(0.26, 0.26),
      new Point(0.74, 0.26),
      new Point(0.26, 0.74),
      new Point(0.74, 0.74),
    ]);
    const j = pickOne([0, 1]);
    return {
      game: superchainTheory1,
      gameState: {
        cast: null,
        hasFinished: false,
        stage: "Initial",
        initialCorner: initialCorner,
        initialExplosions: [
          pickOne(["Donut", "Circle"]),
          pickOne(["Protean", "Pair"]),
        ],
        secondCorners: [
          [
            point(1 - initialCorner.x, initialCorner.y),
            ["Donut", "Circle"][j] as SuperchainExplosionInOut,
          ],
          [
            point(initialCorner.x, 1 - initialCorner.y),
            ["Donut", "Circle"][1 - j] as SuperchainExplosionInOut,
          ],
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
        debuffs: [RedLaserDebuff],
      },
      otherPlayers: rs
        .filter((_, j) => j !== i)
        .map((r) => ({
          position: getRandomPos(),
          role: r[0],
          show: true,
          designation: r[1],
          debuffs: [LightDebuff, r[0] === "DPS" ? AoeDebuff : RedTowerDebuff],
        })),
    };
  });

  return arena();
};
