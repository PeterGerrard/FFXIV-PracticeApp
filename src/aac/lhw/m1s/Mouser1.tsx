import { Point } from "@flatten-js/core";
import { useTitle } from "../../../components/useTitle";
import { useGame } from "../../../gamestate/gameHooks";
import { Designation, Designations, getRandomPos, getRole, isDps } from "../../../gamestate/gameState";
import { Player } from "../../../gamestate/Player";
import { useFullPartyProfile } from "../../../gamestate/Setup/ProfileContext";
import { Mechanic, ZeroDamage } from "../../../gamestate/mechanics";
import { Button } from "@/components/ui/button";
import { Mouser1Arena } from "./arena/Arena";
import { Overlay } from "../../../gamestate/Overlay";
import { ReloadIcon } from "@radix-ui/react-icons";
import { pickOne, shuffle } from "../../../gamestate/helpers";
import { PunchTargetDebuff } from "./PunchTargetDebuff";

type Mouser1GameState = {
    stage: "start",
    direction: "Horizontal" | "Vertical"
    damagedSections: [number, number][]
    destroyedSections: [number, number][]
    punchTargets: [Designation, Designation, Designation, Designation]
} | {
    stage: "punches4",
    direction: "Horizontal" | "Vertical"
    damagedSections: [number, number][]
    destroyedSections: [number, number][]
    punchTargets: [Designation, Designation, Designation, Designation]
} | {
    stage: "punches3",
    direction: "Horizontal" | "Vertical"
    damagedSections: [number, number][]
    destroyedSections: [number, number][]
    punchTargets: [Designation, Designation, Designation]
} | {
    stage: "punches2",
    direction: "Horizontal" | "Vertical"
    damagedSections: [number, number][]
    destroyedSections: [number, number][]
    punchTargets: [Designation, Designation]
} | {
    stage: "punches1",
    direction: "Horizontal" | "Vertical"
    damagedSections: [number, number][]
    destroyedSections: [number, number][]
    punchTargets: [Designation]
} | {
    stage: "end",
    direction: "Horizontal" | "Vertical"
    damagedSections: [number, number][]
    destroyedSections: [number, number][]
}

type Section = [number, number];

const getSection = (p: Point): Section => {
    return [Math.floor(p.x * 4), Math.floor(p.y * 4)]
}

const onSection = (p: Point, section: Section) => {
    const actualSection = getSection(p);
    return actualSection[0] === section[0] && actualSection[1] === section[1];
}

const inStage = <T extends Mouser1GameState["stage"]>(s: Mouser1GameState, stages: T[]): s is Mouser1GameState & { stage: T} => {
    return stages.includes(s.stage as T);
} 

export const Mouser1 = () => {
    const setup = useFullPartyProfile();
    useTitle("Mouser 1");

    const { state, players, restart, onMove, safeLocation } = useGame<
        Player,
        Mouser1GameState
    >(
        (s, ps) => {
            return ps.filter(p => !s.destroyedSections.some(sc => onSection(p.position, sc))).map(p => p.designation);
        },
        (s) => s.stage === "end",
        () =>
            Designations.map((d) => ({
                type: "Full",
                alive: true,
                controlled: setup.designation === d,
                debuffs: [],
                designation: d,
                position: getRandomPos((p) => p.x > 0.25 && p.x < 0.75 && p.y > 0.25 && p.y < 0.75),
                role: getRole(d),
                distanceTravelled: 0,
            })),
        (_s, _ps, p) => p.position,
        (): Mouser1GameState => {
            const d = pickOne(["Horizontal", "Vertical"] as const)
            const side = pickOne([false, true])
            const getDamaged = side ? (n: number) => 2 - n % 2 : (n: number) => 1 + n % 2;
            const dps = pickOne([true, false]);
            const targets = shuffle(Designations.filter(d => dps ? isDps(d) : !isDps(d)));

            return {
                stage: "start",
                direction: d,
                damagedSections: [0, 1, 2, 3].map(z => d === "Horizontal" ? [getDamaged(z), z] : [z, getDamaged(z)]),
                destroyedSections: [0, 1, 2, 3].flatMap(z => d === "Horizontal" ? [[0, z], [3, z]] : [[z, 0], [z, 3]]),
                punchTargets: targets as [Designation, Designation, Designation, Designation]
            }
        },
        () => false,
        (s): Mouser1GameState => {
            switch (s.stage) {
                case "start":
                    return { ...s, stage: "punches4" }
                case "punches4":
                    return { ...s, stage: "punches3", punchTargets: s.punchTargets.slice(1) as [Designation, Designation, Designation] }
                case "punches3":
                    return { ...s, stage: "punches2", punchTargets: s.punchTargets.slice(1) as [Designation, Designation] }
                case "punches2":
                    return { ...s, stage: "punches1", punchTargets: s.punchTargets.slice(1) as [Designation] }
                case "punches1":
                    return { ...s, stage: "end" }
                case "end":
                    return s;
            }
        },
        (s, p) => inStage(s, ["punches4", "punches3", "punches2", "punches1"]) && s.punchTargets[0] === p.designation ? [PunchTargetDebuff] : []
    );

    const mechanic: Mechanic<Player> = {
        applyDamage: () => ZeroDamage,
        display: () => <></>,
        getSafeSpot: (_, p) => p.position,
        progress: (ps) => [null, ps]
    };
    console.log(state)

    return (
        <div className="flex flex-col">
            <div>
                <Button onClick={() => restart()}>
                    Reset
                    <ReloadIcon />
                </Button>
            </div>
            <Mouser1Arena
                players={players}
                mechanic={mechanic}
                moveTo={onMove}
                damagedSections={state.damagedSections}
                destroyedSections={state.destroyedSections}
            >
                <Overlay
                    players={players}
                    finished={state.stage === "end"}
                    safeLocation={safeLocation}
                />
            </Mouser1Arena>
        </div>
    );
};