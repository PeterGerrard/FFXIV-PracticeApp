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

type MechanicGroup = {
  name: string;
  children: Mechanic[];
};

const mechanics: MechanicGroup[] = [
  {
    name: "P11S",
    children: [
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
    children: [
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
    children: [
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
    ],
  },
];

if (import.meta.env.DEV) {
  mechanics.push({
    name: "Development",
    children: [
      {
        developmentStage: DevelopmentStage.Dev,
        name: "simple aoe dodge",
        link: "/dev/simpleaoe",
      },
    ],
  });
}

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
    <Link to={props.mechanic.link}>
      {props.mechanic.name}
      {suffix}
    </Link>
  ) : (
    <></>
  );
};

const DisplayMechanicGroup = (props: { group: MechanicGroup }) => {
  return (
    <>
      <h2>{props.group.name}</h2>
      <ul>
        {props.group.children.map((c) => (
          <li key={c.name}>
            <DisplayMechanic mechanic={c} />
          </li>
        ))}
      </ul>
    </>
  );
};

export const SelectMechanic = () => {
  return (
    <>
      {mechanics.map((mg) => (
        <DisplayMechanicGroup key={mg.name} group={mg} />
      ))}
    </>
  );
};
