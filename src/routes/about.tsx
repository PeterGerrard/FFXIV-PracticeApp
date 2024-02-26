import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: () => (
    <div>
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
        Built from Commit <code>{import.meta.env.VITE_ENV_GIT_COMMIT}</code>
      </p>
    </div>
  ),
});
