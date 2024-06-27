import { Separator } from "@radix-ui/react-select";
import { Link, createFileRoute } from "@tanstack/react-router";
import { FightGroupSelector } from "../components/Selector/FightGroupSelector";
import { SelectorGroup } from "../components/Selector/SelectorGroup";

export const Route = createFileRoute("/")({
  component: () => (
    <div className="p-4">
      <p>
        Welcome to Jess' FFXIV mechanic simulator, this contains a selection of
        mechanic practice apps for specific mechanics in hard content that I
        want to learn and/or practice
      </p>
      <p>
        Anyone is welcome to use it, use setup to select your role and
        configuration for full or light party content.
      </p>
      <p>
        For more information see the <Link to="/about">about page</Link>
      </p>
      <Separator className="p-4" />
      <SelectorGroup>
        <FightGroupSelector to="/mechanics/endwalker" name="Endwalker" />
        <FightGroupSelector to="/mechanics/dawntrail" name="Dawntrail" />
      </SelectorGroup>
    </div>
  ),
});
