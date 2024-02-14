import { Link } from "@tanstack/react-router";

export const SelectMechanic = () => (
  <>
    <h2>P11S</h2>
    <ul>
      <li>
        <Link to="/p11s/darkandlight">Dark and Light</Link>
      </li>
      <li>
        <Link to="/p11s/letterofthelaw">Letter of the Law</Link>
      </li>
    </ul>
    <h2>P12S Phase 1</h2>
    <ul>
      <li>
        <Link to="/p12s/p1/superchaintheory1">Superchain Theory 1</Link>
      </li>
      <li>
        <Link to="/p12s/p1/paradeigma3">Paradeigma 3</Link>
      </li>
      <li>
        <Link to="/p12s/p1/superchaintheory2a">Superchain Theory IIA</Link>
      </li>
      <li>
        <Link to="/p12s/p1/superchaintheory2b">Superchain Theory IIB</Link>
      </li>
    </ul>
    <h2>P12S Phase 2</h2>
    <ul>
      <li>
        <Link to="/p12s/p2/classical1">Classical Concepts 1 (beta)</Link>
      </li>
    </ul>
  </>
);
