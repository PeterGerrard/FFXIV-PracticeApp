import { Point, point, vector } from "@flatten-js/core";
import { DangerPuddle, survivePuddles } from "../../Mechanics/DangerPuddles";
import { Debuff, Player } from "../../Player";
import {
  Designation,
  Designations,
  InterCardinal,
  Setup,
  distanceTo,
  getRandomPos,
  getRole,
} from "../../gameState";
import { pickOne, shuffle, split } from "../../helpers";
import { P12P1Arena } from "../P12SP1Arena";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  CrossDebuff,
  LightDebuff,
  LightTowerDebuff,
  PlusDebuff,
  RedDebuff,
  RedTowerDebuff,
} from "../debuffs";
import DarkTower from "../SuperchainTheory1/assets/darktower.png";
import LightTower from "../SuperchainTheory1/assets/lighttower.png";
import { useTitle } from "../../../components/useTitle";
import { useGame } from "../../gameHooks";
import { PropsWithChildren, useContext } from "react";
import { SetupContext } from "../../Setup/Setup";
import { Overlay } from "../../Overlay";

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

const applyDamage = (
  gameState: Paradeigma3GameState,
  players: Paradeigma3Player[]
): Paradeigma3Player[] => {
  const dangerPuddles = getDangerPuddles(gameState, players);
  let survivingPlayers = survivePuddles(dangerPuddles, players);
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
        players.every((p) => p.position.distanceTo(t)[0] > 0.075)
      )
    ) {
      survivingPlayers = [];
    }
  }
  if (gameState.stage === "TowerSoak") {
    if (
      gameState.towerLocations.some(
        (t) =>
          !players.some(
            (p) =>
              p.debuffs.some(
                (d) =>
                  d.name ===
                  (gameState.darkTowers ? LightDebuff.name : RedDebuff.name)
              ) && p.position.distanceTo(t)[0] < 0.08
          )
      )
    ) {
      survivingPlayers = [];
    }
  }

  return players.map((p) => ({
    ...p,
    alive: survivingPlayers.includes(p.designation),
  }));
};
const progress = (
  s: Paradeigma3GameState,
  players: Paradeigma3Player[]
): Paradeigma3GameState => {
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
      stage: "PlusCross",
      cast: null,
    };
  }
  if (s.stage === "PlusCross") {
    return {
      ...s,
      stage: "Inter",
      plusLocation: players.filter((p) =>
        p.debuffs.some((d) => d.name === PlusDebuff.name)
      )[0].position,
      crossLocation: players.filter((p) =>
        p.debuffs.some((d) => d.name === CrossDebuff.name)
      )[0].position,
    };
  }
  if (s.stage === "Inter") {
    return {
      ...s,
      stage: "TowerDrop",
    };
  }
  if (s.stage === "TowerDrop") {
    return {
      ...s,
      stage: "TowerInter",
      towerLocations: players
        .filter((x) =>
          x.debuffs.some((d) => d === RedTowerDebuff || d === LightTowerDebuff)
        )
        .map((p) => p.position)
        .sort((p1, p2) => p1.y - p2.y),
    };
  }
  if (s.stage === "TowerInter") {
    return {
      ...s,
      stage: "TowerSoak",
      hasFinished: true,
    };
  }
  return s;
};
const getSafeSpot = (
  gameState: Paradeigma3GameState,
  player: Player
): Point => {
  if (gameState.stage === "Initial") {
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

  if (gameState.stage === "Fall" || gameState.stage === "PlusCross") {
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
    gameState.stage === "Fall" ||
    gameState.stage === "PlusCross" ||
    gameState.stage === "Inter" ||
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

  if (gameState.stage === "TowerInter") {
    if (player.designation === gameState.row1Support) {
      return point(gameState.topFall === "East" ? 0.48 : 0.52, 0.23);
    }
    if (player.designation === gameState.row2Support) {
      return point(gameState.topFall === "East" ? 0.53 : 0.47, 0.375);
    }
    if (player.designation === gameState.row3Support) {
      return point(gameState.topFall === "East" ? 0.47 : 0.53, 0.625);
    }
    if (player.designation === gameState.row4Support) {
      return point(gameState.topFall === "East" ? 0.52 : 0.48, 0.77);
    }

    const towerSide =
      (gameState.darkAdds === "East" && gameState.darkTowers) ||
      (gameState.darkAdds === "West" && !gameState.darkTowers)
        ? "East"
        : "West";
    const towerRow =
      (towerSide === "East" && gameState.topFall === "East") ||
      (towerSide === "West" && gameState.topFall === "West")
        ? 2
        : 3;

    if (towerRow === 2) {
      if (towerSide === "East") {
        if (player.designation === gameState.row2Cross) {
          return gameState.towerLocations[1].translate(0.04, -0.04);
        } else if (player.designation === gameState.row2Straight) {
          return gameState.towerLocations[0];
        } else if (player.designation === gameState.row3Cross) {
          return point(0.4, 0.65);
        } else if (player.designation === gameState.row3Straight) {
          return point(0.35, 0.55);
        }
      } else {
        if (player.designation === gameState.row2Cross) {
          return gameState.towerLocations[1].translate(-0.04, -0.04);
        } else if (player.designation === gameState.row2Straight) {
          return gameState.towerLocations[0];
        } else if (player.designation === gameState.row3Cross) {
          return point(0.6, 0.65);
        } else if (player.designation === gameState.row3Straight) {
          return point(0.65, 0.55);
        }
      }
    } else {
      if (towerSide === "East") {
        if (player.designation === gameState.row2Cross) {
          return point(0.35, 0.45);
        } else if (player.designation === gameState.row2Straight) {
          return point(0.4, 0.35);
        } else if (player.designation === gameState.row3Cross) {
          return gameState.towerLocations[0].translate(0.04, 0.04);
        } else if (player.designation === gameState.row3Straight) {
          return gameState.towerLocations[1];
        }
      } else {
        if (player.designation === gameState.row2Cross) {
          return point(0.65, 0.45);
        } else if (player.designation === gameState.row2Straight) {
          return point(0.6, 0.35);
        } else if (player.designation === gameState.row3Cross) {
          return gameState.towerLocations[0].translate(-0.04, 0.04);
        } else if (player.designation === gameState.row3Straight) {
          return gameState.towerLocations[1];
        }
      }
    }
  }

  return new Point(0.5, 0.5);
};

type Paradeigma3Player = Player;

type Paradeigma3GameState =
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
      plusLocation: Point;
      crossLocation: Point;
    }
  | {
      stage: "TowerDrop";
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
      stage: "TowerInter";
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
      towerLocations: Point[];
    }
  | {
      stage: "TowerSoak";
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
      towerLocations: Point[];
    };

const getDangerPuddles = (
  gameState: Paradeigma3GameState,
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
        roleRequirement: null,
        source: seAdd,
        split: false,
        width: 0.1,
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
        .sort(([, x], [, y]) => x - y)
        .slice(0, 2)
        .map<DangerPuddle>(([p]) => ({
          type: "line",
          angle: vector(a, a.translate(0, 1)).angleTo(vector(a, p.position)),
          damage: 0.8,
          debuffRequirement: null,
          instaKill: null,
          roleRequirement: null,
          source: a,
          split: false,
          width: 0.05,
          colour: "yellow",
        }))
    );

    const towerPuddles = [
      getPlayer(gameState.row2Support),
      getPlayer(gameState.row3Support),
    ].map<DangerPuddle>((p) => ({
      type: "circle",
      damage: 0.8,
      debuffRequirement: gameState.darkTowers
        ? RedTowerDebuff
        : LightTowerDebuff,
      source: p.position,
      split: false,
      instaKill: null,
      roleRequirement: null,
      radius: 0.08,
    }));

    return addLasers.concat(towerPuddles).concat([
      {
        type: "line",
        damage: 2,
        angle: Math.PI / 2,
        debuffRequirement: null,
        instaKill: null,
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
        roleRequirement: null,
        source: gameState.crossLocation.translate(-2, 2),
        split: false,
        width: 0.1,
      },
    ]);
  }
  if (gameState.stage === "TowerSoak") {
    return gameState.towerLocations.map<DangerPuddle>((p) => ({
      type: "circle",
      damage: 0.8,
      debuffRequirement: gameState.darkTowers ? LightDebuff : RedDebuff,
      source: p,
      split: false,
      instaKill: null,
      roleRequirement: null,
      radius: 0.08,
    }));
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

const Paradeigma3Arena = (
  props: PropsWithChildren<{
    players: Paradeigma3Player[];
    gameState: Paradeigma3GameState;
    moveTo: (p: Point) => void;
  }>
) => {
  const getPlayer = (d: Designation): Paradeigma3Player => {
    return props.players.filter((x) => x.designation === d)[0];
  };
  return (
    <P12P1Arena
      players={props.players}
      moveTo={props.moveTo}
      dangerPuddles={getDangerPuddles(props.gameState, props.players)}
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
      {props.gameState.stage === "PlusCross" && (
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
            height={0.1}
            width={5}
            x={getPlayer(props.gameState.row1Support).position.x - 2.5}
            y={getPlayer(props.gameState.row1Support).position.y - 0.05}
            fill="orange"
            style={{
              opacity: 0.4,
            }}
          />
          <rect
            height={5}
            width={0.1}
            x={getPlayer(props.gameState.row1Support).position.x - 0.05}
            y={getPlayer(props.gameState.row1Support).position.y - 2.5}
            fill="orange"
            style={{
              opacity: 0.4,
            }}
          />
          <rect
            height={0.1}
            width={5}
            x={getPlayer(props.gameState.row4Support).position.x - 2.5}
            y={getPlayer(props.gameState.row4Support).position.y - 0.05}
            fill="orange"
            style={{
              opacity: 0.4,
              transformOrigin: `${
                getPlayer(props.gameState.row4Support).position.x
              }px ${getPlayer(props.gameState.row4Support).position.y}px`,
              transform: "rotate(45deg)",
            }}
          />
          <rect
            height={5}
            width={0.1}
            x={getPlayer(props.gameState.row4Support).position.x - 0.05}
            y={getPlayer(props.gameState.row4Support).position.y - 2.5}
            fill="orange"
            style={{
              opacity: 0.4,
              transformOrigin: `${
                getPlayer(props.gameState.row4Support).position.x
              }px ${getPlayer(props.gameState.row4Support).position.y}px`,
              transform: "rotate(45deg)",
            }}
          />
        </svg>
      )}
      {props.gameState.stage === "Inter" && (
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
            height={0.1}
            width={5}
            x={props.gameState.plusLocation.x - 2.5}
            y={props.gameState.plusLocation.y - 0.05}
            fill="orange"
            style={{
              opacity: 0.4,
            }}
          />
          <rect
            height={5}
            width={0.1}
            x={props.gameState.plusLocation.x - 0.05}
            y={props.gameState.plusLocation.y - 2.5}
            fill="orange"
            style={{
              opacity: 0.4,
            }}
          />
          <rect
            height={0.1}
            width={5}
            x={props.gameState.crossLocation.x - 2.5}
            y={props.gameState.crossLocation.y - 0.05}
            fill="orange"
            style={{
              opacity: 0.4,
              transformOrigin: `${props.gameState.crossLocation.x}px ${props.gameState.crossLocation.y}px`,
              transform: "rotate(45deg)",
            }}
          />
          <rect
            height={5}
            width={0.1}
            x={props.gameState.crossLocation.x - 0.05}
            y={props.gameState.crossLocation.y - 2.5}
            fill="orange"
            style={{
              opacity: 0.4,
              transformOrigin: `${props.gameState.crossLocation.x}px ${props.gameState.crossLocation.y}px`,
              transform: "rotate(45deg)",
            }}
          />
        </svg>
      )}
      {props.gameState.stage === "TowerDrop" && (
        <>
          <img
            src={props.gameState.darkTowers ? DarkTower : LightTower}
            style={{
              position: "absolute",
              left: `${
                getPlayer(props.gameState.row2Support).position.x * 100
              }%`,
              top: `${
                getPlayer(props.gameState.row2Support).position.y * 100
              }%`,
              width: "16%",
              translate: "-50% -80%",
            }}
          />
          <img
            src={props.gameState.darkTowers ? DarkTower : LightTower}
            style={{
              position: "absolute",
              left: `${
                getPlayer(props.gameState.row3Support).position.x * 100
              }%`,
              top: `${
                getPlayer(props.gameState.row3Support).position.y * 100
              }%`,
              width: "16%",
              translate: "-50% -80%",
            }}
          />
        </>
      )}
      {(props.gameState.stage === "TowerInter" ||
        props.gameState.stage === "TowerSoak") && (
        <>
          {props.gameState.towerLocations.map((p, i) => (
            <img
              src={props.gameState.darkTowers ? DarkTower : LightTower}
              key={i}
              style={{
                position: "absolute",
                left: `${p.x * 100}%`,
                top: `${p.y * 100}%`,
                width: "16%",
                translate: "-50% -80%",
              }}
            />
          ))}
        </>
      )}
      {(props.gameState.stage === "Fall" ||
        props.gameState.stage === "Inter" ||
        props.gameState.stage === "PlusCross" ||
        props.gameState.stage === "TowerDrop") && (
        <>
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
              x={props.gameState.topFall === "East" ? 0.23 : 0.73}
              y={0.23}
              width={0.04}
              height={0.04}
              fill="red"
            />
            <rect
              x={props.gameState.topFall === "East" ? 0.73 : 0.23}
              y={0.73}
              width={0.04}
              height={0.04}
              fill="red"
            />
          </svg>
        </>
      )}
      {props.children}
    </P12P1Arena>
  );
};

export const Paradeigma3 = () => {
  useTitle("Paradeigma 3");
  const { onMove, players, restart, safeLocation, state } = usePara3();

  return (
    <div className="flex flex-col">
      <div>
        <Button onClick={() => restart()}>
          Reset
          <ReloadIcon />
        </Button>
      </div>
      <Paradeigma3Arena gameState={state} moveTo={onMove} players={players}>
        <Overlay
          players={players}
          finished={state.stage === "TowerSoak"}
          safeLocation={safeLocation}
        />
      </Paradeigma3Arena>

      <div
        style={{
          maxWidth: "500px",
          paddingBottom: "50px",
        }}
      >
        {state.cast && (
          <>
            <h1>{state.cast.name}</h1>
            <Progress value={state.cast.value} />
          </>
        )}
      </div>
    </div>
  );
};

const autoProgress = (state: Paradeigma3GameState): false | number => {
  if (state.stage === "PlusCross") return 0;
  if (state.stage === "TowerDrop") return 1500;
  return false;
};

const usePara3 = () => {
  const setup = useContext(SetupContext);

  return useGame<Paradeigma3Player, Paradeigma3GameState>(
    (s, ps) =>
      applyDamage(s, ps)
        .filter((p) => p.alive)
        .map((p) => p.designation),
    (s) => s.stage === "TowerSoak",
    () => createPlayers(setup.state),
    (s, _, p) => getSafeSpot(s, p),
    createState,
    autoProgress,
    progress,
    getDebuffs
  );
};

const createState = (): Paradeigma3GameState => {
  const darkTowers = pickOne([true, false]);
  const topFallSide = pickOne<"East" | "West">(["East", "West"]);
  const darkAdds = pickOne<"East" | "West">(["East", "West"]);
  const [dps, soup] = split(Designations, (d) => getRole(d) === "DPS");
  const shuffledSoup = shuffle(soup);
  const shuffledDps = shuffle(dps);
  const [leftSoup, rightSoup] = (["H1", "MT", "OT", "H2"] as const).filter(
    (d) => d !== shuffledSoup[0] && d !== shuffledSoup[3]
  );
  return {
    cast: {
      name: "Engravement of Souls",
      value: 25,
    },
    hasFinished: false,
    stage: "Initial",
    darkAdds: darkAdds,
    darkTowers: darkTowers,
    topFall: topFallSide,
    row1Support: shuffledSoup[0],
    row2Support: topFallSide === "East" ? rightSoup : leftSoup,
    row3Support: topFallSide === "East" ? leftSoup : rightSoup,
    row4Support: shuffledSoup[3],
    row2Straight: shuffledDps[0],
    row2Cross: shuffledDps[1],
    row3Straight: shuffledDps[2],
    row3Cross: shuffledDps[3],
  };
};

const getDebuffs = (
  state: Paradeigma3GameState,
  player: Paradeigma3Player
): Debuff[] => {
  if (state.row1Support === player.designation) {
    return [PlusDebuff];
  }
  if (state.row2Support === player.designation) {
    return [state.darkTowers ? RedTowerDebuff : LightTowerDebuff];
  }
  if (state.row3Support === player.designation) {
    return [state.darkTowers ? RedTowerDebuff : LightTowerDebuff];
  }
  if (state.row4Support === player.designation) {
    return [CrossDebuff];
  }
  if (
    state.row2Straight === player.designation ||
    state.row2Cross === player.designation
  ) {
    return state.topFall === state.darkAdds ? [LightDebuff] : [RedDebuff];
  }
  return state.topFall === state.darkAdds ? [RedDebuff] : [LightDebuff];
};

const createPlayers = (setup: Setup): Paradeigma3Player[] => {
  const ps: Paradeigma3Player[] = Designations.map((d) => ({
    position: getRandomPos(),
    role: getRole(d),
    show: true,
    designation: d,
    debuffs: [],
    controlled: d === setup.designation,
    alive: true,
    distanceTravelled: 0,
  }));
  return ps;
};
