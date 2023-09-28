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
import { Outlet, useNavigate } from "react-router-dom";
import { SetupContext } from "./gamestate/Setup/Setup";
import { useEffect, useState } from "react";
import { Setup } from "./gamestate/gameState";
import SettingsIcon from "@mui/icons-material/Settings";

const defaultSetup: Setup = { role: "Healer", clockSpot: "East" };

function App() {
  const navigate = useNavigate();
  const [setup, setSetup] = useState<Setup | undefined>();
  const saveSetup = (updatedSetup: Partial<Setup>) => {
    const newSetup = { ...defaultSetup, ...setup, ...updatedSetup };
    localStorage.setItem("setup", JSON.stringify(newSetup));
    setSetup(newSetup);
  };

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? "dark" : "light",
    },
  });

  useEffect(() => {
    const stored = localStorage.getItem("setup");
    if (stored) {
      setSetup(JSON.parse(stored) as Setup);
    } else {
      saveSetup(defaultSetup);
      navigate("/setup");
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <SetupContext.Provider
        value={{
          state: setup ?? defaultSetup,
          update: saveSetup,
        }}
      >
        <CssBaseline />
        <div>
          <h1 style={{ display: "inline-block" }}>Themis Practice</h1>
          <Button
            startIcon={<SettingsIcon />}
            onClick={() => navigate("/setup")}
          >
            Setup
          </Button>
        </div>
        {setup && <Outlet />}
      </SetupContext.Provider>
    </ThemeProvider>
  );
}

export default App;
