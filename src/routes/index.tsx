import { createFileRoute } from "@tanstack/react-router";
import { SelectMechanic } from "../SelectMechanic";

export const Route = createFileRoute("/")({
  component: () => {
    return (
      <>
        <SelectMechanic />
        <hr></hr>
        <footer>
          Report an issue:
          <ul>
            <li>
              <a
                href="https://github.com/PeterGerrard/FFXIV-PracticeApp/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title="
                target="_blank"
              >
                GitHub
              </a>
            </li>
            <li>DM Jezza32 on Discord</li>
          </ul>
        </footer>
      </>
    );
  },
});
