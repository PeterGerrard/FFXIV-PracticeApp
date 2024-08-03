import { PropsWithChildren } from "react";
import { Mouser1ArenaSection } from "./ArenaSection";
import { Mouser1Arena } from "./Arena";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Arena } from "../../../../components/Arena";
import { Player } from "../../../../gamestate/Player";
import { Point } from "@flatten-js/core";
import { emptyMechanic, Mechanic } from "../../../../gamestate/mechanics";
import { MechanicDisplay } from "../../../../gamestate/Mechanics/MechanicDisplay";

const sections = [0, 1, 2, 3].flatMap((x) =>
  [0, 1, 2, 3].map<Mouser1ArenaSection>((y) => ({ x, y, status: "Safe" }))
);

export const FullMouser1Arena = (
  props: PropsWithChildren<{
    restart: () => void;
    players: Player[];
    moveTo: (p: Point) => void;
    mechanic: Mechanic<Player>;
  }>
) => {
  return (
    <div className="flex flex-col">
      <div>
        <Button onClick={() => props.restart()}>
          Reset
          <ReloadIcon />
        </Button>
      </div>
      <Arena
        players={props.players}
        moveTo={props.moveTo}
        mechanic={emptyMechanic()}
        showPartyList={false}
      >
        <Mouser1Arena sections={sections}>
          {props.children}
          <MechanicDisplay mechanic={props.mechanic} players={props.players} />
        </Mouser1Arena>
      </Arena>
    </div>
  );
};
