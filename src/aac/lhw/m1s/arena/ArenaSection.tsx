export type Mouser1ArenaSection = {
  x: number;
  y: number;
  status: "Safe" | "Damaged" | "Destroyed" | "Repair" | "SlowRepair";
};

export const ArenaSection = (props: Mouser1ArenaSection) => {
  switch (props.status) {
    case "Safe":
      return (
        <g transform={`translate(${0.25 * props.x},${0.25 * props.y})`}>
          <rect
            x={0}
            width={0.25}
            y={0}
            height={0.25}
            fill="blue"
            stroke="grey"
            strokeWidth={0.01}
          />
          <rect
            x={-0.005}
            width={0.01}
            y={-0.005}
            height={0.01}
            fill="lightblue"
            transform="translate(0.125,0.125) rotate(45)"
          />
        </g>
      );
    case "Damaged":
      return (
        <g transform={`translate(${0.25 * props.x},${0.25 * props.y})`}>
          <rect
            x={0}
            width={0.25}
            y={0}
            height={0.25}
            fill="darkblue"
            stroke="grey"
            strokeWidth={0.01}
          />
          <rect
            x={-0.005}
            width={0.01}
            y={-0.005}
            height={0.01}
            fill="pink"
            transform="translate(0.125,0.125) rotate(45)"
          />
        </g>
      );
    case "Destroyed":
      return <></>;
    case "Repair":
      return (
        <g
          transform={`translate(${0.25 * props.x},${0.25 * props.y})`}
          opacity={0.6}
        >
          <rect
            x={0}
            width={0.25}
            y={0}
            height={0.25}
            fill="blue"
            stroke="grey"
            strokeWidth={0.01}
          />
          <rect
            x={-0.005}
            width={0.01}
            y={-0.005}
            height={0.01}
            fill="lightblue"
            transform="translate(0.125,0.125) rotate(45)"
          />
        </g>
      );
    case "SlowRepair":
      return (
        <g
          transform={`translate(${0.25 * props.x},${0.25 * props.y})`}
          opacity={0.2}
        >
          <rect
            x={0}
            width={0.25}
            y={0}
            height={0.25}
            fill="blue"
            stroke="grey"
            strokeWidth={0.01}
          />
          <rect
            x={-0.005}
            width={0.01}
            y={-0.005}
            height={0.01}
            fill="lightblue"
            transform="translate(0.125,0.125) rotate(45)"
          />
        </g>
      );
  }
};
