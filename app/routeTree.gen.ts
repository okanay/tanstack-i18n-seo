/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LangRouteImport } from './routes/$lang/route'
import { Route as LangIndexImport } from './routes/$lang/index'
import { Route as LangNotFoundImport } from './routes/$lang/not-found'
import { Route as LangBlogRouteImport } from './routes/$lang/blog.route'
import { Route as LangBlogIndexImport } from './routes/$lang/blog.index'
import { Route as LangBlogSlugImport } from './routes/$lang/blog.$slug'

// Create/Update Routes

const LangRouteRoute = LangRouteImport.update({
  id: '/$lang',
  path: '/$lang',
  getParentRoute: () => rootRoute,
} as any)

const LangIndexRoute = LangIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => LangRouteRoute,
} as any)

const LangNotFoundRoute = LangNotFoundImport.update({
  id: '/not-found',
  path: '/not-found',
  getParentRoute: () => LangRouteRoute,
} as any)

const LangBlogRouteRoute = LangBlogRouteImport.update({
  id: '/blog',
  path: '/blog',
  getParentRoute: () => LangRouteRoute,
} as any)

const LangBlogIndexRoute = LangBlogIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => LangBlogRouteRoute,
} as any)

const LangBlogSlugRoute = LangBlogSlugImport.update({
  id: '/$slug',
  path: '/$slug',
  getParentRoute: () => LangBlogRouteRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/$lang': {
      id: '/$lang'
      path: '/$lang'
      fullPath: '/$lang'
      preLoaderRoute: typeof LangRouteImport
      parentRoute: typeof rootRoute
    }
    '/$lang/blog': {
      id: '/$lang/blog'
      path: '/blog'
      fullPath: '/$lang/blog'
      preLoaderRoute: typeof LangBlogRouteImport
      parentRoute: typeof LangRouteImport
    }
    '/$lang/not-found': {
      id: '/$lang/not-found'
      path: '/not-found'
      fullPath: '/$lang/not-found'
      preLoaderRoute: typeof LangNotFoundImport
      parentRoute: typeof LangRouteImport
    }
    '/$lang/': {
      id: '/$lang/'
      path: '/'
      fullPath: '/$lang/'
      preLoaderRoute: typeof LangIndexImport
      parentRoute: typeof LangRouteImport
    }
    '/$lang/blog/$slug': {
      id: '/$lang/blog/$slug'
      path: '/$slug'
      fullPath: '/$lang/blog/$slug'
      preLoaderRoute: typeof LangBlogSlugImport
      parentRoute: typeof LangBlogRouteImport
    }
    '/$lang/blog/': {
      id: '/$lang/blog/'
      path: '/'
      fullPath: '/$lang/blog/'
      preLoaderRoute: typeof LangBlogIndexImport
      parentRoute: typeof LangBlogRouteImport
    }
  }
}

// Create and export the route tree

interface LangBlogRouteRouteChildren {
  LangBlogSlugRoute: typeof LangBlogSlugRoute
  LangBlogIndexRoute: typeof LangBlogIndexRoute
}

const LangBlogRouteRouteChildren: LangBlogRouteRouteChildren = {
  LangBlogSlugRoute: LangBlogSlugRoute,
  LangBlogIndexRoute: LangBlogIndexRoute,
}

const LangBlogRouteRouteWithChildren = LangBlogRouteRoute._addFileChildren(
  LangBlogRouteRouteChildren,
)

interface LangRouteRouteChildren {
  LangBlogRouteRoute: typeof LangBlogRouteRouteWithChildren
  LangNotFoundRoute: typeof LangNotFoundRoute
  LangIndexRoute: typeof LangIndexRoute
}

const LangRouteRouteChildren: LangRouteRouteChildren = {
  LangBlogRouteRoute: LangBlogRouteRouteWithChildren,
  LangNotFoundRoute: LangNotFoundRoute,
  LangIndexRoute: LangIndexRoute,
}

const LangRouteRouteWithChildren = LangRouteRoute._addFileChildren(
  LangRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '/$lang': typeof LangRouteRouteWithChildren
  '/$lang/blog': typeof LangBlogRouteRouteWithChildren
  '/$lang/not-found': typeof LangNotFoundRoute
  '/$lang/': typeof LangIndexRoute
  '/$lang/blog/$slug': typeof LangBlogSlugRoute
  '/$lang/blog/': typeof LangBlogIndexRoute
}

export interface FileRoutesByTo {
  '/$lang/not-found': typeof LangNotFoundRoute
  '/$lang': typeof LangIndexRoute
  '/$lang/blog/$slug': typeof LangBlogSlugRoute
  '/$lang/blog': typeof LangBlogIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/$lang': typeof LangRouteRouteWithChildren
  '/$lang/blog': typeof LangBlogRouteRouteWithChildren
  '/$lang/not-found': typeof LangNotFoundRoute
  '/$lang/': typeof LangIndexRoute
  '/$lang/blog/$slug': typeof LangBlogSlugRoute
  '/$lang/blog/': typeof LangBlogIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/$lang'
    | '/$lang/blog'
    | '/$lang/not-found'
    | '/$lang/'
    | '/$lang/blog/$slug'
    | '/$lang/blog/'
  fileRoutesByTo: FileRoutesByTo
  to: '/$lang/not-found' | '/$lang' | '/$lang/blog/$slug' | '/$lang/blog'
  id:
    | '__root__'
    | '/$lang'
    | '/$lang/blog'
    | '/$lang/not-found'
    | '/$lang/'
    | '/$lang/blog/$slug'
    | '/$lang/blog/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  LangRouteRoute: typeof LangRouteRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  LangRouteRoute: LangRouteRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/$lang"
      ]
    },
    "/$lang": {
      "filePath": "$lang/route.tsx",
      "children": [
        "/$lang/blog",
        "/$lang/not-found",
        "/$lang/"
      ]
    },
    "/$lang/blog": {
      "filePath": "$lang/blog.route.tsx",
      "parent": "/$lang",
      "children": [
        "/$lang/blog/$slug",
        "/$lang/blog/"
      ]
    },
    "/$lang/not-found": {
      "filePath": "$lang/not-found.tsx",
      "parent": "/$lang"
    },
    "/$lang/": {
      "filePath": "$lang/index.tsx",
      "parent": "/$lang"
    },
    "/$lang/blog/$slug": {
      "filePath": "$lang/blog.$slug.tsx",
      "parent": "/$lang/blog"
    },
    "/$lang/blog/": {
      "filePath": "$lang/blog.index.tsx",
      "parent": "/$lang/blog"
    }
  }
}
ROUTE_MANIFEST_END */
