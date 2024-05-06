import { createLazyFileRoute } from "@tanstack/react-router";
import { SetupForm } from "../gamestate/Setup/SetupForm";

export const Route = createLazyFileRoute("/setup")({
  component: SetupForm,
});
