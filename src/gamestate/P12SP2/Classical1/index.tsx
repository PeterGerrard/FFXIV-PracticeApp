import {
  Classical1GameState,
  createInitialState,
  getMechanic,
  getDebuffs,
  getTargetSpot,
  nextStep,
} from "./states";
import { Player } from "../../Player";
import {
  Designation,
  Designations,
  getRandomPos,
  getRole,
} from "../../gameState";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useGame } from "../../gameHooks";
import { Overlay } from "../../Overlay";
import { useTitle } from "../../../components/useTitle";
import { P12P2Arena } from "../P12SP2Arena";
import cubeSrc from "../assets/cube.png";
import pyramidSrc from "../assets/pyramid.png";
import octahedronSrc from "../assets/octahedron.png";
import { Point } from "@flatten-js/core";
import { useFullPartyProfile } from "../../Setup/ProfileContext";

const autoProgress = (state: Classical1GameState) =>
  state.stage === "TetherMove" || state.stage === "Bait" ? 0 : false;

const Octahedron = (props: { pos: Point }) => {
  return (
    <image
      href={octahedronSrc}
      x={props.pos.x - 0.05}
      y={props.pos.y - 0.05}
      height={0.1}
      width={0.1}
    />
  );
};
const Cube = (props: { pos: Point }) => {
  return (
    <image
      href={cubeSrc}
      x={props.pos.x - 0.05}
      y={props.pos.y - 0.05}
      height={0.1}
      width={0.1}
    />
  );
};
const Pyramid = (props: { pos: Point }) => {
  return (
    <image
      href={pyramidSrc}
      x={props.pos.x - 0.05}
      y={props.pos.y - 0.05}
      height={0.1}
      width={0.1}
    />
  );
};

const checkIntercepts = (state: Classical1GameState): boolean => {
  if (state.stage === "TetherAttach") {
    return [
      state.cube1Attach,
      state.cube2Attach,
      state.cube3Attach,
      state.cube4Attach,
      state.pyramid1Attach,
      state.pyramid2Attach,
      state.pyramid3Attach,
      state.pyramid4Attach,
    ].every((x) => x !== null);
  }
  return true;
};

const hasFinished = (s: Classical1GameState): boolean =>
  s.stage === "FinalDodge";
export const ClassicalConcepts1 = () => {
  const setup = useFullPartyProfile();
  useTitle("Classical Concepts 1");

  const { state, players, restart, onMove, safeLocation } = useGame<
    Player,
    Classical1GameState
  >(
    (s) => {
      const damageMap = getMechanic(s).applyDamage(players);
      return Designations.filter((d) => damageMap[d] < 1 && checkIntercepts(s));
    },
    hasFinished,
    () =>
      Designations.map((d) => ({
        type: "Full",
        alive: true,
        controlled: setup.designation === d,
        debuffs: [],
        designation: d,
        position: getRandomPos((p) => p.y > 0.3),
        role: getRole(d),
        distanceTravelled: 0,
      })),
    getTargetSpot,
    createInitialState,
    autoProgress,
    nextStep,
    getDebuffs
  );

  const mechanic = getMechanic(state);

  const getPlayer = (d: Designation) =>
    players.filter((p) => p.designation === d)[0];

  return (
    <div className="flex flex-col">
      <div>
        <Button onClick={() => restart()}>
          Reset
          <ReloadIcon />
        </Button>
      </div>
      <P12P2Arena
        players={players}
        mechanic={mechanic}
        moveTo={onMove}
      >
        {["Initial", "TetherMove", "TetherAttach"].includes(state.stage) ? (
          <>
            <Tether
              source={getPlayer(state.circlePair[0]).position}
              target={getPlayer(state.circlePair[1]).position}
              thickness={0.01}
            />
            <Tether
              source={getPlayer(state.crossPair[0]).position}
              target={getPlayer(state.crossPair[1]).position}
              thickness={0.01}
            />
            <Tether
              source={getPlayer(state.squarePair[0]).position}
              target={getPlayer(state.squarePair[1]).position}
              thickness={0.01}
            />
            <Tether
              source={getPlayer(state.trianglePair[0]).position}
              target={getPlayer(state.trianglePair[1]).position}
              thickness={0.01}
            />
          </>
        ) : (
          <></>
        )}
        {["Initial", "TetherMove", "TetherAttach", "DodgePuddles"].includes(
          state.stage
        ) ? (
          <svg
            height="100%"
            width="100%"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
            }}
            viewBox="0 0 1 1"
          >
            <Octahedron pos={state.die1.pos} />
            <Octahedron pos={state.die2.pos} />
            <Octahedron pos={state.die3.pos} />
            <Octahedron pos={state.die4.pos} />
            <Cube pos={state.die1.squarePos} />
            <Cube pos={state.die2.squarePos} />
            <Cube pos={state.die3.squarePos} />
            <Cube pos={state.die4.squarePos} />
            <Pyramid pos={state.die1.pyramidPos} />
            <Pyramid pos={state.die2.pyramidPos} />
            <Pyramid pos={state.die3.pyramidPos} />
            <Pyramid pos={state.die4.pyramidPos} />
          </svg>
        ) : (
          <></>
        )}
        {state.stage === "TetherAttach" && (
          <>
            <Tether
              source={state.die1.squarePos}
              target={
                state.cube1Attach === null
                  ? state.die1.pos
                  : getPlayer(state.cube1Attach).position
              }
              thickness={0.005}
            />
            <Tether
              source={state.die1.pyramidPos}
              target={
                state.pyramid1Attach === null
                  ? state.die1.pos
                  : getPlayer(state.pyramid1Attach).position
              }
              thickness={0.005}
            />
            <Tether
              source={state.die2.squarePos}
              target={
                state.cube2Attach === null
                  ? state.die2.pos
                  : getPlayer(state.cube2Attach).position
              }
              thickness={0.005}
            />
            <Tether
              source={state.die2.pyramidPos}
              target={
                state.pyramid2Attach === null
                  ? state.die2.pos
                  : getPlayer(state.pyramid2Attach).position
              }
              thickness={0.005}
            />
            <Tether
              source={state.die3.squarePos}
              target={
                state.cube3Attach === null
                  ? state.die3.pos
                  : getPlayer(state.cube3Attach).position
              }
              thickness={0.005}
            />
            <Tether
              source={state.die3.pyramidPos}
              target={
                state.pyramid3Attach === null
                  ? state.die3.pos
                  : getPlayer(state.pyramid3Attach).position
              }
              thickness={0.005}
            />
            <Tether
              source={state.die4.squarePos}
              target={
                state.cube4Attach === null
                  ? state.die4.pos
                  : getPlayer(state.cube4Attach).position
              }
              thickness={0.005}
            />
            <Tether
              source={state.die4.pyramidPos}
              target={
                state.pyramid4Attach === null
                  ? state.die4.pos
                  : getPlayer(state.pyramid4Attach).position
              }
              thickness={0.005}
            />
          </>
        )}
        <Overlay
          players={players}
          finished={hasFinished(state)}
          safeLocation={safeLocation}
        />
      </P12P2Arena>
    </div>
  );
};

const Tether = (props: { source: Point; target: Point; thickness: number }) => {
  return (
    <svg
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        height: "100%",
        width: "100%",
      }}
      viewBox="0 0 1 1"
    >
      <line
        x1={props.source.x}
        y1={props.source.y}
        x2={props.target.x}
        y2={props.target.y}
        strokeWidth={props.thickness}
        stroke="green"
      />
    </svg>
  );
};
