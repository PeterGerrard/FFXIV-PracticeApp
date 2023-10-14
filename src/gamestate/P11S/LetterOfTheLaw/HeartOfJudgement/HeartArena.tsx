import { Add, addPosition } from "../Add";
import { Arena } from "../../P11SArena";
import { LetterOfTheLawPlayer } from "../gameState";
import { rotation } from "../../../gameState";
import { HeartOfJudgementState } from ".";
import { DangerPuddle } from "../../../Mechanics/DangerPuddles";
import { Bombs } from "../../Bombs";
import { Point } from "@flatten-js/core";

export const HeartArena = (props: {
  players: LetterOfTheLawPlayer[];
  moveTo: (p: Point) => void;
  gameState: HeartOfJudgementState;
  dangerPuddles: DangerPuddle[];
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
    <Arena
      players={props.players}
      moveTo={props.moveTo}
      dangerPuddles={props.dangerPuddles}
      bossColour={props.gameState.bossColour}
    >
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
              )}deg)`,
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
              )}deg)`,
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
    </Arena>
  );
};
