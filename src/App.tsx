/// <reference types="vite-plugin-svgr/client" />

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  Button,
  CssBaseline,
  LinearProgress,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { GameState, useGameState } from "./gamestate";
import { SetupForm } from "./gamestate/Setup/SetupForm";
import { Arena } from "./Arena";
import { RevelationOverlay } from "./gamestate/Revelation/RevelationOverlay";
import { DeathOverlay } from "./gamestate/Death/DeathOverlay";
import { RevelationExplosionOverlay } from "./gamestate/Revelation/RevelationExplosionOverlay";

const CastBar = (props: { stage: GameState["stage"] }) => {
  switch (props.stage) {
    case "setup":
      return <></>;
    case "positions1":
      return (
        <>
          <h1>Dark and Light</h1>
          <LinearProgress
            sx={{ height: "16px" }}
            color="warning"
            variant="determinate"
            value={50}
          />
        </>
      );
    case "revelation":
      return (
        <>
          <h1>Arcane Revelation</h1>
          <LinearProgress
            sx={{ height: "16px" }}
            color="warning"
            variant="determinate"
            value={50}
          />
        </>
      );
    case "positions2":
      return (
        <>
          <h1>Jury Overruling</h1>
          <LinearProgress
            sx={{ height: "16px" }}
            color="warning"
            variant="determinate"
            value={50}
          />
        </>
      );
    case "jury-overruling":
      return (
        <>
          <h1>Jury Overruling</h1>
          <LinearProgress
            sx={{ height: "16px" }}
            color="warning"
            variant="determinate"
            value={100}
          />
        </>
      );
    case "positions3":
      return <></>;
    case "divisive-overruling":
      return (
        <>
          <h1>Divisive Overruling</h1>
          <LinearProgress
            sx={{ height: "16px" }}
            color="warning"
            variant="determinate"
            value={50}
          />
        </>
      );
    case "divisive-overruling-dark":
      return (
        <>
          <h1>Divisive Overruling</h1>
          <LinearProgress
            sx={{ height: "16px" }}
            color="warning"
            variant="determinate"
            value={100}
          />
        </>
      );
    case "end":
      return <h1>VICTORY</h1>;
    case "revelation-explosion":
    case "dead":
      return <></>;
  }
};

function App() {
  const [state, dispatch] = useGameState();

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
          <SetupForm state={state} dispatch={dispatch} />
        )}
        {state.stage !== "setup" && (
          <Arena
            dispatch={dispatch}
            player={state.player}
            tetheredTo={state.tetheredTo}
            bossColour={"bossColour" in state ? state.bossColour : null}
          >
            <>
              {state.stage == "revelation" && (
                <RevelationOverlay state={state} />
              )}
              {state.stage == "revelation-explosion" && (
                <RevelationExplosionOverlay state={state} dispatch={dispatch} />
              )}
              {state.stage == "dead" && <DeathOverlay state={state} />}
            </>
          </Arena>
        )}
      </div>
      <div
        style={{
          maxWidth: "500px",
          paddingBottom: "50px",
        }}
      >
        <CastBar stage={state.stage} />
      </div>
    </ThemeProvider>
  );
}

export default App;
