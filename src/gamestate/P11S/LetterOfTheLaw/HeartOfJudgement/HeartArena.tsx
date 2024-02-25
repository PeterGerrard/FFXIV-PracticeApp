import { Add, addPosition } from "../Add";
import { LetterOfTheLawPlayer } from "../gameState";
import { rotation } from "../../../gameState";
import { HeartOfJudgementState } from ".";
import { Bombs } from "../../Bombs";

export const HeartArena = (props: {
  players: LetterOfTheLawPlayer[];
  gameState: HeartOfJudgementState;
}) => {
  const innerBox =
    props.gameState.bossColour === "Dark"
      ? props.gameState.darkBoxLocation
      : props.gameState.lightBoxLocation;
  const outerBox =
    props.gameState.bossColour === "Dark"
      ? props.gameState.lightBoxLocation
      : props.gameState.darkBoxLocation;

  return (
    <>
      <Add inter={props.gameState.darkAddLocation} colour="Dark" />
      <Add inter={props.gameState.lightAddLocation} colour="Light" />
      {props.players
        .filter((x) => x.isTethered)
        .map((p) => {
          const addPos = addPosition(
            p.role === "Tank"
              ? props.gameState.darkAddLocation
              : props.gameState.lightAddLocation
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

      {props.gameState.cast && (
        <>
          <Bombs topBomb={props.gameState.topBomb} />
          <svg
            height="100%"
            width="100%"
            style={{
              position: "absolute",
              transformOrigin: "50% 50%",
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) rotate(${rotation(
                innerBox
              )}rad)`,
            }}
          >
            <rect
              height="5%"
              width="5%"
              x="11.6875%"
              y="5%"
              fill={props.gameState.bossColour === "Dark" ? "yellow" : "purple"}
            />
            <rect
              height="5%"
              width="5%"
              x="35.5625%"
              y="5%"
              fill={props.gameState.bossColour === "Dark" ? "purple" : "yellow"}
            />
            <rect
              height="5%"
              width="5%"
              x="59.4375%"
              y="5%"
              fill={props.gameState.bossColour === "Dark" ? "purple" : "yellow"}
            />
            <rect
              height="5%"
              width="5%"
              x="83.3125%"
              y="5%"
              fill={props.gameState.bossColour === "Dark" ? "yellow" : "purple"}
            />
          </svg>
          <svg
            height="100%"
            width="100%"
            style={{
              position: "absolute",
              transformOrigin: "50% 50%",
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) rotate(${rotation(
                outerBox
              )}rad)`,
            }}
          >
            <rect
              height="5%"
              width="5%"
              x="11.6875%"
              y="5%"
              fill={props.gameState.bossColour === "Dark" ? "purple" : "yellow"}
            />
            <rect
              height="5%"
              width="5%"
              x="35.5625%"
              y="5%"
              fill={props.gameState.bossColour === "Dark" ? "yellow" : "purple"}
            />
            <rect
              height="5%"
              width="5%"
              x="59.4375%"
              y="5%"
              fill={props.gameState.bossColour === "Dark" ? "yellow" : "purple"}
            />
            <rect
              height="5%"
              width="5%"
              x="83.3125%"
              y="5%"
              fill={props.gameState.bossColour === "Dark" ? "purple" : "yellow"}
            />
          </svg>
        </>
      )}
    </>
  );
};
