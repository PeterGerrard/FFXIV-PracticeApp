import { Button } from "@/components/ui/button";
import { RegisteredRouter, RoutePaths } from "@tanstack/react-router";

export const FightGroupSelector = (props: {
  name: string;
  to: RoutePaths<RegisteredRouter["routeTree"]>;
}) => {
  return (
    <a href={props.to}>
      <Button variant="outline" className="h-full w-full p-4" tabIndex={-1}>
        <h3>{props.name}</h3>
      </Button>
    </a>
  );
};
