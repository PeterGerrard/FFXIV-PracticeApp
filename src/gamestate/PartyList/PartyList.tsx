import { DesignationDisplay } from "../Designation";
import { LightPlayer, Player } from "../Player";

export const PartyList = (props: { players: (Player | LightPlayer)[] }) => {
  return props.players.map((p) => (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "0.25rem",
        alignItems: "center",
        height: `12.5%`,
      }}
      key={p.designation}
    >
      <DesignationDisplay
        key={p.designation}
        designation={p.designation}
        style={{
          height: "100%",
        }}
      />
      {p.debuffs
        .filter((d) => d.src)
        .map((d) => (
          <img src={d.src} key={d.name} height="64px" />
        ))}
    </div>
  ));
};
