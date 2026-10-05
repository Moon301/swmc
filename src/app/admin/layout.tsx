"use client";

import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { useAuth } from "@/components/providers/AuthProvider";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/* 관리자 영역 가드 — 로그인 안 했으면 /login으로, 로그인했지만 admin 권한이 없으면 안내만 보여준다.
   (예전에는 loading만 확인해서 누구나 관리자 UI가 보였음 — 2026-10-06 수정) */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, user, isAdmin, signOut } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace("/login?next=/admin");
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center px-5">
        <div className="card-soft max-w-[420px] p-8 text-center">
          <p className="text-[20px] font-bold text-gray-900">관리자 권한이 없습니다</p>
          <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
            {user.email} 계정은 아직 관리자로 등록되지 않았습니다. 교회 홈페이지 담당자에게 권한을
            요청해 주세요.
          </p>
          <div className="mt-6 flex justify-center gap-2">
            <Link
              href="/"
              className="rounded-full bg-gray-100 px-5 py-2.5 text-[14px] font-medium text-gray-700 transition-colors hover:bg-gray-200"
            >
              홈으로
            </Link>
            <button
              onClick={() => signOut().then(() => router.replace("/"))}
              className="rounded-full bg-primary px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-primary-hover"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative z-10 w-64">
            <AdminSidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="flex h-16 items-center border-b border-border px-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 hover:bg-muted"
            aria-label="메뉴"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="ml-3 font-semibold text-primary">관리자</span>
        </div>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
