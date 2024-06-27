import { createFileRoute } from "@tanstack/react-router";
import { MechanicFight, SelectMechanic } from "../../../../SelectMechanic";

const dtTier1Fights: MechanicFight[] = [
  {
    name: "R1S",
    mechanics: [],
  },
  {
    name: "R2S",
    mechanics: [],
  },
  {
    name: "R3S",
    mechanics: [],
  },
  {
    name: "R4S",
    mechanics: [],
  },
];

export const Route = createFileRoute("/mechanics/dawntrail/tier1/")({
  component: () => <SelectMechanic fights={dtTier1Fights} />,
});
