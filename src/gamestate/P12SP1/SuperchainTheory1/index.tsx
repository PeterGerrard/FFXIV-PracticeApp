import { Point, point, vector } from "@flatten-js/core";
import { Debuff, Player } from "../../Player";
import {
  Designation,
  Designations,
  Setup,
  getGroup,
  getRandomPos,
  getRole,
  isRanged,
} from "../../gameState";
import { extractN, pickOne, shuffle, split } from "../../helpers";
import {
  SuperchainExplosion,
  SuperchainExplosionInOut,
  getSuperChainDangerPuddles,
} from "../Superchain/explosionTypes";
import {
  AoeDebuff,
  LightDebuff,
  LightLaserDebuff,
  LightTowerDebuff,
  RedDebuff,
  RedLaserDebuff,
  RedTowerDebuff,
} from "../debuffs";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { SuperchainTheory1Arena } from "./SuperchainTheory1Arena";
import { useTitle } from "../../../components/useTitle";
import { useGame } from "../../gameHooks";
import { useContext } from "react";
import { SetupContext } from "../../Setup/Setup";
import { Overlay } from "../../Overlay";
import { Progress } from "@/components/ui/progress";
import { EmptyMechanic, Mechanic, composeMechanics } from "../../mechanics";
import { lineMechanic } from "../../Mechanics/LineAoE";
import { circleMechanic } from "../../Mechanics/CircleAoE";
import { SimpleHeavyDamageProfile } from "../../Mechanics/DangerPuddles";

const getSafeSpot = (
  gameState: SuperchainTheoryGameState,
  player: Player
): Point => {
  if (gameState.stage === "Explosion1" || gameState.stage === "Lasers") {
    return player.position;
  }
  if (gameState.stage === "Initial") {
    let offset: Point;
    if (gameState.initialExplosions[1] === "Protean") {
      switch (player.designation) {
        case "M1":
          offset = new Point(-0.05, -0.02);
          break;
        case "MT":
          offset = new Point(-0.02, -0.05);
          break;
        case "H1":
          offset = new Point(-0.05, 0.02);
          break;
        case "R1":
          offset = new Point(-0.02, 0.05);
          break;
        case "M2":
          offset = new Point(0.05, -0.02);
          break;
        case "OT":
          offset = new Point(0.02, -0.05);
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

  if (gameState.stage === "Inter1") {
    const left = player.debuffs.some(
      (d) =>
        d.name === "Red Laser" || d.name === "Light Tower" || d.name === "Light"
    );
    const p = gameState.secondCorners.filter(([, e]) => e === "Donut")[0][0];
    return p.rotate(left ? 0.2 : -0.2, point(0.5, 0.5));
  }
  if (gameState.stage === "Inter2") {
    if (gameState.finalExplosions[0] === "Circle") {
      return player.position.translate(
        vector(player.position, gameState.finalCorner).scale(0.5, 0.5)
      );
    }
    let offset = vector(0, 0);
    if (player.debuffs.some((d) => d.name === AoeDebuff.name)) {
      offset = vector(0, isRanged(player.designation) ? 0.18 : -0.18);
    } else if (player.debuffs.some((d) => d.name === RedTowerDebuff.name)) {
      offset = vector(0.14, -0.14);
    } else if (player.debuffs.some((d) => d.name === LightTowerDebuff.name)) {
      offset = vector(-0.14, -0.14);
    } else {
      offset = vector(0, -0.15);
    }

    return gameState.finalCorner
      .translate(offset)
      .rotate(
        vector(
          gameState.finalCorner,
          gameState.finalCorner.translate(0, -0.5)
        ).angleTo(vector(gameState.finalCorner, point(0.5, 0.5))),
        gameState.finalCorner
      );
  }
  if (gameState.stage === "InOutPart1") {
    let offset = vector(point(), point());
    if (gameState.finalExplosions[1] === "Circle") {
      if (player.debuffs.some((d) => d.name === AoeDebuff.name)) {
        offset = vector(
          getGroup(player.designation) === "Group1" ? -0.1 : 0.1,
          isRanged(player.designation) ? 0.23 : -0.23
        );
      } else if (player.debuffs.some((d) => d.name === RedTowerDebuff.name)) {
        offset = vector(0.17, -0.17);
      } else if (player.debuffs.some((d) => d.name === LightTowerDebuff.name)) {
        offset = vector(-0.17, -0.17);
      } else {
        offset = vector(0, -0.25);
      }
    } else {
      if (player.debuffs.some((d) => d.name === AoeDebuff.name)) {
        offset = vector(0, isRanged(player.designation) ? 0.18 : -0.18);
      } else if (player.debuffs.some((d) => d.name === RedTowerDebuff.name)) {
        offset = vector(0.14, -0.14);
      } else if (player.debuffs.some((d) => d.name === LightTowerDebuff.name)) {
        offset = vector(-0.14, -0.14);
      } else {
        offset = vector(0, -0.15);
      }
    }

    return gameState.finalCorner
      .translate(offset)
      .rotate(
        vector(
          gameState.finalCorner,
          gameState.finalCorner.translate(0, -0.5)
        ).angleTo(vector(gameState.finalCorner, point(0.5, 0.5))),
        gameState.finalCorner
      );
  }
  if (gameState.stage === "InOutPart2") {
    let offset = vector(point(), point());
    if (player.debuffs.some((d) => d.name === AoeDebuff.name)) {
      offset = vector(
        getGroup(player.designation) === "Group1" ? -0.14 : 0.14,
        isRanged(player.designation) ? 0.23 : -0.5
      );
    } else if (player.debuffs.some((d) => d.name === RedTowerDebuff.name)) {
      offset = vector(0.23, -0.23);
    } else if (player.debuffs.some((d) => d.name === LightTowerDebuff.name)) {
      offset = vector(-0.23, -0.23);
    } else {
      offset = vector(0, -0.25);
    }

    return gameState.finalCorner
      .translate(offset)
      .rotate(
        vector(
          gameState.finalCorner,
          gameState.finalCorner.translate(0, -0.5)
        ).angleTo(vector(gameState.finalCorner, point(0.5, 0.5))),
        gameState.finalCorner
      );
  }
  if (gameState.stage === "DropTower") {
    let offset = vector(point(), point());
    if (player.debuffs.some((d) => d.name === AoeDebuff.name)) {
      offset = vector(
        getGroup(player.designation) === "Group1" ? -0.14 : 0.14,
        isRanged(player.designation) ? 0.23 : -0.5
      );
    } else if (player.designation === gameState.redTower) {
      offset = vector(0.26, -0.26);
    } else if (player.designation === gameState.lightTower) {
      offset = vector(-0.26, -0.26);
    } else if (player.designation === gameState.redLaser) {
      return gameState.lightTowerLocation;
    } else if (player.designation === gameState.lightLaser) {
      return gameState.darkTowerLocation;
    }

    return gameState.finalCorner
      .translate(offset)
      .rotate(
        vector(
          gameState.finalCorner,
          gameState.finalCorner.translate(0, -0.5)
        ).angleTo(vector(gameState.finalCorner, point(0.5, 0.5))),
        gameState.finalCorner
      );
  }

  return new Point(0.5, 0.5);
};
function getSurvivors(
  gameState: SuperchainTheoryGameState,
  players: SuperchainTheory1Player[]
) {
  const damageMap = getMechanic(gameState, players).applyDamage(players);
  let survivingPlayers = Designations.filter((d) => damageMap[d] < 1);
  if (gameState.stage === "SoakAndAoes") {
    const soakDark = players.some(
      (p) => p.position.distanceTo(gameState.darkTowerLocation)[0] < 0.1
    );
    const soakLight = players.some(
      (p) => p.position.distanceTo(gameState.lightTowerLocation)[0] < 0.1
    );

    if (!soakDark || !soakLight) {
      survivingPlayers = [];
    }
  }
  return survivingPlayers;
}

const progress = (
  s: SuperchainTheoryGameState,
  players: SuperchainTheory1Player[]
): SuperchainTheoryGameState => {
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
      cast: {
        name: "Engravement of Souls",
        value: 100,
      },
    };
  }
  if (s.stage === "Inter1") {
    return {
      ...s,
      stage: "Lasers",
      cast: null,
    };
  }
  if (s.stage === "Lasers") {
    return {
      ...s,
      stage: "Inter2",
      cast: null,
    };
  }
  if (s.stage === "Inter2") {
    return {
      ...s,
      stage: "InOutPart1",
    };
  }
  if (s.stage === "InOutPart1") {
    return {
      ...s,
      stage: "InOutPart2",
      finalExplosion: s.finalExplosions[1],
    };
  }
  if (s.stage === "InOutPart2") {
    return {
      ...s,
      stage: "DropTower",
      darkTowerLocation: players.filter((p) =>
        p.debuffs.some((d) => d.name === RedTowerDebuff.name)
      )[0].position,
      lightTowerLocation: players.filter((p) =>
        p.debuffs.some((d) => d.name === LightTowerDebuff.name)
      )[0].position,
    };
  }
  if (s.stage === "DropTower") {
    return {
      ...s,
      stage: "SoakAndAoes",
    };
  }
  return s;
};

export type SuperchainTheory1Player = Player;

export type SuperchainTheoryGameState =
  | {
      stage: "Initial";
      cast: null;
      initialCorner: Point;
      secondCorners: [
        [Point, SuperchainExplosionInOut],
        [Point, SuperchainExplosionInOut],
      ];
      finalCorner: Point;
      initialExplosions: [SuperchainExplosion, SuperchainExplosion];
      finalExplosions: [SuperchainExplosionInOut, SuperchainExplosionInOut];
      lightAoes: Designation[];
      redAoes: Designation[];
      lightLaser: Designation;
      redLaser: Designation;
      lightTower: Designation;
      redTower: Designation;
    }
  | {
      stage: "Explosion1";
      initialCorner: Point;
      secondCorners: [
        [Point, SuperchainExplosionInOut],
        [Point, SuperchainExplosionInOut],
      ];
      finalCorner: Point;
      initialExplosions: [SuperchainExplosion, SuperchainExplosion];
      finalExplosions: [SuperchainExplosionInOut, SuperchainExplosionInOut];
      lightAoes: Designation[];
      redAoes: Designation[];
      lightLaser: Designation;
      redLaser: Designation;
      lightTower: Designation;
      redTower: Designation;
    }
  | {
      stage: "Inter1";
      cast: {
        name: "Engravement of Souls";
        value: 100;
      };
      secondCorners: [
        [Point, SuperchainExplosionInOut],
        [Point, SuperchainExplosionInOut],
      ];
      finalCorner: Point;
      finalExplosions: [SuperchainExplosionInOut, SuperchainExplosionInOut];
      lightAoes: Designation[];
      redAoes: Designation[];
      lightLaser: Designation;
      redLaser: Designation;
      lightTower: Designation;
      redTower: Designation;
    }
  | {
      stage: "Lasers";
      cast: null;
      secondCorners: [
        [Point, SuperchainExplosionInOut],
        [Point, SuperchainExplosionInOut],
      ];
      finalCorner: Point;
      finalExplosions: [SuperchainExplosionInOut, SuperchainExplosionInOut];
      lightAoes: Designation[];
      redAoes: Designation[];
      lightLaser: Designation;
      redLaser: Designation;
      lightTower: Designation;
      redTower: Designation;
    }
  | {
      stage: "Inter2";
      cast: null;
      finalCorner: Point;
      finalExplosions: [SuperchainExplosionInOut, SuperchainExplosionInOut];
      lightAoes: Designation[];
      redAoes: Designation[];
      lightLaser: Designation;
      redLaser: Designation;
      lightTower: Designation;
      redTower: Designation;
    }
  | {
      stage: "InOutPart1";
      finalCorner: Point;
      finalExplosions: [SuperchainExplosionInOut, SuperchainExplosionInOut];
      lightAoes: Designation[];
      redAoes: Designation[];
      lightLaser: Designation;
      redLaser: Designation;
      lightTower: Designation;
      redTower: Designation;
    }
  | {
      stage: "InOutPart2";
      finalCorner: Point;
      finalExplosion: SuperchainExplosionInOut;
      lightAoes: Designation[];
      redAoes: Designation[];
      lightLaser: Designation;
      redLaser: Designation;
      lightTower: Designation;
      redTower: Designation;
    }
  | {
      stage: "DropTower";
      finalCorner: Point;
      darkTowerLocation: Point;
      lightTowerLocation: Point;
      lightAoes: Designation[];
      redAoes: Designation[];
      lightLaser: Designation;
      redLaser: Designation;
      lightTower: Designation;
      redTower: Designation;
    }
  | {
      stage: "SoakAndAoes";
      finalCorner: Point;
      darkTowerLocation: Point;
      lightTowerLocation: Point;
      lightAoes: Designation[];
      redAoes: Designation[];
      lightLaser: Designation;
      redLaser: Designation;
      lightTower: Designation;
      redTower: Designation;
    };

export const getMechanic = (
  gameState: SuperchainTheoryGameState,
  players: SuperchainTheory1Player[]
): Mechanic<SuperchainTheory1Player> => {
  if (gameState.stage === "Explosion1") {
    return getSuperChainDangerPuddles(
      gameState.initialExplosions,
      gameState.initialCorner,
      players
    );
  }
  if (gameState.stage === "Lasers") {
    const redLaserTarget = players.filter((p) =>
      p.debuffs.some((d) => d.name === RedLaserDebuff.name)
    )[0];
    const lightLaserTarget = players.filter((p) =>
      p.debuffs.some((d) => d.name === LightLaserDebuff.name)
    )[0];
    const lasers: Mechanic<SuperchainTheory1Player>[] = [
      lineMechanic(
        point(0.5, 0.5),
        redLaserTarget.position.distanceTo(point(0.5, 0.5))[0] < 0.00001
          ? 0
          : vector(point(0.5, 0.5), point(0.5, 1)).angleTo(
              vector(point(0.5, 0.5), redLaserTarget.position)
            ),
        0.1,
        {
          roleRequirement: null,
          split: true,
          damage: 3.8,
          debuffRequirement: null,
          instaKill: null,
        }
      ),
      lineMechanic(
        point(0.5, 0.5),
        lightLaserTarget.position.distanceTo(point(0.5, 0.5))[0] < 0.00001
          ? 0
          : vector(point(0.5, 0.5), point(0.5, 1)).angleTo(
              vector(point(0.5, 0.5), lightLaserTarget.position)
            ),
        0.1,
        {
          roleRequirement: null,
          split: true,
          damage: 3.8,
          debuffRequirement: null,
          instaKill: null,
        }
      ),
    ];
    return composeMechanics(
      gameState.secondCorners
        .map((x) => getSuperChainDangerPuddles([x[1]], x[0], players))
        .concat(lasers)
    );
  }
  if (gameState.stage === "InOutPart1") {
    return getSuperChainDangerPuddles(
      [gameState.finalExplosions[0]],
      gameState.finalCorner,
      players
    );
  }
  if (gameState.stage === "InOutPart2") {
    return getSuperChainDangerPuddles(
      [gameState.finalExplosion],
      gameState.finalCorner,
      players
    );
  }
  if (gameState.stage === "DropTower") {
    return composeMechanics([
      circleMechanic(
        gameState.darkTowerLocation,
        0.05,
        {
          debuffRequirement: RedTowerDebuff,
          instaKill: null,
          split: false,
          damage: 0.6,
          roleRequirement: null,
        },
        { color: "black" }
      ),
      circleMechanic(
        gameState.lightTowerLocation,
        0.05,
        {
          debuffRequirement: LightTowerDebuff,
          instaKill: null,
          split: false,
          damage: 0.6,
          roleRequirement: null,
        },
        { color: "white" }
      ),
    ]);
  }
  if (gameState.stage === "SoakAndAoes") {
    const soaks: Mechanic<SuperchainTheory1Player>[] = [
      circleMechanic(
        gameState.darkTowerLocation,
        0.05,
        {
          debuffRequirement: LightDebuff,
          instaKill: null,
          split: false,
          damage: 0.6,
          roleRequirement: null,
        },
        { color: "black" }
      ),
      circleMechanic(
        gameState.lightTowerLocation,
        0.05,
        {
          debuffRequirement: RedDebuff,
          instaKill: null,
          split: false,
          damage: 0.6,
          roleRequirement: null,
        },
        { color: "white" }
      ),
    ];
    const aoes: Mechanic<SuperchainTheory1Player>[] = players
      .filter((p) => p.debuffs.some((d) => d.name === AoeDebuff.name))
      .map((p) => circleMechanic(p.position, 0.15, SimpleHeavyDamageProfile));
    return composeMechanics(soaks.concat(aoes));
  }

  return EmptyMechanic;
};

const createState = (): SuperchainTheoryGameState => {
  const initialCorner = pickOne([
    new Point(0.26, 0.26),
    new Point(0.74, 0.26),
    new Point(0.26, 0.74),
    new Point(0.74, 0.74),
  ]);
  const j = pickOne([0, 1]);
  const [aoes, others] = shuffle(
    split(Designations, (d) => getRole(d) === "DPS")
  );
  const [lightAoes, redAoes] = extractN(aoes, 2);
  const [lightTower, redTower, lightLaser, redLaser] = shuffle(others);

  return {
    cast: null,
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
    finalCorner: point(1 - initialCorner.x, 1 - initialCorner.y),
    finalExplosions: shuffle(["Donut", "Circle"]) as [
      SuperchainExplosionInOut,
      SuperchainExplosionInOut,
    ],
    lightAoes,
    redAoes,
    lightTower,
    redTower,
    lightLaser,
    redLaser,
  };
};

const createPlayers = (setup: Setup): SuperchainTheory1Player[] => {
  return Designations.map((d) => ({
    position: getRandomPos(),
    role: getRole(d),
    show: true,
    designation: d,
    debuffs: [],
    controlled: d === setup.designation,
    alive: true,
    distanceTravelled: 0,
  }));
};

const autoProgress = (state: SuperchainTheoryGameState): false | number => {
  if (state.stage === "Explosion1") return 1500;
  if (state.stage === "Lasers") return 1500;
  return false;
};

const getDebuffs = (
  state: SuperchainTheoryGameState,
  player: SuperchainTheory1Player
): Debuff[] => {
  if (state.stage === "Inter1" || state.stage === "Lasers") {
    return state.lightAoes.includes(player.designation)
      ? [LightDebuff, AoeDebuff]
      : state.redAoes.includes(player.designation)
        ? [RedDebuff, AoeDebuff]
        : [
            player.designation === state.lightTower
              ? LightTowerDebuff
              : player.designation === state.redTower
                ? RedTowerDebuff
                : player.designation === state.lightLaser
                  ? LightLaserDebuff
                  : RedLaserDebuff,
          ];
  }
  if (
    ["Inter2", "InOutPart1", "InOutPart2", "DropTower", "SoakAndAoes"].includes(
      state.stage
    )
  ) {
    return state.lightAoes.includes(player.designation)
      ? [RedDebuff, AoeDebuff]
      : state.redAoes.includes(player.designation)
        ? [LightDebuff, AoeDebuff]
        : player.designation === state.lightTower
          ? [LightTowerDebuff]
          : player.designation === state.redTower
            ? [RedTowerDebuff]
            : player.designation === state.lightLaser
              ? [LightLaserDebuff, LightDebuff]
              : [RedLaserDebuff, RedDebuff];
  }
  return [];
};

export const SuperchainTheory1 = () => {
  const setup = useContext(SetupContext);
  useTitle("Superchain Theory 1");
  const { onMove, players, restart, safeLocation, state } = useGame<
    SuperchainTheory1Player,
    SuperchainTheoryGameState
  >(
    getSurvivors,
    (s) => s.stage === "SoakAndAoes",
    () => createPlayers(setup.state),
    (s, _ps, p) => getSafeSpot(s, p),
    createState,
    autoProgress,
    progress,
    getDebuffs
  );

  return (
    <div className="flex flex-col">
      <div>
        <Button onClick={() => restart()}>
          Reset
          <ReloadIcon />
        </Button>
      </div>
      <SuperchainTheory1Arena
        gameState={state}
        moveTo={onMove}
        players={players}
      >
        <Overlay
          finished={state.stage === "SoakAndAoes"}
          players={players}
          safeLocation={safeLocation}
        />
      </SuperchainTheory1Arena>
      <div
        style={{
          maxWidth: "500px",
          paddingBottom: "50px",
        }}
      >
        {"cast" in state && state.cast && (
          <>
            <h1>{state.cast.name}</h1>
            <Progress value={state.cast.value} />
          </>
        )}
      </div>
    </div>
  );
};
