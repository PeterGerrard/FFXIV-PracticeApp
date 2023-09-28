import { Position, rotation } from "../../gameState";
import { Add } from "../Add";
import { Arena } from "../Arena";
import { LetterOfTheLawPlayer } from "../gameState";
import { Tower } from "../../Tower";
import Slide from "@mui/material/Slide";
import { DismissalOverrulingState, towerPos } from ".";
import Grow from "@mui/material/Grow";

export const DismissalArena = (props: {
  player: LetterOfTheLawPlayer;
  isDead: boolean;
  moveTo: (p: Position) => void;
  gameState: DismissalOverrulingState;
  animationEnd: () => void;
}) => {
  const { animationEnd, gameState, isDead, moveTo, player } = props;
  return (
    <Arena
      player={player}
      isDead={isDead}
      moveTo={moveTo}
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

      {gameState.stage === "CrossLine" && (
        <>
          <svg
            height="100%"
            width="100%"
            style={{
              position: "absolute",
              transformOrigin: "50% 50%",
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) rotate(${rotation(
                gameState.darkLocation
              )}deg)`,
            }}
          >
            <Slide in timeout={1500} onEntered={animationEnd}>
              <rect
                height="100%"
                width="47.5%"
                x="26.5%"
                y="0"
                fill="purple"
                style={{
                  opacity: 0.4,
                }}
              />
            </Slide>
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
                gameState.lightLocation
              )}deg)`,
            }}
          >
            <Slide in timeout={1500}>
              <rect
                height="100%"
                width="47.5%"
                x="26.5%"
                y="0"
                fill="yellow"
                style={{
                  opacity: 0.4,
                }}
              />
            </Slide>
          </svg>
        </>
      )}
      {gameState.stage === "CrossLine2" && (
        <>
          <svg
            height="100%"
            width="100%"
            style={{
              position: "absolute",
              transformOrigin: "50% 50%",
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) rotate(${rotation(
                gameState.darkLocation
              )}deg)`,
            }}
          >
            <Slide in timeout={1500} onEntered={animationEnd}>
              <rect
                height="100%"
                width="26.5%"
                x="73.5%"
                y="0"
                fill="purple"
                opacity={0.4}
              />
            </Slide>
            <Slide in timeout={1500}>
              <rect
                height="100%"
                width="26.5%"
                x="0"
                y="0"
                fill="purple"
                opacity={0.4}
              />
            </Slide>
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
                gameState.lightLocation
              )}deg)`,
            }}
          >
            <Slide in timeout={1500}>
              <rect
                height="100%"
                width="60%"
                x="20%"
                y="0"
                fill="yellow"
                style={{
                  opacity: 0.4,
                }}
              />
            </Slide>
          </svg>
        </>
      )}
      {gameState.stage === "InOut" && gameState.bossColour === "Dark" && (
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
              left: `50%`,
              top: `50%`,
              transform: "translate(-50%, -50%)",
            }}
            viewBox="0 0 100 100"
          >
            <mask id="maskInner">
              <rect x="0" y="0" width="100" height="100" fill="white" />
              <circle cx="50" cy="50" r="20" fill="black" />
            </mask>
            <circle
              cx="50"
              cy="50"
              r="50"
              fill="purple"
              opacity={0.4}
              mask="url(#maskInner)"
            />
          </svg>
        </Grow>
      )}
      {gameState.stage === "InOut" && gameState.bossColour === "Light" && (
        <>
          <Grow
            in={gameState.cast.value >= 100}
            timeout={1500}
            onEntered={animationEnd}
          >
            <svg
              height="60%"
              width="60%"
              style={{
                position: "absolute",
                left: `50%`,
                top: `50%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <circle cx="50%" cy="50%" r="50%" fill="yellow" opacity={0.4} />
            </svg>
          </Grow>
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
