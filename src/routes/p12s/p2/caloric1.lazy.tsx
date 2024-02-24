import { createLazyFileRoute } from "@tanstack/react-router";
import { CaloricConcepts1 } from "../../../gamestate/P12SP2/Caloric1";

export const Route = createLazyFileRoute("/p12s/p2/caloric1")({
  component: CaloricConcepts1,
});
