import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useTitle } from "../../../components/useTitle";
import { hasFinished, useLetterOfTheLaw } from "./gameState";
import { LetterOfTheLawArena } from "./LetterOfTheLawArena";
import { Overlay } from "../../Overlay";

export const LetterOfTheLaw = () => {
  const { restart, onMove, players, safeLocation, state } = useLetterOfTheLaw();
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
        <LetterOfTheLawArena onMove={onMove} players={players} state={state} />
        <Overlay
          finished={hasFinished(state)}
          players={players}
          safeLocation={safeLocation}
        />
      </div>
      <div
        style={{
          maxWidth: "500px",
          paddingBottom: "50px",
        }}
      >
        {state.cast && (
          <>
            <h1>{state.cast.name}</h1>
            <Progress value={state.cast.value} />
          </>
        )}
      </div>
    </div>
  );
};
