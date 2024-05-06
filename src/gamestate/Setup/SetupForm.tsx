import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Designation, Designations, Setup, getRole } from "../gameState";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useContext } from "react";
import { SetupContext } from "./Setup";
import { DesignationDisplay } from "../Designation";

export const SetupForm = () => {
  const { setup, setSetup } = useContext(SetupContext);

  const update = (p: Partial<Setup>) => {
    const newSetup: Setup = { ...setup, ...p };
    setSetup(newSetup);
  };

  return (
    <form className="flex flex-col gap-8 w-[200px] p-4">
      <div>
        <Label htmlFor="designationSelect">Designation</Label>
        <Select
          onValueChange={(x) => update({ designation: x as Designation })}
          value={setup.designation}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Designations.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="iconSize">Icon Size</Label>
        <Slider
          id="icon-size"
          value={[setup.playerIconSize]}
          onValueChange={([v]) => update({ playerIconSize: v })}
          min={0.04}
          max={0.15}
          step={0.01}
        />
        <DesignationDisplay
          player={{
            designation: setup.designation,
            role: getRole(setup.designation),
          }}
          style={{
            left: 0,
            top: 0,
            height: `calc(75vh * ${setup.playerIconSize})`,
            width: `calc(75vw * ${setup.playerIconSize})`,
          }}
        />
      </div>
    </form>
  );
};
