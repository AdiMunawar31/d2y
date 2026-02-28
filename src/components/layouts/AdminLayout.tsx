// // ============================================================
// // AdminLayout — CMS sidebar layout
// // ============================================================

// import { useState, type ReactNode } from "react";
// import { Link } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Users,
//   FileText,
//   Image,
//   Settings,
//   Wrench,
//   ShoppingBag,
//   ScrollText,
//   Key,
//   Shield,
//   Bell,
//   Search,
//   Moon,
//   Sun,
//   Menu,
//   X,
//   ChevronRight,
//   Briefcase,
//   type LucideIcon,
// } from "lucide-react";
// import { cn } from "@/utils";
// import { ROUTES } from "@/config/routes.config";
// import { useNav } from "@/hooks/useNav";
// import { useTheme } from "@/hooks/useThemes";
// import D2YAvatar from "@/components/ui/D2YAvatar";
// import D2YButton from "@/components/ui/D2YButton";

// // ─── Nav config ───────────────────────────────────────────
// interface NavSection {
//   label: string;
//   items: NavItem[];
// }

// interface NavItem {
//   label: string;
//   href: string;
//   icon: LucideIcon;
//   badge?: string | number;
// }

// const NAV_SECTIONS: NavSection[] = [
//   {
//     label: "Management",
//     items: [
//       {
//         label: "Dashboard",
//         href: ROUTES.ADMIN.DASHBOARD,
//         icon: LayoutDashboard,
//       },
//       { label: "User Directory", href: ROUTES.ADMIN.USERS, icon: Users },
//       { label: "Permissions", href: ROUTES.ADMIN.PERMISSIONS, icon: Shield },
//     ],
//   },
//   {
//     label: "Content",
//     items: [
//       { label: "Services", href: ROUTES.ADMIN.SERVICES, icon: Wrench },
//       { label: "Portfolio", href: ROUTES.ADMIN.CONTENT, icon: Briefcase },
//       { label: "Media", href: ROUTES.ADMIN.MEDIA, icon: Image },
//     ],
//   },
//   {
//     label: "Commerce",
//     items: [
//       {
//         label: "Orders",
//         href: ROUTES.ADMIN.ORDERS,
//         icon: ShoppingBag,
//         badge: 3,
//       },
//     ],
//   },
//   {
//     label: "System",
//     items: [
//       { label: "Audit Logs", href: ROUTES.ADMIN.AUDIT_LOGS, icon: ScrollText },
//       { label: "API Keys", href: ROUTES.ADMIN.API_KEYS, icon: Key },
//       { label: "Settings", href: ROUTES.ADMIN.SETTINGS, icon: Settings },
//     ],
//   },
// ];

// // ─── Sidebar NavItem ──────────────────────────────────────
// function SideNavItem({
//   item,
//   collapsed,
// }: {
//   item: NavItem;
//   collapsed: boolean;
// }) {
//   const { isActive } = useNav();
//   const active = isActive(item.href);
//   const Icon = item.icon;

//   return (
//     <Link
//       to={item.href}
//       title={collapsed ? item.label : undefined}
//       className={cn(
//         "group flex items-center gap-2.5 px-3 py-2 rounded-[var(--radius-lg)] text-sm font-medium transition-all duration-150",
//         "focus-visible:outline-2 focus-visible:outline-[var(--color-ring)] focus-visible:outline-offset-2",
//         active
//           ? "bg-[var(--color-foreground)] text-[var(--color-background)]"
//           : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-surface)] hover:text-[var(--color-foreground)]",
//         collapsed && "justify-center px-2"
//       )}
//     >
//       <Icon
//         size={16}
//         strokeWidth={active ? 2.5 : 1.75}
//         className={cn(
//           "shrink-0",
//           active ? "opacity-100" : "opacity-70 group-hover:opacity-100"
//         )}
//       />
//       {!collapsed && (
//         <>
//           <span className="flex-1 truncate">{item.label}</span>
//           {item.badge !== undefined && (
//             <span
//               className={cn(
//                 "inline-flex items-center justify-center text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1",
//                 active
//                   ? "bg-[var(--color-background)]/20 text-[var(--color-background)]"
//                   : "bg-[var(--color-surface-elevated)] text-[var(--color-muted-foreground)]"
//               )}
//             >
//               {item.badge}
//             </span>
//           )}
//         </>
//       )}
//     </Link>
//   );
// }

// // ─── Sidebar ──────────────────────────────────────────────
// function AdminSidebar({
//   collapsed,
//   onToggle,
//   mobileOpen,
//   onMobileClose,
// }: {
//   collapsed: boolean;
//   onToggle: () => void;
//   mobileOpen: boolean;
//   onMobileClose: () => void;
// }) {
//   return (
//     <>
//       {/* Mobile overlay */}
//       {mobileOpen && (
//         <div
//           className="fixed inset-0 bg-[var(--color-overlay)] z-[1200] lg:hidden"
//           onClick={onMobileClose}
//           aria-hidden="true"
//         />
//       )}

//       {/* Sidebar panel */}
//       <aside
//         className={cn(
//           "fixed top-0 left-0 bottom-0 z-[1300] flex flex-col bg-[var(--color-background)] border-r border-[var(--color-border)] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
//           // Desktop
//           "lg:relative lg:translate-x-0",
//           collapsed ? "lg:w-[60px]" : "lg:w-[220px]",
//           // Mobile
//           mobileOpen
//             ? "translate-x-0 w-[220px]"
//             : "-translate-x-full w-[220px] lg:w-auto"
//         )}
//       >
//         {/* Logo */}
//         <div
//           className={cn(
//             "flex items-center h-14 border-b border-[var(--color-border)] shrink-0 px-3",
//             collapsed ? "justify-center" : "gap-2.5"
//           )}
//         >
//           <div className="w-7 h-7 rounded-[var(--radius-md)] bg-[var(--color-foreground)] flex items-center justify-center shrink-0">
//             <span className="text-[var(--color-background)] text-xs font-black tracking-tighter">
//               D2
//             </span>
//           </div>
//           {!collapsed && (
//             <div className="flex flex-col leading-none">
//               <span className="text-sm font-bold text-[var(--color-foreground)] tracking-tight">
//                 CMS Core
//               </span>
//             </div>
//           )}

//           {/* Mobile close */}
//           <button
//             onClick={onMobileClose}
//             className="ml-auto lg:hidden text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
//             aria-label="Close sidebar"
//           >
//             <X size={18} />
//           </button>

//           {/* Desktop collapse toggle */}
//           <button
//             onClick={onToggle}
//             className={cn(
//               "hidden lg:flex items-center justify-center w-5 h-5 rounded-full text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-surface)] transition-all duration-150",
//               collapsed ? "" : "ml-auto"
//             )}
//             aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
//           >
//             <ChevronRight
//               size={12}
//               className={cn(
//                 "transition-transform duration-300",
//                 !collapsed && "rotate-180"
//               )}
//             />
//           </button>
//         </div>

//         {/* Nav */}
//         <nav className="flex-1 overflow-y-auto overflow-x-hidden p-2 flex flex-col gap-4 no-scrollbar">
//           {NAV_SECTIONS.map((section) => (
//             <div key={section.label}>
//               {!collapsed && (
//                 <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">
//                   {section.label}
//                 </p>
//               )}
//               <div className="flex flex-col gap-0.5">
//                 {section.items.map((item) => (
//                   <SideNavItem
//                     key={item.href}
//                     item={item}
//                     collapsed={collapsed}
//                   />
//                 ))}
//               </div>
//             </div>
//           ))}
//         </nav>

//         {/* Footer */}
//         <div
//           className={cn("p-2 border-t border-[var(--color-border)] shrink-0")}
//         >
//           <Link
//             to={ROUTES.ADMIN.SETTINGS}
//             className={cn(
//               "flex items-center gap-2.5 px-3 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-surface)] transition-colors",
//               collapsed && "justify-center px-2"
//             )}
//           >
//             <D2YAvatar name="Admin User" size="xs" />
//             {!collapsed && (
//               <div className="flex flex-col leading-none min-w-0">
//                 <span className="text-xs font-semibold text-[var(--color-foreground)] truncate">
//                   Admin User
//                 </span>
//                 <span className="text-[10px] text-[var(--color-muted-foreground)] truncate">
//                   admin@d2y.studio
//                 </span>
//               </div>
//             )}
//           </Link>
//         </div>
//       </aside>
//     </>
//   );
// }

// // ─── Topbar ───────────────────────────────────────────────
// function AdminTopbar({ onMenuClick }: { onMenuClick: () => void }) {
//   const { isDark, toggleTheme } = useTheme();

//   return (
//     <header className="h-14 border-b border-[var(--color-border)] bg-[var(--color-background)] flex items-center gap-3 px-4 shrink-0">
//       {/* Mobile menu */}
//       <D2YButton
//         variant="ghost"
//         size="sm"
//         leftIcon={<Menu size={18} />}
//         onClick={onMenuClick}
//         className="lg:hidden"
//         aria-label="Open menu"
//       />

//       {/* Nav tabs */}
//       <nav className="hidden md:flex items-center gap-1">
//         {["Overview", "Users", "Content", "Media"].map((tab, i) => (
//           <button
//             key={tab}
//             className={cn(
//               "px-3 py-1.5 text-sm rounded-[var(--radius-base)] transition-colors duration-150",
//               i === 1
//                 ? "font-semibold text-[var(--color-foreground)] border-b-2 border-[var(--color-foreground)] rounded-none pb-[5px]"
//                 : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
//             )}
//           >
//             {tab}
//           </button>
//         ))}
//       </nav>

//       {/* Right actions */}
//       <div className="ml-auto flex items-center gap-2">
//         {/* Search */}
//         <div className="hidden sm:flex items-center gap-2 h-8 px-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-muted-foreground)] w-44 cursor-text">
//           <Search size={14} />
//           <span className="text-xs">Search...</span>
//           <kbd className="ml-auto text-[10px] font-mono bg-[var(--color-border)] px-1 rounded">
//             ⌘K
//           </kbd>
//         </div>

//         {/* Theme toggle */}
//         <D2YButton
//           variant="ghost"
//           size="sm"
//           leftIcon={isDark ? <Sun size={16} /> : <Moon size={16} />}
//           onClick={toggleTheme}
//           aria-label="Toggle theme"
//         />

//         {/* Notifications */}
//         <div className="relative">
//           <D2YButton
//             variant="ghost"
//             size="sm"
//             leftIcon={<Bell size={16} />}
//             aria-label="Notifications"
//           />
//           <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[var(--color-destructive)] border-2 border-[var(--color-background)]" />
//         </div>

//         {/* Settings */}
//         <Link to={ROUTES.ADMIN.SETTINGS}>
//           <D2YAvatar name="Admin User" size="sm" ring />
//         </Link>
//       </div>
//     </header>
//   );
// }

// // ─── Layout ───────────────────────────────────────────────
// export default function AdminLayout({ children }: { children: ReactNode }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   return (
//     <div className="flex h-screen overflow-hidden bg-[var(--color-background)]">
//       <AdminSidebar
//         collapsed={collapsed}
//         onToggle={() => setCollapsed((v) => !v)}
//         mobileOpen={mobileOpen}
//         onMobileClose={() => setMobileOpen(false)}
//       />

//       {/* Main */}
//       <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
//         <AdminTopbar onMenuClick={() => setMobileOpen(true)} />

//         <main
//           id="main-content"
//           className="flex-1 overflow-y-auto bg-[var(--color-surface)]"
//         >
//           <div className="min-h-full">{children}</div>
//         </main>
//       </div>
//     </div>
//   );
// }
