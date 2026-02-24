// ============================================================
// ComponentsDemo — Full showcase of all D2Y base components
// ============================================================

import { useState } from "react";
import {
  Search,
  User,
  Mail,
  Lock,
  Phone,
  Calendar,
  Star,
  Heart,
  Download,
  Trash2,
  Edit,
  MoreVertical,
  Plus,
  CheckCircle2,
  Package,
  Truck,
  Home,
  ChevronRight,
  AlertTriangle,
  Info,
  Layers,
  Grid3X3,
  Type,
  MousePointer,
  Image as ImageIcon,
  Table,
  Bell,
  ToggleLeft,
  Tag,
  Clock,
} from "lucide-react";
import { cn } from "@/utils";
import { useTheme } from "@/hooks/useThemes";
import {
  D2YLoading,
  D2YNoData,
  D2YButton,
  D2YCard,
  D2YCardHeader,
  D2YCardTitle,
  D2YCardDescription,
  D2YCardContent,
  D2YCardFooter,
  D2YTextField,
  D2YCheckbox,
  D2YSwitch,
  D2YChip,
  D2YRoleChip,
  D2YModal,
  D2YConfirm,
  D2YSlideable,
  D2YShimmer,
  D2YShimmerCard,
  D2YShimmerProfile,
  D2YShimmerTableRow,
  D2YAvatar,
  D2YAvatarGroup,
  D2YImage,
  D2YImagePicker,
  D2YImagePreview,
  D2YCarousel,
  D2YBreadCrumbs,
  D2YTabs,
  D2YTimeline,
  D2YDatePicker,
  D2YTable,
  useToast,
} from "@/components/ui";
import type { TableColumn, TimelineStep } from "@/types";

// ─── Section wrapper ──────────────────────────────────────
function Section({
  id,
  title,
  description,
  icon: Icon,
  children,
  className,
}: {
  id: string;
  title: string;
  description?: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          {Icon && (
            <Icon
              size={18}
              className="text-[var(--color-muted-foreground)]"
              strokeWidth={1.75}
            />
          )}
          <h2 className="text-xl font-bold font-[var(--font-sans)] text-[var(--color-foreground)]">
            {title}
          </h2>
        </div>
        {description && (
          <p className="text-sm text-[var(--color-muted-foreground)] ml-6">
            {description}
          </p>
        )}
      </div>
      <div className={cn("space-y-4", className)}>{children}</div>
    </section>
  );
}

// ─── Demo row/grid ────────────────────────────────────────
function DemoRow({
  label,
  children,
  vertical = false,
}: {
  label?: string;
  children: React.ReactNode;
  vertical?: boolean;
}) {
  return (
    <div className="space-y-2">
      {label && (
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">
          {label}
        </p>
      )}
      <div
        className={cn(
          "flex flex-wrap gap-3 items-center",
          vertical && "flex-col items-start"
        )}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Demo code tag ────────────────────────────────────────
function Code({ children }: { children: string }) {
  return (
    <code className="text-xs font-mono bg-[var(--color-surface)] border border-[var(--color-border)] px-2 py-0.5 rounded text-[var(--color-muted-foreground)]">
      {children}
    </code>
  );
}

// ─── Sidebar nav ─────────────────────────────────────────
const NAV_ITEMS = [
  { id: "loading", label: "Loading", icon: Clock },
  { id: "buttons", label: "Button", icon: MousePointer },
  { id: "inputs", label: "TextField", icon: Type },
  { id: "checkbox", label: "Checkbox & Switch", icon: ToggleLeft },
  { id: "chips", label: "Chip", icon: Tag },
  { id: "cards", label: "Card", icon: Layers },
  { id: "avatar", label: "Avatar", icon: User },
  { id: "images", label: "Image", icon: ImageIcon },
  { id: "carousel", label: "Carousel", icon: Grid3X3 },
  { id: "shimmer", label: "Shimmer", icon: Layers },
  { id: "modal", label: "Modal", icon: Layers },
  { id: "toast", label: "Toast", icon: Bell },
  { id: "breadcrumb", label: "BreadCrumbs", icon: Home },
  { id: "tabs", label: "Tabs", icon: Layers },
  { id: "timeline", label: "Timeline", icon: CheckCircle2 },
  { id: "datepicker", label: "DatePicker", icon: Calendar },
  { id: "table", label: "Table", icon: Table },
  { id: "nodata", label: "NoData", icon: AlertTriangle },
  { id: "slideable", label: "Slideable", icon: ChevronRight },
];

// ─── DEMO DATA ────────────────────────────────────────────
interface UserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActivity: string;
}

const TABLE_DATA: UserRow[] = [
  {
    id: "1",
    name: "Johnathan Doe",
    email: "j.doe@company.com",
    role: "super_admin",
    status: "active",
    lastActivity: "Just now",
  },
  {
    id: "2",
    name: "Alice Miller",
    email: "miller.a@creative.io",
    role: "editor",
    status: "active",
    lastActivity: "24 mins ago",
  },
  {
    id: "3",
    name: "Robert Kincaid",
    email: "robert.k@tech.net",
    role: "viewer",
    status: "pending",
    lastActivity: "2 days ago",
  },
  {
    id: "4",
    name: "Helena White",
    email: "helena@designhub.com",
    role: "editor",
    status: "suspended",
    lastActivity: "3 weeks ago",
  },
  {
    id: "5",
    name: "Sarah Connor",
    email: "s.connor@resistance.net",
    role: "developer",
    status: "active",
    lastActivity: "5 hours ago",
  },
  {
    id: "6",
    name: "Marcus Chen",
    email: "m.chen@tech.co",
    role: "admin",
    status: "active",
    lastActivity: "1 hour ago",
  },
  {
    id: "7",
    name: "Diana Ross",
    email: "d.ross@media.com",
    role: "viewer",
    status: "inactive",
    lastActivity: "1 month ago",
  },
  {
    id: "8",
    name: "Ethan Hunt",
    email: "e.hunt@mission.io",
    role: "developer",
    status: "active",
    lastActivity: "30 mins ago",
  },
];

const TABLE_COLUMNS: TableColumn<UserRow>[] = [
  {
    key: "name",
    label: "User",
    sortable: true,
    filterable: true,
    render: (_, row) => (
      <div className="flex items-center gap-2.5">
        <D2YAvatar name={row.name} size="sm" />
        <div className="min-w-0">
          <p className="text-sm font-medium text-[var(--color-foreground)] truncate">
            {row.name}
          </p>
          <p className="text-xs text-[var(--color-muted-foreground)] truncate">
            {row.email}
          </p>
        </div>
      </div>
    ),
  },
  {
    key: "role",
    label: "Role",
    sortable: true,
    filterable: true,
    filterOptions: [
      { value: "super_admin", label: "Super Admin" },
      { value: "admin", label: "Admin" },
      { value: "editor", label: "Editor" },
      { value: "developer", label: "Developer" },
      { value: "viewer", label: "Viewer" },
    ],
    render: (_, row) => <D2YRoleChip role={row.role} />,
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
    filterable: true,
    filterOptions: [
      { value: "active", label: "Active" },
      { value: "pending", label: "Pending" },
      { value: "suspended", label: "Suspended" },
      { value: "inactive", label: "Inactive" },
    ],
    render: (_, row) => (
      <D2YChip
        label={row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        status={row.status as "active" | "pending" | "suspended" | "inactive"}
        dot
        size="sm"
      />
    ),
  },
  {
    key: "lastActivity",
    label: "Last Activity",
    sortable: true,
    render: (val) => (
      <span className="text-sm text-[var(--color-muted-foreground)] italic">
        {String(val)}
      </span>
    ),
  },
];

const TIMELINE_STEPS: TimelineStep[] = [
  {
    id: "1",
    label: "Ordered",
    date: "OCT 24",
    status: "completed",
    description: "Order placed successfully",
  },
  {
    id: "2",
    label: "Paid",
    date: "OCT 24",
    status: "completed",
    description: "Payment confirmed",
  },
  {
    id: "3",
    label: "Shipped",
    date: "OCT 26",
    status: "active",
    description: "Package in transit",
    icon: <Truck size={14} />,
  },
  {
    id: "4",
    label: "Delivered",
    date: "EST. OCT 28",
    status: "pending",
    description: "Awaiting delivery",
  },
];

const CAROUSEL_ITEMS = [
  <div
    key="1"
    className="bg-[var(--color-surface)] rounded-[var(--radius-xl)] p-8 h-48 flex flex-col items-center justify-center gap-2 border border-[var(--color-border)]"
  >
    <Star
      size={32}
      strokeWidth={1}
      className="text-[var(--color-muted-foreground)]"
    />
    <p className="text-lg font-bold font-[var(--font-display)]">Slide One</p>
    <p className="text-sm text-[var(--color-muted-foreground)]">
      First carousel item
    </p>
  </div>,
  <div
    key="2"
    className="bg-[var(--color-foreground)] rounded-[var(--radius-xl)] p-8 h-48 flex flex-col items-center justify-center gap-2"
  >
    <Heart
      size={32}
      strokeWidth={1}
      className="text-[var(--color-background)]"
    />
    <p className="text-lg font-bold font-[var(--font-display)] text-[var(--color-background)]">
      Slide Two
    </p>
    <p className="text-sm text-[var(--color-background)]/60">
      Second carousel item
    </p>
  </div>,
  <div
    key="3"
    className="bg-[var(--color-surface-elevated)] rounded-[var(--radius-xl)] p-8 h-48 flex flex-col items-center justify-center gap-2 border border-[var(--color-border)]"
  >
    <Package
      size={32}
      strokeWidth={1}
      className="text-[var(--color-muted-foreground)]"
    />
    <p className="text-lg font-bold font-[var(--font-display)]">Slide Three</p>
    <p className="text-sm text-[var(--color-muted-foreground)]">
      Third carousel item
    </p>
  </div>,
];

// ─── Main Page ────────────────────────────────────────────
export default function ComponentsDemo() {
  const { isDark, toggleTheme } = useTheme();
  const { success, error, warning, info, toast } = useToast();

  // UI State
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [slideableOpen, setSlideableOpen] = useState(false);
  const [slideableDir, setSlideableDir] = useState<
    "left" | "right" | "top" | "bottom"
  >("right");
  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Form state
  const [textVal, setTextVal] = useState("");
  const [passVal, setPassVal] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [textareaVal, setTextareaVal] = useState("");
  const [selectVal, setSelectVal] = useState("");
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [switchOn, setSwitchOn] = useState(false);
  const [dateVal, setDateVal] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const [activeTab, setActiveTab] = useState("overview");
  const [activeTabVariant, setActiveTabVariant] = useState<
    "underline" | "pills" | "boxed" | "soft"
  >("underline");

  const PREVIEW_IMAGES = [
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      alt: "Mountain",
      caption: "Beautiful mountain landscape",
    },
    {
      src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
      alt: "Lake",
      caption: "Serene lake reflection",
    },
    {
      src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
      alt: "Forest",
      caption: "Misty forest morning",
    },
  ];

  const TABS = [
    {
      id: "overview",
      label: "Overview",
      icon: <Layers size={14} />,
      content: (
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Overview content goes here. This is the default tab.
        </p>
      ),
    },
    {
      id: "analytics",
      label: "Analytics",
      badge: 12,
      content: (
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Analytics data would be displayed here.
        </p>
      ),
    },
    {
      id: "settings",
      label: "Settings",
      content: (
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Settings panel content.
        </p>
      ),
    },
    { id: "disabled", label: "Disabled", disabled: true, content: null },
  ];

  const sidebarWidth = 200;

  return (
    <div className="flex min-h-screen bg-[var(--color-background)]">
      {/* ─── Sticky Sidebar Nav ───────────────────────────── */}
      <aside
        className="hidden xl:flex flex-col sticky top-0 h-screen shrink-0 border-r border-[var(--color-border)] bg-[var(--color-background)] overflow-y-auto no-scrollbar"
        style={{ width: sidebarWidth }}
      >
        {/* Header */}
        <div className="px-4 pt-6 pb-4 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded bg-[var(--color-foreground)] flex items-center justify-center">
              <span className="text-[var(--color-background)] text-[9px] font-black">
                D2Y
              </span>
            </div>
            <span className="text-xs font-bold text-[var(--color-foreground)] tracking-tight">
              Components
            </span>
          </div>
          <p className="text-[10px] text-[var(--color-muted-foreground)]">
            Design System v1.0
          </p>
        </div>

        {/* Theme toggle */}
        <div className="px-3 pt-3">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-surface)] rounded-[var(--radius-md)] transition-colors"
          >
            <span>{isDark ? "☀️" : "🌑"}</span>
            <span>{isDark ? "Light mode" : "Dark mode"}</span>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 p-3 flex flex-col gap-0.5">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <a
              key={id}
              href={`#${id}`}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-surface)] rounded-[var(--radius-md)] transition-colors group"
            >
              <Icon
                size={13}
                strokeWidth={1.75}
                className="shrink-0 opacity-60 group-hover:opacity-100"
              />
              {label}
            </a>
          ))}
        </nav>

        <div className="p-4 border-t border-[var(--color-border)]">
          <p className="text-[10px] text-[var(--color-muted-foreground)]">
            {NAV_ITEMS.length} components
          </p>
        </div>
      </aside>

      {/* ─── Main content ─────────────────────────────────── */}
      <main className="flex-1 min-w-0 overflow-x-hidden">
        {/* Page header */}
        <div className="sticky top-0 z-10 bg-[var(--color-background)]/90 backdrop-blur border-b border-[var(--color-border)] px-6 sm:px-10 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-[var(--font-display)] text-[var(--color-foreground)] leading-tight">
              Component Library
            </h1>
            <p className="text-xs text-[var(--color-muted-foreground)] mt-0.5">
              D2Y Design System — All base components
            </p>
          </div>
          <D2YButton
            variant="outline"
            size="sm"
            leftIcon={isDark ? <span>☀️</span> : <span>🌑</span>}
            onClick={toggleTheme}
            className="shrink-0 xl:hidden"
          >
            {isDark ? "Light" : "Dark"}
          </D2YButton>
        </div>

        <div className="px-6 sm:px-10 py-10 space-y-16 max-w-4xl">
          {/* ═══════════════════════════════════════════════
              LOADING
          ═══════════════════════════════════════════════ */}
          <Section
            id="loading"
            title="D2YLoading"
            icon={Clock}
            description="Spinner, dots, and bar loading indicators with size variants."
          >
            <D2YCard>
              <D2YCardContent>
                <div className="space-y-6">
                  <DemoRow label="Variants">
                    <div className="flex flex-col items-center gap-1.5">
                      <D2YLoading variant="spinner" size="md" />
                      <Code>spinner</Code>
                    </div>
                    <div className="flex flex-col items-center gap-1.5">
                      <D2YLoading variant="dots" size="md" />
                      <Code>dots</Code>
                    </div>
                    <div className="flex flex-col items-center gap-1.5">
                      <D2YLoading variant="bar" size="md" />
                      <Code>bar</Code>
                    </div>
                  </DemoRow>

                  <DemoRow label="Sizes (spinner)">
                    {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
                      <div
                        key={s}
                        className="flex flex-col items-center gap-1.5"
                      >
                        <D2YLoading size={s} />
                        <Code>{s}</Code>
                      </div>
                    ))}
                  </DemoRow>

                  <DemoRow label="With label">
                    <D2YLoading size="md" label="Loading data..." />
                    <D2YLoading variant="dots" size="md" label="Please wait" />
                  </DemoRow>
                </div>
              </D2YCardContent>
            </D2YCard>
          </Section>

          {/* ═══════════════════════════════════════════════
              BUTTONS
          ═══════════════════════════════════════════════ */}
          <Section
            id="buttons"
            title="D2YButton"
            icon={MousePointer}
            description="6 variants, 5 sizes, loading state, icon support."
          >
            <D2YCard>
              <D2YCardContent>
                <div className="space-y-6">
                  <DemoRow label="Variants">
                    <D2YButton variant="primary">Primary</D2YButton>
                    <D2YButton variant="secondary">Secondary</D2YButton>
                    <D2YButton variant="outline">Outline</D2YButton>
                    <D2YButton variant="ghost">Ghost</D2YButton>
                    <D2YButton variant="destructive">Destructive</D2YButton>
                    <D2YButton variant="link">Link</D2YButton>
                  </DemoRow>

                  <DemoRow label="Sizes">
                    {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
                      <D2YButton key={s} variant="outline" size={s}>
                        {s.toUpperCase()}
                      </D2YButton>
                    ))}
                  </DemoRow>

                  <DemoRow label="With icons">
                    <D2YButton variant="primary" leftIcon={<Plus size={16} />}>
                      New Item
                    </D2YButton>
                    <D2YButton
                      variant="outline"
                      rightIcon={<Download size={16} />}
                    >
                      Export
                    </D2YButton>
                    <D2YButton variant="ghost" leftIcon={<Edit size={16} />} />
                    <D2YButton
                      variant="ghost"
                      leftIcon={<Trash2 size={16} />}
                    />
                    <D2YButton
                      variant="outline"
                      leftIcon={<Star size={16} />}
                      rounded
                    >
                      Rounded
                    </D2YButton>
                  </DemoRow>

                  <DemoRow label="States">
                    <D2YButton loading loadingText="Saving...">
                      Save
                    </D2YButton>
                    <D2YButton disabled>Disabled</D2YButton>
                    <D2YButton variant="outline" fullWidth>
                      Full Width
                    </D2YButton>
                  </DemoRow>
                </div>
              </D2YCardContent>
            </D2YCard>
          </Section>

          {/* ═══════════════════════════════════════════════
              TEXT FIELDS
          ═══════════════════════════════════════════════ */}
          <Section
            id="inputs"
            title="D2YTextField"
            icon={Type}
            description="All input types: text, email, password, number, textarea, select, date, time."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <D2YCard>
                <D2YCardContent>
                  <div className="space-y-4">
                    <D2YTextField
                      label="Text Input"
                      placeholder="Type something..."
                      value={textVal}
                      onChange={(e) => setTextVal(e.target.value)}
                      hint="A basic text field"
                      clearable
                      onClear={() => setTextVal("")}
                    />
                    <D2YTextField
                      type="email"
                      label="Email"
                      placeholder="you@example.com"
                      value={emailVal}
                      onChange={(e) => setEmailVal(e.target.value)}
                      leftIcon={<Mail size={16} />}
                    />
                    <D2YTextField
                      type="password"
                      label="Password"
                      placeholder="Min. 8 characters"
                      value={passVal}
                      onChange={(e) => setPassVal(e.target.value)}
                      leftIcon={<Lock size={16} />}
                    />
                    <D2YTextField
                      type="text"
                      label="With Error"
                      placeholder="Enter value"
                      error="This field is required"
                      leftIcon={<Phone size={16} />}
                    />
                    <D2YTextField
                      type="text"
                      label="With Success"
                      defaultValue="john.doe@email.com"
                      success="Email is available"
                      leftIcon={<Mail size={16} />}
                    />
                  </div>
                </D2YCardContent>
              </D2YCard>

              <D2YCard>
                <D2YCardContent>
                  <div className="space-y-4">
                    <D2YTextField
                      type="textarea"
                      label="Textarea"
                      placeholder="Write your message..."
                      value={textareaVal}
                      onChange={(e) => setTextareaVal(e.target.value)}
                      rows={3}
                      hint={`${textareaVal.length}/500 characters`}
                    />
                    <D2YTextField
                      type="select"
                      label="Select"
                      placeholder="Choose an option"
                      value={selectVal}
                      onChange={(e) => setSelectVal(e.target.value)}
                      options={[
                        { value: "design", label: "UI/UX Design" },
                        { value: "dev", label: "Web Development" },
                        { value: "brand", label: "Brand Identity" },
                        { value: "seo", label: "SEO Optimization" },
                      ]}
                    />
                    <D2YTextField
                      type="number"
                      label="Number"
                      placeholder="0"
                      min={0}
                      max={100}
                      hint="Value between 0–100"
                    />
                    <D2YTextField
                      type="search"
                      label="Search"
                      placeholder="Search..."
                      leftIcon={<Search size={16} />}
                    />
                    <D2YTextField
                      type="text"
                      label="Disabled"
                      value="Read only value"
                      disabled
                    />
                  </div>
                </D2YCardContent>
              </D2YCard>

              {/* Sizes */}
              <D2YCard className="md:col-span-2">
                <D2YCardContent>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)] mb-3">
                    Sizes
                  </p>
                  <div className="flex gap-4 flex-wrap items-start">
                    {(["sm", "md", "lg"] as const).map((s) => (
                      <D2YTextField
                        key={s}
                        type="text"
                        label={`Size: ${s}`}
                        placeholder={`${s} input...`}
                        size={s}
                        className="w-40"
                        fullWidth={false}
                      />
                    ))}
                  </div>
                </D2YCardContent>
              </D2YCard>
            </div>
          </Section>

          {/* ═══════════════════════════════════════════════
              CHECKBOX & SWITCH
          ═══════════════════════════════════════════════ */}
          <Section
            id="checkbox"
            title="D2YCheckbox & D2YSwitch"
            icon={ToggleLeft}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <D2YCard>
                <D2YCardTitle className="mb-4">Checkbox</D2YCardTitle>
                <D2YCardContent>
                  <div className="space-y-4">
                    <D2YCheckbox
                      label="Default unchecked"
                      checked={checked1}
                      onChange={(e) => setChecked1(e.target.checked)}
                    />
                    <D2YCheckbox
                      label="Default checked"
                      description="This is an additional description line"
                      checked={checked2}
                      onChange={(e) => setChecked2(e.target.checked)}
                    />
                    <D2YCheckbox
                      label="Indeterminate state"
                      indeterminate
                      onChange={() => {}}
                    />
                    <D2YCheckbox label="Disabled unchecked" disabled />
                    <D2YCheckbox label="Disabled checked" checked disabled />
                    <D2YCheckbox
                      label="With error"
                      error="Please accept the terms"
                    />

                    <div className="pt-2 border-t border-[var(--color-border)]">
                      <p className="text-xs text-[var(--color-muted-foreground)] mb-2 font-semibold uppercase tracking-wider">
                        Sizes
                      </p>
                      <div className="flex gap-4">
                        {(["sm", "md", "lg"] as const).map((s) => (
                          <D2YCheckbox
                            key={s}
                            label={s.toUpperCase()}
                            checked
                            size={s}
                            onChange={() => {}}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </D2YCardContent>
              </D2YCard>

              <D2YCard>
                <D2YCardTitle className="mb-4">Switch</D2YCardTitle>
                <D2YCardContent>
                  <div className="space-y-4">
                    <D2YSwitch
                      label="Toggle me"
                      checked={switchOn}
                      onCheckedChange={setSwitchOn}
                    />
                    <D2YSwitch
                      label="Notifications"
                      description="Receive email notifications"
                      checked={true}
                      onChange={() => {}}
                    />
                    <D2YSwitch
                      label="Dark mode"
                      checked={isDark}
                      onCheckedChange={() => toggleTheme()}
                    />
                    <D2YSwitch label="Disabled off" disabled />
                    <D2YSwitch label="Disabled on" checked disabled />

                    <div className="pt-2 border-t border-[var(--color-border)]">
                      <p className="text-xs text-[var(--color-muted-foreground)] mb-2 font-semibold uppercase tracking-wider">
                        Sizes
                      </p>
                      <div className="flex gap-4 flex-wrap">
                        {(["sm", "md", "lg"] as const).map((s) => (
                          <D2YSwitch
                            key={s}
                            label={s.toUpperCase()}
                            checked
                            size={s}
                            onChange={() => {}}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </D2YCardContent>
              </D2YCard>
            </div>
          </Section>

          {/* ═══════════════════════════════════════════════
              CHIP
          ═══════════════════════════════════════════════ */}
          <Section
            id="chips"
            title="D2YChip"
            icon={Tag}
            description="Tags, badges, status indicators and role chips."
          >
            <D2YCard>
              <D2YCardContent>
                <div className="space-y-5">
                  <DemoRow label="Variants">
                    <D2YChip label="Filled" variant="filled" />
                    <D2YChip label="Outline" variant="outline" />
                    <D2YChip label="Soft" variant="soft" />
                  </DemoRow>

                  <DemoRow label="Status">
                    {(
                      [
                        "active",
                        "pending",
                        "suspended",
                        "inactive",
                        "error",
                        "shipped",
                        "delivered",
                      ] as const
                    ).map((s) => (
                      <D2YChip
                        key={s}
                        label={s.charAt(0).toUpperCase() + s.slice(1)}
                        status={s}
                        dot
                        size="sm"
                      />
                    ))}
                  </DemoRow>

                  <DemoRow label="Sizes">
                    {(["xs", "sm", "md"] as const).map((s) => (
                      <D2YChip
                        key={s}
                        label={`Size ${s}`}
                        variant="soft"
                        size={s}
                      />
                    ))}
                  </DemoRow>

                  <DemoRow label="Role chips">
                    {(
                      [
                        "super_admin",
                        "admin",
                        "editor",
                        "developer",
                        "viewer",
                      ] as const
                    ).map((r) => (
                      <D2YRoleChip key={r} role={r} />
                    ))}
                  </DemoRow>

                  <DemoRow label="Removable">
                    <D2YChip
                      label="React"
                      variant="soft"
                      onRemove={() => success("Chip removed!")}
                    />
                    <D2YChip
                      label="TypeScript"
                      variant="outline"
                      onRemove={() => success("Chip removed!")}
                    />
                    <D2YChip
                      label="TailwindCSS"
                      variant="filled"
                      onRemove={() => success("Chip removed!")}
                    />
                  </DemoRow>

                  <DemoRow label="Clickable">
                    <D2YChip
                      label="Click me"
                      variant="soft"
                      onClick={() => info("Chip clicked!")}
                    />
                    <D2YChip
                      label="Select"
                      variant="outline"
                      onClick={() => info("Selected!")}
                    />
                  </DemoRow>
                </div>
              </D2YCardContent>
            </D2YCard>
          </Section>

          {/* ═══════════════════════════════════════════════
              CARDS
          ═══════════════════════════════════════════════ */}
          <Section
            id="cards"
            title="D2YCard"
            icon={Layers}
            description="Versatile card container with sub-components."
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Basic */}
              <D2YCard>
                <D2YCardHeader>
                  <D2YCardTitle>Basic Card</D2YCardTitle>
                </D2YCardHeader>
                <D2YCardContent>
                  <D2YCardDescription>
                    A simple card with header and content. Clean and minimal.
                  </D2YCardDescription>
                </D2YCardContent>
                <D2YCardFooter>
                  <D2YButton variant="outline" size="sm">
                    Cancel
                  </D2YButton>
                  <D2YButton variant="primary" size="sm">
                    Confirm
                  </D2YButton>
                </D2YCardFooter>
              </D2YCard>

              {/* Hoverable */}
              <D2YCard
                hoverable
                clickable
                onClick={() => info("Card clicked!")}
              >
                <D2YCardHeader>
                  <div>
                    <D2YCardTitle>Clickable Card</D2YCardTitle>
                    <D2YCardDescription className="mt-0.5">
                      Hover and click me
                    </D2YCardDescription>
                  </div>
                  <D2YChip label="New" status="active" dot size="xs" />
                </D2YCardHeader>
                <D2YCardContent>
                  <D2YCardDescription>
                    This card has hover effect and is fully clickable. Great for
                    navigation cards.
                  </D2YCardDescription>
                </D2YCardContent>
              </D2YCard>

              {/* Shadow variants */}
              <D2YCard
                shadow="lg"
                className="border-[var(--color-foreground)]/10"
              >
                <D2YCardHeader>
                  <D2YCardTitle>Shadow LG</D2YCardTitle>
                </D2YCardHeader>
                <D2YCardContent>
                  <D2YCardDescription>
                    Card with large shadow for elevated content emphasis.
                  </D2YCardDescription>
                  <div className="mt-3 flex gap-2">
                    <D2YButton
                      size="sm"
                      variant="primary"
                      leftIcon={<Star size={14} />}
                    >
                      Featured
                    </D2YButton>
                  </div>
                </D2YCardContent>
              </D2YCard>

              {/* Compact */}
              <D2YCard compact>
                <D2YCardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-surface-elevated)] flex items-center justify-center">
                      <Info
                        size={18}
                        className="text-[var(--color-muted-foreground)]"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Compact Card</p>
                      <p className="text-xs text-[var(--color-muted-foreground)]">
                        Less padding variant
                      </p>
                    </div>
                  </div>
                </D2YCardContent>
              </D2YCard>

              {/* Stats card */}
              <D2YCard>
                <D2YCardContent>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest font-semibold text-[var(--color-muted-foreground)]">
                        Total Users
                      </p>
                      <p className="text-3xl font-bold font-[var(--font-display)] mt-1">
                        1,284
                      </p>
                      <p className="text-xs text-[var(--color-success)] mt-1">
                        ↑ +12% this month
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-surface)] flex items-center justify-center">
                      <User
                        size={18}
                        className="text-[var(--color-muted-foreground)]"
                      />
                    </div>
                  </div>
                </D2YCardContent>
              </D2YCard>

              {/* No border */}
              <D2YCard
                bordered={false}
                shadow="md"
                className="bg-[var(--color-foreground)]"
              >
                <D2YCardContent>
                  <p className="text-sm font-semibold text-[var(--color-background)]">
                    Inverted Card
                  </p>
                  <p className="text-xs text-[var(--color-background)]/60 mt-1">
                    Dark background with no border
                  </p>
                  <D2YButton
                    variant="secondary"
                    size="sm"
                    className="mt-3 bg-[var(--color-background)]/10 text-[var(--color-background)] border-[var(--color-background)]/20 hover:bg-[var(--color-background)]/20"
                  >
                    Action
                  </D2YButton>
                </D2YCardContent>
              </D2YCard>
            </div>
          </Section>

          {/* ═══════════════════════════════════════════════
              AVATAR
          ═══════════════════════════════════════════════ */}
          <Section
            id="avatar"
            title="D2YAvatar"
            icon={User}
            description="User avatars with image, initials, status, and group support."
          >
            <D2YCard>
              <D2YCardContent>
                <div className="space-y-6">
                  <DemoRow label="Image vs Initials vs Fallback">
                    <D2YAvatar
                      src="https://i.pravatar.cc/150?img=1"
                      name="Alice Miller"
                      size="md"
                    />
                    <D2YAvatar name="Robert Kincaid" size="md" />
                    <D2YAvatar name="Helena White" size="md" />
                    <D2YAvatar name="Sarah Connor" size="md" />
                    <D2YAvatar size="md" />
                  </DemoRow>

                  <DemoRow label="Sizes">
                    {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
                      <div
                        key={s}
                        className="flex flex-col items-center gap-1.5"
                      >
                        <D2YAvatar name="Demo User" size={s} />
                        <Code>{s}</Code>
                      </div>
                    ))}
                  </DemoRow>

                  <DemoRow label="Status indicators">
                    <D2YAvatar name="Online User" size="md" status="online" />
                    <D2YAvatar name="Busy User" size="md" status="busy" />
                    <D2YAvatar name="Away User" size="md" status="away" />
                    <D2YAvatar name="Offline User" size="md" status="offline" />
                  </DemoRow>

                  <DemoRow label="Shapes & Ring">
                    <D2YAvatar name="Circle" size="md" shape="circle" ring />
                    <D2YAvatar name="Square" size="md" shape="square" />
                    <D2YAvatar
                      src="https://i.pravatar.cc/150?img=5"
                      name="Ring"
                      size="lg"
                      ring
                    />
                  </DemoRow>

                  <DemoRow label="Avatar Group">
                    <D2YAvatarGroup
                      avatars={[
                        { name: "Alice M" },
                        { name: "Bob K" },
                        { name: "Carol S" },
                        { name: "Dan R" },
                        { name: "Emma T" },
                        { name: "Frank B" },
                      ]}
                      max={4}
                      size="sm"
                    />
                  </DemoRow>
                </div>
              </D2YCardContent>
            </D2YCard>
          </Section>

          {/* ═══════════════════════════════════════════════
              IMAGES
          ═══════════════════════════════════════════════ */}
          <Section
            id="images"
            title="D2YImage & D2YImagePicker"
            icon={ImageIcon}
            description="Lazy-loaded images with shimmer, fallback, and file upload picker."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* D2YImage */}
              <D2YCard>
                <D2YCardTitle className="mb-4">
                  D2YImage — Lazy load
                </D2YCardTitle>
                <D2YCardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-[var(--color-muted-foreground)] mb-1.5">
                        16/9 cover
                      </p>
                      <D2YImage
                        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80"
                        alt="Mountain"
                        aspectRatio="16/9"
                        rounded="lg"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-muted-foreground)] mb-1.5">
                        1:1 cover
                      </p>
                      <D2YImage
                        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=300&q=80"
                        alt="Lake"
                        aspectRatio="1/1"
                        rounded="xl"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-muted-foreground)] mb-1.5">
                        Broken src fallback
                      </p>
                      <D2YImage
                        src="https://broken-url.example/image.jpg"
                        alt="Broken image"
                        aspectRatio="16/9"
                        rounded="lg"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-muted-foreground)] mb-1.5">
                        4/3 contain
                      </p>
                      <D2YImage
                        src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80"
                        alt="Forest"
                        aspectRatio="4/3"
                        objectFit="contain"
                        rounded="lg"
                      />
                    </div>
                  </div>

                  {/* Image Preview trigger */}
                  <div className="mt-4">
                    <D2YButton
                      variant="outline"
                      size="sm"
                      leftIcon={<ImageIcon size={14} />}
                      onClick={() => setImagePreviewOpen(true)}
                    >
                      Open Lightbox Preview
                    </D2YButton>
                  </div>
                </D2YCardContent>
              </D2YCard>

              {/* D2YImagePicker */}
              <D2YCard>
                <D2YCardTitle className="mb-4">
                  D2YImagePicker — Upload
                </D2YCardTitle>
                <D2YCardContent>
                  <div className="space-y-4">
                    <D2YImagePicker
                      label="Upload cover image"
                      hint="JPG, PNG, WebP · Max 10MB"
                      value={selectedFile}
                      onChange={(f) => setSelectedFile(f)}
                    />
                    <D2YImagePicker
                      label="Profile picture (circle)"
                      shape="circle"
                      hint="Square image recommended"
                    />
                    <D2YImagePicker
                      label="Disabled"
                      disabled
                      hint="Upload is disabled"
                    />
                  </div>
                </D2YCardContent>
              </D2YCard>
            </div>
          </Section>

          {/* ═══════════════════════════════════════════════
              CAROUSEL
          ═══════════════════════════════════════════════ */}
          <Section
            id="carousel"
            title="D2YCarousel"
            icon={Grid3X3}
            description="Touch-swipeable carousel with autoplay, dots, and arrow navigation."
          >
            <D2YCard>
              <D2YCardContent>
                <div className="space-y-8">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)] mb-3">
                      Single slide
                    </p>
                    <D2YCarousel
                      items={CAROUSEL_ITEMS}
                      showDots
                      showArrows
                      loop
                    />
                  </div>
                </div>
              </D2YCardContent>
            </D2YCard>
          </Section>

          {/* ═══════════════════════════════════════════════
              SHIMMER
          ═══════════════════════════════════════════════ */}
          <Section
            id="shimmer"
            title="D2YShimmer"
            icon={Layers}
            description="Skeleton loading states for any content type."
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <D2YCard>
                <D2YCardTitle className="mb-3 text-sm">
                  Text shimmer
                </D2YCardTitle>
                <D2YCardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <D2YShimmer height="1.5rem" width="60%" />
                      <D2YShimmer height="1rem" />
                      <D2YShimmer height="1rem" />
                      <D2YShimmer height="1rem" width="75%" />
                    </div>
                    <div className="space-y-2">
                      {[90, 100, 70, 85, 60].map((w, i) => (
                        <D2YShimmer key={i} height="0.75rem" width={`${w}%`} />
                      ))}
                    </div>
                  </div>
                </D2YCardContent>
              </D2YCard>

              <D2YCard>
                <D2YCardTitle className="mb-3 text-sm">
                  Profile shimmer
                </D2YCardTitle>
                <D2YCardContent>
                  <div className="space-y-4">
                    <D2YShimmerProfile />
                    <D2YShimmerProfile />
                    <D2YShimmerProfile />
                    <D2YShimmer height="2.5rem" rounded="md" className="mt-2" />
                  </div>
                </D2YCardContent>
              </D2YCard>

              <D2YCard>
                <D2YCardTitle className="mb-3 text-sm">
                  Card shimmer
                </D2YCardTitle>
                <D2YCardContent>
                  <D2YShimmerCard />
                </D2YCardContent>
              </D2YCard>

              <D2YCard className="md:col-span-3">
                <D2YCardTitle className="mb-3 text-sm">
                  Table row shimmer
                </D2YCardTitle>
                <D2YCardContent className="-mx-5 -mb-5">
                  {[0, 1, 2, 3].map((i) => (
                    <D2YShimmerTableRow key={i} cols={5} />
                  ))}
                </D2YCardContent>
              </D2YCard>
            </div>
          </Section>

          {/* ═══════════════════════════════════════════════
              MODAL
          ═══════════════════════════════════════════════ */}
          <Section
            id="modal"
            title="D2YModal & D2YConfirm"
            icon={Layers}
            description="Accessible modal dialogs with focus trap and keyboard support."
          >
            <D2YCard>
              <D2YCardContent>
                <div className="space-y-4">
                  <DemoRow label="Open modal">
                    <D2YButton
                      variant="primary"
                      onClick={() => setModalOpen(true)}
                    >
                      Open Modal
                    </D2YButton>
                    <D2YButton
                      variant="destructive"
                      onClick={() => setConfirmOpen(true)}
                    >
                      Confirm Dialog
                    </D2YButton>
                  </DemoRow>

                  <div className="p-4 bg-[var(--color-surface)] rounded-[var(--radius-lg)] text-sm text-[var(--color-muted-foreground)]">
                    <p className="flex items-center gap-2">
                      <Info size={14} className="shrink-0" />
                      Modals support: size variants (sm/md/lg/xl/full), scroll
                      behavior (inside/outside), close on backdrop and ESC key,
                      focus trap.
                    </p>
                  </div>
                </div>
              </D2YCardContent>
            </D2YCard>

            {/* Modal instance */}
            <D2YModal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              title="Edit User Details"
              description="Update the information below and save your changes."
              size="md"
              footer={
                <>
                  <D2YButton
                    variant="outline"
                    size="sm"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </D2YButton>
                  <D2YButton
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setModalOpen(false);
                      success("Changes saved!");
                    }}
                  >
                    Save Changes
                  </D2YButton>
                </>
              }
            >
              <div className="space-y-4">
                <D2YTextField
                  label="Full Name"
                  defaultValue="Johnathan Doe"
                  leftIcon={<User size={16} />}
                />
                <D2YTextField
                  type="email"
                  label="Email"
                  defaultValue="j.doe@company.com"
                  leftIcon={<Mail size={16} />}
                />
                <D2YTextField
                  type="select"
                  label="Role"
                  defaultValue="super_admin"
                  options={[
                    { value: "super_admin", label: "Super Admin" },
                    { value: "editor", label: "Editor" },
                    { value: "viewer", label: "Viewer" },
                  ]}
                />
              </div>
            </D2YModal>

            {/* Confirm dialog */}
            <D2YConfirm
              open={confirmOpen}
              onClose={() => setConfirmOpen(false)}
              onConfirm={() => {
                setConfirmOpen(false);
                error("User deleted!");
              }}
              title="Delete User"
              description="Are you sure you want to delete this user? This action cannot be undone."
              confirmLabel="Delete User"
              cancelLabel="Keep User"
              variant="destructive"
            />
          </Section>

          {/* ═══════════════════════════════════════════════
              TOAST
          ═══════════════════════════════════════════════ */}
          <Section
            id="toast"
            title="D2YToast"
            icon={Bell}
            description="Context-based toast notification system with 5 types, auto-dismiss, and actions."
          >
            <D2YCard>
              <D2YCardContent>
                <div className="space-y-4">
                  <DemoRow label="Types">
                    <D2YButton
                      variant="outline"
                      size="sm"
                      onClick={() => success("Changes saved successfully!")}
                    >
                      ✅ Success
                    </D2YButton>
                    <D2YButton
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        error("Something went wrong. Please try again.")
                      }
                    >
                      ❌ Error
                    </D2YButton>
                    <D2YButton
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        warning("Storage almost full. Please free up space.")
                      }
                    >
                      ⚠️ Warning
                    </D2YButton>
                    <D2YButton
                      variant="outline"
                      size="sm"
                      onClick={() => info("New version 2.0 is now available!")}
                    >
                      ℹ️ Info
                    </D2YButton>
                    <D2YButton
                      variant="outline"
                      size="sm"
                      onClick={() => toast("You have a new message", "default")}
                    >
                      🔔 Default
                    </D2YButton>
                  </DemoRow>

                  <DemoRow label="With title + action">
                    <D2YButton
                      variant="primary"
                      size="sm"
                      onClick={() =>
                        success("John Doe has been invited.", {
                          title: "Invitation sent",
                          action: {
                            label: "Undo",
                            onClick: () => info("Invitation cancelled"),
                          },
                          duration: 6000,
                        })
                      }
                    >
                      With title + undo action
                    </D2YButton>
                  </DemoRow>
                </div>
              </D2YCardContent>
            </D2YCard>
          </Section>

          {/* ═══════════════════════════════════════════════
              BREADCRUMBS
          ═══════════════════════════════════════════════ */}
          <Section
            id="breadcrumb"
            title="D2YBreadCrumbs"
            icon={Home}
            description="Navigation breadcrumbs with 3 separator styles."
          >
            <D2YCard>
              <D2YCardContent>
                <div className="space-y-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)] mb-2">
                      Chevron (default)
                    </p>
                    <D2YBreadCrumbs
                      separator="chevron"
                      items={[
                        { label: "Admin", href: "/admin" },
                        { label: "Users", href: "/admin/users" },
                        { label: "Johnathan Doe" },
                      ]}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)] mb-2">
                      Slash
                    </p>
                    <D2YBreadCrumbs
                      separator="slash"
                      items={[
                        { label: "Content", href: "/admin/content" },
                        { label: "Services", href: "/admin/services" },
                        { label: "UI/UX Design" },
                      ]}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)] mb-2">
                      Dot
                    </p>
                    <D2YBreadCrumbs
                      separator="dot"
                      showHome={false}
                      items={[
                        { label: "Orders", href: "/admin/orders" },
                        { label: "#ORD-84291" },
                      ]}
                    />
                  </div>
                </div>
              </D2YCardContent>
            </D2YCard>
          </Section>

          {/* ═══════════════════════════════════════════════
              TABS
          ═══════════════════════════════════════════════ */}
          <Section
            id="tabs"
            title="D2YTabs"
            icon={Layers}
            description="4 tab variants with keyboard navigation and badge support."
          >
            <D2YCard>
              <D2YCardContent>
                <div className="space-y-6">
                  {/* Variant switcher */}
                  <div className="flex flex-wrap gap-2">
                    {(["underline", "pills", "boxed", "soft"] as const).map(
                      (v) => (
                        <D2YButton
                          key={v}
                          variant={
                            activeTabVariant === v ? "primary" : "outline"
                          }
                          size="xs"
                          onClick={() => setActiveTabVariant(v)}
                        >
                          {v}
                        </D2YButton>
                      )
                    )}
                  </div>

                  <D2YTabs
                    tabs={TABS}
                    variant={activeTabVariant}
                    activeTab={activeTab}
                    onChange={setActiveTab}
                  />
                </div>
              </D2YCardContent>
            </D2YCard>
          </Section>

          {/* ═══════════════════════════════════════════════
              TIMELINE
          ═══════════════════════════════════════════════ */}
          <Section
            id="timeline"
            title="D2YTimeline"
            icon={CheckCircle2}
            description="Horizontal and vertical timeline for order tracking, progress steps, etc."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <D2YCard>
                <D2YCardTitle className="mb-4 text-sm">Horizontal</D2YCardTitle>
                <D2YCardContent>
                  <D2YTimeline
                    steps={TIMELINE_STEPS}
                    orientation="horizontal"
                  />
                </D2YCardContent>
              </D2YCard>

              <D2YCard>
                <D2YCardTitle className="mb-4 text-sm">Vertical</D2YCardTitle>
                <D2YCardContent>
                  <D2YTimeline steps={TIMELINE_STEPS} orientation="vertical" />
                </D2YCardContent>
              </D2YCard>
            </div>
          </Section>

          {/* ═══════════════════════════════════════════════
              DATEPICKER
          ═══════════════════════════════════════════════ */}
          <Section
            id="datepicker"
            title="D2YDatePicker"
            icon={Calendar}
            description="Calendar popup with min/max, clearable, and keyboard support."
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <D2YCard>
                <D2YCardContent>
                  <D2YDatePicker
                    label="Select a date"
                    value={dateVal ?? undefined}
                    onChange={(v) => setDateVal(v)}
                    hint={dateVal ? `Selected: ${dateVal}` : "No date selected"}
                    clearable
                  />
                </D2YCardContent>
              </D2YCard>
              <D2YCard>
                <D2YCardContent>
                  <D2YDatePicker
                    label="With min/max"
                    hint="Only current month available"
                    min={`${new Date().getFullYear()}-${String(
                      new Date().getMonth() + 1
                    ).padStart(2, "0")}-01`}
                    max={`${new Date().getFullYear()}-${String(
                      new Date().getMonth() + 1
                    ).padStart(2, "0")}-28`}
                  />
                </D2YCardContent>
              </D2YCard>
              <D2YCard>
                <D2YCardContent>
                  <D2YDatePicker label="With error" error="Date is required" />
                </D2YCardContent>
              </D2YCard>
            </div>
          </Section>

          {/* ═══════════════════════════════════════════════
              TABLE
          ═══════════════════════════════════════════════ */}
          <Section
            id="table"
            title="D2YTable"
            icon={Table}
            description="Full-featured data table with sorting, multi-column filtering, search, pagination, and row selection."
          >
            <D2YTable
              data={TABLE_DATA}
              columns={TABLE_COLUMNS}
              keyField="id"
              selectable
              selectedKeys={selectedRows}
              onSelectionChange={setSelectedRows}
              searchable
              searchPlaceholder="Search users..."
              searchKeys={["name", "email", "role", "status"]}
              pagination
              pageSize={5}
              toolbar={
                <>
                  {selectedRows.length > 0 && (
                    <D2YButton
                      variant="destructive"
                      size="sm"
                      leftIcon={<Trash2 size={14} />}
                      onClick={() => {
                        error(`Deleted ${selectedRows.length} user(s)`);
                        setSelectedRows([]);
                      }}
                    >
                      Delete ({selectedRows.length})
                    </D2YButton>
                  )}
                  <D2YButton
                    variant="primary"
                    size="sm"
                    leftIcon={<Plus size={14} />}
                    onClick={() => success("New user form opened")}
                  >
                    Invite User
                  </D2YButton>
                </>
              }
              actions={(row) => (
                <D2YButton
                  variant="ghost"
                  size="xs"
                  leftIcon={<MoreVertical size={14} />}
                  onClick={() => info(`Actions for ${row.name}`)}
                />
              )}
              onRowClick={(row) => info(`Clicked: ${row.name}`)}
            />
          </Section>

          {/* ═══════════════════════════════════════════════
              NO DATA
          ═══════════════════════════════════════════════ */}
          <Section
            id="nodata"
            title="D2YNoData"
            icon={AlertTriangle}
            description="Empty state indicators for different contexts."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(["default", "search", "folder", "file"] as const).map((v) => (
                <D2YCard key={v}>
                  <D2YCardContent>
                    <D2YNoData
                      variant={v}
                      size="sm"
                      action={{
                        label: "Add Item",
                        onClick: () => success("Action clicked!"),
                      }}
                    />
                  </D2YCardContent>
                </D2YCard>
              ))}
            </div>
          </Section>

          {/* ═══════════════════════════════════════════════
              SLIDEABLE
          ═══════════════════════════════════════════════ */}
          <Section
            id="slideable"
            title="D2YSlideable"
            icon={ChevronRight}
            description="Slide-in drawer panel from any direction."
          >
            <D2YCard>
              <D2YCardContent>
                <div className="space-y-4">
                  <DemoRow label="Direction">
                    {(["right", "left", "bottom", "top"] as const).map(
                      (dir) => (
                        <D2YButton
                          key={dir}
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSlideableDir(dir);
                            setSlideableOpen(true);
                          }}
                        >
                          Open {dir}
                        </D2YButton>
                      )
                    )}
                  </DemoRow>
                </div>
              </D2YCardContent>
            </D2YCard>

            <D2YSlideable
              open={slideableOpen}
              onClose={() => setSlideableOpen(false)}
              direction={slideableDir}
              title={`${
                slideableDir.charAt(0).toUpperCase() + slideableDir.slice(1)
              } Drawer`}
              description="This is a slideable panel drawer"
              size="md"
              footer={
                <>
                  <D2YButton
                    variant="outline"
                    size="sm"
                    onClick={() => setSlideableOpen(false)}
                  >
                    Cancel
                  </D2YButton>
                  <D2YButton
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setSlideableOpen(false);
                      success("Saved!");
                    }}
                  >
                    Save
                  </D2YButton>
                </>
              }
            >
              <div className="space-y-4">
                <D2YTextField label="Name" placeholder="Enter name..." />
                <D2YTextField
                  type="email"
                  label="Email"
                  placeholder="email@example.com"
                />
                <D2YSwitch label="Enable notifications" />
                <D2YCheckbox label="I agree to the terms" />
              </div>
            </D2YSlideable>
          </Section>

          {/* Bottom spacing */}
          <div className="h-16" />
        </div>
      </main>

      {/* Image Preview (global) */}
      <D2YImagePreview
        images={PREVIEW_IMAGES}
        open={imagePreviewOpen}
        onClose={() => setImagePreviewOpen(false)}
        showDownload
      />
    </div>
  );
}
