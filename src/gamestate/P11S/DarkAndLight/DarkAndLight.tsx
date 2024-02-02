import { useGameState3 } from "../..";
import { startDarkAndLight } from ".";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useTitle } from "../../../components/useTitle";

export const DarkAndLight = () => {
  const [state, restart, arena] = useGameState3(startDarkAndLight);
  useTitle("Dark and Light");

  return (
    <div className="flex flex-col">
      <div>
        <Button onClick={() => restart()}>
          Reset
          <ReloadIcon />
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
            <Progress value={state.gameState.cast.value} />
          </>
        )}
      </div>
    </div>
  );
};
