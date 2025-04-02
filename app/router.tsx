// app/router.tsx
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { DefaultNotFound } from "./routes/not-found";

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    defaultPreload: "intent",
    defaultNotFoundComponent: () => <DefaultNotFound />,
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
