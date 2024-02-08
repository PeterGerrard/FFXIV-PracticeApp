import { Point, point } from "@flatten-js/core";
import { useCallback, useEffect, useState } from "react";
import { Debuff, Player } from "./Player";
import { Designation } from "./gameState";

export const usePlayers = <T extends Player>(
  createPlayers: () => T[],
  getTargetLocation: (player: T) => Point,
  debuffs: (player: T) => Debuff[]
) => {
  const [players, setPlayers] = useState(
    createPlayers().map((p) => ({ ...p, debuffs: debuffs(p) }))
  );
  const [safeLocation, setSafeLocation] = useState(point());
  const [canMove, setCanMove] = useState(true);
  const reset = () => {
    setPlayers(createPlayers().map((p) => ({ ...p, debuffs: debuffs(p) })));
    setSafeLocation(point());
    setCanMove(true);
  };
  const moveControlled = (moveTo: Point) => {
    if (!canMove) {
      return;
    }
    setPlayers((ps) =>
      ps.map((p) =>
        p.controlled
          ? { ...p, position: moveTo }
          : { ...p, position: getTargetLocation(p) }
      )
    );
    setSafeLocation(getTargetLocation(players.filter((p) => p.controlled)[0]));
  };
  const killPlayers = (predicate: (p: T) => boolean) => {
    const newPlayers = players.map((p) => ({
      ...p,
      alive: p.alive && !predicate(p),
    }));
    setPlayers((ps) =>
      ps.map((p) => ({
        ...p,
        alive: p.alive && !predicate(p),
      }))
    );
    return newPlayers.some((p) => !p.alive);
  };
  const preventMovement = useCallback(() => {
    setCanMove(false);
  }, [setCanMove]);

  useEffect(() => {
    if (canMove && players.some((p) => !p.alive)) {
      preventMovement();
    }
  }, [players, preventMovement, canMove]);
  useEffect(() => {
    setPlayers((ps) =>
      ps.map((p) => {
        const d = debuffs(p);
        return { ...p, debuffs: d };
      })
    );
  }, [debuffs]);

  return {
    players,
    safeLocation,
    reset,
    moveControlled,
    killPlayers,
    preventMovement,
  };
};

const useGameState = <T extends object>(
  createState: () => T,
  autoProgress: (state: T) => false | number,
  progress: (state: T) => T
) => {
  const [state, setState] = useState(createState());
  const [canProgress, setCanProgress] = useState(true);
  const reset = () => {
    setState(createState());
    setCanProgress(true);
  };

  useEffect(() => {
    let mounted = true;
    const auto = autoProgress(state);
    if (auto !== false) {
      setTimeout(() => {
        return mounted && canProgress && setState(progress(state));
      }, auto);
    }
    return () => {
      mounted = false;
    };
  }, [state, autoProgress, canProgress, progress]);

  const goToNextState = () => {
    if (autoProgress(state) === false) {
      setState(progress(state));
    }
  };

  const preventProgress = () => {
    setCanProgress(false);
  };

  return {
    state,
    reset,
    goToNextState,
    preventProgress,
  };
};

export const useGame = <
  TPlayer extends Player,
  TState extends { stage: string },
>(
  getSurvivors: (state: TState, players: TPlayer[]) => Designation[],
  hasFinished: (state: TState) => boolean,
  createPlayers: () => TPlayer[],
  getTargetLocation: (state: TState, player: TPlayer) => Point,
  createState: () => TState,
  autoProgress: (state: TState) => false | number,
  progress: (state: TState) => TState,
  getDebuffs: (state: TState, player: TPlayer) => Debuff[]
) => {
  const {
    goToNextState,
    preventProgress,
    reset: resetState,
    state,
  } = useGameState(createState, autoProgress, progress);
  const [prevStage, setPrevStage] = useState<TState["stage"] | undefined>();
  const debuffs = useCallback(
    (p: TPlayer) => getDebuffs(state, p),
    [state, getDebuffs]
  );
  const {
    players,
    safeLocation,
    reset: resetPlayers,
    moveControlled,
    killPlayers,
    preventMovement,
  } = usePlayers(createPlayers, (p) => getTargetLocation(state, p), debuffs);

  const restart = () => {
    resetState();
    setPrevStage(undefined);
    resetPlayers();
  };

  const onMove = useCallback(
    (newPoint: Point) => {
      if (players.some((x) => !x.alive)) {
        return;
      }
      moveControlled(newPoint);
      goToNextState();
      setPrevStage(state.stage);
    },
    [state, players, moveControlled, goToNextState]
  );

  useEffect(() => {
    if (prevStage !== state.stage) {
      const survivingPlayers = getSurvivors(state, players);
      const anyDied = killPlayers(
        (p) => !survivingPlayers.includes(p.designation)
      );
      if (anyDied) {
        preventProgress();
      }
      setPrevStage(state.stage);
    }
  }, [players, state, prevStage, killPlayers, preventProgress, getSurvivors]);

  useEffect(() => {
    if (hasFinished(state)) {
      preventMovement();
      preventProgress();
    }
  }, [state, preventMovement, preventProgress, hasFinished]);

  return { state, players, restart, onMove, safeLocation };
};
