import { DangerPuddlesDisplay } from "../Mechanics/DangerPuddles";
import { Player } from "../Player";
import { Arena } from "./P12SP1Arena";
import {
  SuperchainExplosion,
  SuperchainExplosionDisplay,
  getSuperChainDangerPuddles,
} from "./SuperchainTheory1/explosionTypes";

export const P12SP1Testing = () => {
  const testChains: SuperchainExplosion[] = ["Donut", "Protean"];
  const players: Player[] = [
    { position: [0.12, 0.06], role: "Tank" },
    { position: [0.14, 0.08], role: "DPS" },
    { position: [0.14, 0.12], role: "Healer" },
    { position: [0.12, 0.14], role: "DPS" },
    { position: [0.08, 0.06], role: "Tank" },
    { position: [0.06, 0.08], role: "DPS" },
    { position: [0.06, 0.12], role: "Healer" },
    { position: [0.08, 0.14], role: "DPS" },
  ];
  return (
    <Arena
      player={{
        role: "Tank",
        position: [0.5, 0.5],
      }}
      isDead={false}
      moveTo={() => {}}
      dangerPuddles={{
        puddles: [],
        survivable: 0,
      }}
    >
      {testChains.map((c) => {
        return (
          <>
            <SuperchainExplosionDisplay
              explosion={c}
              position={[0.1, 0.1]}
              target={[0.1, 0.1]}
            />
          </>
        );
      })}
      <DangerPuddlesDisplay
        puddles={
          getSuperChainDangerPuddles(testChains, [0.1, 0.1], players, () => {})
            .puddles
        }
      />
    </Arena>
  );
};
