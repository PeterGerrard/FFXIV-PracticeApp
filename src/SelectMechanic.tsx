import { RegisteredRouter, RoutePaths } from "@tanstack/react-router";
import { SelectorGroup } from "./components/Selector/SelectorGroup";
import { FightGroupSelector } from "./components/Selector/FightGroupSelector";

export enum DevelopmentStage {
  Dev,
  Alpha,
  Beta,
  Prod,
}

export type Mechanic = {
  name: string;
  link: RoutePaths<RegisteredRouter["routeTree"]>;
  developmentStage: DevelopmentStage;
};

export type MechanicFight = {
  name: string;
  mechanics: Mechanic[];
};

const DisplayMechanic = (props: { mechanic: Mechanic }) => {
  let suffix: string;
  switch (props.mechanic.developmentStage) {
    case DevelopmentStage.Dev:
      suffix = " (dev)";
      break;
    case DevelopmentStage.Alpha:
      suffix = " (alpha)";
      break;
    case DevelopmentStage.Beta:
      suffix = " (beta)";
      break;
    case DevelopmentStage.Prod:
      suffix = "";
      break;
  }
  return import.meta.env.DEV ||
    props.mechanic.developmentStage !== DevelopmentStage.Dev ? (
    <FightGroupSelector
      name={props.mechanic.name + suffix}
      to={props.mechanic.link}
    />
  ) : (
    <></>
  );
};

const DisplayMechanicFight = (props: { group: MechanicFight }) => {
  return (
    <>
      <h2>{props.group.name}</h2>
      <SelectorGroup className="p-4">
        {props.group.mechanics.map((c) => (
          <DisplayMechanic mechanic={c} key={c.name} />
        ))}
      </SelectorGroup>
    </>
  );
};

export const SelectMechanic = (props: { fights: MechanicFight[] }) => {
  return (
    <>
      {props.fights.map((mg) => (
        <DisplayMechanicFight key={mg.name} group={mg} />
      ))}
    </>
  );
};
