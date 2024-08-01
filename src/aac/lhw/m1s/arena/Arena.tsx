import { ArenaSection } from "./ArenaSection"

export const Arena = () => {
    return <svg viewBox="0 0 1 1" style={{ width: "800px", height: "800px" }}>
        {[0,1,2,3].flatMap(x => [0,1,2,3].map(y => <ArenaSection key={x*10 + y} x={x} y={y} />))}
    </svg>
}