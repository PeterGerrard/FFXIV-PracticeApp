import { Point } from "@flatten-js/core";
import { Arena } from "../../../../components/Arena"
import { Player } from "../../../../gamestate/Player";
import { ArenaSection } from "./ArenaSection"
import { Mechanic } from "../../../../gamestate/mechanics";
import { PropsWithChildren } from "react";

const includes = (sections: [number, number][], x: number, y: number) => {
    return sections.some(([a,b]) => a === x && b === y)
}

export const Mouser1Arena = (props: PropsWithChildren<{players: Player[];
    moveTo: (p: Point) => void;
    mechanic: Mechanic<Player>;
    destroyedSections: [number,number][];
    damagedSections: [number,number][];
    }>) => {
    return <Arena {...props} showPartyList={false}>

    <svg viewBox="0 0 1 1" style={{ width: "100%", height: "100%" }}>
        {[0,1,2,3].flatMap(x => [0,1,2,3].map(y => <ArenaSection key={x*10 + y} x={x} y={y} isDamaged={includes(props.damagedSections, x,y)}  isDestroyed={includes(props.destroyedSections, x,y)} />))}
        {props.children}
    </svg>
    </Arena>
    
}