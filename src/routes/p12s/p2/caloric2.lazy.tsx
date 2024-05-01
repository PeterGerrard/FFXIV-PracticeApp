import { createLazyFileRoute } from "@tanstack/react-router";
import { CaloricTheory2 } from "../../../gamestate/P12SP2/Caloric2";

export const Route = createLazyFileRoute("/p12s/p2/caloric2")({
  component: CaloricTheory2,
});
