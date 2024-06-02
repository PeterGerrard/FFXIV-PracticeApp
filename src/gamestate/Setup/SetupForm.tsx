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
import { DesignationDisplay } from "../Designation";
import {
  FullPartyProfile,
  ProfileContext,
  useProfiles,
} from "./ProfileContext";
import { useContext } from "react";

export const SetupForm = () => {
  const [profiles, setProfiles] = useProfiles();
  const { switchFullPartyProfile } = useContext(ProfileContext);

  const update = (p: Partial<Setup>) => {
    const newFull: FullPartyProfile = {
      ...profiles.defaultFullPartyProfile,
      ...p,
    };
    switchFullPartyProfile(newFull);
    setProfiles({
      defaultFullPartyProfile: newFull,
      defaultLightPartyProfile: profiles.defaultLightPartyProfile,
      fullPartyProfiles: profiles.fullPartyProfiles.map((p) =>
        p.name === newFull.name ? newFull : p
      ),
      lightPartyProfiles: profiles.lightPartyProfiles,
    });
  };

  return (
    <form className="flex flex-col gap-8 w-[200px] p-4">
      <div>
        <Label htmlFor="designationSelect">Designation</Label>
        <Select
          onValueChange={(x) => update({ designation: x as Designation })}
          value={profiles.defaultFullPartyProfile.designation}
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
          value={[profiles.defaultFullPartyProfile.playerIconSize]}
          onValueChange={([v]) => update({ playerIconSize: v })}
          min={0.04}
          max={0.15}
          step={0.01}
        />
        <DesignationDisplay
          player={{
            designation: profiles.defaultFullPartyProfile.designation,
            role: getRole(profiles.defaultFullPartyProfile.designation),
          }}
          style={{
            left: 0,
            top: 0,
            height: `calc(75vh * ${profiles.defaultFullPartyProfile.playerIconSize})`,
            width: `calc(75vw * ${profiles.defaultFullPartyProfile.playerIconSize})`,
          }}
        />
      </div>
    </form>
  );
};
