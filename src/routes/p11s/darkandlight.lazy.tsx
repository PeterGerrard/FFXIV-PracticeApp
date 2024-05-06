import { Navigate, createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/p11s/darkandlight")({
  component: () => <Navigate to="/mechanics/endwalker/anabaseios/p11s/darkandlight" />,
});
