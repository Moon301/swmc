export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { SERMON_TYPES } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: sermon } = await supabase
    .from("sermons")
    .select("*")
    .eq("id", id)
    .single();

  if (!sermon) return {};

  return {
    title: sermon.title,
    description: `${sermon.preacher} · ${sermon.scripture || ""}`,
  };
}

export default async function SermonDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: sermon } = await supabase
    .from("sermons")
    .select("*")
    .eq("id", id)
    .single();

  if (!sermon) notFound();

  const typeLabel =
    SERMON_TYPES.find((t) => t.value === sermon.sermon_type)?.label || sermon.sermon_type;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: sermon.title,
          description: sermon.description || sermon.title,
          uploadDate: sermon.sermon_date,
          embedUrl: `https://www.youtube.com/embed/${sermon.youtube_video_id}`,
        }}
      />

      <Link
        href="/sermons"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        목록으로
      </Link>

      <div className="relative aspect-video overflow-hidden rounded-xl shadow-lg">
        <iframe
          src={`https://www.youtube.com/embed/${sermon.youtube_video_id}`}
          title={sermon.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="primary">{typeLabel}</Badge>
        </div>
        <h1 className="text-2xl font-bold">{sermon.title}</h1>
        <p className="mt-2 text-muted-foreground">
          {sermon.preacher} · {formatDate(sermon.sermon_date)}
        </p>
        {sermon.scripture && (
          <p className="mt-1 text-primary font-medium">{sermon.scripture}</p>
        )}
        {sermon.description && (
          <div className="mt-6 prose prose-sm max-w-none">
            <p>{sermon.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
