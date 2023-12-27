import { PropsWithChildren, useCallback, useContext, useEffect, useState } from "react"
import { Arena } from "../P12SP1Arena"
import { SuperchainExplosionDisplay } from "../Superchain/SuperchainExplosionDisplay"
import { SuperchainTheory2aGameState, createInitialState, getDangerPuddles, getTargetSpot, nextStep } from "./states"
import { Point, point } from "@flatten-js/core"
import { Player } from "../../Player"
import { Designations, getRandomPos, getRole } from "../../gameState"
import { survivePuddles } from "../../Mechanics/DangerPuddles"
import { SetupContext } from "../../Setup/Setup"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { DeathOverlay } from "../../Death/DeathOverlay"

const Overlay = (props: { players: Player[], state: SuperchainTheory2aGameState, safeLocation: Point }) => {
    const { players, state, safeLocation } = props;

    if (players.some(s => !s.alive)) {
        return <DeathOverlay safeLocation={safeLocation} />
    }

    if (state.stage === "Explosion4") {
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
        </>
    }

    return <></>
}

export const SuperchainTheory2A = () => {
    const setup = useContext(SetupContext)
    const [state, setState] = useState(createInitialState());
    const [prevStage, setPrevStage] = useState<SuperchainTheory2aGameState["stage"] | undefined>();
    const [players, setPlayers] = useState<Player[]>(Designations.map(d => ({
        alive: true,
        controlled: setup.state.designation === d,
        debuffs: [],
        designation: d,
        position: getRandomPos(),
        role: getRole(d)
    }))); 7
    const [safeLocation, setSafeLocation] = useState(point())

    const restart = () => {
        setState(createInitialState());
        setPrevStage(undefined);
        setPlayers(Designations.map(d => ({
            alive: true,
            controlled: setup.state.designation === d,
            debuffs: [],
            designation: d,
            position: getRandomPos(),
            role: getRole(d)
        })))
    }

    const autoProgress = state.stage === "Trinity" && state.displayed < 3;

    const onAnimationEnd = useCallback(() => {
        if (players.some(x => !x.alive)) {
            return;
        }
        if (autoProgress) {
            setState(nextStep(state))
            setPrevStage(state.stage);
        }
    }, [state, autoProgress, players])
    const onMove = useCallback((newPoint: Point) => {
        if (players.some(x => !x.alive)) {
            return;
        }
        if (!autoProgress) {
            setPlayers(players.map(p => p.controlled ? { ...p, position: newPoint } : { ...p, position: getTargetSpot(state, p) }))
            setState(nextStep(state))
            setPrevStage(state.stage);
            setSafeLocation(getTargetSpot(state, players.filter(p => p.controlled)[0]))
        }
    }, [state, players, autoProgress])

    useEffect(() => {
        let mounted = true;
        setTimeout(() => mounted && onAnimationEnd(), 500);
        return () => {
            mounted = false;
        };
    }, [onAnimationEnd]);

    useEffect(() => {
        if (prevStage !== state.stage) {
            const survivingPlayers = survivePuddles(
                getDangerPuddles(state, players),
                players
            );
            setPlayers(players.map(p => ({ ...p, alive: p.alive && survivingPlayers.includes(p.designation) })))
            setPrevStage(state.stage)
        }
    }, [players, state, prevStage])

    const dangerPuddles = getDangerPuddles(state, players);

    const displayTrinity1 = (state.stage === "Trinity" && state.displayed >= 1)
    const displayTrinity2 = (state.stage === "Trinity" && state.displayed >= 2) || state.stage === "Explosion1"
    const displayTrinity3 = (state.stage === "Trinity" && state.displayed >= 3) || state.stage === "Explosion1" || state.stage === "Explosion2"

    const shortChainLength = (state.stage === "Initial" || state.stage === "Trinity") ? 1 : 0;
    const mediumChainLength = shortChainLength > 0 ? 1 : state.stage === "Explosion1" ? 0.5 : 0;
    const longChainLength = shortChainLength > 0 ? 1 : mediumChainLength > 0 ? 0.67 : state.stage === "Explosion2" ? 0.33 : state.stage === "Explosion3" ? 0.05 : 0;

    return <Stack flexDirection="column">
        <div>
            <Button endIcon={<RestartAltIcon />} onClick={() => restart()}>
                Reset
            </Button>
        </div>
        <div
            style={{
                display: "inline-block",
                width: "75vh",
                height: "75vh",
                position: "relative",
            }}
        >
            <Arena players={players} dangerPuddles={dangerPuddles} moveTo={onMove} bossDirection={state.stage === "Explosion2" ? "South" : "North"}>
                {shortChainLength > 0 && <>
                    <SuperchainExplosionDisplay explosion={state.short.north} position={point(0.25, 0.25)} target={point(0.5, 0.25)} />
                    <SuperchainExplosionDisplay explosion="Circle" position={point(0.25, 0.5)} target={point(0.5, 0.5)} />
                    <SuperchainExplosionDisplay explosion={state.short.south} position={point(0.25, 0.75)} target={point(0.5, 0.75)} />
                </>}
                {mediumChainLength > 0 && <>
                    <SuperchainExplosionDisplay explosion="Donut" position={point(0.5, 0).scale(mediumChainLength, mediumChainLength).translate(0.5, 0.5)} target={point(0.5, 0.5)} />
                </>}
                {longChainLength > 0 && <>
                    <SuperchainExplosionDisplay explosion={state.long.north} position={point(0.5, 0.75).scale(longChainLength, longChainLength).translate(0.5, 0.25)} target={point(0.5, 0.25)} />
                    <SuperchainExplosionDisplay explosion="Circle" position={point(-0.5, -0.5).scale(longChainLength, longChainLength).translate(0.5, 0.5)} target={point(0.5, 0.5)} />
                    <SuperchainExplosionDisplay explosion={state.long.south} position={point(0.5, -0.75).scale(longChainLength, longChainLength).translate(0.5, 0.75)} target={point(0.5, 0.75)} />
                </>}
                <svg
                    height="100%"
                    width="100%"
                    transform={state.stage === "Explosion2" ? "scale(-1,1)" : ""}
                    origin="0.5 0.5"
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                    }} viewBox="0 0 1 1">
                    {displayTrinity1 && <circle cx={state.trinity[0] === "Left" ? 0.4 : 0.6} cy={0.625} fill="transparent" r={0.05} stroke="orange" strokeWidth={0.01} />}
                    {displayTrinity2 && <circle cx={state.trinity[1] === "Left" ? 0.3 : 0.7} cy={0.5} fill="transparent" r={0.05} stroke="orange" strokeWidth={0.01} />}
                    {displayTrinity3 && <circle cx={state.trinity[2] === "Left" ? 0.35 : 0.65} cy={0.375} fill="transparent" r={0.05} stroke="orange" strokeWidth={0.01} />}
                </svg>
                <Overlay players={players} state={state} safeLocation={safeLocation} />
            </Arena>
        </div>
    </Stack>
}