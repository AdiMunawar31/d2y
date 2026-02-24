// ============================================================
// ROUTES CONFIGURATION
// ============================================================

export const ROUTES = {
  // Public
  HOME: "/",
  ABOUT: "/about",
  PORTFOLIO: "/portfolio",
  PORTFOLIO_DETAIL: "/portfolio/:slug",
  CONTACT: "/contact",
  BLOG: "/blog",
  BLOG_DETAIL: "/blog/:slug",

  // Auth
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",

  // Admin / CMS
  ADMIN: {
    ROOT: "/admin",
    DASHBOARD: "/admin/dashboard",
    USERS: "/admin/users",
    USER_DETAIL: "/admin/users/:id",
    CONTENT: "/admin/content",
    MEDIA: "/admin/media",
    SETTINGS: "/admin/settings",
    SERVICES: "/admin/services",
    ORDERS: "/admin/orders",
    ORDER_DETAIL: "/admin/orders/:id",
    AUDIT_LOGS: "/admin/audit-logs",
    API_KEYS: "/admin/api-keys",
    PERMISSIONS: "/admin/permissions",
  },

  // Components Demo (Dev only)
  COMPONENTS: "/components",
} as const;

export type AppRoute = string;
