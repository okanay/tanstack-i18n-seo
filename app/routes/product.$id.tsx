import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/product/$id")({
  loader: async ({ params }) => {
    if (params.id === "0") {
      throw redirect({
        to: "/not-found",
      });
    }

    return {
      product: {
        title: "Ürün Başlık",
        description: "Ürün Açıklama",
      },
    };
  },
  head: ({ loaderData: { product } }) => {
    return {
      title: `Product - ${product.title}`,
      meta: [
        {
          name: "description",
          content: `${product.title} - ${product.description}`,
        },
      ],
    };
  },
  component: () => {
    const data = Route.useLoaderData();

    return (
      <div>
        <h1>{data.product.title}</h1>
        <p>{data.product.description}</p>
      </div>
    );
  },
});
