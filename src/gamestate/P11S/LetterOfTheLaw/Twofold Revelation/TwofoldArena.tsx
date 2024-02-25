import { Add, addPosition } from "../Add";
import { LetterOfTheLawPlayer } from "../gameState";
import { TwofoldRevelationState, towerPos } from ".";
import { Tower } from "../../Tower";
import { useTimeout } from "../../../../components/useTimeout";

export const TwofoldArena = (props: {
  players: LetterOfTheLawPlayer[];
  gameState: TwofoldRevelationState;
  animationEnd: () => void;
}) => {
  const { animationEnd, gameState, players } = props;

  useTimeout(() => {
    if (
      gameState.cast &&
      gameState.cast.value >= 100 &&
      gameState.stage !== "Space1"
    ) {
      animationEnd();
    }
  }, 1500);

  return (
    <>
      <Tower position={towerPos("North East")} />
      <Tower position={towerPos("South East")} />
      <Tower position={towerPos("North West")} />
      <Tower position={towerPos("South West")} />
      {!gameState.cast && (
        <>
          <Add inter={gameState.darkAddLocation} colour="Dark" />
          <Add inter={gameState.lightAddLocation} colour="Light" />
        </>
      )}
      {!gameState.cast &&
        players
          .filter((x) => x.isTethered)
          .map((p) => {
            const addPos = addPosition(
              p.role === "Tank"
                ? gameState.darkAddLocation
                : gameState.lightAddLocation
            );
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
                  x1={p.position.x}
                  y1={p.position.y}
                  x2={addPos.x}
                  y2={addPos.y}
                  stroke="blue"
                  strokeWidth={0.02}
                />
              </svg>
            );
          })}
    </>
  );
};
