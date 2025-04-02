import { createAPIFileRoute } from "@tanstack/react-start/api";

export const APIRoute = createAPIFileRoute("/api/sitemap")({
  GET: async () => {
    const baseUrl =
      process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";

    const pages = [
      {
        url: "/",
        lastmod: new Date().toISOString(),
        priority: 1.0,
        changefreq: "daily",
      },
    ];

    const sitemapXml = generateSitemapXml(pages, baseUrl);

    return new Response(sitemapXml, {
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
        "Cache-Control":
          "public, max-age=14400, s-maxage=86400, stale-while-revalidate=43200",
        "Content-Disposition": "inline",
      },
      status: 200,
    });
  },
});

function generateSitemapXml(
  pages: Array<{
    url: string;
    lastmod: string;
    priority: number;
    changefreq: string;
  }>,
  baseUrl: string,
) {
  const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  pages.forEach((page) => {
    xml += "  <url>\n";
    xml += `    <loc>${cleanBaseUrl}${page.url.startsWith("/") ? page.url.slice(1) : page.url}</loc>\n`;
    xml += `    <lastmod>${page.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += "  </url>\n";
  });

  xml += "</urlset>";

  return xml;
}
