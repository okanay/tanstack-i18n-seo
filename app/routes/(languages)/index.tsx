import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(languages)/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Index Page</div>;
}
