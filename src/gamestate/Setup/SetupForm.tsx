import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Role } from "..";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { SetupContext } from "./Setup";
import { useNavigate } from "react-router-dom";

export const SetupForm = () => {
  const { state: setup, update: setSetup } = useContext(SetupContext);
  const navigate = useNavigate();

  return (
    <FormControl>
      <Select
        value={setup.role}
        onChange={(c) =>
          c !== null && setSetup({ role: c.target.value as Role })
        }
      >
        <MenuItem value={"Healer"}>Healer</MenuItem>
        <MenuItem value={"Tank"}>Tank</MenuItem>
        <MenuItem value={"DPS"}>DPS</MenuItem>
      </Select>
      <Button onClick={() => navigate("/darkandlight")} variant="contained">
        Start
      </Button>
    </FormControl>
  );
};
