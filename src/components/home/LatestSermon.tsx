import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import type { Sermon } from "@/types";
import { formatDate, getYouTubeThumbnail } from "@/lib/utils";

interface LatestSermonProps {
  sermons: Sermon[];
}

export function LatestSermon({ sermons }: LatestSermonProps) {
  if (sermons.length === 0) return null;

  return (
    <section className="py-16 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">최근 말씀</h2>
          <Link
            href="/sermons"
            className="text-sm font-medium text-secondary hover:text-secondary-hover"
          >
            더보기 &rarr;
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sermons.map((sermon) => (
            <Link
              key={sermon.id}
              href={`/sermons/${sermon.id}`}
              className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-video">
                <Image
                  src={getYouTubeThumbnail(sermon.youtube_video_id)}
                  alt={sermon.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="rounded-full bg-white/90 p-3">
                    <Play className="h-6 w-6 text-primary fill-primary" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {sermon.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {sermon.preacher} · {formatDate(sermon.sermon_date)}
                </p>
                {sermon.scripture && (
                  <p className="mt-1 text-xs text-primary">{sermon.scripture}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
