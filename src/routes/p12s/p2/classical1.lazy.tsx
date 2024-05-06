import { Navigate, createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/p12s/p2/classical1")({
  component: () => <Navigate to="/mechanics/endwalker/anabaseios/p12s/p2/classical1" />,
});
