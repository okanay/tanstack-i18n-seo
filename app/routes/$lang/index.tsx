import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Index Page</div>;
}
