import { InterCardinal, rotation } from "../../../gameState";
import { Add } from "../Add";
import { DismissalOverrulingState, towerPos } from ".";
import { LineAoE } from "../../../Mechanics/LineAoE";
import { Tower } from "../../Tower";
import { Point } from "@flatten-js/core";

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
          <LineAoE
            angle={rotation(gameState.darkLocation)}
            source={addLoc(gameState.darkLocation, -0.3675)}
            width={0.265}
            colour="purple"
          />
          <LineAoE
            angle={rotation(gameState.darkLocation)}
            source={addLoc(gameState.darkLocation, 0.3675)}
            width={0.265}
            colour="purple"
          />
          <LineAoE
            angle={rotation(gameState.lightLocation)}
            source={addLoc(gameState.lightLocation)}
            width={0.475}
            colour="yellow"
          />
        </>
      )}
    </>
  );
};
