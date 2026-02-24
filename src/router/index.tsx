// ============================================================
// ROUTER — React Router DOM v7 + Suspense
// ============================================================

import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  // Navigate,
  type RouteObject,
} from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import D2YLoading from "@/components/ui/D2YLoading";

// ─── Lazy Pages ───────────────────────────────────────────
// Public
const HomePage = lazy(() => import("@/pages/HomePage"));
// const AboutPage = lazy(() => import("@/pages/AboutPage"));
// const PortfolioPage = lazy(() => import("@/pages/PortfolioPage"));
// const PortfolioDetailPage = lazy(() => import("@/pages/PortfolioDetailPage"));
// const ContactPage = lazy(() => import("@/pages/ContactPage"));
// const BlogPage = lazy(() => import("@/pages/BlogPage"));
// const BlogDetailPage = lazy(() => import("@/pages/BlogDetailPage"));

// Auth
// const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
// const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"));
// const ForgotPasswordPage = lazy(
//   () => import("@/pages/auth/ForgotPasswordPage")
// );

// Admin
// const AdminDashboard = lazy(() => import("@/pages/admin/DashboardPage"));
// const AdminUsers = lazy(() => import("@/pages/admin/UsersPage"));
// const AdminUserDetail = lazy(() => import("@/pages/admin/UserDetailPage"));
// const AdminContent = lazy(() => import("@/pages/admin/ContentPage"));
// const AdminMedia = lazy(() => import("@/pages/admin/MediaPage"));
// const AdminSettings = lazy(() => import("@/pages/admin/SettingsPage"));
// const AdminServices = lazy(() => import("@/pages/admin/ServicesPage"));
// const AdminOrders = lazy(() => import("@/pages/admin/OrdersPage"));
// const AdminOrderDetail = lazy(() => import("@/pages/admin/OrderDetailPage"));
// const AdminAuditLogs = lazy(() => import("@/pages/admin/AuditLogsPage"));
// const AdminApiKeys = lazy(() => import("@/pages/admin/ApiKeysPage"));
// const AdminPermissions = lazy(() => import("@/pages/admin/PermissionsPage"));

// Dev
const ComponentsDemo = lazy(() => import("@/pages/ComponentsDemo"));

// ─── Layouts ──────────────────────────────────────────────
const PublicLayout = lazy(() => import("@/components/layouts/PublicLayout"));
// const AdminLayout = lazy(() => import("@/components/layouts/AdminLayout"));
const AuthLayout = lazy(() => import("@/components/layouts/AuthLayout"));

// ─── Suspense Wrapper ─────────────────────────────────────
function PageSuspense({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <D2YLoading size="lg" label="Loading page..." />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

// ─── Route Definitions ────────────────────────────────────
const routes: RouteObject[] = [
  // Public routes
  {
    path: "/",
    element: (
      <PageSuspense>
        <PublicLayout>
          <Outlet />
        </PublicLayout>
      </PageSuspense>
    ),
    children: [
      {
        index: true,
        element: (
          <PageSuspense>
            <HomePage />
          </PageSuspense>
        ),
      },
      // {
      //   path: ROUTES.ABOUT,
      //   element: (
      //     <PageSuspense>
      //       <AboutPage />
      //     </PageSuspense>
      //   ),
      // },
      // {
      //   path: ROUTES.PORTFOLIO,
      //   element: (
      //     <PageSuspense>
      //       <PortfolioPage />
      //     </PageSuspense>
      //   ),
      // },
      // {
      //   path: ROUTES.PORTFOLIO_DETAIL,
      //   element: (
      //     <PageSuspense>
      //       <PortfolioDetailPage />
      //     </PageSuspense>
      //   ),
      // },
      // {
      //   path: ROUTES.CONTACT,
      //   element: (
      //     <PageSuspense>
      //       <ContactPage />
      //     </PageSuspense>
      //   ),
      // },
      // {
      //   path: ROUTES.BLOG,
      //   element: (
      //     <PageSuspense>
      //       <BlogPage />
      //     </PageSuspense>
      //   ),
      // },
      // {
      //   path: ROUTES.BLOG_DETAIL,
      //   element: (
      //     <PageSuspense>
      //       <BlogDetailPage />
      //     </PageSuspense>
      //   ),
      // },
    ],
  },

  // Auth routes
  {
    element: (
      <PageSuspense>
        <AuthLayout>
          <Outlet />
        </AuthLayout>
      </PageSuspense>
    ),
    children: [
      // {
      //   path: ROUTES.LOGIN,
      //   element: (
      //     <PageSuspense>
      //       <LoginPage />
      //     </PageSuspense>
      //   ),
      // },
      // {
      //   path: ROUTES.REGISTER,
      //   element: (
      //     <PageSuspense>
      //       <RegisterPage />
      //     </PageSuspense>
      //   ),
      // },
      // {
      //   path: ROUTES.FORGOT_PASSWORD,
      //   element: (
      //     <PageSuspense>
      //       <ForgotPasswordPage />
      //     </PageSuspense>
      //   ),
      // },
    ],
  },

  // Components Demo (dev)
  {
    path: ROUTES.COMPONENTS,
    element: (
      <PageSuspense>
        <ComponentsDemo />
      </PageSuspense>
    ),
  },

  // 404
  {
    path: "*",
    element: (
      <div className="flex items-center justify-center min-h-screen flex-col gap-4">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-muted">Page not found</p>
        <a href="/" className="underline text-sm">
          Go home
        </a>
      </div>
    ),
  },
];

// ─── Router Instance ──────────────────────────────────────
export const router = createBrowserRouter(routes, {
  future: {
    v7_normalizeFormMethod: true,
  },
});

// ─── Router Provider Component ────────────────────────────
export default function AppRouter() {
  return <RouterProvider router={router} />;
}
