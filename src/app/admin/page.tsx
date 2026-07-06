export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import {
  Image,
  BookOpen,
  Newspaper,
  Camera,
  FileText,
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [banners, sermons, news, albums, bulletins] = await Promise.all([
    supabase.from("banners").select("id", { count: "exact" }),
    supabase.from("sermons").select("id", { count: "exact" }),
    supabase.from("news").select("id", { count: "exact" }),
    supabase.from("gallery_albums").select("id", { count: "exact" }),
    supabase.from("bulletins").select("id", { count: "exact" }),
  ]);

  const stats = [
    { label: "배너", count: banners.count ?? 0, href: "/admin/banners", icon: Image },
    { label: "설교", count: sermons.count ?? 0, href: "/admin/sermons", icon: BookOpen },
    { label: "소식", count: news.count ?? 0, href: "/admin/news", icon: Newspaper },
    { label: "갤러리", count: albums.count ?? 0, href: "/admin/gallery", icon: Camera },
    { label: "주보", count: bulletins.count ?? 0, href: "/admin/bulletin", icon: FileText },
  ];

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">대시보드</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.href} href={stat.href}>
              <Card hover className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.count}</p>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold">빠른 액션</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/sermons"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover"
          >
            + 설교 등록
          </Link>
          <Link
            href="/admin/news"
            className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-white hover:bg-secondary-hover"
          >
            + 소식 작성
          </Link>
          <Link
            href="/admin/gallery"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            + 앨범 추가
          </Link>
        </div>
      </div>
    </div>
  );
}
