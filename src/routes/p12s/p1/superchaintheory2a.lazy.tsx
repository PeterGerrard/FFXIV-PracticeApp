import { createLazyFileRoute } from "@tanstack/react-router";
import { SuperchainTheory2A } from "../../../gamestate/P12SP1/SuperchainTheory2A";

export const Route = createLazyFileRoute("/p12s/p1/superchaintheory2a")({
  component: SuperchainTheory2A,
});
