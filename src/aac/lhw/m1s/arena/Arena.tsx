import { ArenaSection, Mouser1ArenaSection } from "./ArenaSection";
import { PropsWithChildren } from "react";

export const Mouser1Arena = (
  props: PropsWithChildren<{
    sections: Mouser1ArenaSection[];
  }>
    
) => {
  return (
    <svg viewBox="0 0 1 1" style={{ width: "100%", height: "100%" }}>
      {props.sections.map((s) => (
          <ArenaSection
              key={s.x * 10 + s.y}
              {...s}
          />
        ))
      }
      {props.children}
    </svg>
  );
};
