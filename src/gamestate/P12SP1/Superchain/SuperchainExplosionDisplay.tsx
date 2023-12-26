import { Point } from "@flatten-js/core";
import { SuperchainExplosion, getChainColour, getSrc } from "./explosionTypes";


export const SuperchainExplosionDisplay = (props: {
    explosion: SuperchainExplosion;
    position: Point;
    target: Point;
}): JSX.Element => {
    return (
        <>
            <svg
                height="100%"
                width="100%"
                style={{
                    position: "absolute",
                    left: `0`,
                    top: `0`,
                }}
                viewBox="0 0 1 1"
            >
                <line
                    x1={props.position.x}
                    y1={props.position.y}
                    x2={props.target.x}
                    y2={props.target.y}
                    stroke={getChainColour(props.explosion)}
                    strokeWidth={0.01} />
            </svg>
            <img
                src={getSrc(props.explosion)}
                height="7.5%"
                width="7.5%"
                style={{
                    position: "absolute",
                    left: `${props.position.x * 100}%`,
                    top: `${props.position.y * 100}%`,
                    transform: "translate(-50%, -50%)",
                }} />
        </>
    );
};
