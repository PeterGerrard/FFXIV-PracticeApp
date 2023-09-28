import {
  InterCardinal,
  GameLoop1,
  Position,
  getGroup,
  distanceTo,
} from "../../gameState";
import { LetterOfTheLawState, LetterOfTheLawPlayer } from "../gameState";
import { pickOne } from "../../helpers";
import { DismissalArena } from "./DismissalArena";

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

export const towerPos = (inter: InterCardinal): Position => {
  switch (inter) {
    case "North East":
      return [0.69, 0.31];
    case "South East":
      return [0.69, 0.69];
    case "South West":
      return [0.31, 0.69];
    case "North West":
      return [0.32, 0.31];
  }
};

export const dismissalOverruling: GameLoop1<
  LetterOfTheLawPlayer,
  DismissalOverrulingState
> = {
  arena: (player, _, isDead, gameState, moveTo, animationEnd) => {
    return (
      <DismissalArena
        animationEnd={animationEnd}
        gameState={gameState}
        isDead={isDead}
        moveTo={moveTo}
        player={player}
      />
    );
  },
  getSafeSpot: (
    gameState: DismissalOverrulingState,
    player: LetterOfTheLawPlayer
  ) => {
    if (gameState.stage === "Tower") {
      return getTowerPosition(player);
    }
    if (gameState.stage === "CrossLine") {
      if (getGroup(player.clockSpot) === "Group1") {
        return [0.1, 0.5];
      } else {
        return [0.9, 0.5];
      }
    }
    if (gameState.stage === "CrossLine2") {
      if (getGroup(player.clockSpot) === "Group1") {
        return gameState.darkLocation === "North West" ||
          gameState.darkLocation === "South East"
          ? [0.25, 0.75]
          : [0.25, 0.25];
      } else {
        return gameState.darkLocation === "North West" ||
          gameState.darkLocation === "South East"
          ? [0.75, 0.75]
          : [0.75, 0.25];
      }
    }
    if (gameState.stage === "InOut") {
      if (gameState.bossColour === "Light") {
        if (getGroup(player.clockSpot) === "Group1") {
          return gameState.darkLocation === "North West" ||
            gameState.darkLocation === "South East"
            ? [0.25, 0.75]
            : [0.25, 0.25];
        } else {
          return gameState.darkLocation === "North West" ||
            gameState.darkLocation === "South East"
            ? [0.75, 0.75]
            : [0.75, 0.25];
        }
      } else {
        switch (player.clockSpot) {
          case "North East":
          case "East":
            return gameState.darkLocation === "North West" ||
              gameState.darkLocation === "South East"
              ? [0.6, 0.5]
              : [0.5, 0.4];
          case "South East":
          case "South":
            return gameState.darkLocation === "North West" ||
              gameState.darkLocation === "South East"
              ? [0.5, 0.6]
              : [0.5, 0.6];
          case "South West":
          case "West":
            return gameState.darkLocation === "North West" ||
              gameState.darkLocation === "South East"
              ? [0.4, 0.5]
              : [0.5, 0.6];
          case "North West":
          case "North":
            return gameState.darkLocation === "North West" ||
              gameState.darkLocation === "South East"
              ? [0.5, 0.4]
              : [0.4, 0.5];
        }
      }
    }

    return [0, 0];
  },
  isSafe: (
    gameState: DismissalOverrulingState,
    player: LetterOfTheLawPlayer
  ) => {
    if (
      gameState.stage === "Initial" ||
      gameState.stage === "Raidwide" ||
      gameState.stage === "Gap1"
    ) {
      return true;
    }
    if (gameState.stage === "Tower") {
      return distanceTo(getTowerPosition(player), player.position) < 0.1;
    }
    if (gameState.stage === "CrossLine") {
      const hitByLines =
        (player.position[0] + player.position[1] > 0.668 &&
          player.position[0] + player.position[1] < 1.332) ||
        (player.position[1] - player.position[0] > -0.332 &&
          player.position[1] - player.position[0] < 0.332);
      if (getGroup(player.clockSpot) === "Group1") {
        return player.position[0] < 0.5 && !hitByLines;
      } else {
        return player.position[0] > 0.5 && !hitByLines;
      }
    }
    if (gameState.stage === "CrossLine2") {
      const hitByInner =
        gameState.lightLocation === "North West" ||
        gameState.lightLocation === "South East"
          ? player.position[0] + player.position[1] < 0.668 ||
            player.position[0] + player.position[1] > 1.332
          : player.position[1] - player.position[0] < -0.332 ||
            player.position[1] - player.position[0] > 0.332;
      const hitByOuter =
        gameState.darkLocation === "North West" ||
        gameState.darkLocation === "South East"
          ? player.position[0] + player.position[1] > 0.668 &&
            player.position[0] + player.position[1] < 1.332
          : player.position[1] - player.position[0] > -0.332 &&
            player.position[1] - player.position[0] < 0.332;
      return !hitByInner && !hitByOuter;
    }
    if (gameState.stage === "InOut" && gameState.bossColour === "Dark") {
      return distanceTo(player.position, [0.5, 0.5]) < 0.2;
    }
    if (gameState.stage === "InOut" && gameState.bossColour === "Light") {
      return distanceTo(player.position, [0.5, 0.5]) > 0.3;
    }
    return false;
  },
  nextState: (s): DismissalOverrulingState => {
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
  },
};

function getTowerPosition(player: LetterOfTheLawPlayer) {
  switch (player.clockSpot) {
    case "North East":
    case "East":
      return towerPos("North East");
    case "South East":
    case "South":
      return towerPos("South East");
    case "South West":
    case "West":
      return towerPos("South West");
    case "North West":
    case "North":
      return towerPos("North West");
  }
}
