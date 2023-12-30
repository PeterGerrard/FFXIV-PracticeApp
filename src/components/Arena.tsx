import { PropsWithChildren } from "react";
import { Player, PlayerComponent } from "../gamestate/Player";
import { DangerPuddle, DangerPuddlesDisplay } from "../gamestate/Mechanics/DangerPuddles";
import { Point } from "@flatten-js/core";
import { getPosition } from "../gamestate/htmlHelpers";
import { PartyList } from "../gamestate/PartyList/PartyList";

export const Arena = (
    props: PropsWithChildren<{
        players: Player[];
        moveTo: (p: Point) => void;
        dangerPuddles: DangerPuddle[];
        showPartyList: boolean
    }>
) => {
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
                {props.players.map((p, i) => (
                    <PlayerComponent key={i} player={p} />
                ))}
                <DangerPuddlesDisplay puddles={props.dangerPuddles} />
            </div>
            {props.showPartyList && <div style={{ gridArea: "debuffs", maxHeight: "100%", display: "flex", flexDirection: "column" }}>
                <PartyList players={props.players} />
            </div>}
        </div>
    );
};
