import { Add, addPosition } from "../Add";
import { P11SArena } from "../../P11SArena";
import { LetterOfTheLawPlayer } from "../gameState";
import Grow from "@mui/material/Grow";
import { TwofoldRevelationState, towerPos } from ".";
import { DangerPuddle } from "../../../Mechanics/DangerPuddles";
import { Tower } from "../../Tower";
import { Point } from "@flatten-js/core";

export const TwofoldArena = (props: {
  players: LetterOfTheLawPlayer[];
  moveTo: (p: Point) => void;
  gameState: TwofoldRevelationState;
  dangerPuddles: DangerPuddle[];
  animationEnd: () => void;
}) => {
  const { animationEnd, gameState, moveTo, players } = props;

  return (
    <P11SArena
      players={players}
      moveTo={(p) => {
        moveTo(p);
      }}
      dangerPuddles={props.dangerPuddles}
      bossColour={gameState.bossColour}
    >
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
        gameState.players
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

      {gameState.cast && gameState.stage === "Jump" && (
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
                left: `${gameState.players.filter(
                  (p) => p.isTethered && p.role === "Tank"
                )[0].position.x * 100
                  }%`,
                top: `${gameState.players.filter(
                  (p) => p.isTethered && p.role === "Tank"
                )[0].position.y * 100
                  }%`,
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
                left: `${gameState.players.filter(
                  (p) => p.isTethered && p.role !== "Tank"
                )[0].position.x * 100
                  }%`,
                top: `${gameState.players.filter(
                  (p) => p.isTethered && p.role !== "Tank"
                )[0].position.y * 100
                  }%`,
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
    </P11SArena>
  );
};
