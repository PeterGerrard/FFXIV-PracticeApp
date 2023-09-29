import { Arena } from "./P12SP1Arena";

export const P12SP1Testing = () => {
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
    />
  );
};
