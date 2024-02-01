import { Navigate, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/darkandlight")({
  component: () => <Navigate to="/p11s/darkandlight" />,
});
