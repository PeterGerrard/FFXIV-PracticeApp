import { useGameState3 } from "../..";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { startLetterOfTheLaw } from ".";
import { useTitle } from "../../../components/useTitle";

export const LetterOfTheLaw = () => {
  const [state, restart, arena] = useGameState3(startLetterOfTheLaw);
  useTitle("Letter of the Law");

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
