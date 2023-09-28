/// <reference types="vite-plugin-svgr/client" />

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  Button,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { useGameState } from "./gamestate";
import { SetupForm } from "./gamestate/Setup/SetupForm";
import { Arena } from "./Arena";
import { RevelationOverlay } from "./gamestate/Revelation/RevelationOverlay";
import { DeathOverlay } from "./gamestate/Death/DeathOverlay";

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
          >
            <>
              {state.stage == "revelation" && (
                <RevelationOverlay state={state} />
              )}
              {state.stage == "dead" && <DeathOverlay state={state} />}
            </>
          </Arena>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
