import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/mechanics/criterion/aai/statice/intermission"
)({
  component: () => (
    <div>Hello /mechanics/criterion/aai/statice/intermission!</div>
  ),
});
