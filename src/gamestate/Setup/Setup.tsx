import { createContext } from "react";
import { Setup } from "../gameState";

export const SetupContext = createContext<{
  state: Setup;
  update: (newSetup: Partial<Setup>) => void;
}>(null!);
