import { ArenaSection } from "./ArenaSection"
import { PropsWithChildren } from "react";

const includes = (sections: [number, number][], x: number, y: number) => {
    return sections.some(([a,b]) => a === x && b === y)
}

export const Mouser1Arena = (props: PropsWithChildren<{
    destroyedSections: [number,number][];
    damagedSections: [number,number][];
    }>) => {
    return <svg viewBox="0 0 1 1" style={{ width: "100%", height: "100%" }}>
        {[0,1,2,3].flatMap(x => [0,1,2,3].map(y => <ArenaSection key={x*10 + y} x={x} y={y} isDamaged={includes(props.damagedSections, x,y)}  isDestroyed={includes(props.destroyedSections, x,y)} />))}
        {props.children}
    </svg>
    
}