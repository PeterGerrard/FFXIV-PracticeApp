import { Point } from "@flatten-js/core";
import { Arena } from "../P12SP1Arena";
import DarkTower from "./assets/darktower.png";
import LightTower from "./assets/lighttower.png";
import { SuperchainExplosionDisplay } from "../Superchain/SuperchainExplosionDisplay";
import { SuperchainTheory1Player, SuperchainTheoryGameState, getDangerPuddles } from ".";

export const SuperchainTheory1Arena = (props: {
    players: SuperchainTheory1Player[];
    gameState: SuperchainTheoryGameState;
    moveTo: (p: Point) => void;
    animationEnd: () => void;
}) => {
    return (
        <Arena
            players={props.players}
            moveTo={props.moveTo}
            dangerPuddles={getDangerPuddles(
                props.gameState,
                props.animationEnd,
                props.players
            )}
        >
            {props.gameState.stage === "Initial" && (
                <>
                    <SuperchainExplosionDisplay
                        explosion={props.gameState.initialExplosions[0]}
                        position={props.gameState.initialCorner.translate(-0.1, 0)}
                        target={props.gameState.initialCorner} />
                    <SuperchainExplosionDisplay
                        explosion={props.gameState.initialExplosions[1]}
                        position={props.gameState.initialCorner.translate(0, -0.1)}
                        target={props.gameState.initialCorner} />
                </>
            )}

            {(props.gameState.stage === "Explosion1" ||
                props.gameState.stage === "Inter1") && (
                    <>
                        <SuperchainExplosionDisplay
                            explosion={props.gameState.secondCorners[0][1]}
                            position={props.gameState.secondCorners[0][0].translate(0.2, 0.2)}
                            target={props.gameState.secondCorners[0][0]} />
                        <SuperchainExplosionDisplay
                            explosion={props.gameState.secondCorners[1][1]}
                            position={props.gameState.secondCorners[1][0].translate(0.2, 0.2)}
                            target={props.gameState.secondCorners[1][0]} />
                    </>
                )}

            {(props.gameState.stage === "Lasers" ||
                props.gameState.stage === "Inter2") && (
                    <>
                        <SuperchainExplosionDisplay
                            explosion={props.gameState.finalExplosions[0]}
                            position={props.gameState.finalCorner.translate(-0.1, -0.1)}
                            target={props.gameState.finalCorner} />
                        <SuperchainExplosionDisplay
                            explosion={props.gameState.finalExplosions[1]}
                            position={props.gameState.finalCorner.translate(-0.2, 0.1)}
                            target={props.gameState.finalCorner} />
                    </>
                )}

            {props.gameState.stage === "DropTower" && (
                <>
                    <img
                        src={DarkTower}
                        style={{
                            position: "absolute",
                            left: `${props.gameState.darkTower.x * 100}%`,
                            top: `${props.gameState.darkTower.y * 100}%`,
                            width: "10%",
                            translate: "-50% -80%",
                        }} />
                    <img
                        src={LightTower}
                        style={{
                            position: "absolute",
                            left: `${props.gameState.lightTower.x * 100}%`,
                            top: `${props.gameState.lightTower.y * 100}%`,
                            width: "10%",
                            translate: "-50% -80%",
                        }} />
                </>
            )}
        </Arena>
    );
};
