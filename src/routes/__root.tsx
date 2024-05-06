/// <reference types="vite-plugin-svgr/client" />

import { SetupContext } from "../gamestate/Setup/Setup";
import { useEffect, useState } from "react";
import { Setup } from "../gamestate/gameState";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { NavBar } from "../components/NavBar";

const defaultSetup: Setup = { designation: "H2", playerIconSize: 0.08 };

export const Route = createRootRoute({
  component: () => {
    const [setup, setSetup] = useState<Setup>(() => {
      const stored = localStorage.getItem("setup");
      if (stored) {
        return { ...defaultSetup, ...JSON.parse(stored) };
      } else {
        return defaultSetup;
      }
    });
    const saveSetup = (newSetup: Setup) => {
      setSetup(newSetup);
      localStorage.setItem("setup", JSON.stringify(newSetup));
    };

    useEffect(() => {
      const root = window.document.documentElement;

      root.classList.remove("light", "dark");

      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
    }, []);

    return (
      <SetupContext.Provider
        value={{
          setup: setup ?? defaultSetup,
          setSetup: saveSetup,
        }}
      >
        <div>
          <Link to="/">
            <h1 style={{ display: "inline-block" }}>FFXIV Practice</h1>
          </Link>
        </div>
        <NavBar />
        <Outlet />
      </SetupContext.Provider>
    );
  },
});
