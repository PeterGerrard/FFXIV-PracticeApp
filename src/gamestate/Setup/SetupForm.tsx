import FormControl from "@mui/material/FormControl";
import { SetupGameState } from "./setupState";
import Select from "@mui/material/Select";
import { Action, Role } from "..";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

export const SetupForm = (props: {
  state: SetupGameState;
  dispatch: (action: Action) => void;
}) => {
  return (
    <FormControl>
      <Select
        value={props.state.setup.role}
        onChange={(c) =>
          c !== null &&
          props.dispatch({ type: "SELECTROLE", role: c.target.value as Role })
        }
      >
        <MenuItem value={"Healer"}>Healer</MenuItem>
        <MenuItem value={"Tank"}>Tank</MenuItem>
        <MenuItem value={"DPS"}>DPS</MenuItem>
      </Select>
      <Button
        onClick={() => props.dispatch({ type: "START" })}
        variant="contained"
      >
        Start
      </Button>
    </FormControl>
  );
};
