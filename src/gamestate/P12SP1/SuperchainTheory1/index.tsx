import { Point, point, vector } from "@flatten-js/core";
import { useGameState1 } from "../..";
import { DangerPuddle, survivePuddles } from "../../Mechanics/DangerPuddles";
import { Player } from "../../Player";
import {
  Designations,
  GameLoop,
  GameState,
  getRandomPos,
  getRole,
} from "../../gameState";
import { extractN, pickOne, shuffle, split } from "../../helpers";
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
  LightLaserDebuff,
  LightTowerDebuff,
  RedDebuff,
  RedLaserDebuff,
  RedTowerDebuff,
} from "../debuffs";

export const superchainTheory1: GameLoop<
  SuperchainTheory1Player,
  SuperchainTheoryGameState
> = {
  arena: (
    gameState: SuperchainTheoryGameState,
    moveTo: (p: Point) => void,
    animationEnd: () => void
  ) => (
    <SuperchainTheory1Arena
      players={gameState.players}
      gameState={gameState}
      moveTo={moveTo}
      animationEnd={animationEnd}
    />
  ),
  getSafeSpot: (gameState, player) => {
    if (gameState.stage === "Inter1") {
      return player.position;
    }
    if (gameState.stage === "Explosion1") {
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

    if (gameState.stage === "Lasers") {
      const left = player.debuffs.some(
        (d) =>
          d.name === "Red Laser" ||
          d.name === "Light Tower" ||
          d.name === "Light"
      );
      const p = gameState.secondCorners.filter(([_, e]) => e === "Donut")[0][0];
      return p.rotate(left ? 0.2 : -0.2, point(0.5, 0.5));
    }

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
  nextState: (s) => {
    if (s.stage === "Initial") {
      return {
        ...s,
        stage: "Explosion1",
      };
    }
    if (s.stage === "Explosion1") {
      const [aoes, others] = shuffle(
        split(Designations, (d) => getRole(d) === "DPS")
      );
      const [lightAoes, redAoes] = extractN(aoes, 2);
      const [lightTower, redTower, lightLaser, _] = shuffle(others);

      return {
        ...s,
        stage: "Inter1",
        cast: {
          name: "Engravement of Souls",
          value: 100,
        },
        players: s.players.map((p) => ({
          ...p,
          debuffs: lightAoes.includes(p.designation)
            ? [LightDebuff, AoeDebuff]
            : redAoes.includes(p.designation)
            ? [RedDebuff, AoeDebuff]
            : [
                p.designation === lightTower
                  ? LightTowerDebuff
                  : p.designation === redTower
                  ? RedTowerDebuff
                  : p.designation === lightLaser
                  ? LightLaserDebuff
                  : RedLaserDebuff,
              ],
        })),
      };
    }
    if (s.stage === "Inter1") {
      return {
        ...s,
        stage: "Lasers",
        cast: null,
        hasFinished: true,
      };
    }
    return s;
  },
};

type SuperchainTheory1Player = Player;

type SuperchainTheoryGameState = GameState<SuperchainTheory1Player> &
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
    const redLaserTarget = gameState.players.filter((p) =>
      p.debuffs.some((d) => d.name === RedLaserDebuff.name)
    )[0];
    const lightLaserTarget = gameState.players.filter((p) =>
      p.debuffs.some((d) => d.name === LightLaserDebuff.name)
    )[0];
    const lasers: DangerPuddle[] = [
      {
        type: "line",
        angle:
          redLaserTarget.position.distanceTo(point(0.5, 0.5))[0] < 0.00001
            ? 0
            : vector(point(0.5, 0.5), point(0.5, 1)).angleTo(
                vector(point(0.5, 0.5), redLaserTarget.position)
              ),
        onAnimationEnd: animationEnd,
        roleRequirement: null,
        source: point(0.5, 0.5),
        split: 4,
        width: 0.1,
        debuffRequirement: null,
        instaKill: null,
      },
      {
        type: "line",
        angle:
          lightLaserTarget.position.distanceTo(point(0.5, 0.5))[0] < 0.00001
            ? 0
            : vector(point(0.5, 0.5), point(0.5, 1)).angleTo(
                vector(point(0.5, 0.5), lightLaserTarget.position)
              ),
        onAnimationEnd: animationEnd,
        roleRequirement: null,
        source: point(0.5, 0.5),
        split: 4,
        width: 0.1,
        debuffRequirement: null,
        instaKill: null,
      },
    ];
    return gameState.secondCorners
      .flatMap((x, i) =>
        getSuperChainDangerPuddles(
          [x[1]],
          x[0],
          players,
          i == 0 ? animationEnd : () => {}
        )
      )
      .concat(lasers);
  }

  return [];
};

const SuperchainTheory1Arena = (props: {
  players: SuperchainTheory1Player[];
  gameState: SuperchainTheoryGameState;
  moveTo: (p: Point) => void;
  animationEnd: () => void;
}) => {
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
    const initialCorner = pickOne([
      new Point(0.26, 0.26),
      new Point(0.74, 0.26),
      new Point(0.26, 0.74),
      new Point(0.74, 0.74),
    ]);
    const j = pickOne([0, 1]);
    const ps: SuperchainTheory1Player[] = Designations.map((d) => ({
      position: getRandomPos(),
      role: getRole(d),
      show: true,
      designation: d,
      debuffs: [],
      controlled: d === setup.designation,
      alive: true,
    }));
    return {
      game: superchainTheory1,
      gameState: {
        cast: null,
        hasFinished: false,
        players: ps,
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
      loop: 1,
      next: [],
    };
  });

  return arena();
};
