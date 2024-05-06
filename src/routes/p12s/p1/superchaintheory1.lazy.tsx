import { Navigate, createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/p12s/p1/superchaintheory1")({
  component: () => <Navigate to="/mechanics/endwalker/anabaseios/p12s/p1/superchaintheory1" />,
});
