import { Point } from "@flatten-js/core";
import { P11SArena } from "../P11SArena";
import {
  LetterOfTheLawPlayer,
  NewLetterOfTheLawState,
  getDangerPuddles,
} from "./gameState";
import { DismissalArena } from "./DismissalOverruling/DismissalArena";
import { HeartArena } from "./HeartOfJudgement/HeartArena";

export const LetterOfTheLawArena = (props: {
  state: NewLetterOfTheLawState;
  players: LetterOfTheLawPlayer[];
  onMove: (p: Point) => void;
}) => {
  return (
    <P11SArena
      players={props.players}
      moveTo={props.onMove}
      dangerPuddles={getDangerPuddles(props.state, props.players)}
      bossColour={props.state.bossColour}
    >
      {props.state.outer === "Dismissal" && (
        <DismissalArena gameState={props.state} />
      )}
      {props.state.outer === "Heart" && (
        <HeartArena gameState={props.state} players={props.players} />
      )}
      {props.state.outer === "Dismissal" && (
        <DismissalArena gameState={props.state} />
      )}
    </P11SArena>
  );
};
