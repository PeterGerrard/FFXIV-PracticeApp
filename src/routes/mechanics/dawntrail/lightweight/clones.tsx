import { createFileRoute } from "@tanstack/react-router";
import { BlackCatClones } from "../../../../aac/lhw/m1s/Clones";

export const Route = createFileRoute("/mechanics/dawntrail/lightweight/clones")(
  {
    component: BlackCatClones,
  }
);
