import { createContext } from "react";
import { Setup } from "../gameState";

export const SetupContext = createContext<{
  state: Setup;
}>(null!);
