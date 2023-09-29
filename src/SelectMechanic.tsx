import { NavLink } from "react-router-dom";

export const SelectMechanic = () => (
  <>
    <h2>P11S</h2>
    <ul>
      <li>
        <NavLink to="/darkandlight">Dark and Light</NavLink>
      </li>
      <li>
        <NavLink to="/letterofthelaw">Letter of the Law</NavLink>
      </li>
    </ul>
    {import.meta.env.MODE === "development" && (
      <>
        <h2>P12S Phase 1</h2>
        <ul>
          <li>
            <NavLink to="/p12sp1">Testing</NavLink>
          </li>
        </ul>
      </>
    )}
  </>
);
