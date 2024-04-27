import { useCallback, useContext } from "react";
import { P12P1Arena } from "../P12SP1Arena";
import { SuperchainExplosionDisplay } from "../Superchain/SuperchainExplosionDisplay";
import {
  SuperchainTheory2aGameState,
  createInitialState,
  getMechanic,
  getTargetSpot,
  nextStep,
} from "./states";
import { point } from "@flatten-js/core";
import { Player } from "../../Player";
import { Designations, getRandomPos, getRole } from "../../gameState";
import { SetupContext } from "../../Setup/Setup";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useGame } from "../../gameHooks";
import { Overlay } from "../../Overlay";
import { useTitle } from "../../../components/useTitle";

const autoProgress = (state: SuperchainTheory2aGameState) =>
  state.stage === "Trinity" && state.displayed < 3 ? 500 : false;

export const SuperchainTheory2A = () => {
  const setup = useContext(SetupContext);
  useTitle("Superchain Theory 2A");

  const { state, players, restart, onMove, safeLocation } = useGame<
    Player,
    SuperchainTheory2aGameState
  >(
    (s, p) => {
      const damageMap = getMechanic(s, p).applyDamage(p);
      return Designations.filter((d) => damageMap[d] < 1);
    },
    (s) => s.stage === "Explosion4",
    () =>
      Designations.map((d) => ({
        alive: true,
        controlled: setup.state.designation === d,
        debuffs: [],
        designation: d,
        position: getRandomPos(),
        role: getRole(d),
        distanceTravelled: 0,
      })),
    getTargetSpot,
    createInitialState,
    autoProgress,
    nextStep,
    useCallback(() => [], [])
  );

  const mechanic = getMechanic(state, players);

  const displayTrinity1 = state.stage === "Trinity" && state.displayed >= 1;
  const displayTrinity2 =
    (state.stage === "Trinity" && state.displayed >= 2) ||
    state.stage === "Explosion1";
  const displayTrinity3 =
    (state.stage === "Trinity" && state.displayed >= 3) ||
    state.stage === "Explosion1" ||
    state.stage === "Explosion2";

  const shortChainLength =
    state.stage === "Initial" || state.stage === "Trinity" ? 1 : 0;
  const mediumChainLength =
    shortChainLength > 0 ? 1 : state.stage === "Explosion1" ? 0.5 : 0;
  const longChainLength =
    shortChainLength > 0
      ? 1
      : mediumChainLength > 0
        ? 0.67
        : state.stage === "Explosion2"
          ? 0.33
          : state.stage === "Explosion3"
            ? 0.05
            : 0;

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
        <P12P1Arena
          players={players}
          mechanic={mechanic}
          moveTo={onMove}
          bossDirection={state.stage === "Explosion2" ? "South" : "North"}
        >
          {shortChainLength > 0 && (
            <>
              <SuperchainExplosionDisplay
                explosion={state.short.north}
                position={point(0.25, 0.25)}
                target={point(0.5, 0.25)}
              />
              <SuperchainExplosionDisplay
                explosion="Circle"
                position={point(0.25, 0.5)}
                target={point(0.5, 0.5)}
              />
              <SuperchainExplosionDisplay
                explosion={state.short.south}
                position={point(0.25, 0.75)}
                target={point(0.5, 0.75)}
              />
            </>
          )}
          {mediumChainLength > 0 && (
            <>
              <SuperchainExplosionDisplay
                explosion="Donut"
                position={point(0.5, 0)
                  .scale(mediumChainLength, mediumChainLength)
                  .translate(0.5, 0.5)}
                target={point(0.5, 0.5)}
              />
            </>
          )}
          {longChainLength > 0 && (
            <>
              <SuperchainExplosionDisplay
                explosion={state.long.north}
                position={point(0.5, 0.75)
                  .scale(longChainLength, longChainLength)
                  .translate(0.5, 0.25)}
                target={point(0.5, 0.25)}
              />
              <SuperchainExplosionDisplay
                explosion="Circle"
                position={point(-0.5, -0.5)
                  .scale(longChainLength, longChainLength)
                  .translate(0.5, 0.5)}
                target={point(0.5, 0.5)}
              />
              <SuperchainExplosionDisplay
                explosion={state.long.south}
                position={point(0.5, -0.75)
                  .scale(longChainLength, longChainLength)
                  .translate(0.5, 0.75)}
                target={point(0.5, 0.75)}
              />
            </>
          )}
          <svg
            height="100%"
            width="100%"
            transform={state.stage === "Explosion2" ? "scale(-1,1)" : ""}
            origin="0.5 0.5"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
            }}
            viewBox="0 0 1 1"
          >
            {displayTrinity1 && (
              <circle
                cx={state.trinity[0] === "Left" ? 0.4 : 0.6}
                cy={0.625}
                fill="transparent"
                r={0.05}
                stroke="orange"
                strokeWidth={0.01}
              />
            )}
            {displayTrinity2 && (
              <circle
                cx={state.trinity[1] === "Left" ? 0.3 : 0.7}
                cy={0.5}
                fill="transparent"
                r={0.05}
                stroke="orange"
                strokeWidth={0.01}
              />
            )}
            {displayTrinity3 && (
              <circle
                cx={state.trinity[2] === "Left" ? 0.35 : 0.65}
                cy={0.375}
                fill="transparent"
                r={0.05}
                stroke="orange"
                strokeWidth={0.01}
              />
            )}
          </svg>
          <Overlay
            players={players}
            finished={state.stage === "Explosion4"}
            safeLocation={safeLocation}
          />
        </P12P1Arena>
      </div>
    </div>
  );
};
