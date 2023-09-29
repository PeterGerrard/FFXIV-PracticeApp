import { useGameState } from "../..";
import { startDarkAndLight } from ".";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Stack from "@mui/material/Stack";

export const DarkAndLight = () => {
  const [state, restart, arena] = useGameState(startDarkAndLight);

  return (
    <Stack flexDirection="column">
      <div>
        <Button endIcon={<RestartAltIcon />} onClick={() => restart()}>
          Reset
        </Button>
      </div>
      <div
        style={{
          display: "inline-block",
          width: "75vh",
          height: "75vh",
          position: "relative",
        }}
      >
        {arena()}
      </div>
      <div
        style={{
          maxWidth: "500px",
          paddingBottom: "50px",
        }}
      >
        {state.gameState.cast && (
          <>
            <h1>{state.gameState.cast.name}</h1>
            <LinearProgress
              sx={{ height: "16px" }}
              color="warning"
              variant="determinate"
              value={state.gameState.cast.value}
            />
          </>
        )}
      </div>
    </Stack>
  );
};
