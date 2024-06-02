/// <reference types="vite-plugin-svgr/client" />

import { useEffect, useState } from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { NavBar } from "../components/NavBar";
import { ProfileContext, useProfiles } from "../gamestate/Setup/ProfileContext";

export const Route = createRootRoute({
  component: () => {
    const [profiles] = useProfiles();
    const [lightPartyProfile, setLightPartyProfile] = useState(
      profiles.defaultLightPartyProfile
    );
    const [fullPartyProfile, setFullPartyProfile] = useState(
      profiles.defaultFullPartyProfile
    );

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
      <ProfileContext.Provider
        value={{
          ...profiles,
          currentFullPartyProfile: fullPartyProfile,
          currentLightPartyProfile: lightPartyProfile,
          switchFullPartyProfile: setFullPartyProfile,
          switchLightPartyProfile: setLightPartyProfile,
        }}
      >
        <div>
          <Link to="/">
            <h1 style={{ display: "inline-block" }}>FFXIV Practice</h1>
          </Link>
        </div>
        <NavBar />
        <Outlet />
      </ProfileContext.Provider>
    );
  },
});
