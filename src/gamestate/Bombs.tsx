export const Bombs = (props: { topBomb: "Dark" | "Light" }) => {
  const { topBomb } = props;
  return (
    <>
      <svg
        height="100"
        width="100"
        style={{
          position: "absolute",
          left: `50%`,
          top: `20%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="black"
          strokeWidth="3"
          fill={topBomb === "Dark" ? "purple" : "yellow"}
        />
      </svg>
      <svg
        height="100"
        width="100"
        style={{
          position: "absolute",
          left: `50%`,
          top: `80%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="black"
          stroke-width="3"
          fill={topBomb === "Dark" ? "purple" : "yellow"}
        />
      </svg>
      <svg
        height="100"
        width="100"
        style={{
          position: "absolute",
          left: `20%`,
          top: `50%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="black"
          stroke-width="3"
          fill={topBomb === "Light" ? "purple" : "yellow"}
        />
      </svg>
      <svg
        height="100"
        width="100"
        style={{
          position: "absolute",
          left: `80%`,
          top: `50%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="black"
          stroke-width="3"
          fill={topBomb === "Light" ? "purple" : "yellow"}
        />
      </svg>
    </>
  );
};
