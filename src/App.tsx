/// <reference types="vite-plugin-svgr/client" />

import { Ref, forwardRef, useRef } from "react";
import arenaPng from "./assets/arena.png";
import healerPng from "./assets/healer.png";
import dpsPng from "./assets/dps.png";
import tankPng from "./assets/tank.png";
import skullPng from "./assets/Skull_and_Crossbones.png";
import { ReactComponent as ForwardArrowSvg } from "./assets/forward-arrow.svg";
import { ReactComponent as BackwardArrowSvg } from "./assets/backward-arrow.svg";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  Button,
  CssBaseline,
  FormControl,
  MenuItem,
  Select,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import Xarrow from "react-xarrows";
import {
  Position,
  Player,
  GameState,
  Role,
  isTetherSafe,
  useGameState,
} from "./gamestate";

// helper function to get an element's exact position
function getPosition(e: HTMLElement): Position {
  let el: HTMLElement | null = e;
  var xPosition = 0;
  var yPosition = 0;
  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
      var yScrollPos = el.scrollTop || document.documentElement.scrollTop;
      xPosition += el.offsetLeft - xScrollPos + el.clientLeft;
      yPosition += el.offsetTop - yScrollPos + el.clientTop;
    } else {
      xPosition += el.offsetLeft - el.scrollLeft + el.clientLeft;
      yPosition += el.offsetTop - el.scrollTop + el.clientTop;
    }
    el = el.offsetParent as HTMLElement | null;
  }
  return [xPosition, yPosition];
}

const Player = forwardRef(
  (props: { player: Player }, ref: Ref<HTMLImageElement>) => {
    return (
      <img
        ref={ref}
        src={
          !props.player.alive
            ? skullPng
            : props.player.role === "Healer"
            ? healerPng
            : props.player.role === "Tank"
            ? tankPng
            : dpsPng
        }
        style={{
          position: "absolute",
          left: `${props.player.position[0] * 100}%`,
          top: `${props.player.position[1] * 100}%`,
          height: "80px",
          width: "80px",
          transform: "translate(-50%, -50%)",
        }}
      ></img>
    );
  }
);

const Tether = (props: {
  playerRef: React.MutableRefObject<unknown>;
  tetheredRef: React.MutableRefObject<unknown>;
  state: GameState & { stage: "positions1" | "revelation" | "end" };
}) => {
  const { playerRef, tetheredRef, state } = props;
  return (
    <Xarrow
      start={tetheredRef}
      startAnchor="middle"
      end={playerRef}
      endAnchor="middle"
      path="straight"
      strokeWidth={20}
      lineColor={
        isTetherSafe(state.player, state.tetheredTo)
          ? "blue"
          : state.player.debuff === "Dark"
          ? "purple"
          : "yellow"
      }
      showHead={!isTetherSafe(state.player, state.tetheredTo)}
      headColor={state.tetheredTo.debuff === "Dark" ? "purple" : "yellow"}
      headShape={{
        svgElem:
          state.player.debuff === state.tetheredTo.debuff ? (
            <ForwardArrowSvg />
          ) : (
            <BackwardArrowSvg />
          ),
        offsetForward: 1,
      }}
      showTail={!isTetherSafe(state.player, state.tetheredTo)}
      tailColor={state.player.debuff === "Dark" ? "purple" : "yellow"}
      tailShape={{
        svgElem:
          state.player.debuff === state.tetheredTo.debuff ? (
            <ForwardArrowSvg />
          ) : (
            <BackwardArrowSvg />
          ),
        offsetForward: 1,
      }}
    />
  );
};

const Bombs = (props: { state: GameState & { stage: "revelation" } }) => {
  const { state } = props;
  return (
    <>
      <svg
        height="100"
        width="100"
        style={{
          position: "absolute",
          left: `50%`,
          top: `50%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="black"
          stroke-width="3"
          fill={state.bossColour === "Dark" ? "purple" : "yellow"}
        />
      </svg>
      <svg
        height="100"
        width="100"
        style={{
          position: "absolute",
          left: `50%`,
          top: `20%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="black"
          stroke-width="3"
          fill={state.topBomb === "Dark" ? "purple" : "yellow"}
        />
      </svg>
      <svg
        height="100"
        width="100"
        style={{
          position: "absolute",
          left: `50%`,
          top: `80%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="black"
          stroke-width="3"
          fill={state.topBomb === "Dark" ? "purple" : "yellow"}
        />
      </svg>
      <svg
        height="100"
        width="100"
        style={{
          position: "absolute",
          left: `20%`,
          top: `50%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="black"
          stroke-width="3"
          fill={state.topBomb === "Light" ? "purple" : "yellow"}
        />
      </svg>
      <svg
        height="100"
        width="100"
        style={{
          position: "absolute",
          left: `80%`,
          top: `50%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="black"
          stroke-width="3"
          fill={state.topBomb === "Light" ? "purple" : "yellow"}
        />
      </svg>
    </>
  );
};

function App() {
  const [state, dispatch] = useGameState();
  const playerRef = useRef<HTMLImageElement>(null);
  const tetheredRef = useRef<HTMLImageElement>(null);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <h1 style={{ display: "inline-block" }}>Themis Practice</h1>
        <Button onClick={() => dispatch({ type: "RESET" })}>Reset</Button>
      </div>
      <div>
        {state.stage === "setup" && (
          <FormControl>
            <Select
              value={state.role}
              onChange={(c) =>
                c !== null &&
                dispatch({ type: "SELECTROLE", role: c.target.value as Role })
              }
            >
              <MenuItem value={"Healer"}>Healer</MenuItem>
              <MenuItem value={"Tank"}>Tank</MenuItem>
              <MenuItem value={"DPS"}>DPS</MenuItem>
            </Select>
            <Button
              onClick={() => dispatch({ type: "START" })}
              variant="contained"
            >
              Start
            </Button>
          </FormControl>
        )}
        {state.stage !== "setup" && (
          <div
            style={{
              position: "relative",
              display: "inline-block",
              overflow: "hidden",
              height: "1000px",
            }}
            onClick={(e) => {
              const [xOff, yOff] = getPosition(e.currentTarget);
              return dispatch({
                type: "MOVE",
                target: [
                  (e.clientX - xOff) / e.currentTarget.offsetWidth,
                  (e.clientY - yOff) / e.currentTarget.offsetHeight,
                ],
              });
            }}
          >
            <img src={arenaPng} height="100%"></img>
            <>
              {state.stage == "revelation" && <Bombs state={state} />}
              <Player ref={tetheredRef} player={state.tetheredTo} />
              <Player ref={playerRef} player={state.player} />
              {state.stage !== "dead" && (
                <Tether
                  tetheredRef={tetheredRef}
                  playerRef={playerRef}
                  state={state}
                />
              )}
              {state.stage == "dead" && (
                <svg
                  height="100"
                  width="100"
                  style={{
                    position: "absolute",
                    left: `${state.safeLocation[0] * 100}%`,
                    top: `${state.safeLocation[1] * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="black"
                    stroke-width="3"
                    fill="green"
                    opacity={0.8}
                  />
                </svg>
              )}
            </>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
