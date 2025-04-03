import { defineConfig } from "@tanstack/react-start/config";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  server: {
    compressPublicAssets: true,
    preset: process.env.REACT_PRESET,
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
