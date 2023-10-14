import { DesignationDisplay } from "../Designation";
import { Player } from "../Player";

export const PartyList = (props: { players: Player[] }) => {
  return props.players.map((p) => (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "0.25rem",
        alignItems: "center",
      }}
    >
      <DesignationDisplay
        key={p.designation}
        player={p}
        style={{
          height: "5rem",
          width: "5rem",
        }}
      />
      {p.debuffs.map((d) => (
        <img src={d.src} height="64px" />
      ))}
    </div>
  ));
};
