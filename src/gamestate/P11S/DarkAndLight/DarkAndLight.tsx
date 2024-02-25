import {
  NewDarkAndLightState,
  autoProgress,
  createPlayers,
  getDangerPuddles,
  getSurvivors,
  getTargetSpot,
  progress,
} from ".";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useTitle } from "../../../components/useTitle";
import { useGame } from "../../gameHooks";
import { DarkAndLightPlayer } from "./gameState";
import { useContext } from "react";
import { SetupContext } from "../../Setup/Setup";
import { Arena } from "./Arena";
import { Overlay } from "../../Overlay";
import { Bombs } from "../Bombs";

export const getDebuffs = () => [];

const hasFinished = (s: NewDarkAndLightState): boolean =>
  s.outer === "Divisive" && s.hasFinished;

export const DarkAndLight = () => {
  const setup = useContext(SetupContext);
  useTitle("Dark and Light");
  const { onMove, players, restart, safeLocation, state } = useGame<
    DarkAndLightPlayer,
    NewDarkAndLightState
  >(
    getSurvivors,
    hasFinished,
    () => createPlayers(setup.state),
    getTargetSpot,
    () => ({
      outer: "Revelation",
      stage: "initial",
      hasFinished: false,
      bossColour: Math.random() < 0.5 ? "Dark" : "Light",
      topBomb: Math.random() < 0.5 ? "Dark" : "Light",
      cast: null,
    }),
    autoProgress,
    progress,
    getDebuffs
  );

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
        <Arena
          players={players}
          bossColour={state.bossColour}
          dangerPuddles={getDangerPuddles(state, players)}
          moveTo={onMove}
        >
          {state.outer === "Revelation" && state.stage !== "initial" && (
            <Bombs topBomb={state.topBomb} />
          )}
          <Overlay
            finished={hasFinished(state)}
            players={players}
            safeLocation={safeLocation}
          />
        </Arena>
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
