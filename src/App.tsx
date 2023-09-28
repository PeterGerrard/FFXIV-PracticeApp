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

type Player = {
  role: Role;
  position: Position;
};

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
      player: Player;
      tether: "Short" | "Long";
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
  return distanceTo(position, correctPos) < 100;
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
        },
        tether: Math.random() <= 0.5 ? "Short" : "Long",
        tetheredTo: {
          role:
            gameState.role === "DPS"
              ? Math.random() <= 0.5
                ? "Tank"
                : "Healer"
              : "DPS",
          position: [500, 500],
        },
        success: 0,
        failure: 0,
      };
    case "positions1":
      const correctPosition = isInCorrectBasicPosition(
        gameState.player.role,
        gameState.tether,
        gameState.tetheredTo.role,
        position
      );
      return {
        stage: "end",
        player: {
          role: gameState.player.role,
          position: position,
        },
        tetheredTo: {
          role: gameState.tetheredTo.role,
          position: getCorrectPos(
            gameState.tetheredTo.role,
            gameState.tether,
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

const Player = (props: { player: Player }) => {
  return (
    <img
      src={
        props.player.role === "Healer"
          ? healerPng
          : props.player.role === "Tank"
          ? tankPng
          : dpsPng
      }
      style={{
        position: "absolute",
        left: props.player.position[0],
        top: props.player.position[1],
        transform: "translate(-50%, -50%)",
      }}
    ></img>
  );
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
              target: [e.clientX - xOff, e.clientY - yOff],
            });
          }}
        >
          <img src={arenaPng}></img>
          {state.stage !== "setup" && <Player player={state.tetheredTo} />}
          {state.stage !== "setup" && <Player player={state.player} />}
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
              Partner: {state.tetheredTo.role}
              <br />
            </>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
