import {
  InterCardinal,
  rotation,
  getGroup,
  distanceTo,
} from "../../../gameState";
import { LetterOfTheLawState, LetterOfTheLawPlayer } from "../gameState";
import { pickOne } from "../../../helpers";
import { DangerPuddle, survivePuddles } from "../../../Mechanics/DangerPuddles";
import { Point } from "@flatten-js/core";

const addLoc = (inter: InterCardinal, offset?: number): Point => {
  const o = offset ? offset / Math.sqrt(2) : 0;
  switch (inter) {
    case "North East":
      return new Point(0.9 + o, 0.1 + o);
    case "South East":
      return new Point(0.9 + o, 0.9 - o);
    case "South West":
      return new Point(0.1 + o, 0.9 + o);
    case "North West":
      return new Point(0.1 + o, 0.1 - o);
  }
};

export type DismissalOverrulingState = LetterOfTheLawState &
  (
    | {
        bossColour: null;
        cast: null;
        darkAddLocation: InterCardinal;
        lightAddLocation: InterCardinal;
        stage: "Initial";
      }
    | {
        bossColour: null;
        cast: null;
        darkAddLocation: InterCardinal;
        lightAddLocation: InterCardinal;
        stage: "Tower";
      }
    | {
        bossColour: "Dark" | "Light";
        cast: {
          name: "Dismissal Overruling";
          value: 25;
        };
        darkLocation: InterCardinal;
        lightLocation: InterCardinal;
        stage: "CrossLine";
      }
    | {
        bossColour: "Dark" | "Light";
        cast: {
          name: "Dismissal Overruling";
          value: 25;
        };
        darkLocation: InterCardinal;
        lightLocation: InterCardinal;
        stage: "Gap1";
      }
    | {
        bossColour: "Dark" | "Light";
        cast: {
          name: "Dismissal Overruling";
          value: 50;
        };
        darkLocation: InterCardinal;
        lightLocation: InterCardinal;
        stage: "CrossLine2";
      }
    | {
        bossColour: "Dark" | "Light";
        cast: {
          name: "Dismissal Overruling";
          value: 100;
        };
        darkLocation: InterCardinal;
        lightLocation: InterCardinal;
        stage: "Raidwide";
      }
    | {
        bossColour: "Dark" | "Light";
        cast: {
          name: "Dismissal Overruling";
          value: 100;
        };
        darkLocation: InterCardinal;
        lightLocation: InterCardinal;
        stage: "InOut";
      }
  );

export const towerPos = (inter: InterCardinal): Point => {
  switch (inter) {
    case "North East":
      return new Point(0.69, 0.31);
    case "South East":
      return new Point(0.69, 0.69);
    case "South West":
      return new Point(0.31, 0.69);
    case "North West":
      return new Point(0.32, 0.31);
  }
};

export const getDangerPuddles = (
  state: DismissalOverrulingState,
  animationEnd?: () => void
): DangerPuddle[] => {
  if (state.stage === "CrossLine") {
    return [
      {
        type: "line",
        angle: rotation(state.darkLocation),
        onAnimationEnd: animationEnd ? animationEnd : () => {},
        source: addLoc(state.darkLocation),
        width: 0.475,
        colour: "purple",
        split: false,
        damage: 1,
        roleRequirement: null,
        debuffRequirement: null,
        instaKill: null,
      },
      {
        type: "line",
        angle: rotation(state.lightLocation),
        onAnimationEnd: () => {},
        source: addLoc(state.lightLocation),
        width: 0.475,
        colour: "yellow",
        split: false,
        damage: 1,
        roleRequirement: null,
        debuffRequirement: null,
        instaKill: null,
      },
    ];
  }
  if (state.stage === "InOut") {
    if (state.bossColour === "Dark") {
      return [
        {
          type: "donut",
          innerRadius: 0.2,
          outerRadius: 0.5,
          onAnimationEnd: animationEnd ? animationEnd : () => {},
          source: new Point(0.5, 0.5),
          colour: "purple",
          split: false,
          damage: 1,
          roleRequirement: null,
          debuffRequirement: null,
          instaKill: null,
        },
      ];
    } else {
      return [
        {
          type: "circle",
          radius: 0.3,
          onAnimationEnd: animationEnd ? animationEnd : () => {},
          source: new Point(0.5, 0.5),
          colour: "yellow",
          split: false,
          damage: 1,
          roleRequirement: null,
          debuffRequirement: null,
          instaKill: null,
        },
      ];
    }
  }
  return [];
};

export const getTargetSpot = (
  gameState: DismissalOverrulingState,
  player: LetterOfTheLawPlayer
) => {
  if (gameState.stage === "Initial") {
    return getTowerPosition(player);
  }
  if (gameState.stage === "Tower" || gameState.stage === "CrossLine") {
    if (getGroup(player.designation) === "Group1") {
      return new Point(0.1, 0.5);
    } else {
      return new Point(0.9, 0.5);
    }
  }
  if (gameState.stage === "Gap1" || gameState.stage === "CrossLine2") {
    if (getGroup(player.designation) === "Group1") {
      return gameState.darkLocation === "North West" ||
        gameState.darkLocation === "South East"
        ? new Point(0.25, 0.25)
        : new Point(0.25, 0.75);
    } else {
      return gameState.darkLocation === "North West" ||
        gameState.darkLocation === "South East"
        ? new Point(0.75, 0.75)
        : new Point(0.75, 0.25);
    }
  }
  if (gameState.stage === "Raidwide") {
    if (gameState.bossColour === "Light") {
      if (getGroup(player.designation) === "Group1") {
        return gameState.darkLocation === "North West" ||
          gameState.darkLocation === "South East"
          ? new Point(0.25, 0.25)
          : new Point(0.25, 0.75);
      } else {
        return gameState.darkLocation === "North West" ||
          gameState.darkLocation === "South East"
          ? new Point(0.75, 0.75)
          : new Point(0.75, 0.25);
      }
    } else {
      switch (player.designation) {
        case "H2":
        case "R2":
          return gameState.darkLocation === "North West" ||
            gameState.darkLocation === "South East"
            ? new Point(0.6, 0.5)
            : new Point(0.5, 0.4);
        case "M2":
        case "OT":
          return gameState.darkLocation === "North West" ||
            gameState.darkLocation === "South East"
            ? new Point(0.5, 0.6)
            : new Point(0.6, 0.5);
        case "H1":
        case "M1":
          return gameState.darkLocation === "North West" ||
            gameState.darkLocation === "South East"
            ? new Point(0.4, 0.5)
            : new Point(0.5, 0.6);
        case "MT":
        case "R1":
          return gameState.darkLocation === "North West" ||
            gameState.darkLocation === "South East"
            ? new Point(0.5, 0.4)
            : new Point(0.4, 0.5);
      }
    }
  }

  return new Point(0, 0);
};
export const applyDamage = (
  gameState: DismissalOverrulingState,
  players: LetterOfTheLawPlayer[]
): LetterOfTheLawPlayer[] => {
  const dangerPuddles = getDangerPuddles(gameState);
  const survivingPlayers = survivePuddles(dangerPuddles, players);

  if (gameState.stage === "Tower") {
    return players.map((p) => ({
      ...p,
      alive:
        survivingPlayers.includes(p.designation) &&
        distanceTo(getTowerPosition(p), p.position) < 0.1,
    }));
  }
  if (gameState.stage === "CrossLine") {
    return players.map((p) => ({
      ...p,
      alive:
        survivingPlayers.includes(p.designation) &&
        getGroup(p.designation) === "Group1"
          ? p.position.x < 0.5
          : p.position.x > 0.5,
    }));
  }
  if (gameState.stage === "CrossLine2") {
    return players.map((p) => {
      const hitByInner =
        gameState.lightLocation === "North West" ||
        gameState.lightLocation === "South East"
          ? p.position.x + p.position.y < 0.668 ||
            p.position.x + p.position.y > 1.332
          : p.position.y - p.position.x < -0.332 ||
            p.position.y - p.position.x > 0.332;
      const hitByOuter =
        gameState.darkLocation === "North West" ||
        gameState.darkLocation === "South East"
          ? p.position.x + p.position.y > 0.668 &&
            p.position.x + p.position.y < 1.332
          : p.position.y - p.position.x > -0.332 &&
            p.position.y - p.position.x < 0.332;
      return {
        ...p,
        alive:
          survivingPlayers.includes(p.designation) &&
          !hitByInner &&
          !hitByOuter,
      };
    });
  }
  return players.map((p) => {
    return {
      ...p,
      alive: survivingPlayers.includes(p.designation),
    };
  });
};
export const progress = (
  s: DismissalOverrulingState
): DismissalOverrulingState => {
  switch (s.stage) {
    case "Initial":
      return {
        ...s,
        stage: "Tower",
      };
    case "Tower":
      return {
        ...s,
        stage: "CrossLine",
        cast: { name: "Dismissal Overruling", value: 25 },
        darkLocation: s.darkAddLocation,
        lightLocation: s.lightAddLocation,
        bossColour: pickOne(["Dark", "Light"]),
      };
    case "CrossLine":
      return {
        ...s,
        stage: "Gap1",
        cast: { ...s.cast, value: 25 },
      };
    case "Gap1":
      return {
        ...s,
        stage: "CrossLine2",
        cast: { ...s.cast, value: 50 },
      };
    case "CrossLine2":
      return {
        ...s,
        stage: "Raidwide",
        cast: { ...s.cast, value: 100 },
      };
    case "Raidwide":
      return {
        ...s,
        stage: "InOut",
        hasFinished: true,
      };
    case "InOut":
      return s;
  }
};

function getTowerPosition(player: LetterOfTheLawPlayer) {
  switch (player.designation) {
    case "H2":
    case "R2":
      return towerPos("North East");
    case "OT":
    case "M2":
      return towerPos("South East");
    case "H1":
    case "M1":
      return towerPos("South West");
    case "MT":
    case "R1":
      return towerPos("North West");
  }
}
