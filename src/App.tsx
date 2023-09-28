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
import { useGameState } from "./gamestate";
import { SetupForm } from "./gamestate/Setup/SetupForm";

function App() {
  const [state, setupState, dispatch, arena] = useGameState();

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
        <Button onClick={() => dispatch({ type: "RESTART" })}>Restart</Button>
        <Button onClick={() => dispatch({ type: "RESET" })}>Reset</Button>
      </div>
      {!state && <SetupForm state={setupState} dispatch={dispatch} />}
      {state && (
        <>
          <div
            style={{
              display: "inline-block",
              width: "1000px",
              height: "1000px",
            }}
          >
            {arena()}
          </div>
          <div
            style={{
              maxWidth: "500px",
              paddingBottom: "50px",
            }}
          >
            {state.gameState.cast && (
              <>
                <h1>{state.gameState.cast.name}</h1>
                <LinearProgress
                  sx={{ height: "16px" }}
                  color="warning"
                  variant="determinate"
                  value={state.gameState.cast.value}
                />
              </>
            )}
          </div>
        </>
      )}
    </ThemeProvider>
  );
}

export default App;
