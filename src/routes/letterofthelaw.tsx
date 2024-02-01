import { Navigate, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/letterofthelaw")({
  component: () => <Navigate to="/p11s/letterofthelaw" />,
});
