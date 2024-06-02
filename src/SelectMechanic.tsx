import { Link, RegisteredRouter, RoutePaths } from "@tanstack/react-router";

enum DevelopmentStage {
  Dev,
  Alpha,
  Beta,
  Prod,
}

type Mechanic = {
  name: string;
  link: RoutePaths<RegisteredRouter["routeTree"]>;
  developmentStage: DevelopmentStage;
};

type MechanicFight = {
  name: string;
  mechanics: Mechanic[];
};

const anabaseiosFights: MechanicFight[] = [
  {
    name: "P11S",
    mechanics: [
      {
        developmentStage: DevelopmentStage.Prod,
        link: "/p11s/darkandlight",
        name: "Dark and Light",
      },
      {
        developmentStage: DevelopmentStage.Prod,
        link: "/p11s/letterofthelaw",
        name: "Letter of the Law",
      },
    ],
  },
  {
    name: "P12S Phase 1",
    mechanics: [
      {
        developmentStage: DevelopmentStage.Prod,
        link: "/p12s/p1/superchaintheory1",
        name: "Superchain Theory 1",
      },
      {
        developmentStage: DevelopmentStage.Prod,
        link: "/p12s/p1/paradeigma3",
        name: "Paradeigma 3",
      },
      {
        developmentStage: DevelopmentStage.Prod,
        link: "/p12s/p1/superchaintheory2a",
        name: "Superchain Theory II A",
      },
      {
        developmentStage: DevelopmentStage.Prod,
        link: "/p12s/p1/superchaintheory2b",
        name: "Superchain Theory II B",
      },
    ],
  },
  {
    name: "P12S Phase 2",
    mechanics: [
      {
        developmentStage: DevelopmentStage.Prod,
        link: "/p12s/p2/classical1",
        name: "Classical Concepts 1",
      },
      {
        developmentStage: DevelopmentStage.Prod,
        link: "/p12s/p2/caloric1",
        name: "Caloric 1",
      },
      {
        developmentStage: DevelopmentStage.Beta,
        link: "/p12s/p2/classical2",
        name: "Classical Concepts 2",
      },
      {
        developmentStage: DevelopmentStage.Beta,
        link: "/p12s/p2/caloric2",
        name: "Caloric 2",
      },
    ],
  },
];

const aloaloFights: MechanicFight[] = [
  {
    name: "Statice",
    mechanics: [
      {
        developmentStage: DevelopmentStage.Alpha,
        name: "Intermission",
        link: "/mechanics/criterion/aai/statice/intermission"
      },
    ],
  },
];

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
    <li>
      <Link to={props.mechanic.link}>
        {props.mechanic.name}
        {suffix}
      </Link>
    </li>
  ) : (
    <></>
  );
};

const DisplayMechanicFight = (props: { group: MechanicFight }) => {
  return (
    <>
      <h2>{props.group.name}</h2>
      <ul>
        {props.group.mechanics.map((c) => (
          <DisplayMechanic mechanic={c} key={c.name} />
        ))}
      </ul>
    </>
  );
};

export const SelectMechanic = () => {
  return (
    <>
      {anabaseiosFights.map((mg) => (
        <DisplayMechanicFight key={mg.name} group={mg} />
      ))}
    </>
  );
};

export const AloaloSelectMechanic = () => {
  return (
    <>
      {aloaloFights.map((mg) => (
        <DisplayMechanicFight key={mg.name} group={mg} />
      ))}
    </>
  );
};
