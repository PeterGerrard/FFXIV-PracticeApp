import { InterCardinal, Position, rotation } from "../../../gameState";
import { Add } from "../Add";
import { Arena } from "../../P11SArena";
import { LetterOfTheLawPlayer } from "../gameState";
import { DismissalOverrulingState, towerPos } from ".";
import { LineAoE } from "../../../Mechanics/LineAoE";
import { DangerPuddles } from "../../../Mechanics/DangerPuddles";
import { Tower } from "../../Tower";

const addLoc = (inter: InterCardinal, offset?: number): Position => {
  const o = offset ? offset / Math.sqrt(2) : 0;
  switch (inter) {
    case "North East":
      return [0.9 - o, 0.1 - o];
    case "South East":
      return [0.9 - o, 0.9 + o];
    case "South West":
      return [0.1 + o, 0.9 - o];
    case "North West":
      return [0.1 + o, 0.1 - o];
  }
};

export const DismissalArena = (props: {
  player: LetterOfTheLawPlayer;
  isDead: boolean;
  moveTo: (p: Position) => void;
  gameState: DismissalOverrulingState;
  dangerPuddles: DangerPuddles;
  animationEnd: () => void;
}) => {
  const { animationEnd, gameState, isDead, moveTo, player, dangerPuddles } =
    props;
  return (
    <Arena
      player={player}
      isDead={isDead}
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
            angle={180 + rotation(gameState.darkLocation)}
            onAnimationEnd={animationEnd}
            source={addLoc(gameState.darkLocation, -0.3675)}
            width={0.265}
            colour="purple"
          />
          <LineAoE
            angle={180 + rotation(gameState.darkLocation)}
            onAnimationEnd={() => {}}
            source={addLoc(gameState.darkLocation, 0.3675)}
            width={0.265}
            colour="purple"
          />
          <LineAoE
            angle={180 + rotation(gameState.lightLocation)}
            onAnimationEnd={() => {}}
            source={addLoc(gameState.lightLocation)}
            width={0.475}
            colour="yellow"
          />
        </>
      )}
      {gameState.stage === "InOut" && !isDead && (
        <h1
          style={{
            position: "absolute",
            left: `50%`,
            top: `50%`,
            transformOrigin: "0 0",
            transform: `translate(-50%,0)`,
            fontSize: "10rem",
            color: "hotpink",
          }}
        >
          Finished!
        </h1>
      )}
    </Arena>
  );
};
