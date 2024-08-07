import { createFileRoute } from "@tanstack/react-router";
import {
  DevelopmentStage,
  MechanicFight,
  SelectMechanic,
} from "../../../../SelectMechanic";

const dtTier1Fights: MechanicFight[] = [
  {
    name: "M1S",
    mechanics: [
      {
        developmentStage: DevelopmentStage.Beta,
        link: "/mechanics/dawntrail/lightweight/mouser1",
        name: "Mouser 1",
      },
      {
        developmentStage: DevelopmentStage.Dev,
        link: "/mechanics/dawntrail/lightweight/clones",
        name: "Clone Shenanigans",
      },
    ],
  },
  {
    name: "M2S",
    mechanics: [],
  },
  {
    name: "M3S",
    mechanics: [],
  },
  {
    name: "M4S",
    mechanics: [],
  },
];

export const Route = createFileRoute("/mechanics/dawntrail/lightweight/")({
  component: () => <SelectMechanic fights={dtTier1Fights} />,
});
