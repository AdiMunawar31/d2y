// ============================================================
// APP CONFIGURATION
// ============================================================

export const APP_CONFIG = {
  name: "D2Y Studio",
  version: "1.0.0",
  description: "Professional Portfolio & CMS",
  author: "D2Y",
  locale: "id-ID",
  timezone: "Asia/Jakarta",
  currency: "IDR",

  // Pagination defaults
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 25, 50, 100],
  },

  // Toast defaults
  toast: {
    duration: 3000,
    maxVisible: 5,
  },

  // Image upload limits
  upload: {
    maxFileSizeMB: 10,
    acceptedImageTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
    acceptedDocTypes: ["application/pdf", "text/plain"],
  },

  // Animation timing (ms)
  animation: {
    fast: 150,
    normal: 250,
    slow: 400,
  },

  // API
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL ?? "/api",
    timeout: 30000,
  },
} as const;

export type AppConfig = typeof APP_CONFIG;
