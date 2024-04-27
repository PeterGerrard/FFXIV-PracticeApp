import React, { PropsWithChildren, useContext } from "react";
import { Player, PlayerComponent } from "../gamestate/Player";
import { Point } from "@flatten-js/core";
import { getPosition } from "../gamestate/htmlHelpers";
import { PartyList } from "../gamestate/PartyList/PartyList";
import { SetupContext } from "../gamestate/Setup/Setup";
import { Mechanic } from "../gamestate/mechanics";

export type PlayerWithMarker = Player & {
  marker?: string;
};

export const Arena = <TPlayer extends PlayerWithMarker>(
  props: PropsWithChildren<{
    players: TPlayer[];
    moveTo: (p: Point) => void;
    mechanic: Mechanic<TPlayer>;
    showPartyList: boolean;
  }>
) => {
  const {
    state: { playerIconSize },
  } = useContext(SetupContext);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateAreas: `
      'arena debuffs'
      'cast empty'
`,
        gridTemplateColumns: "min(75vw,75vh) 25vw",
        gridTemplateRows: "min(75vw,75vh) auto",
      }}
    >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          aspectRatio: "1 / 1",
          gridArea: "arena",
          maxHeight: "100%",
          maxWidth: "100%",
        }}
        onClick={(e) => {
          const p = getPosition(e.currentTarget);
          return props.moveTo(
            new Point(
              (e.clientX - p.x) / e.currentTarget.offsetWidth,
              (e.clientY - p.y) / e.currentTarget.offsetHeight
            )
          );
        }}
      >
        {props.children}
        {props.players.map((p) => (
          <React.Fragment key={p.designation}>
            <PlayerComponent player={p} />
            {"marker" in p && p.marker && (
              <img
                src={p.marker}
                style={{
                  position: "absolute",
                  left: `${p.position.x * 100}%`,
                  top: `${(p.position.y - playerIconSize) * 100}%`,
                  height: `${playerIconSize * 100}%`,
                  width: `${playerIconSize * 100}%`,
                  transform: "translate(-50%, -50%)",
                  opacity: p.controlled ? 1 : 0.5,
                }}
              />
            )}
          </React.Fragment>
        ))}
        {props.mechanic.display(false)}
      </div>
      {props.showPartyList && (
        <div
          style={{
            gridArea: "debuffs",
            maxHeight: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <PartyList players={props.players} />
        </div>
      )}
    </div>
  );
};
