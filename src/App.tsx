/// <reference types="vite-plugin-svgr/client" />

import { Ref, forwardRef, useReducer, useRef } from "react";
import arenaPng from "./assets/arena.png";
import healerPng from "./assets/healer.png";
import dpsPng from "./assets/dps.png";
import tankPng from "./assets/tank.png";
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

type Role = "Tank" | "Healer" | "DPS";
type Position = [number, number];

type Player = {
  role: Role;
  position: Position;
  debuff: "Light" | "Dark";
};

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

type GameState =
  | {
      stage: "setup";
      role: Role;
      success: 0;
      failure: 0;
    }
  | {
      stage: "positions1";
      player: Player;
      tetheredTo: Player;
      success: number;
      failure: number;
    }
  | {
      stage: "end";
      player: Player;
      tetheredTo: Player;
      success: number;
      failure: number;
    };

const defaultState: GameState = {
  stage: "setup",
  role: "Healer",
  success: 0,
  failure: 0,
};

type Action =
  | { type: "RESET" }
  | { type: "MOVE"; target: Position }
  | { type: "SELECTROLE"; role: Role };

const MarkerA: Position = [0.498, 0.206];
const Marker1: Position = [0.714, 0.289];
const MarkerB: Position = [0.664, 0.502];
const Marker2: Position = [0.617, 0.621];
const MarkerC: Position = [0.498, 0.816];
const Marker3: Position = [0.278, 0.719];
const MarkerD: Position = [0.332, 0.502];
const Marker4: Position = [0.383, 0.391];

const distanceTo = (source: Position, target: Position) =>
  Math.sqrt(
    Math.pow(target[0] - source[0], 2) + Math.pow(target[1] - source[1], 2)
  );

const isSafe = (p1: Player, p2: Player) => {
  const d = distanceTo(p1.position, p2.position);

  return p1.debuff === p2.debuff ? d > 0.34 : d < 0.17;
};

const getCorrectPos = (
  role: Role,
  tether: "Short" | "Long",
  tetheredRole: Role
): Position => {
  if (role === "Healer" && tether === "Short") {
    return MarkerB;
  }
  if (role === "Healer" && tether === "Long") {
    return MarkerC;
  }
  if (role === "Tank" && tether === "Short") {
    return MarkerD;
  }
  if (role === "Tank" && tether === "Long") {
    return MarkerA;
  }
  if (tetheredRole === "Tank" && tether === "Short") {
    return Marker4;
  }
  if (tetheredRole === "Tank" && tether === "Long") {
    return Marker3;
  }
  if (tetheredRole === "Healer" && tether === "Short") {
    return Marker2;
  }
  if (tetheredRole === "Healer" && tether === "Long") {
    return Marker1;
  }
  throw "Something went wrong";
};

const isInCorrectBasicPosition = (
  myRole: Role,
  tether: "Short" | "Long",
  tetheredRole: Role,
  position: Position
) => {
  const correctPos = getCorrectPos(myRole, tether, tetheredRole);
  return distanceTo(position, correctPos) < 0.09;
};

const getRandomPos = (): Position => {
  const p: Position = [Math.random(), Math.random()];
  if (distanceTo(p, [0.5, 0.5]) < 0.5) {
    return p;
  }
  return getRandomPos();
};

const move = (gameState: GameState, position: Position): GameState => {
  switch (gameState.stage) {
    case "end":
      return gameState;
    case "setup":
      return {
        stage: "positions1",
        player: {
          role: gameState.role,
          position: position,
          debuff: Math.random() <= 0.5 ? "Light" : "Dark",
        },
        tetheredTo: {
          role:
            gameState.role === "DPS"
              ? Math.random() <= 0.5
                ? "Tank"
                : "Healer"
              : "DPS",
          position: getRandomPos(),
          debuff: Math.random() <= 0.5 ? "Light" : "Dark",
        },
        success: 0,
        failure: 0,
      };
    case "positions1":
      const correctPosition = isInCorrectBasicPosition(
        gameState.player.role,
        gameState.player.debuff === gameState.tetheredTo.debuff
          ? "Long"
          : "Short",
        gameState.tetheredTo.role,
        position
      );
      return {
        stage: "end",
        player: {
          ...gameState.player,
          position: position,
        },
        tetheredTo: {
          ...gameState.tetheredTo,
          position: getCorrectPos(
            gameState.tetheredTo.role,
            gameState.player.debuff === gameState.tetheredTo.debuff
              ? "Long"
              : "Short",
            gameState.player.role
          ),
        },
        success: gameState.success + (correctPosition ? 1 : 0),
        failure: gameState.success + (correctPosition ? 0 : 1),
      };
  }
};

const reducer = (gameState: GameState, action: Action): GameState => {
  switch (action.type) {
    case "RESET":
      return {
        ...defaultState,
        role:
          gameState.stage === "setup" ? gameState.role : gameState.player.role,
      };
    case "MOVE":
      return move(gameState, action.target);
    case "SELECTROLE":
      return { ...defaultState, role: action.role };
  }
};

const Player = forwardRef(
  (props: { player: Player }, ref: Ref<HTMLImageElement>) => {
    return (
      <img
        ref={ref}
        src={
          props.player.role === "Healer"
            ? healerPng
            : props.player.role === "Tank"
            ? tankPng
            : dpsPng
        }
        style={{
          position: "absolute",
          left: `${props.player.position[0] * 100}%`,
          top: `${props.player.position[1] * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
      ></img>
    );
  }
);

const Tether = (props: {
  playerRef: React.MutableRefObject<unknown>;
  tetheredRef: React.MutableRefObject<unknown>;
  state: GameState & { stage: "positions1" | "end" };
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
        isSafe(state.player, state.tetheredTo)
          ? "blue"
          : state.player.debuff === "Dark"
          ? "purple"
          : "yellow"
      }
      showHead={!isSafe(state.player, state.tetheredTo)}
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
      showTail={!isSafe(state.player, state.tetheredTo)}
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

function App() {
  const [state, dispatch] = useReducer(reducer, defaultState);
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
      <h1>Themis Practice</h1>
      <div style={{ display: "flex" }}>
        <FormControl>
          {state.stage === "setup" && (
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
          )}
          <Button
            onClick={() => dispatch({ type: "RESET" })}
            variant="contained"
          >
            Reset
          </Button>
        </FormControl>
        <div
          style={{
            position: "relative",
            height: "90%",
            aspectRatio: "1 / 1",
            overflow: "hidden",
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
          <img src={arenaPng}></img>
          {state.stage === "positions1" && (
            <>
              <Player ref={tetheredRef} player={state.tetheredTo} />
              <Player ref={playerRef} player={state.player} />
              <Tether
                tetheredRef={tetheredRef}
                playerRef={playerRef}
                state={state}
              />
            </>
          )}
          {state.stage === "end" && (
            <>
              <Player ref={tetheredRef} player={state.tetheredTo} />
              <Player ref={playerRef} player={state.player} />
              <Tether
                tetheredRef={tetheredRef}
                playerRef={playerRef}
                state={state}
              />
            </>
          )}
        </div>
        <div>
          Success: {state.success}
          <br />
          Failure: {state.failure}
          <br />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
