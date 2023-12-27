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
    <h2>P12S Phase 1</h2>
    <ul>
      <li>
        <NavLink to="/p12s/p1/superchaintheory1">Superchain Theory 1</NavLink>
      </li>
      <li>
        <NavLink to="/p12s/p1/paradeigma3">Paradeigma 3</NavLink>
      </li>
      <li>
        <NavLink to="/p12s/p1/superchain2a">Superchain Theory IIA (beta)</NavLink>
      </li>
      <li>
        <NavLink to="/p12s/p1/superchain2b">Superchain Theory IIB (beta)</NavLink>
      </li>
    </ul>
  </>
);
