import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { Designation, Designations, Setup } from "../gameState";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Slider } from "@mui/material";

export const SetupForm = (props: {
  setup: Setup;
  update: (updatedSetup: Partial<Setup>) => void;
  save: () => void;
}) => {
  return (
    <FormControl
      sx={{ padding: "2rem", alignContent: "start", rowGap: "1rem" }}
    >
      <FormControlLabel
        label="Designation"
        labelPlacement="top"
        control={
          <Select
            value={props.setup.designation}
            onChange={(c) =>
              c !== null &&
              props.update({ designation: c.target.value as Designation })
            }
          >
            {Designations.map((d) => (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            ))}
          </Select>
        }
      />
      <FormControlLabel
        label="Icon Size"
        labelPlacement="top"
        control={
          <Slider
            value={props.setup.playerIconSize}
            onChange={(_, v) => props.update({ playerIconSize: v as number })}
            min={0.04}
            max={0.15}
            step={0.01}
          />
        }
      />
      <Button onClick={props.save} variant="contained">
        Save
      </Button>
    </FormControl>
  );
};
