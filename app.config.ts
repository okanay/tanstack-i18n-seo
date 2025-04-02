// app.config.ts
import { defineConfig } from "@tanstack/react-start/config";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    routeRules: {
      "/robots.txt": {
        redirect: {
          to: "/api/robots",
          statusCode: 301,
        },
      },
      "/sitemap.xml": {
        redirect: {
          to: "/api/sitemap",
          statusCode: 301,
        },
      },
    },
    preset: process.env.VITE_PRESET,
    prerender: {
      routes: ["/"],
      crawlLinks: true,
    },
  },
  vite: {
    logLevel: "silent",
    plugins: [
      tailwindcss(),
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
  },
});
