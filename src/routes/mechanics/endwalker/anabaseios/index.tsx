import { createFileRoute } from "@tanstack/react-router";
import { DevelopmentStage, MechanicFight, SelectMechanic } from "../../../../SelectMechanic";

const anabaseiosFights: MechanicFight[] = [
  {
    name: "P11S",
    mechanics: [
      {
        developmentStage: DevelopmentStage.Prod,
        link: "/p11s/darkandlight",
        name: "Dark and Light",
      },
      {
        developmentStage: DevelopmentStage.Prod,
        link: "/p11s/letterofthelaw",
        name: "Letter of the Law",
      },
    ],
  },
  {
    name: "P12S Phase 1",
    mechanics: [
      {
        developmentStage: DevelopmentStage.Prod,
        link: "/p12s/p1/superchaintheory1",
        name: "Superchain Theory 1",
      },
      {
        developmentStage: DevelopmentStage.Prod,
        link: "/p12s/p1/paradeigma3",
        name: "Paradeigma 3",
      },
      {
        developmentStage: DevelopmentStage.Prod,
        link: "/p12s/p1/superchaintheory2a",
        name: "Superchain Theory II A",
      },
      {
        developmentStage: DevelopmentStage.Prod,
        link: "/p12s/p1/superchaintheory2b",
        name: "Superchain Theory II B",
      },
    ],
  },
  {
    name: "P12S Phase 2",
    mechanics: [
      {
        developmentStage: DevelopmentStage.Prod,
        link: "/p12s/p2/classical1",
        name: "Classical Concepts 1",
      },
      {
        developmentStage: DevelopmentStage.Prod,
        link: "/p12s/p2/caloric1",
        name: "Caloric 1",
      },
      {
        developmentStage: DevelopmentStage.Beta,
        link: "/p12s/p2/classical2",
        name: "Classical Concepts 2",
      },
      {
        developmentStage: DevelopmentStage.Beta,
        link: "/p12s/p2/caloric2",
        name: "Caloric 2",
      },
    ],
  },
];

export const Route = createFileRoute("/mechanics/endwalker/anabaseios/")({
  component: () => <SelectMechanic fights={anabaseiosFights} />,
});
