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
        height: `${100 / props.players.length}%`
      }}
      key={p.designation}
    >
      <DesignationDisplay
        key={p.designation}
        player={p}
        style={{
          height: "100%",
        }}
      />
      {p.debuffs.map((d) => (
        <img src={d.src} key={d.name} height="64px" />
      ))}
    </div>
  ));
};
