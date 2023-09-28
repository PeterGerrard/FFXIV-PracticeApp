import { useRef, useState, useEffect } from "react";
import Xarrow, { useXarrow } from "react-xarrows";
import { Position } from "../..";
import { Bombs } from "../../Bombs";
import { Add } from "../Add";
import { Arena } from "../Arena";
import { LetterOfTheLawPlayer } from "../gameState";
import { rotation } from "../../gameState";
import { HeartOfJudgementState } from ".";
import {
  DangerPuddle,
  DangerPuddleDisplay,
} from "../../Mechanics/DangerPuddles";

export const HeartArena = (props: {
  player: LetterOfTheLawPlayer;
  isDead: boolean;
  moveTo: (p: Position) => void;
  gameState: HeartOfJudgementState;
  dangerPuddles: DangerPuddle[];
  animationEnd: () => void;
}) => {
  const updateXarrow = useXarrow();
  const playerRef = useRef<HTMLImageElement>(null);
  const addRef = useRef<HTMLImageElement>(null);
  const innerBox =
    props.gameState.bossColour === "Dark"
      ? props.gameState.darkBoxLocation
      : props.gameState.lightBoxLocation;
  const outerBox =
    props.gameState.bossColour === "Dark"
      ? props.gameState.lightBoxLocation
      : props.gameState.darkBoxLocation;

  const [moved, setMoved] = useState(0);
  useEffect(() => updateXarrow(), [moved, props.player, props.gameState]);
  return (
    <Arena
      ref={playerRef}
      player={props.player}
      isDead={props.isDead}
      moveTo={(p) => {
        setMoved((x) => x + 1);
        props.moveTo(p);
      }}
      bossColour={props.gameState.bossColour}
    >
      <Add
        ref={props.player.role === "Tank" ? addRef : null}
        inter={props.gameState.darkAddLocation}
        colour="Dark"
      />
      <Add
        ref={props.player.role !== "Tank" ? addRef : null}
        inter={props.gameState.lightAddLocation}
        colour="Light"
      />
      {props.player.isTethered && (
        <Xarrow
          start={playerRef}
          end={addRef}
          showHead={false}
          endAnchor="middle"
          startAnchor="middle"
          showTail={false}
          path="straight"
        />
      )}

      {props.gameState.cast && (
        <>
          <Bombs
            topBomb={props.gameState.topBomb}
            bossColour={props.gameState.bossColour}
            explode={
              props.gameState.cast !== null && props.gameState.cast.value >= 100
            }
            animationEnd={() => {}}
          />
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
          {props.dangerPuddles.map((dp, i) => (
            <DangerPuddleDisplay key={i} {...dp} />
          ))}
        </>
      )}
    </Arena>
  );
};
