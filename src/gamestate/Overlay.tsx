import { Point } from "@flatten-js/core";
import { Player } from "./Player";
import { DeathOverlay } from "./Death/DeathOverlay";

export const Overlay = (props: { players: Player[]; finished: boolean; safeLocation: Point; }) => {
    const { players, finished, safeLocation } = props;

    if (players.some(s => !s.alive)) {
        return <DeathOverlay safeLocation={safeLocation} />;
    }

    if (finished) {
        return <>
            <h1
                style={{
                    position: "absolute",
                    left: `50%`,
                    top: `50%`,
                    transformOrigin: "0 0",
                    transform: `translate(-50%,0)`,
                    fontSize: "min(12vi, 12vb)",
                    color: "hotpink",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                Finished!
            </h1>
        </>;
    }

    return <></>;
};
