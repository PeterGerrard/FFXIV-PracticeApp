import { createLazyFileRoute } from "@tanstack/react-router";
import { SuperchainTheory2B } from "../../../gamestate/P12SP1/SuperchainTheory2B";

export const Route = createLazyFileRoute("/p12s/p1/superchaintheory2b")({
  component: SuperchainTheory2B,
});
