import { Navigate, createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/p12s/p1/superchaintheory2b")({
  component: () => <Navigate to="/mechanics/endwalker/anabaseios/p12s/p1/superchaintheory2b" />,
});
