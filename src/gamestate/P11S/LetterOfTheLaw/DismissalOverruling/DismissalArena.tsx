import { InterCardinal, rotation } from "../../../gameState";
import { Add } from "../Add";
import { DismissalOverrulingState, towerPos } from ".";
import { lineMechanic } from "../../../Mechanics/LineAoE";
import { Tower } from "../../Tower";
import { Point } from "@flatten-js/core";
import { SimpleKillProfile } from "../../../Mechanics/DangerPuddles";

const addLoc = (inter: InterCardinal, offset?: number): Point => {
  const o = offset ? offset / Math.sqrt(2) : 0;
  switch (inter) {
    case "North East":
      return new Point(0.9 - o, 0.1 - o);
    case "South East":
      return new Point(0.9 - o, 0.9 + o);
    case "South West":
      return new Point(0.1 + o, 0.9 + o);
    case "North West":
      return new Point(0.1 + o, 0.1 - o);
  }
};

export const DismissalArena = (props: {
  gameState: DismissalOverrulingState;
}) => {
  const { gameState } = props;
  return (
    <>
      {(gameState.stage === "Initial" || gameState.stage === "Tower") && (
        <>
          <Tower position={towerPos("North East")} />
          <Tower position={towerPos("South East")} />
          <Tower position={towerPos("North West")} />
          <Tower position={towerPos("South West")} />
          <Add inter={gameState.darkAddLocation} colour="Dark" />
          <Add inter={gameState.lightAddLocation} colour="Light" />
        </>
      )}

      {gameState.stage === "CrossLine2" && (
        <>
          {lineMechanic(
            addLoc(gameState.darkLocation, -0.3675),
            rotation(gameState.darkLocation),
            0.265,
            SimpleKillProfile,
            { color: "purple" }
          ).display([], false)}
          {lineMechanic(
            addLoc(gameState.darkLocation, 0.3675),
            rotation(gameState.darkLocation),
            0.265,
            SimpleKillProfile,
            { color: "purple" }
          ).display([], false)}
          {lineMechanic(
            addLoc(gameState.lightLocation),
            rotation(gameState.lightLocation),
            0.475,
            SimpleKillProfile,
            { color: "yellow" }
          ).display([], false)}
        </>
      )}
    </>
  );
};
