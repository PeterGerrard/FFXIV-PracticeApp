import * as React from "react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link, createLink } from "@tanstack/react-router";
import { GearIcon } from "@radix-ui/react-icons";

export const NavBar = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Endwalker</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="m-0 p-1 w-[300px] list-none">
              <ListItem
                to="/mechanics/endwalker/anabaseios"
                title="Anabaseios"
              />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Dawntrail</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="m-0 p-1 w-[300px] list-none">
              <ListItem to="/mechanics/dawntrail/tier1" title="Tier 1" />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger>Criterion</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="m-0 p-1 w-[300px] list-none">
              <ListItem
                to="/mechanics/criterion/aai"
                title="Another Aloalo Island"
              />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
        <NavigationMenuItem>
          <Link
            to="/setup"
            className={cn(navigationMenuTriggerStyle(), "no-underline")}
          >
            <GearIcon className="mr-1" />
            Setup
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            to="/about"
            className={cn(navigationMenuTriggerStyle(), "no-underline")}
          >
            About
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = createLink(
  ({
    className,
    title,
    ...props
  }: Omit<React.ComponentProps<"a">, "href" | "children">) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            {title}
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
