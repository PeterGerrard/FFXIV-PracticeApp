import { createContext } from "react";
import { Setup } from "../gameState";

export const defaultSetup: Setup = { designation: "H2", playerIconSize: 0.08 };
export const SetupContext = createContext<{
  setup: Setup;
  setSetup: (s: Setup) => void;
}>(null!);
