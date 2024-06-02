import { createFileRoute } from "@tanstack/react-router";
import { AloaloSelectMechanic } from "../../../../SelectMechanic";

export const Route = createFileRoute("/mechanics/criterion/aai/")({
  component: AloaloSelectMechanic,
});
