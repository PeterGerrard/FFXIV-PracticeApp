import { Designation, LightPartyDesignation } from "../gameState";
import { createContext, useContext, useState } from "react";

type Profile = {
  name: string;
  playerIconSize: number;
};

export type LightPartyProfile = Profile & {
  designation: LightPartyDesignation;
  partyType: "Light";
};

export type FullPartyProfile = Profile & {
  designation: Designation;
  partyType: "Full";
};

type Profiles = {
  defaultLightPartyProfile: LightPartyProfile;
  defaultFullPartyProfile: FullPartyProfile;
  lightPartyProfiles: LightPartyProfile[];
  fullPartyProfiles: FullPartyProfile[];
};

type StoredProfiles = Profiles & {
  version: 1;
};

type StoredSetup = {
  designation: Designation;
  playerIconSize: number;
};

const defaultFull: FullPartyProfile = {
  name: "Default",
  designation: "H2",
  playerIconSize: 0.08,
  partyType: "Full",
};
const defaultLight: LightPartyProfile = {
  name: "Default",
  designation: "D2",
  playerIconSize: 0.08,
  partyType: "Light",
};
const defaultProfiles: Profiles = {
  defaultFullPartyProfile: defaultFull,
  defaultLightPartyProfile: defaultLight,
  fullPartyProfiles: [defaultFull],
  lightPartyProfiles: [defaultLight],
};

const getStoredProfiles = (): Profiles => {
  const storedString = localStorage.getItem("profiles");
  if (!storedString) {
    const storedSetupString = localStorage.getItem("setup");
    if (storedSetupString) {
      const storedSetup = JSON.parse(storedSetupString) as StoredSetup;
      const full: FullPartyProfile = {
        name: "Default",
        designation: storedSetup.designation,
        partyType: "Full",
        playerIconSize: storedSetup.playerIconSize,
      };
      const light: LightPartyProfile = {
        name: "Default",
        designation: "D1",
        partyType: "Light",
        playerIconSize: storedSetup.playerIconSize,
      };
      return {
        defaultFullPartyProfile: full,
        defaultLightPartyProfile: light,
        fullPartyProfiles: [full],
        lightPartyProfiles: [light],
      };
    }
    return defaultProfiles;
  }

  const stored = JSON.parse(storedString);

  if (!("version" in stored)) {
    return defaultProfiles;
  }

  if (stored.version === 1) {
    const storedV1 = stored as StoredProfiles;
    return {
      defaultFullPartyProfile: storedV1.defaultFullPartyProfile,
      defaultLightPartyProfile: storedV1.defaultLightPartyProfile,
      fullPartyProfiles: storedV1.fullPartyProfiles,
      lightPartyProfiles: storedV1.lightPartyProfiles,
    };
  }

  throw new Error("Unsupported version in storage");
};

const saveStoredProfiles = (profiles: Profiles) => {
  const storedProfiles: StoredProfiles = {
    version: 1,
    defaultFullPartyProfile: profiles.defaultFullPartyProfile,
    defaultLightPartyProfile: profiles.defaultLightPartyProfile,
    fullPartyProfiles: profiles.fullPartyProfiles,
    lightPartyProfiles: profiles.lightPartyProfiles,
  };
  localStorage.setItem("profiles", JSON.stringify(storedProfiles));
};

export const useProfiles = () => {
  const [profiles, setProfiles] = useState(getStoredProfiles());

  return [
    profiles,
    (newProfiles: Profiles) => {
      setProfiles(newProfiles);
      saveStoredProfiles(newProfiles);
    },
  ] as const;
};

export const ProfileContext = createContext<
  Profiles & {
    currentLightPartyProfile: LightPartyProfile;
    currentFullPartyProfile: FullPartyProfile;
    switchFullPartyProfile: (profile: FullPartyProfile) => void;
    switchLightPartyProfile: (profile: LightPartyProfile) => void;
  }
>(null!);

export const useFullPartyProfile = () => {
  const ctx = useContext(ProfileContext);
  return ctx.currentFullPartyProfile;
};

export const useLightPartyProfile = () => {
  const ctx = useContext(ProfileContext);
  return ctx.currentLightPartyProfile;
};
