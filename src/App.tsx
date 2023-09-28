import { useReducer } from "react";
import arenaPng from "./assets/arena.png";
import healerPng from "./assets/healer.png";
import dpsPng from "./assets/dps.png";
import tankPng from "./assets/tank.png";

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

type Role = "Tank" | "Healer" | "DPS";
type Position = [number, number];

// helper function to get an element's exact position
function getPosition(el: any): Position {
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
    el = el.offsetParent;
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
      role: Role;
      position: Position;
      tether: "Short" | "Long";
      tetheredTo: Role;
      success: number;
      failure: number;
    }
  | {
      stage: "end";
      role: Role;
      position: Position;
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

const MarkerA: Position = [585, 242];
const Marker1: Position = [839, 340];
const MarkerB: Position = [780, 590];
const Marker2: Position = [725, 730];
const MarkerC: Position = [585, 959];
const Marker3: Position = [327, 845];
const MarkerD: Position = [390, 590];
const Marker4: Position = [450, 460];

const distanceTo = (source: Position, target: Position) =>
  Math.sqrt(
    Math.pow(target[0] - source[0], 2) + Math.pow(target[1] - source[1], 2)
  );

const isInCorrectBasicPosition = (
  myRole: Role,
  tether: "Short" | "Long",
  tetheredRole: Role,
  position: Position
) => {
  if (myRole === "Healer" && tether === "Short") {
    return distanceTo(position, MarkerB) < 100;
  }
  if (myRole === "Healer" && tether === "Long") {
    return distanceTo(position, MarkerC) < 100;
  }
  if (myRole === "Tank" && tether === "Short") {
    return distanceTo(position, MarkerD) < 100;
  }
  if (myRole === "Tank" && tether === "Long") {
    return distanceTo(position, MarkerA) < 100;
  }
  if (tetheredRole === "DPS") {
    throw "Something went wrong";
  }
  if (tetheredRole === "Tank" && tether === "Short") {
    return distanceTo(position, Marker4) < 100;
  }
  if (tetheredRole === "Tank" && tether === "Long") {
    return distanceTo(position, Marker3) < 100;
  }
  if (tetheredRole === "Healer" && tether === "Short") {
    return distanceTo(position, Marker2) < 100;
  }
  if (tetheredRole === "Healer" && tether === "Long") {
    return distanceTo(position, Marker1) < 100;
  }
};

const move = (gameState: GameState, position: Position): GameState => {
  switch (gameState.stage) {
    case "end":
      return gameState;
    case "setup":
      return {
        stage: "positions1",
        role: gameState.role,
        position: position,
        tether: Math.random() <= 0.5 ? "Short" : "Long",
        tetheredTo:
          gameState.role === "DPS"
            ? Math.random() <= 0.5
              ? "Tank"
              : "Healer"
            : "DPS",
        success: 0,
        failure: 0,
      };
    case "positions1":
      const correctPosition = isInCorrectBasicPosition(
        gameState.role,
        gameState.tether,
        gameState.tetheredTo,
        position
      );
      return {
        stage: "end",
        role: gameState.role,
        position: position,
        success: gameState.success + (correctPosition ? 1 : 0),
        failure: gameState.success + (correctPosition ? 0 : 1),
      };
  }
};

const reducer = (gameState: GameState, action: Action): GameState => {
  switch (action.type) {
    case "RESET":
      return { ...defaultState, role: gameState.role };
    case "MOVE":
      return move(gameState, action.target);
    case "SELECTROLE":
      return { ...defaultState, role: action.role };
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, defaultState);

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
              target: [e.clientX - xOff, e.clientY - yOff],
            });
          }}
        >
          <img src={arenaPng}></img>
          {state.stage !== "setup" && (
            <img
              src={
                state.role === "Healer"
                  ? healerPng
                  : state.role === "Tank"
                  ? tankPng
                  : dpsPng
              }
              style={{
                position: "absolute",
                left: state.position[0],
                top: state.position[1],
                transform: "translate(-50%, -50%)",
              }}
            ></img>
          )}
        </div>
        <div>
          Success: {state.success}
          <br />
          Failure: {state.failure}
          <br />
          {state.stage === "positions1" && (
            <>
              Length: {state.tether}
              <br />
              Partner: {state.tetheredTo}
              <br />
            </>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
