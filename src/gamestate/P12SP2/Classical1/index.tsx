import { useContext } from "react";
import {
  Classical1GameState,
  createInitialState,
  getDangerPuddles,
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
import { survivePuddles } from "../../Mechanics/DangerPuddles";
import { SetupContext } from "../../Setup/Setup";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useGame } from "../../gameHooks";
import { Overlay } from "../../Overlay";
import { useTitle } from "../../../components/useTitle";
import { P12P2Arena } from "../P12SP2Arena";
import triangleSrc from "../assets/Triangle.png";
import circleSrc from "../assets/Circle.png";
import crossSrc from "../assets/Cross.png";
import squareSrc from "../assets/Square.png";
import cubeSrc from "../assets/cube.png";
import pyramidSrc from "../assets/pyramid.png";
import octahedronSrc from "../assets/octahedron.png";
import { Point, point } from "@flatten-js/core";

const autoProgress = (state: Classical1GameState) =>
  state.stage === "TetherMove" ? 0 : false;

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

export const ClassicalConcepts1 = () => {
  const setup = useContext(SetupContext);
  useTitle("Classical Concepts 1");

  const { state, players, restart, onMove, safeLocation } = useGame<
    Player,
    Classical1GameState
  >(
    (s, p) => survivePuddles(getDangerPuddles(s, p), p),
    (s) => s.stage === "TetherAttach",
    () =>
      Designations.map((d) => ({
        alive: true,
        controlled: setup.state.designation === d,
        debuffs: [],
        designation: d,
        position: getRandomPos((p) => p.y > 0.3),
        role: getRole(d),
      })),
    getTargetSpot,
    createInitialState,
    autoProgress,
    nextStep,
    getDebuffs
  );

  const dangerPuddles = getDangerPuddles(state, players);

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
        players={players.map((p) => ({
          ...p,
          marker: {
            src: state.circlePair.includes(p.designation)
              ? circleSrc
              : state.crossPair.includes(p.designation)
                ? crossSrc
                : state.squarePair.includes(p.designation)
                  ? squareSrc
                  : triangleSrc,
            offset: point(0, -0.05),
          },
        }))}
        dangerPuddles={dangerPuddles}
        moveTo={onMove}
      >
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
          finished={false}
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
