import { createFileRoute } from "@tanstack/react-router";
import { SelectMechanic } from "../../../../SelectMechanic";

export const Route = createFileRoute("/mechanics/endwalker/anabaseios/")({
  component: SelectMechanic,
});
