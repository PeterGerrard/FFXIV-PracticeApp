import { point, Point } from "@flatten-js/core";
import { useTitle } from "../../../components/useTitle";
import { Designation, Designations, getRandomPos, getRole, isDps } from "../../../gamestate/gameState";
import { Player } from "../../../gamestate/Player";
import { useFullPartyProfile } from "../../../gamestate/Setup/ProfileContext";
import { automatic, calculateDamageForPlayer, composeMechanics, FinishedMechanic, Mechanic, useMechanic, withProgress, ZeroDamage } from "../../../gamestate/mechanics";
import { Button } from "@/components/ui/button";
import { Mouser1Arena } from "./arena/Arena";
import { ReloadIcon } from "@radix-ui/react-icons";
import { pickOne, shuffle } from "../../../gamestate/helpers";
import { PunchTargetDebuff } from "./PunchTargetDebuff";
import { lineMechanic } from "../../../gamestate/Mechanics/LineAoE";
import { Arena } from "../../../components/Arena";


type Section = [number, number];

const getSection = (p: Point): Section => {
    return [Math.floor(p.x * 4), Math.floor(p.y * 4)]
}

const onSection = (p: Point, section: Section) => {
    const actualSection = getSection(p);
    return actualSection[0] === section[0] && actualSection[1] === section[1];
}

const punchMechanicMove = (targetDesignation: Designation, nextTargets: Designation[], destroyedSections: Section[], damagedSections: Section[]): Mechanic<Player> => {
    return withProgress(
        missingFloorMechanic(destroyedSections, damagedSections),
        ps => {
            const nextPlayer = ps.filter(p => p.designation === targetDesignation)[0];
            return [punchMechanicHit(nextPlayer, nextTargets, destroyedSections, damagedSections), ps]
        }
    )
}
const punchMechanicHit = (targetPlayer: Player, nextTargets: Designation[], destroyedSections: Section[], damagedSections: Section[]): Mechanic<Player> => {
    const targetSection = getSection(targetPlayer.position);
    const sectionCentre = point(0.125 + 0.25*targetSection[0], 0.125 + 0.25*targetSection[1]);

    const hitMechanic = composeMechanics([0,1,2,3].map(i => 
            lineMechanic(sectionCentre, i*Math.PI/2, 0.25, {
                damage: 0,
                debuffRequirement: PunchTargetDebuff,
                instaKill: null,
                roleRequirement: null,
                split: false
            }))
    );

    return automatic(withProgress(
        composeMechanics([missingFloorMechanic(destroyedSections, damagedSections), hitMechanic]),
        ps => {
            if (nextTargets.length > 0) {
                return [punchMechanicMove(nextTargets[0], nextTargets.splice(1), destroyedSections, damagedSections), ps.map(p => ({ ...p, debuffs: p.designation === nextTargets[0] ? [PunchTargetDebuff] : [] }))] // todo update damaged/destroyed
            }
            else {
                return [composeMechanics([missingFloorMechanic(destroyedSections, damagedSections), FinishedMechanic]), ps.map(p => ({ ...p, debuffs: [] }))] // todo update damaged/destroyed
            }
        }
    ), 1000)
}

const missingFloorMechanic = (destroyedSections: Section[], damagedSections: Section[]): Mechanic<Player> => {
    return {
        applyDamage: calculateDamageForPlayer(p => destroyedSections.some(s => onSection(p.position, s)) ? 2 : 0),
        display: () => <Mouser1Arena damagedSections={damagedSections} destroyedSections={destroyedSections} />,
        getSafeSpot: () => null,
        progress: (ps) => [null, ps]
    }
}

const initialState = () : Mechanic<Player> => {
    const d = pickOne(["Horizontal", "Vertical"] as const)
    const side = pickOne([false, true])
    const getDamaged = side ? (n: number) => 2 - n % 2 : (n: number) => 1 + n % 2;
    const dps = pickOne([true, false]);
    const targets = shuffle(Designations.filter(d => dps ? isDps(d) : !isDps(d)))

    const damagedSections = [0, 1, 2, 3].map<Section>(z => d === "Horizontal" ? [getDamaged(z), z] : [z, getDamaged(z)]);
    const destroyedSections = [0, 1, 2, 3].flatMap<Section>(z => d === "Horizontal" ? [[0, z], [3, z]] : [[z, 0], [z, 3]]);

    
    return withProgress(
        missingFloorMechanic(destroyedSections, damagedSections),
        ps => [punchMechanicMove(targets[0], targets.slice(1), destroyedSections, damagedSections), ps.map(p => ({...p, debuffs: p.designation === targets[0] ? [PunchTargetDebuff] : []}))]
    )
};

export const Mouser1 = () => {
    const setup = useFullPartyProfile();
    useTitle("Mouser 1");

    const [mechanic, players, restart, move] = useMechanic(
        initialState,
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
            }))
    );

    return (
        <div className="flex flex-col">
            <div>
                <Button onClick={() => restart()}>
                    Reset
                    <ReloadIcon />
                </Button>
            </div>
            <Arena
                players={players}
                moveTo={move}
                mechanic={mechanic}
                showPartyList={false}
            >
            </Arena>
        </div>
    );
};