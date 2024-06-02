import { createLazyFileRoute } from "@tanstack/react-router";
import { DartboardArena } from "../../../../../aai/statice/DartboardArena";

export const Route = createLazyFileRoute(
  "/mechanics/criterion/aai/statice/intermission"
)({
  component: DartboardArena,
});
