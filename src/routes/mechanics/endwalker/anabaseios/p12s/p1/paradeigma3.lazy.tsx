import { createLazyFileRoute } from "@tanstack/react-router";
import { Paradeigma3 } from "../../../../../../gamestate/P12SP1/Paradeigma3";

export const Route = createLazyFileRoute("/mechanics/endwalker/anabaseios/p12s/p1/paradeigma3")({
  component: Paradeigma3,
});
