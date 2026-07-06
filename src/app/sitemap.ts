export const dynamic = "force-dynamic";

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  const staticPages = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE_URL}/worship`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE_URL}/sermons`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${SITE_URL}/news`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${SITE_URL}/gallery`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${SITE_URL}/bulletin`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${SITE_URL}/directions`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.6 },
  ];

  // Dynamic sermon pages
  const { data: sermons } = await supabase
    .from("sermons")
    .select("id, updated_at")
    .eq("is_published", true);

  const sermonPages = (sermons ?? []).map((s) => ({
    url: `${SITE_URL}/sermons/${s.id}`,
    lastModified: new Date(s.updated_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

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

  return [...staticPages, ...sermonPages, ...newsPages];
}
