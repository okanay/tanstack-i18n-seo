# TanStack Start Multilingual Web Application

A modern, full-featured web application built with TanStack Start, React, TypeScript, and Tailwind CSS, featuring built-in internationalization support, SEO optimization, and a well-structured component architecture.

## 🚀 Features

- **Multilingual Support** - Built-in i18n with dynamic language detection and switching
- **Modern Routing** - Type-safe routing with TanStack Router
- **SEO Ready** - Dynamically generated SEO metadata, robots.txt, and sitemaps
- **TypeScript** - Fully typed codebase for better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Custom Font Loading** - Optimized font loading with preload strategies
- **Toast Notifications** - User feedback with react-hot-toast
- **Modal System** - Flexible modal implementation with Zustand
- **Accessibility Support** - Properly structured components with a11y in mind
- **State Management** - Zustand integration for lightweight state management
- **Environment Variables** - Dotenv configuration for development flexibility

## 📚 Tech Stack

- **Frontend Framework**: React 19
- **Meta Framework**: TanStack Start
- **Routing**: TanStack Router
- **Styling**: Tailwind CSS
- **Build Tool**: Vite (via Vinxi)
- **State Management**: Zustand
- **Internationalization**: i18next, react-i18next
- **Form Validation**: Zod
- **Deployment**: Vercel-ready

## 🏗️ Project Structure

```
├── app/                      # Main application code
│   ├── components/           # Reusable UI components
│   ├── hooks/                # Custom React hooks
│   │   ├── use-click-outside.ts  # Hook for detecting clicks outside elements
│   │   ├── use-modal.ts          # Zustand store for modal management
│   │   └── use-prevent-scroll.ts # Prevents body scroll when modals are open
│   ├── i18n/                 # Internationalization setup
│   │   ├── action.ts         # Server functions for language detection
│   │   ├── config.ts         # i18n configuration and constants
│   │   ├── index.ts          # i18next initialization
│   │   ├── link.tsx          # Language-aware link component
│   │   ├── provider.tsx      # Language context provider
│   │   ├── use-language.ts   # Hook for accessing language context
│   │   └── languages/        # Translation files
│   │       ├── en/           # English translations
│   │       │   ├── seo.json  # SEO metadata in English
│   │       │   └── translation.json # UI text in English
│   │       └── tr/           # Turkish translations
│   │           ├── seo.json  # SEO metadata in Turkish
│   │           └── translation.json # UI text in Turkish
│   ├── providers/            # React context providers
│   │   ├── index.tsx         # Root providers composition
│   │   └── toast.tsx         # Toast notification provider
│   ├── routes/               # Application routes
│   │   ├── __root.tsx        # Root route with language detection logic
│   │   ├── $lang/            # Language-specific routes
│   │   │   ├── route.tsx     # Base layout for language routes
│   │   │   ├── index.tsx     # Homepage for each language
│   │   │   ├── not-found.tsx # 404 page
│   │   │   ├── blog.route.tsx # Blog section layout
│   │   │   ├── blog.index.tsx # Blog index page
│   │   │   └── blog.$slug.tsx # Individual blog post pages
│   │   └── api/              # API endpoints
│   │       ├── robots.ts     # Generates robots.txt dynamically
│   │       └── sitemap.ts    # Generates XML sitemap dynamically
│   ├── utils/                # Utility functions
│   └── validations/          # Form validation schemas
├── public/                   # Static assets
│   ├── fonts/                # Custom fonts with optimized loading
│   │   └── custom/           # Custom font files and CSS
│   └── site.webmanifest      # Web app manifest for PWA support
```

## 🌐 Internationalization

The application supports multiple languages with a comprehensive i18n setup:

- Language detection based on browser/user preferences
- Cookie and localStorage persistence for language preferences
- URL-based language routing (e.g., `/en/blog`, `/tr/blog`)
- Automatic language switching with page reloads
- Full SEO support for each language
- Translation files for UI text and metadata

## 🛣️ Routing Structure

### Core Routes

- **Root Route** (`__root.tsx`):
  - Handles language detection and automatic redirection
  - Sets up HTML document structure and global metadata
  - Loads necessary stylesheets and initializes the language provider
  - Contains logic to detect browser language and redirect to proper language path

- **Language Route** (`/$lang/route.tsx`):
  - Base layout for all localized content
  - Configures language-specific SEO metadata
  - Sets up font preloading strategy
  - Provides the outlet for nested routes

### Content Routes

- **Homepage** (`/$lang/index.tsx`):
  - Main entry point for each language
  - Displays language switcher and demonstrates toast notifications

- **Blog Section**:
  - **Blog Layout** (`/$lang/blog.route.tsx`): Parent layout for all blog pages
  - **Blog Index** (`/$lang/blog.index.tsx`): Lists blog posts
  - **Blog Post** (`/$lang/blog.$slug.tsx`): Displays individual blog posts
    - Includes automatic redirection to 404 for invalid slugs

- **Not Found** (`/$lang/not-found.tsx`):
  - Custom 404 page with localized content
  - Includes language-specific SEO metadata

### API Routes

- **Robots.txt** (`/api/robots.ts`):
  - Implements the Web Robots protocol
  - Controls search engine crawler behavior

- **Sitemap** (`/api/sitemap.ts`):
  - Generates an XML sitemap of your site's content
  - Helps search engines efficiently crawl your site

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

This configuration ensures that requests to standard `/robots.txt` and `/sitemap.xml` paths are properly handled by the corresponding API routes.

## 🔧 Getting Started

### Prerequisites

- Node.js 18+ (latest LTS recommended)
- pnpm, npm, or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/yourprojectname.git
cd yourprojectname
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory:

```
REACT_PRESET=node
REACT_APP_FRONTEND_URL=http://localhost:3000
```

### Development

Start the development server:

```bash
pnpm dev
# or
npm run dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

Build the application:

```bash
pnpm build
# or
npm run build
```

### Running in Production

Start the production server:

```bash
pnpm start
# or
npm start
```

## 🌱 Environment Variables

- `REACT_PRESET`: Server preset, typically set to `node`
- `REACT_APP_FRONTEND_URL`: The URL of your frontend, used for sitemap generation

## 🧩 Key Components

### Language Switching

The `SwitchLanguage` component allows users to change the application language:

```tsx
<SwitchLanguage />
```

### Navigation

The `Link` component provides language-aware links:

```tsx
<Link to="/blog">Blog Page</Link>
```

### Modals

The modal system uses Zustand for state management:

```tsx
const { setModal, closeModal } = useModal();
setModal("my-modal-name");
```

### Toast Notifications

Show notifications with:

```tsx
import toast from "react-hot-toast";
toast("Your notification message");
```

## 📄 API Endpoints

### `/api/robots` - Dynamic Robots.txt Generation

The `/api/robots` endpoint dynamically generates a robots.txt file for search engine crawlers with the following features:

- **Configurable Base URL**: Uses the `REACT_APP_FRONTEND_URL` environment variable
- **Customizable Rules**:
  - Global allow/disallow paths
  - User-agent specific rules (e.g., special rules for Googlebot)
  - Image crawler specific instructions
- **Sitemap Reference**: Automatically includes a reference to the sitemap
- **Caching Control**: Implements proper HTTP caching headers for performance
  - `public, max-age=14400, s-maxage=86400, stale-while-revalidate=43200`

```typescript
// Example of the generated robots.txt
User-agent: Googlebot-Image
Allow: /public/images/

User-agent: Googlebot
Disallow: /nogooglebot/

User-agent: *
Allow: /
Disallow: /api/*
Disallow: /admin/*
Disallow: /private/*

Sitemap: https://yourdomain.com/api/sitemap
```

### `/api/sitemap` - Dynamic XML Sitemap

The `/api/sitemap` endpoint generates a standards-compliant XML sitemap for search engines with:

- **Dynamic URL Generation**: Builds URLs based on your application routes
- **Page Metadata**: Includes lastmod, priority, and changefreq attributes
- **Proper XML Formatting**: Follows the sitemap.org schema for compatibility with all search engines
- **Performance Optimization**: Implements HTTP caching headers
  - `public, max-age=14400, s-maxage=86400, stale-while-revalidate=43200`

```xml
<!-- Example of the generated sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2025-04-03T12:00:00.000Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- Additional URLs would be generated based on your content -->
</urlset>
```

These API endpoints are critical for SEO optimization and are automatically referenced in the root route configuration. The application is pre-configured to redirect `/robots.txt` and `/sitemap.xml` requests to these API endpoints through route rules in `app.config.ts`.

## 📝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request



## 🙏 Acknowledgements

- [TanStack](https://tanstack.com/) for the excellent React tools
- [React](https://reactjs.org/) for the UI library
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [i18next](https://www.i18next.com/) for internationalization support
