import { createLazyFileRoute } from "@tanstack/react-router";
import { Arena } from "../../components/Arena";
import { useEffect, useState } from "react";
import { circleMechanic } from "../../gamestate/Mechanics/CircleAoE";
import { Point, point } from "@flatten-js/core";
import { SimpleKillProfile } from "../../gamestate/Mechanics/DangerPuddles";
import {
  Mechanic,
  afterMove,
  automatic,
  composeMechanics,
  sequence,
  useMechanic,
  withSafeSpot,
} from "../../gamestate/mechanics";
import { getRandomPos } from "../../gamestate/gameState";
import { Player } from "../../gamestate/Player";
import { progress } from "../../gamestate/P11S/DarkAndLight";

const sampleSafeSpots = (_players: Player[], player: Player): Point[] => {
  switch (player.role) {
    case "Tank":
      return [point(0.5, 0.1)];
    case "Healer":
      return [point(0.5, 0.9)];
    case "DPS":
      return [point(0.9, 0.5)];
  }
};

const sampleMechanic = sequence(
  afterMove(
    withSafeSpot(
      circleMechanic(point(0.5, 0.5), 0.25, SimpleKillProfile),
      sampleSafeSpots
    )
  ),
  afterMove(
    withSafeSpot(
      automatic(
        composeMechanics([
          circleMechanic(point(0, 0), 0.25, SimpleKillProfile),
          circleMechanic(point(0, 1), 0.25, SimpleKillProfile),
          circleMechanic(point(1, 0), 0.25, SimpleKillProfile),
          circleMechanic(point(1, 1), 0.25, SimpleKillProfile),
        ]),
        1000
      ),
      sampleSafeSpots
    )
  )
);

export const Route = createLazyFileRoute("/dev/simpleaoe")({
  component: () => {
    const [mechanic, players, restart, move] = useMechanic<Player>(
      sampleMechanic,
      () => [
        {
          alive: true,
          controlled: true,
          debuffs: [],
          designation: "H2",
          distanceTravelled: 0,
          position: getRandomPos(() => true),
          role: "Healer",
        },
        {
          alive: true,
          controlled: false,
          debuffs: [],
          designation: "MT",
          distanceTravelled: 0,
          position: getRandomPos(() => true),
          role: "Tank",
        },
      ]
    );
    return (
      <Arena
        players={players}
        mechanic={mechanic}
        moveTo={move}
        showPartyList={false}
      >
        <svg viewBox="0 0 1 1">
          <rect x={0} y={0} width={1} height={1} fill="lightblue" />
        </svg>
      </Arena>
    );
  },
});
