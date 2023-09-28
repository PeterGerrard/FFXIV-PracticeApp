import Grow from "@mui/material/Grow";

export const Bombs = (props: {
  explode: boolean;
  topBomb: "Dark" | "Light";
  bossColour: "Dark" | "Light";
  animationEnd: () => void;
}) => {
  const { topBomb, explode, bossColour, animationEnd } = props;
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
      {topBomb === bossColour ? (
        <>
          <Grow
            in={explode}
            timeout={1500}
            onEntered={() => {
              animationEnd();
            }}
          >
            <svg
              height="70%"
              width="70%"
              style={{
                position: "absolute",
                left: `50%`,
                top: `20%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <circle
                cx="50%"
                cy="50%"
                r="50%"
                fill={bossColour === "Dark" ? "purple" : "yellow"}
                opacity={0.4}
              />
            </svg>
          </Grow>
          <Grow in={explode} timeout={1500}>
            <svg
              height="70%"
              width="70%"
              style={{
                position: "absolute",
                left: `50%`,
                top: `80%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <circle
                cx="50%"
                cy="50%"
                r="50%"
                fill={bossColour === "Dark" ? "purple" : "yellow"}
                opacity={0.4}
              />
            </svg>
          </Grow>
        </>
      ) : (
        <>
          <Grow
            in={explode}
            timeout={1500}
            onEntered={() => {
              animationEnd();
            }}
          >
            <svg
              height="70%"
              width="70%"
              style={{
                position: "absolute",
                left: `20%`,
                top: `50%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <circle
                cx="50%"
                cy="50%"
                r="50%"
                fill={bossColour === "Dark" ? "purple" : "yellow"}
                opacity={0.4}
              />
            </svg>
          </Grow>
          <Grow in={explode} timeout={1500}>
            <svg
              height="70%"
              width="70%"
              style={{
                position: "absolute",
                left: `80%`,
                top: `50%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <circle
                cx="50%"
                cy="50%"
                r="50%"
                fill={bossColour === "Dark" ? "purple" : "yellow"}
                opacity={0.4}
              />
            </svg>
          </Grow>
        </>
      )}
    </>
  );
};
