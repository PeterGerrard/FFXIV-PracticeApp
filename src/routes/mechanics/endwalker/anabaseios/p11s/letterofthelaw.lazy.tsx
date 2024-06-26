import { createLazyFileRoute } from "@tanstack/react-router";
import { LetterOfTheLaw } from "../../../../../gamestate/P11S/LetterOfTheLaw/LetterOfTheLaw";

export const Route = createLazyFileRoute(
  "/mechanics/endwalker/anabaseios/p11s/letterofthelaw"
)({
  component: LetterOfTheLaw,
});
