import { Position } from ".";

export const Tower = (props: { position: Position }) => (
  <svg
    style={{
      width: "20%",
      height: "20%",
      position: "absolute",
      left: `${props.position[0] * 100}%`,
      top: `${props.position[1] * 100}%`,
      transform: "translate(-50%, -50%)",
    }}
    viewBox="0 0 100 100"
  >
    <mask id="maskOuter">
      <rect x="0" y="0" width="100" height="100" fill="white" />
      <path
        d="M 8.5 47 A 38.5 38.5 0 0 1 47 8.5 L 47 12 L 53 12 L 53 8.5 A 38.5 38.5 0 0 1 91.5 47 L 88 47 L 88 53 L 91.5 53 A 38.5 38.5 0 0 1 53 91.5 L 53 88 L 47 88 L 47 91.5 A 38.5 38.5 0 0 1 8.5 53 L 12 53 L 12 47 Z"
        fill="black"
      />
    </mask>
    <mask id="maskInner">
      <rect x="0" y="0" width="100" height="100" fill="white" />
      <circle cx="50" cy="50" r="12.5" fill="black" />
    </mask>
    <circle cx="50" cy="50" r="50" fill="#02757F" mask="url(#maskOuter)" />
    <circle cx="50" cy="50" r="25" fill="#02757F" mask="url(#maskInner)" />
    <path d="M 46 26 L 48 23 L 52 23 L 54 26 Z" fill="#02757F" />
    <path d="M 74 46 L 77 48 L 77 52 L 74 54 Z" fill="#02757F" />
    <path d="M 46 74 L 48 77 L 52 77 L 54 74 Z" fill="#02757F" />
    <path d="M 26 46 L 23 48 L 23 52 L 26 54 Z" fill="#02757F" />
    <path
      d="M 10 46 A 36 36 0 0 1 46 10 L 46 24 A 25 25 0 0 0 24 46 Z"
      fill="#333333"
    />
    <path
      d="M 90 54 A 36 36 0 0 1 54 90 L 54 76 A 25 25 0 0 0 76 54 Z"
      fill="#333333"
    />
  </svg>
);
