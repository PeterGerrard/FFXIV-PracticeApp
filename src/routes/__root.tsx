/// <reference types="vite-plugin-svgr/client" />

import { SetupContext } from "../gamestate/Setup/Setup";
import { useEffect, useState } from "react";
import { Setup } from "../gamestate/gameState";
import { GearIcon } from "@radix-ui/react-icons";
import { SetupForm } from "../gamestate/Setup/SetupForm";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

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
    const [showSetup, setShowSetup] = useState(false);
    const saveSetup = () => {
      localStorage.setItem("setup", JSON.stringify(setup));
      setShowSetup(false);
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
          state: setup ?? defaultSetup,
        }}
      >
        <div>
          <Link to="/">
            <h1 style={{ display: "inline-block" }}>FFXIV Practice</h1>
          </Link>
          <Button variant="ghost" onClick={() => setShowSetup(true)}>
            <GearIcon />
            Setup
          </Button>
        </div>
        {setup && <Outlet />}
        <Sheet open={!setup || showSetup} onOpenChange={setShowSetup}>
          <SheetContent>
            <SetupForm
              setup={setup}
              save={saveSetup}
              update={(p) => setSetup((s) => ({ ...s, ...p }))}
            />
          </SheetContent>
        </Sheet>
      </SetupContext.Provider>
    );
  },
});
