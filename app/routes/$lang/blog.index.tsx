import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/blog/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello Index</div>;
}
