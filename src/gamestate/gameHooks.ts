import { Point, point } from "@flatten-js/core";
import { useCallback, useEffect, useState } from "react";
import { Debuff, Player } from "./Player";
import { Designation } from "./gameState";

export const useGame = <
  TPlayer extends Player,
  TState extends { stage: string },
>(
  getSurvivors: (state: TState, players: TPlayer[]) => Designation[],
  hasFinished: (state: TState) => boolean,
  createPlayers: () => TPlayer[],
  getTargetLocation: (
    state: TState,
    allPlayers: TPlayer[],
    player: TPlayer
  ) => Point,
  createState: () => TState,
  autoProgress: (state: TState) => false | number,
  progress: (state: TState, players: TPlayer[]) => TState,
  getDebuffs: (state: TState, player: TPlayer) => Debuff[]
) => {
  const [state, setState] = useState(createState());
  const [prevStage, setPrevStage] = useState<TState["stage"] | undefined>();
  const [players, setPlayers] = useState(
    createPlayers().map((p) => ({ ...p, debuffs: getDebuffs(state, p) }))
  );
  const [safeLocation, setSafeLocation] = useState(point());
  const [canMove, setCanMove] = useState(true);
  const [canProgress, setCanProgress] = useState(true);

  useEffect(() => {
    let mounted = true;
    const auto = autoProgress(state);
    if (auto !== false) {
      setTimeout(() => {
        return mounted && canProgress && setState(progress(state, players));
      }, auto);
    }
    return () => {
      mounted = false;
    };
  }, [state, players, autoProgress, canProgress, progress]);

  const preventProgress = () => {
    setCanProgress(false);
  };
  const moveControlled = (moveTo: Point) => {
    if (!canMove) {
      return;
    }
    setPlayers((ps) =>
      ps.map((p) => {
        const target = p.controlled
          ? moveTo
          : getTargetLocation(state, players, p);
        return {
          ...p,
          position: target,
          distanceTravelled:
            p.distanceTravelled + p.position.distanceTo(target)[0],
        };
      })
    );
    setSafeLocation(
      getTargetLocation(state, players, players.filter((p) => p.controlled)[0])
    );
  };
  const preventMovement = useCallback(() => {
    setCanMove(false);
  }, [setCanMove]);

  const restart = () => {
    setState(createState());
    setCanProgress(true);
    setPrevStage(undefined);
    setPlayers(
      createPlayers().map((p) => ({ ...p, debuffs: getDebuffs(state, p) }))
    );
    setSafeLocation(point());
    setCanMove(true);
  };

  const onMove = useCallback(
    (newPoint: Point) => {
      if (players.some((x) => !x.alive)) {
        return;
      }
      moveControlled(newPoint);
      if (autoProgress(state) === false) {
        setState(progress(state, players));
      }
      setPrevStage(state.stage);
    },
    [state, players, moveControlled]
  );

  useEffect(() => {
    if (prevStage !== state.stage) {
      const survivingPlayers = getSurvivors(state, players);

      setPlayers((ps) =>
        ps.map((p) => ({
          ...p,
          alive: p.alive && survivingPlayers.includes(p.designation),
          debuffs: getDebuffs(state, p),
        }))
      );
      setPrevStage(state.stage);
    }
  }, [players, state, prevStage, preventProgress, getSurvivors]);

  useEffect(() => {
    if (players.some((p) => !p.alive)) {
      preventMovement();
      preventProgress();
    }
  }, [players, preventMovement, preventProgress]);
  useEffect(() => {
    if (hasFinished(state)) {
      preventMovement();
      preventProgress();
    }
  }, [state, preventMovement, preventProgress, hasFinished]);

  return { state, players, restart, onMove, safeLocation };
};
