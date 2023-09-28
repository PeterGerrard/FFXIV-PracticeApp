import {
  Button,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { RevelationGameState } from "./revelationsState";

const Bombs = (props: { state: RevelationGameState }) => {
  const { state } = props;
  return (
    <>
      <svg
        height="100"
        width="100"
        style={{
          position: "absolute",
          left: `50%`,
          top: `50%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="black"
          stroke-width="3"
          fill={state.bossColour === "Dark" ? "purple" : "yellow"}
        />
      </svg>
      <svg
        height="100"
        width="100"
        style={{
          position: "absolute",
          left: `50%`,
          top: `20%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="black"
          stroke-width="3"
          fill={state.topBomb === "Dark" ? "purple" : "yellow"}
        />
      </svg>
      <svg
        height="100"
        width="100"
        style={{
          position: "absolute",
          left: `50%`,
          top: `80%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="black"
          stroke-width="3"
          fill={state.topBomb === "Dark" ? "purple" : "yellow"}
        />
      </svg>
      <svg
        height="100"
        width="100"
        style={{
          position: "absolute",
          left: `20%`,
          top: `50%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="black"
          stroke-width="3"
          fill={state.topBomb === "Light" ? "purple" : "yellow"}
        />
      </svg>
      <svg
        height="100"
        width="100"
        style={{
          position: "absolute",
          left: `80%`,
          top: `50%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="black"
          stroke-width="3"
          fill={state.topBomb === "Light" ? "purple" : "yellow"}
        />
      </svg>
    </>
  );
};

export const RevelationOverlay = Bombs;
