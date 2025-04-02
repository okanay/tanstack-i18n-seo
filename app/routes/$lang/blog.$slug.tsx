import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/blog/$slug")({
  loader: async ({ params }) => {
    const slug = params.slug;
    const lang = params.lang;

    if (slug === "0") {
      throw redirect({ replace: true, to: `/${lang}/not-found` });
    }

    return { slug };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useLoaderData();
  return <div>Hello Blog Page : {slug}</div>;
}
