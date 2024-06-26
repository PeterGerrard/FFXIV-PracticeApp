import { useCallback } from "react";
import { P12P1Arena } from "../P12SP1Arena";
import { SuperchainExplosionDisplay } from "../Superchain/SuperchainExplosionDisplay";
import {
  SuperchainTheory2bGameState,
  createInitialState,
  getMechanic,
  getTargetSpot,
  nextStep,
} from "./states";
import { point } from "@flatten-js/core";
import { Player } from "../../Player";
import { Designations, getRandomPos, getRole } from "../../gameState";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useGame } from "../../gameHooks";
import addSrc from "./assets/add.png";
import { Overlay } from "../../Overlay";
import { useTitle } from "../../../components/useTitle";
import { useFullPartyProfile } from "../../Setup/ProfileContext";

const Add = (props: { xPos: number }) => {
  const setup = useFullPartyProfile();
  return (
    <img
      src={addSrc}
      style={{
        position: "absolute",
        left: `${100 * props.xPos}%`,
        top: "2%",
        width: `${100 * setup.playerIconSize}%`,
      }}
    />
  );
};

const autoProgress = (state: SuperchainTheory2bGameState) =>
  state.stage === "Paradeigma" ? 500 : false;

export const SuperchainTheory2B = () => {
  useTitle("Superchain Theory 2B");
  const setup = useFullPartyProfile();

  const { state, players, restart, onMove, safeLocation } = useGame<
    Player,
    SuperchainTheory2bGameState
  >(
    (s, p) => {
      const damageMap = getMechanic(s, p).applyDamage(players);
      return Designations.filter((d) => damageMap[d] < 1);
    },
    (s) => s.stage === "Explosion3",
    () =>
      Designations.map((d) => ({
        type: "Full",
        alive: true,
        controlled: setup.designation === d,
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

  const shortChainLength =
    state.stage === "Initial" || state.stage === "Paradeigma" ? 1 : 0;
  const mediumChainLength =
    shortChainLength > 0
      ? 1
      : state.stage === "Explosion1" || state.stage === "Parthenos"
        ? 0.5
        : 0;
  const longChainLength =
    shortChainLength > 0
      ? 1
      : mediumChainLength > 0
        ? 0.67
        : state.stage === "Explosion2"
          ? 0.33
          : state.stage === "AddLines"
            ? 0.1
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
        <P12P1Arena players={players} mechanic={mechanic} moveTo={onMove}>
          {shortChainLength > 0 && (
            <>
              <SuperchainExplosionDisplay
                explosion={state.first.north ? "Circle" : "Donut"}
                position={point(0.7, 0.175)}
                target={point(0.5, 0.375)}
              />
              <SuperchainExplosionDisplay
                explosion={state.first.north ? "Donut" : "Circle"}
                position={point(0.3, 0.825)}
                target={point(0.5, 0.625)}
              />
            </>
          )}
          {mediumChainLength > 0 && (
            <>
              <SuperchainExplosionDisplay
                explosion={
                  state.second.side === "East" ? state.second.type : "Circle"
                }
                position={point(0.1, -0.45)
                  .scale(mediumChainLength, mediumChainLength)
                  .translate(0.375, 0.5)}
                target={point(0.375, 0.5)}
              />
              <SuperchainExplosionDisplay
                explosion={
                  state.second.side === "East" ? "Circle" : state.second.type
                }
                position={point(-0.1, 0.45)
                  .scale(mediumChainLength, mediumChainLength)
                  .translate(0.625, 0.5)}
                target={point(0.625, 0.5)}
              />
            </>
          )}
          {longChainLength > 0 && (
            <>
              <SuperchainExplosionDisplay
                explosion="Circle"
                position={point(-0.5, -0.75)
                  .scale(longChainLength, longChainLength)
                  .translate(0.5, 0.75)}
                target={point(0.5, 0.75)}
              />
              <SuperchainExplosionDisplay
                explosion="Circle"
                position={point(0.5, 0.75)
                  .scale(longChainLength, longChainLength)
                  .translate(0.5, 0.25)}
                target={point(0.5, 0.25)}
              />
              {state.third.north ? (
                <SuperchainExplosionDisplay
                  explosion="Protean"
                  position={point(0.5, -0.75)
                    .scale(longChainLength, longChainLength)
                    .translate(0.5, 0.75)}
                  target={point(0.5, 0.75)}
                />
              ) : (
                <SuperchainExplosionDisplay
                  explosion="Protean"
                  position={point(-0.5, 0.75)
                    .scale(longChainLength, longChainLength)
                    .translate(0.5, 0.25)}
                  target={point(0.5, 0.25)}
                />
              )}
            </>
          )}
          {[
            "Paradeigma",
            "Explosion1",
            "Parthenos",
            "Explosion2",
            "AddLines",
          ].includes(state.stage) && (
            <>
              <Add xPos={state.second.side === "East" ? 0.2 : 0.8} />
              <Add xPos={state.second.side === "East" ? 0.6 : 0.4} />
            </>
          )}
          <Overlay
            players={players}
            finished={state.stage === "Explosion3"}
            safeLocation={safeLocation}
          />
        </P12P1Arena>
      </div>
    </div>
  );
};
