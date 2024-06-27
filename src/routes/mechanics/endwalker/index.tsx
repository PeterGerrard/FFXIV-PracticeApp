import { createFileRoute } from "@tanstack/react-router";
import { SelectorGroup } from "../../../components/Selector/SelectorGroup";
import { FightGroupSelector } from "../../../components/Selector/FightGroupSelector";

export const Route = createFileRoute("/mechanics/endwalker/")({
  component: () => (
    <SelectorGroup>
      <FightGroupSelector
        to="/mechanics/endwalker/anabaseios"
        name="Anabaseios"
      />
    </SelectorGroup>
  ),
});
