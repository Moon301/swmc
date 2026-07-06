export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { NEWS_CATEGORIES } from "@/lib/constants";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: news } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .single();

  if (!news) return {};

  return {
    title: news.title,
    description: news.excerpt || news.title,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: news } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .single();

  if (!news) notFound();

  const cat = NEWS_CATEGORIES.find((c) => c.value === news.category);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/news"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        목록으로
      </Link>

      <article>
        <div className="mb-4 flex items-center gap-2">
          <Badge
            variant={
              news.category === "notice"
                ? "danger"
                : news.category === "event"
                ? "primary"
                : "default"
            }
          >
            {cat?.label || news.category}
          </Badge>
        </div>

        <h1 className="text-2xl font-bold sm:text-3xl">{news.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {formatDate(news.created_at)}
        </p>

        <div
          className="mt-8 prose prose-sm sm:prose max-w-none"
          dangerouslySetInnerHTML={{ __html: news.content }}
        />
      </article>
    </div>
  );
}
