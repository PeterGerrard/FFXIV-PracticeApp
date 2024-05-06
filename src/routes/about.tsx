import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: () => (
    <div className="p-4">
      <p>
        Hi I'm Jess, and this app is a tool I've built to help me practice Final
        Fantasy XIV mechanics. <br />
        Currently it is focussed on strats I use and has no options for choosing
        strats. <br />
        This may change down the line as I get better writing the mechanics
      </p>
      <br />
      <p>
        I was inspired by{" "}
        <a href="https://drshelper.github.io/ta" target="_blank">
          https://drshelper.github.io/ta
        </a>
        . Check it if you are interested in Delubrum Reginae Savage
      </p>
      <hr className="my-4" />
      <p>Build details:</p>
      <br />
      <p>
        Github:{" "}
        <a
          href="https://github.com/PeterGerrard/FFXIV-PracticeApp"
          target="_blank"
        >
          Link
        </a>
      </p>
      <p>
        Built from Commit: <code>{import.meta.env.VITE_ENV_GIT_COMMIT}</code>
      </p>
      <hr className="my-2" />

      <p>
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
      </p>
    </div>
  ),
});
