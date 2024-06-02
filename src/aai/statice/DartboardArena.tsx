import { Arena } from "../../components/Arena";
import { LightPlayer } from "../../gamestate/Player";
import { getRandomPos } from "../../gamestate/gameState";
import { emptyMechanic } from "../../gamestate/mechanics";

export const DartboardArena = () => {
  const players: LightPlayer[] = [
    {
      type: "Light",
      alive: true,
      controlled: false,
      debuffs: [],
      designation: "H",
      position: getRandomPos(() => true),
      role: "Healer",
    },
    {
      type: "Light",
      alive: true,
      controlled: true,
      debuffs: [],
      designation: "D1",
      position: getRandomPos(() => true),
      role: "Tank",
    },
  ];
  return (
    <Arena
      mechanic={emptyMechanic()}
      moveTo={() => {}}
      players={players}
      showPartyList={true}
    >
      <svg viewBox="0 0 1 1" style={{ width: "100%", height: "100%" }}>
        <circle cx="0.5" cy="0.5" r="0.5"></circle>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((x) => (
          <path
            d={`M 0.5 0.5 L ${0.5 + 0.5 * Math.sin((x * Math.PI) / 6)} ${0.5 + 0.5 * Math.cos((x * Math.PI) / 6)} A 0.5 0.5 0 0 0 ${0.5 + 0.5 * Math.sin(((x + 1) * Math.PI) / 6)} ${0.5 + 0.5 * Math.cos(((x + 1) * Math.PI) / 6)} Z`}
            fill={["red", "yellow", "blue"][x % 3]}
          />
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((x) => (
          <path
            d={`M 0.5 0.5 L ${0.5 + 0.3 * Math.sin((x * Math.PI) / 6)} ${0.5 + 0.3 * Math.cos((x * Math.PI) / 6)} A 0.3 0.3 0 0 0 ${0.5 + 0.3 * Math.sin(((x + 1) * Math.PI) / 6)} ${0.5 + 0.3 * Math.cos(((x + 1) * Math.PI) / 6)} Z`}
            fill={["yellow", "blue", "red"][x % 3]}
          />
        ))}
      </svg>
    </Arena>
  );
};
