export const ArenaSection = (props: { x: number, y: number, isDamaged: boolean, isDestroyed: boolean}) => {
    if (props.isDestroyed){
        return <></>
    }

    return <>
        <g transform={`translate(${0.25*props.x},${0.25*props.y})`}>
            <rect x={0} width={0.25} y={0} height={0.25} fill={props.isDamaged ? "purple" : "blue"} stroke="grey" strokeWidth={0.01} />
            <rect x={-0.005} width={0.01} y={-0.005} height={0.01} fill={props.isDamaged ? "pink" : "lightblue"} transform="translate(0.125,0.125) rotate(45)" />
        </g>
    </>
}