import { createLazyFileRoute } from "@tanstack/react-router";
import { ClassicalConcepts2 } from "../../../gamestate/P12SP2/Classical2";

export const Route = createLazyFileRoute("/p12s/p2/classical2")({
  component: ClassicalConcepts2,
});
