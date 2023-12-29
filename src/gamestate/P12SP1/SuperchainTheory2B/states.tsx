import { Point, point, vector } from "@flatten-js/core";
import { DangerPuddle } from "../../Mechanics/DangerPuddles";
import { SuperchainExplosion, SuperchainExplosionInOut, getSuperChainDangerPuddles } from "../Superchain/explosionTypes"
import { Player } from "../../Player";
import { pickOne } from "../../helpers";

type InitialState = {
    stage: "Initial",
    first: { north: boolean },
    second: {
        side: "East" | "West"
        type: Exclude<SuperchainExplosion, SuperchainExplosionInOut>
    },
    third: {
        north: boolean
    }
}

type Paradeigma = Omit<InitialState, "stage"> & {
    stage: "Paradeigma",
}

type Explosion1 = Omit<InitialState, "stage"> & {
    stage: "Explosion1"
}

type Parthenos = Omit<InitialState, "stage"> & {
    stage: "Parthenos"
}

type Explosion2 = Omit<InitialState, "stage"> & {
    stage: "Explosion2"
}

type AddLines = Omit<InitialState, "stage"> & {
    stage: "AddLines"
}

type Explosion3 = Omit<InitialState, "stage"> & {
    stage: "Explosion3"
}

export type SuperchainTheory2bGameState = InitialState | Paradeigma | Explosion1 | Parthenos | Explosion2 | AddLines | Explosion3

export const createInitialState = (): SuperchainTheory2bGameState => {
    return {
        stage: "Initial",
        first: {
            north: pickOne([true, false])
        },
        second: {
            side: pickOne<"East" | "West">(["East", "West"]),
            type: pickOne<"Protean" | "Pair">(["Protean", "Pair"])
        },
        third: {
            north: pickOne([true, false])
        }
    }
}

export const getDangerPuddles = (state: SuperchainTheory2bGameState, players: Player[]): DangerPuddle[] => {
    if (state.stage === "Explosion1") {
        return [
            ...getSuperChainDangerPuddles(["Circle"], point(0.5, state.first.north ? 0.375 : 0.625), players, () => { }),
            ...getSuperChainDangerPuddles(["Donut"], point(0.5, state.first.north ? 0.625 : 0.375), players, () => { })
        ]
    }
    if (state.stage === "Explosion2") {
        return [
            ...getSuperChainDangerPuddles(["Circle"], point(state.second.side === "East" ? 0.625 : 0.375, 0.5), players, () => { }),
            ...getSuperChainDangerPuddles([state.second.type], point(state.second.side === "East" ? 0.375 : 0.625, 0.5), players, () => { })
        ]
    }
    if (state.stage === "Explosion3") {
        return [
            ...getSuperChainDangerPuddles(["Circle"], point(0.5, state.third.north ? 0.25 : 0.75), players, () => { }),
            ...getSuperChainDangerPuddles(["Circle", "Protean"], point(0.5, state.third.north ? 0.75 : 0.25), players, () => { })
        ]
    }
    if (state.stage === "Parthenos") {
        return [{
            type: "line",
            angle: Math.PI,
            damage: 2,
            debuffRequirement: null,
            instaKill: null,
            onAnimationEnd: () => { },
            roleRequirement: null,
            source: point(0.5, 1),
            split: false,
            width: 0.4,
        }]
    }
    if (state.stage === "AddLines") {
        return [0.2, 0.6].map(x => ({
            type: "line",
            angle: 0,
            damage: 2,
            debuffRequirement: null,
            instaKill: null,
            onAnimationEnd: () => { },
            roleRequirement: null,
            source: point(state.second.side === "East" ? x : 1 - x, 0),
            split: false,
            width: 0.25,
        }));
    }
    return [];
}

export const nextStep = (state: SuperchainTheory2bGameState): SuperchainTheory2bGameState => {
    if (state.stage === "Initial") {
        return {
            ...state,
            stage: "Paradeigma",
        }
    }
    if (state.stage === "Paradeigma") {
        return {
            ...state,
            stage: "Explosion1"
        }
    }
    if (state.stage === "Explosion1") {
        return {
            ...state,
            stage: "Parthenos"
        }
    }
    if (state.stage === "Parthenos") {
        return {
            ...state,
            stage: "Explosion2"
        }
    }
    if (state.stage === "Explosion2") {
        return {
            ...state,
            stage: "AddLines"
        }
    }
    if (state.stage === "AddLines") {
        return {
            ...state,
            stage: "Explosion3"
        }
    }
    return state;
}

export const getTargetSpot = (state: SuperchainTheory2bGameState, player: Player): Point => {
    if (state.stage === "Initial" || state.stage === "Paradeigma") {
        return point(0.5, state.first.north ? 0.625 : 0.375);
    }
    if (state.stage === "Explosion1") {
        return point(state.second.side === "East" ? 0.25 : 0.75, 0.5)
    }
    if (state.stage === "Parthenos") {
        let off = vector();
        switch (player.designation) {
            case "MT":
                off = state.second.type === "Pair" ? vector(0.7, -0.7) : vector(0.9, -0.4)
                break;
            case "M1":
                off = state.second.type === "Pair" ? vector(0.7, -0.7) : vector(0.4, -0.9)
                break;
            case "OT":
                off = state.second.type === "Pair" ? vector(0.7, 0.7) : vector(0.9, 0.4)
                break;
            case "M2":
                off = state.second.type === "Pair" ? vector(0.7, 0.7) : vector(0.4, 0.9)
                break;
            case "H1":
                off = state.second.type === "Pair" ? vector(-0.7, -0.7) : vector(-0.4, -0.9)
                break;
            case "R1":
                off = state.second.type === "Pair" ? vector(-0.7, -0.7) : vector(-0.9, -0.4)
                break;
            case "H2":
                off = state.second.type === "Pair" ? vector(-0.7, 0.7) : vector(-0.4, 0.9)
                break;
            case "R2":
                off = state.second.type === "Pair" ? vector(-0.7, 0.7) : vector(-0.9, 0.4)
                break;
        }
        if (state.second.side === "West") {
            off = off.rotate(Math.PI);
        }
        return point(state.second.side === "East" ? 0.375 : 0.625, 0.5).translate(off.scale(0.05, 0.05))
    }
    if (state.stage === "Explosion2") {
        return point(state.second.side === "East" ? 0.4 : 0.6, player.position.y)
    }
    if (state.stage === "AddLines") {
        let off = vector();
        switch (player.designation) {
            case "MT":
                off = vector(0.4, 0.9)
                break;
            case "OT":
                off = vector(-0.4, 0.9)
                break;
            case "H1":
                off = vector(0.9, -0.4)
                break;
            case "H2":
                off = vector(-0.9, -0.4)
                break;
            case "M1":
                off = vector(0.9, 0.4)
                break;
            case "M2":
                off = vector(-0.9, 0.4)
                break;
            case "R1":
                off = vector(0.4, -0.9)
                break;
            case "R2":
                off = vector(-0.4, -0.9)
                break;
        }
        if (state.third.north) {
            off = off.rotate(Math.PI);
        }
        return point(0.5, state.third.north ? 0.75 : 0.25).translate(off.scale(0.22, 0.22))
    }

    return player.position;
}