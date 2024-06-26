import { createLazyFileRoute } from "@tanstack/react-router";
import { DarkAndLight } from "../../../../../gamestate/P11S/DarkAndLight/DarkAndLight";

export const Route = createLazyFileRoute("/mechanics/endwalker/anabaseios/p11s/darkandlight")({
  component: DarkAndLight,
});
