import { createFileRoute } from "@tanstack/react-router";
import {
  DevelopmentStage,
  MechanicFight,
  SelectMechanic,
} from "../../../../SelectMechanic";

const aloaloFights: MechanicFight[] = [
  {
    name: "Statice",
    mechanics: [
      {
        developmentStage: DevelopmentStage.Alpha,
        name: "Intermission",
        link: "/mechanics/criterion/aai/statice/intermission",
      },
    ],
  },
];

export const Route = createFileRoute("/mechanics/criterion/aai/")({
  component: () => <SelectMechanic fights={aloaloFights} />,
});
