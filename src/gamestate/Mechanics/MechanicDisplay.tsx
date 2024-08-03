import { PropsWithChildren } from "react";
import { Mechanic } from "../mechanics";
import { LightPlayer, Player } from "../Player";

export const MechanicDisplay = <TPlayer extends Player | LightPlayer>(
  props: PropsWithChildren<{
    players: TPlayer[];
    mechanic: Mechanic<TPlayer>;
  }>
) => {
  return props.mechanic.display(props.players, false);
};
