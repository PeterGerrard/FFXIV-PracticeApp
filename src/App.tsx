/// <reference types="vite-plugin-svgr/client" />

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  Button,
  CssBaseline,
  Drawer,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { SetupContext } from "./gamestate/Setup/Setup";
import { useEffect, useState } from "react";
import { Setup } from "./gamestate/gameState";
import SettingsIcon from "@mui/icons-material/Settings";
import { SetupForm } from "./gamestate/Setup/SetupForm";

const defaultSetup: Setup = { designation: "H2" };

function App() {
  const [setup, setSetup] = useState<Setup>(() => {
    const stored = localStorage.getItem("setup");
    if (stored) {
      return { ...defaultSetup, ...JSON.parse(stored) };
    } else {
      return defaultSetup;
    }
  });
  const [showSetup, setShowSetup] = useState(false);
  const saveSetup = () => {
    localStorage.setItem("setup", JSON.stringify(setup));
    setShowSetup(false);
  };

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? "dark" : "light",
    },
  });

  useEffect(() => {}, []);

  return (
    <ThemeProvider theme={theme}>
      <SetupContext.Provider
        value={{
          state: setup ?? defaultSetup,
        }}
      >
        <CssBaseline />
        <div>
          <Link to="/">
            <h1 style={{ display: "inline-block" }}>Themis Practice</h1>
          </Link>
          <Button
            startIcon={<SettingsIcon />}
            onClick={() => setShowSetup(true)}
          >
            Setup
          </Button>
        </div>
        {setup && <Outlet />}
        <Drawer open={!setup || showSetup} onClose={() => setShowSetup(false)}>
          <SetupForm
            setup={setup}
            save={saveSetup}
            update={(p) => setSetup((s) => ({ ...s, ...p }))}
          />
        </Drawer>
      </SetupContext.Provider>
    </ThemeProvider>
  );
}

export default App;
