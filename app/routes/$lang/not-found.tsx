import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/not-found")({
  component: DefaultNotFound,
  head: () => ({
    meta: [
      {
        title: "Page Not Found - TanStack Router",
      },
      {
        name: "description",
        content:
          "The page you are looking for does not exist or has been moved.",
      },
    ],
  }),
});

export function DefaultNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-8 max-w-md">
        "Sorry, the page you are looking for does not exist."
      </p>
      <Link
        to={`/`}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
