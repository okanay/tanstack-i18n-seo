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
│   ├── i18n/                 # Internationalization setup
│   │   ├── languages/        # Translation files
│   │   │   ├── en/           # English translations
│   │   │   └── tr/           # Turkish translations
│   ├── providers/            # React context providers
│   ├── routes/               # Application routes
│   │   ├── $lang/            # Language-specific routes
│   │   └── api/              # API endpoints
│   ├── utils/                # Utility functions
│   └── validations/          # Form validation schemas
├── public/                   # Static assets
│   ├── fonts/                # Custom fonts
│   └── site.webmanifest      # Web app manifest
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

- **Root Route**: Handles language detection and redirection
- **Language Route** (`/$lang`): Base for all localized routes
- **Content Routes**:
  - `/$lang/`: Homepage for each language
  - `/$lang/blog`: Blog section with nested routes
  - `/$lang/blog/$slug`: Individual blog posts
  - `/$lang/not-found`: Custom 404 page

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

- `/api/robots`: Generates robots.txt
- `/api/sitemap`: Generates sitemap.xml

## 📝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [TanStack](https://tanstack.com/) for the excellent React tools
- [React](https://reactjs.org/) for the UI library
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [i18next](https://www.i18next.com/) for internationalization support
