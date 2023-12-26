import { Point, point } from "@flatten-js/core";
import { DangerPuddle } from "../../Mechanics/DangerPuddles";
import { SuperchainExplosion, SuperchainExplosionInOut, getSuperChainDangerPuddles } from "../Superchain/explosionTypes"
import { Player } from "../../Player";

type TrinitySide = "Left" | "Right";

type InitialState = {
    stage: "Initial",
    short: {
        north: "Circle",
        middle: "Circle",
        south: "Pair"
    } | {
        north: "Pair",
        middle: "Circle",
        south: "Circle"
    },
    long: {
        north: "Circle",
        middle: "Circle",
        south: Exclude<SuperchainExplosion, SuperchainExplosionInOut>
    } | {
        north: Exclude<SuperchainExplosion, SuperchainExplosionInOut>,
        middle: "Circle",
        south: "Circle"
    },
    trinity: [TrinitySide, TrinitySide, TrinitySide]
}

type Trinity = Omit<InitialState, "stage"> & {
    stage: "Trinity",
    displayed: 0 | 1 | 2 | 3
}

type Explosion1 = Omit<InitialState, "stage"> & {
    stage: "Explosion1"
}

type Explosion2 = Omit<InitialState, "stage"> & {
    stage: "Explosion2"
}

type Explosion3 = Omit<InitialState, "stage"> & {
    stage: "Explosion3"
}

type Explosion4 = Omit<InitialState, "stage"> & {
    stage: "Explosion4"
}

export type SuperchainTheory2aGameState = InitialState | Trinity | Explosion1 | Explosion2 | Explosion3 | Explosion4

export const createInitialState = (): SuperchainTheory2aGameState => {
    return {
        stage: "Initial",
        short: {
            north: "Circle",
            middle: "Circle",
            south: "Pair"
        },
        long: {
            north: "Circle",
            middle: "Circle",
            south: "Protean"
        },
        trinity: ["Left", "Right", "Left"]
    }
}

export const getDangerPuddles = (state: SuperchainTheory2aGameState, players: Player[]): DangerPuddle[] => {
    if (state.stage === "Explosion1") {
        return [
            {
                type: "line",
                angle: state.trinity[0] === "Left" ? Math.PI / 2 : 3 * Math.PI / 2,
                damage: 2,
                debuffRequirement: null,
                instaKill: null,
                onAnimationEnd: () => { },
                roleRequirement: null,
                source: point(0.5, 0.5),
                split: false,
                width: 2,
                colour: "blue"
            },
            ...getSuperChainDangerPuddles([state.short.north], point(0.5, 0.25), players, () => { }),
            ...getSuperChainDangerPuddles([state.short.middle], point(0.5, 0.5), players, () => { }),
            ...getSuperChainDangerPuddles([state.short.south], point(0.5, 0.75), players, () => { })
        ]
    }
    if (state.stage === "Explosion2") {
        return [
            {
                type: "line",
                angle: state.trinity[1] === "Left" ? 3 * Math.PI / 2 : Math.PI / 2,
                damage: 2,
                debuffRequirement: null,
                instaKill: null,
                onAnimationEnd: () => { },
                roleRequirement: null,
                source: point(0.5, 0.5),
                split: false,
                width: 2,
                colour: "blue"
            },
            ...getSuperChainDangerPuddles(["Donut"], point(0.5, 0.5), players, () => { })
        ]
    }
    if (state.stage === "Explosion3") {
        return [
            {
                type: "line",
                angle: state.trinity[2] === "Left" ? Math.PI / 2 : 3 * Math.PI / 2,
                damage: 2,
                debuffRequirement: null,
                instaKill: null,
                onAnimationEnd: () => { },
                roleRequirement: null,
                source: point(0.5, 0.5),
                split: false,
                width: 2,
                colour: "blue"
            }
        ]
    }
    if (state.stage === "Explosion4") {
        return [
            ...getSuperChainDangerPuddles([state.long.north], point(0.5, 0.25), players, () => { }),
            ...getSuperChainDangerPuddles([state.long.middle], point(0.5, 0.5), players, () => { }),
            ...getSuperChainDangerPuddles([state.long.south], point(0.5, 0.75), players, () => { })
        ]
    }
    return [];
}

const addOne = (n: 0 | 1 | 2): 1 | 2 | 3 => {
    return (n + 1) as 1 | 2 | 3;
}

export const nextStep = (state: SuperchainTheory2aGameState): SuperchainTheory2aGameState => {
    if (state.stage === "Initial") {
        return {
            ...state,
            stage: "Trinity",
            displayed: 0
        }
    }
    if (state.stage === "Trinity") {
        if (state.displayed != 3) {
            return {
                ...state,
                displayed: addOne(state.displayed)
            }
        }
        return {
            ...state,
            stage: "Explosion1"
        }
    }
    if (state.stage === "Explosion1") {
        return {
            ...state,
            stage: "Explosion2"
        }
    }
    if (state.stage === "Explosion2") {
        return {
            ...state,
            stage: "Explosion3"
        }
    }
    if (state.stage === "Explosion3") {
        return {
            ...state,
            stage: "Explosion4"
        }
    }
    return state;
}

export const getTargetSpot = (state: SuperchainTheory2aGameState, player: Player): Point => {
    if (state.stage === "Initial") {
        const ys = state.short.north === "Circle" ? [0.7, 0.73, 0.76, 0.8] : [0.3, 0.27, 0.24, 0.2];
        switch (player.designation) {
            case "MT":
            case "M1":
                return point(0.5, ys[0])
            case "OT":
            case "M2":
                return point(0.5, ys[1])
            case "H1":
            case "R1":
                return point(0.5, ys[2])
            case "H2":
            case "R2":
                return point(0.5, ys[3])
        }
    }
    if (state.stage === "Trinity") {
        const xs = state.trinity[0] === "Left" ? [0.55, 0.6] : [0.45, 0.4];
        const ys = state.short.north === "Circle" ? [0.7, 0.73, 0.76, 0.8] : [0.3, 0.27, 0.24, 0.2];
        switch (player.designation) {
            case "MT":
            case "M1":
                return point(xs[0], ys[0])
            case "OT":
            case "M2":
                return point(xs[1], ys[1])
            case "H1":
            case "R1":
                return point(xs[1], ys[2])
            case "H2":
            case "R2":
                return point(xs[0], ys[3])
        }
    }
    if (state.stage === "Explosion1") {
        return point(state.trinity[1] === "Left" ? 0.4 : 0.6, 0.5)
    }
    if (state.stage === "Explosion2") {
        return point(state.trinity[2] === "Left" ? 0.6 : 0.4, state.long.north === "Circle" ? 0.75 : 0.25)
    }
    if (state.stage === "Explosion3") {
        return point()
    }

    return player.position;
}