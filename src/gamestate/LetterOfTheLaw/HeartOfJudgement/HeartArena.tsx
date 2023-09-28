import { Slide } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import Xarrow, { useXarrow } from "react-xarrows";
import { Position } from "../..";
import { Bombs } from "../../Bombs";
import { Add } from "../Add";
import { Arena } from "../Arena";
import { LetterOfTheLawPlayer } from "../gameState";
import { InterCardinal, rotation } from "../../gameState";
import { HeartOfJudgementState } from ".";
import { LineAoE } from "../../Mechanics/LineAoE";

const addLoc = (inter: InterCardinal): Position => {
  switch (inter) {
    case "North East":
      return [0.9, 0.1];
    case "South East":
      return [0.9, 0.9];
    case "South West":
      return [0.1, 0.9];
    case "North West":
      return [0.1, 0.1];
  }
};

export const HeartArena = (props: {
  player: LetterOfTheLawPlayer;
  isDead: boolean;
  moveTo: (p: Position) => void;
  gameState: HeartOfJudgementState;
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
            animationEnd={props.animationEnd}
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
          {props.gameState.cast.value >= 100 && (
            <LineAoE
              angle={180 + rotation(innerBox)}
              onAnimationEnd={() => {}}
              length={1}
              source={addLoc(innerBox)}
              width={0.475}
              colour={
                props.gameState.bossColour === "Dark" ? "purple" : "yellow"
              }
            />
          )}
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
            <Slide in={props.gameState.cast.value >= 100} timeout={1500}>
              <rect
                height="100%"
                width="26.5%"
                x="73.5%"
                y="0"
                fill={
                  props.gameState.bossColour === "Dark" ? "purple" : "yellow"
                }
                opacity={0.4}
              />
            </Slide>
            <Slide in={props.gameState.cast.value >= 100} timeout={1500}>
              <rect
                height="100%"
                width="26.5%"
                x="0"
                y="0"
                fill={
                  props.gameState.bossColour === "Dark" ? "purple" : "yellow"
                }
                opacity={0.4}
              />
            </Slide>
          </svg>
        </>
      )}
    </Arena>
  );
};
