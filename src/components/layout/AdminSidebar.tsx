"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Image,
  BellRing,
  BookOpen,
  Newspaper,
  Camera,
  FileText,
  Edit3,
  Users,
  Home,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/providers/AuthProvider";
import { SITE_NAME } from "@/lib/constants";

const sidebarItems = [
  { label: "대시보드", href: "/admin", icon: LayoutDashboard },
  { label: "배너 관리", href: "/admin/banners", icon: Image },
  { label: "팝업 관리", href: "/admin/popups", icon: BellRing },
  { label: "설교 관리", href: "/admin/sermons", icon: BookOpen },
  { label: "소식 관리", href: "/admin/news", icon: Newspaper },
  { label: "갤러리 관리", href: "/admin/gallery", icon: Camera },
  { label: "주보 관리", href: "/admin/bulletin", icon: FileText },
  { label: "페이지 편집", href: "/admin/pages", icon: Edit3 },
  { label: "사용자 관리", href: "/admin/users", icon: Users },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { profile, signOut } = useAuth();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-border px-4">
        <Link href="/admin" className="text-lg font-bold text-primary">
          {SITE_NAME}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-3 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Home className="h-4 w-4" />
          홈페이지로
        </Link>
        <button
          onClick={signOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          로그아웃
        </button>
        {profile && (
          <div className="px-3 py-2 text-xs text-muted-foreground truncate">
            {profile.email}
          </div>
        )}
      </div>
    </aside>
  );
}
