import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/")({
  loader: async ({ params }) => {
    const lang = params.lang;
    return { lang };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { lang } = Route.useLoaderData();
  return <div>Index Page {lang}</div>;
}
