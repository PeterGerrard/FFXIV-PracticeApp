import { InterCardinal, rotation } from "../../../gameState";
import { Add } from "../Add";
import { Arena } from "../../P11SArena";
import { LetterOfTheLawPlayer } from "../gameState";
import { DismissalOverrulingState, towerPos } from ".";
import { LineAoE } from "../../../Mechanics/LineAoE";
import { DangerPuddle } from "../../../Mechanics/DangerPuddles";
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
  players: LetterOfTheLawPlayer[];
  moveTo: (p: Point) => void;
  gameState: DismissalOverrulingState;
  dangerPuddles: DangerPuddle[];
  animationEnd: () => void;
}) => {
  const { animationEnd, gameState, moveTo, players, dangerPuddles } = props;
  return (
    <Arena
      players={players}
      moveTo={moveTo}
      dangerPuddles={dangerPuddles}
      bossColour={gameState.bossColour}
    >
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
            onAnimationEnd={animationEnd}
            source={addLoc(gameState.darkLocation, -0.3675)}
            width={0.265}
            colour="purple"
          />
          <LineAoE
            angle={rotation(gameState.darkLocation)}
            onAnimationEnd={() => {}}
            source={addLoc(gameState.darkLocation, 0.3675)}
            width={0.265}
            colour="purple"
          />
          <LineAoE
            angle={rotation(gameState.lightLocation)}
            onAnimationEnd={() => {}}
            source={addLoc(gameState.lightLocation)}
            width={0.475}
            colour="yellow"
          />
        </>
      )}
    </Arena>
  );
};
