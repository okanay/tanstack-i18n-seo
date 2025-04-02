import { createAPIFileRoute } from "@tanstack/react-start/api";

export const APIRoute = createAPIFileRoute("/api/robots")({
  GET: async () => {
    const baseUrl = (
      process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000"
    ).replace(/\/$/, "");

    const robotsTxt = generateRobotsTxt({
      baseUrl,
      sitemapPath: "/api/sitemap",
      disallowPaths: ["/api/*", "/admin/*", "/private/*"],
      agentRules: [
        {
          userAgent: "Googlebot-Image",
          allow: ["/public/images/"],
        },
        {
          userAgent: "Googlebot",
          disallow: ["/nogooglebot/"],
        },
      ],
    });

    return new Response(robotsTxt, {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control":
          "public, max-age=14400, s-maxage=86400, stale-while-revalidate=43200",
      },
      status: 200,
    });
  },
});

interface RobotsOptions {
  baseUrl: string;
  sitemapPath: string;
  disallowPaths?: string[];
  allowPaths?: string[];
  agentRules?: Array<{
    userAgent: string;
    allow?: string[];
    disallow?: string[];
  }>;
}

function generateRobotsTxt(options: RobotsOptions): string {
  const {
    baseUrl,
    sitemapPath,
    disallowPaths = [],
    allowPaths = [],
    agentRules = [],
  } = options;

  let content = "";

  if (agentRules.length > 0) {
    agentRules.forEach((rule) => {
      content += `User-agent: ${rule.userAgent}\n`;

      if (rule.allow && rule.allow.length > 0) {
        rule.allow.forEach((path) => {
          content += `Allow: ${path}\n`;
        });
      }

      if (rule.disallow && rule.disallow.length > 0) {
        rule.disallow.forEach((path) => {
          content += `Disallow: ${path}\n`;
        });
      }

      content += "\n";
    });
  }

  content += "User-agent: *\n";

  if (allowPaths.length > 0) {
    allowPaths.forEach((path) => {
      content += `Allow: ${path}\n`;
    });
  } else {
    content += "Allow: /\n";
  }

  if (disallowPaths.length > 0) {
    disallowPaths.forEach((path) => {
      content += `Disallow: ${path}\n`;
    });
  }

  content += "\n";

  content += `Sitemap: ${baseUrl}${sitemapPath}\n`;

  return content;
}
