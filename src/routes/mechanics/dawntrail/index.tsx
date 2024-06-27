import { createFileRoute } from "@tanstack/react-router";
import { SelectorGroup } from "../../../components/Selector/SelectorGroup";
import { FightGroupSelector } from "../../../components/Selector/FightGroupSelector";

export const Route = createFileRoute("/mechanics/dawntrail/")({
  component: () => (
    <SelectorGroup>
      <FightGroupSelector to="/mechanics/dawntrail/tier1" name="Tier 1" />
    </SelectorGroup>
  ),
});
