import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Role } from "..";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { ClockSpot, ClockSpots, Setup } from "../gameState";
import FormControlLabel from "@mui/material/FormControlLabel";

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
        label="Role"
        labelPlacement="top"
        control={
          <Select
            value={props.setup.role}
            onChange={(c) =>
              c !== null && props.update({ role: c.target.value as Role })
            }
          >
            <MenuItem value="Healer">Healer</MenuItem>
            <MenuItem value="Tank">Tank</MenuItem>
            <MenuItem value="DPS">DPS</MenuItem>
          </Select>
        }
      />
      <FormControlLabel
        label="Clock Spot"
        labelPlacement="top"
        control={
          <Select
            value={props.setup.clockSpot}
            onChange={(c) =>
              c !== null &&
              props.update({ clockSpot: c.target.value as ClockSpot })
            }
          >
            {ClockSpots.map((c) => (
              <MenuItem value={c} key={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        }
      />
      <Button onClick={props.save} variant="contained">
        Save
      </Button>
    </FormControl>
  );
};
