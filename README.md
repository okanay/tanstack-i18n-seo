# TanStack Start Multilingual Web Application

A modern, multilingual web application built with TanStack Start, React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Multilingual Support** - Built-in i18n with dynamic language detection and switching
- **Modern Routing** - Type-safe routing with TanStack Router
- **SEO Ready** - Dynamically generated SEO metadata, robots.txt, and sitemaps
- **TypeScript** - Fully typed codebase for better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Custom Font Loading** - Optimized font loading with preload strategies
- **Toast Notifications** - User feedback with react-hot-toast
- **State Management** - Zustand integration for lightweight state management

## 📚 Tech Stack

- **Frontend Framework**: React 19
- **Meta Framework**: TanStack Start
- **Routing**: TanStack Router
- **Styling**: Tailwind CSS
- **Build Tool**: Vite (via Vinxi)
- **State Management**: Zustand
- **Internationalization**: i18next, react-i18next
- **Form Validation**: Zod

## 🏗️ Project Structure

```
├── app/                      # Main application code
│   ├── components/           # Reusable UI components
│   ├── i18n/                 # Internationalization setup
│   │   ├── config.ts         # i18n configuration and constants
│   │   ├── link.tsx          # Language-aware link component
│   │   ├── provider.tsx      # Language context provider
│   │   └── languages/        # Translation files
│   │       ├── en/           # English translations
│   │       └── tr/           # Turkish translations
│   ├── routes/               # Application routes
│   │   ├── __root.tsx        # Root route with language detection logic
│   │   ├── $lang/            # Language-specific routes
│   │   └── api/              # API endpoints
│   │       ├── robots.ts     # Generates robots.txt dynamically
│   │       └── sitemap.ts    # Generates XML sitemap dynamically
├── public/                   # Static assets
│   ├── fonts/                # Custom fonts with optimized loading
│   └── site.webmanifest      # Web app manifest for PWA support
```

## 🌐 Internationalization

The application supports multiple languages with:

- Language detection based on browser/user preferences
- Cookie and localStorage persistence for language preferences
- URL-based language routing (e.g., `/en/blog`, `/tr/blog`)
- Automatic language switching with page reloads

## 🛣️ Routing Structure

### Core Routes

- **Root Route** (`__root.tsx`):
  - Handles language detection and automatic redirection
  - Sets up HTML document structure and global metadata

- **Language Route** (`/$lang/route.tsx`):
  - Base layout for all localized content
  - Configures language-specific SEO metadata

### Content Routes

- **Homepage** (`/$lang/index.tsx`)
- **Blog Section**: Layout, index and individual post pages
- **Not Found** (`/$lang/not-found.tsx`): Custom 404 page with localized content

### API Routes

- **Robots.txt** (`/api/robots.ts`): Controls search engine crawler behavior
- **Sitemap** (`/api/sitemap.ts`): Generates an XML sitemap of your site's content

### Route Redirections

The application includes special route handling in `app.config.ts`:

```typescript
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
}
```

## 🌱 Environment Variables

- `REACT_PRESET`: Server preset, typically set to `node`
  - See [TanStack Start Hosting documentation](https://tanstack.com/start/latest/docs/framework/react/hosting) for more information
- `REACT_APP_FRONTEND_URL`: The URL of your frontend, used for sitemap generation

## 🧩 Key Components

### Language-Aware Link

The `Link` component provides language-aware navigation:

```tsx
<Link to="/blog">Blog Page</Link>
// Automatically transforms to /{current-language}/blog
```

## 📄 API Endpoints

### `/api/robots` - Dynamic Robots.txt Generation

The `/api/robots` endpoint dynamically generates a robots.txt file for search engine crawlers with:

- Configurable base URL
- Customizable crawler rules
- Sitemap reference
- Proper caching headers

```
User-agent: *
Allow: /
Disallow: /api/*
Disallow: /admin/*
Disallow: /private/*

Sitemap: https://yourdomain.com/api/sitemap
```

### `/api/sitemap` - Dynamic XML Sitemap

The `/api/sitemap` endpoint generates a standards-compliant XML sitemap for search engines with:

- Dynamic URL generation
- Page metadata (lastmod, priority, changefreq)
- Proper XML formatting and caching

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2025-04-03T12:00:00.000Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

## 🙏 Acknowledgements

- [TanStack](https://tanstack.com/) for the excellent React tools
- [React](https://reactjs.org/) for the UI library
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [i18next](https://www.i18next.com/) for internationalization support
