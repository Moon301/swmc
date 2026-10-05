export const dynamic = "force-dynamic";

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "daily" | "weekly" | "monthly" | "yearly") => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });
  /* 공개 페이지 전부 — 메뉴(NAV)와 맞춘다. 갤러리·금주단상은 삭제됨 */
  const staticPages = [
    page("", 1, "daily"),
    page("/about", 0.8, "monthly"),
    page("/pastor", 0.8, "monthly"),
    page("/worship", 0.8, "monthly"),
    page("/directions", 0.7, "yearly"),
    page("/bride", 0.8, "monthly"),
    page("/revival-schedule", 0.9, "weekly"),
    page("/revival-info", 0.7, "monthly"),
    page("/missionaries", 0.7, "monthly"),
    page("/building", 0.6, "yearly"),
    page("/offering", 0.7, "yearly"),
    page("/news", 0.8, "weekly"),
  ];


  // Dynamic news pages
  const { data: news } = await supabase
    .from("news")
    .select("id, updated_at")
    .eq("is_published", true);

  const newsPages = (news ?? []).map((n) => ({
    url: `${SITE_URL}/news/${n.id}`,
    lastModified: new Date(n.updated_at),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...newsPages];
}
