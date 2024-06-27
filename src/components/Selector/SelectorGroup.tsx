import { cn } from "@/lib/utils";
import React from "react";

export const SelectorGroup = (
  props: React.PropsWithChildren<{ className?: string }>
) => (
  <div
    className={cn(
      "grid gap-4 grid-cols-3 auto-rows-[1fr] max-w-[800px]",
      props.className
    )}
  >
    {props.children}
  </div>
);
