import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Designation, Designations, Setup } from "../gameState";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export const SetupForm = (props: {
  setup: Setup;
  update: (updatedSetup: Partial<Setup>) => void;
  save: () => void;
}) => {
  return (
    <form className="flex flex-col gap-8">
      <div>
        <Label htmlFor="designationSelect">Designation</Label>
        <Select
          onValueChange={(x) => props.update({ designation: x as Designation })}
          value={props.setup.designation}
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
          value={[props.setup.playerIconSize]}
          onValueChange={([v]) => props.update({ playerIconSize: v })}
          min={0.04}
          max={0.15}
          step={0.01}
        />
      </div>
      <Button onClick={props.save}>Save</Button>
    </form>
  );
};
