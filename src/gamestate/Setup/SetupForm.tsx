import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import {
  Designation,
  Designations,
  LightPartyDesignation,
  LightPartyDesignations,
} from "../gameState";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DesignationDisplay } from "../Designation";
import {
  FullPartyProfile,
  LightPartyProfile,
  ProfileContext,
  useProfiles,
} from "./ProfileContext";
import { useContext } from "react";

export const SetupForm = () => {
  const [profiles, setProfiles] = useProfiles();
  const { switchFullPartyProfile, switchLightPartyProfile } =
    useContext(ProfileContext);

  const updateFullParty = (p: Partial<FullPartyProfile>) => {
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

  const updateLightParty = (p: Partial<LightPartyProfile>) => {
    const newLight: LightPartyProfile = {
      ...profiles.defaultLightPartyProfile,
      ...p,
    };
    switchLightPartyProfile(newLight);
    setProfiles({
      defaultFullPartyProfile: profiles.defaultFullPartyProfile,
      defaultLightPartyProfile: newLight,
      fullPartyProfiles: profiles.fullPartyProfiles,
      lightPartyProfiles: profiles.lightPartyProfiles.map((p) =>
        p.name === newLight.name ? newLight : p
      ),
    });
  };

  return (
    <div className="flex gap-2">
      <Card className="w-[300px] p-4">
        <CardHeader>
          <CardTitle>Full Party</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
          <div>
            <Label htmlFor="designationSelect">Designation</Label>
            <Select
              onValueChange={(x) =>
                updateFullParty({ designation: x as Designation })
              }
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
              onValueChange={([v]) => updateFullParty({ playerIconSize: v })}
              min={0.04}
              max={0.15}
              step={0.01}
            />
            <DesignationDisplay
              designation={profiles.defaultFullPartyProfile.designation}
              style={{
                left: 0,
                top: 0,
                height: `calc(75vh * ${profiles.defaultFullPartyProfile.playerIconSize})`,
                width: `calc(75vw * ${profiles.defaultFullPartyProfile.playerIconSize})`,
              }}
            />
          </div>
        </CardContent>
      </Card>
      <Card className="w-[300px] p-4">
        <CardHeader>
          <CardTitle>Light Party</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
          <div>
            <Label htmlFor="designationSelect">Designation</Label>
            <Select
              onValueChange={(x) =>
                updateLightParty({ designation: x as LightPartyDesignation })
              }
              value={profiles.defaultLightPartyProfile.designation}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {LightPartyDesignations.map((d) => (
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
              value={[profiles.defaultLightPartyProfile.playerIconSize]}
              onValueChange={([v]) => updateLightParty({ playerIconSize: v })}
              min={0.04}
              max={0.15}
              step={0.01}
            />
            <DesignationDisplay
              designation={profiles.defaultLightPartyProfile.designation}
              style={{
                left: 0,
                top: 0,
                height: `calc(75vh * ${profiles.defaultLightPartyProfile.playerIconSize})`,
                width: `calc(75vw * ${profiles.defaultLightPartyProfile.playerIconSize})`,
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
