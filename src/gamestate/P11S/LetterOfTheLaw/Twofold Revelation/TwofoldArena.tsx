import { useRef, useState, useEffect } from "react";
import Xarrow, { useXarrow } from "react-xarrows";
import { Add } from "../Add";
import { Arena } from "../../P11SArena";
import { LetterOfTheLawPlayer } from "../gameState";
import Grow from "@mui/material/Grow";
import { TwofoldRevelationState, towerPos } from ".";
import { DangerPuddle } from "../../../Mechanics/DangerPuddles";
import { Tower } from "../../Tower";
import { Point } from "@flatten-js/core";

export const TwofoldArena = (props: {
  player: LetterOfTheLawPlayer;
  isDead: boolean;
  moveTo: (p: Point) => void;
  gameState: TwofoldRevelationState;
  dangerPuddles: DangerPuddle[];
  animationEnd: () => void;
}) => {
  const { animationEnd, gameState, isDead, moveTo, player } = props;
  const updateXarrow = useXarrow();
  const playerRef = useRef<HTMLImageElement>(null);
  const addRef = useRef<HTMLImageElement>(null);

  const [moved, setMoved] = useState(0);
  useEffect(() => updateXarrow(), [moved, player, gameState]);

  return (
    <Arena
      ref={playerRef}
      player={player}
      isDead={isDead}
      moveTo={(p) => {
        setMoved((x) => x + 1);
        moveTo(p);
      }}
      dangerPuddles={props.dangerPuddles}
      bossColour={gameState.bossColour}
    >
      <Tower position={towerPos("North East")} />
      <Tower position={towerPos("South East")} />
      <Tower position={towerPos("North West")} />
      <Tower position={towerPos("South West")} />
      {(!gameState.cast || gameState.stage === "Inner") && (
        <>
          <Add
            ref={player.role === "Tank" ? addRef : null}
            inter={gameState.darkAddLocation}
            colour="Dark"
          />
          <Add
            ref={player.role !== "Tank" ? addRef : null}
            inter={gameState.lightAddLocation}
            colour="Light"
          />
        </>
      )}
      {(!gameState.cast || gameState.stage === "Inner") &&
        player.isTethered && (
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

      {gameState.cast && gameState.stage === "Inner" && (
        <>
          <Grow
            in={gameState.cast.value >= 100}
            timeout={1500}
            onEntered={animationEnd}
          >
            <svg
              height="55%"
              width="55%"
              style={{
                position: "absolute",
                left: `${gameState.tankPosition.x * 100}%`,
                top: `${gameState.tankPosition.y * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <circle cx="50%" cy="50%" r="50%" fill="purple" opacity={0.4} />
            </svg>
          </Grow>
          <Grow in={gameState.cast.value >= 100} timeout={1500}>
            <svg
              height="25%"
              width="25%"
              style={{
                position: "absolute",
                left: `${gameState.nonTankPosition.x * 100}%`,
                top: `${gameState.nonTankPosition.y * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <circle cx="50%" cy="50%" r="50%" fill="yellow" opacity={0.4} />
            </svg>
          </Grow>
        </>
      )}

      {gameState.cast && gameState.stage === "Outer" && (
        <>
          <Grow
            in={gameState.cast.value >= 100}
            timeout={1500}
            onEntered={animationEnd}
          >
            <svg
              height="100%"
              width="100%"
              style={{
                position: "absolute",
                left: `${gameState.tankPosition.x * 100}%`,
                top: `${gameState.tankPosition.y * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <circle
                cx="50%"
                cy="50%"
                r="35%"
                stroke="purple"
                fill="transparent"
                strokeWidth="35%"
                opacity={0.4}
              />
            </svg>
          </Grow>
          <Grow in={gameState.cast.value >= 100} timeout={1500}>
            <svg
              height="45%"
              width="45%"
              style={{
                position: "absolute",
                left: `${gameState.nonTankPosition.x * 100}%`,
                top: `${gameState.nonTankPosition.y * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <circle cx="50%" cy="50%" r="50%" fill="yellow" opacity={0.4} />
            </svg>
          </Grow>
        </>
      )}
    </Arena>
  );
};
