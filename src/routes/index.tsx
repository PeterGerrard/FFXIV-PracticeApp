import { createFileRoute } from "@tanstack/react-router";
import { SelectMechanic } from "../SelectMechanic";

export const Route = createFileRoute("/")({
  component: SelectMechanic,
});
