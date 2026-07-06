"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import type { Sermon } from "@/types";
import { formatDate, getYouTubeThumbnail } from "@/lib/utils";
import { Pagination } from "@/components/ui/Pagination";
import { SERMON_TYPES } from "@/lib/constants";

const ITEMS_PER_PAGE = 12;

export function SermonsList({ initialSermons }: { initialSermons: Sermon[] }) {
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState("");

  const filtered = useMemo(() => {
    if (!typeFilter) return initialSermons;
    return initialSermons.filter((s) => s.sermon_type === typeFilter);
  }, [initialSermons, typeFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2 border-b border-gray-100 pb-2">
        <button
          onClick={() => { setTypeFilter(""); setPage(1); }}
          className={`px-3 py-2 text-[14px] font-medium transition-colors ${
            !typeFilter
              ? "border-b-2 border-gray-900 text-gray-900"
              : "border-b-2 border-transparent text-gray-400 hover:text-gray-700"
          }`}
        >
          전체
        </button>
        {SERMON_TYPES.map((type) => (
          <button
            key={type.value}
            onClick={() => { setTypeFilter(type.value); setPage(1); }}
            className={`px-3 py-2 text-[14px] font-medium transition-colors ${
              typeFilter === type.value
                ? "border-b-2 border-gray-900 text-gray-900"
                : "border-b-2 border-transparent text-gray-400 hover:text-gray-700"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {paginated.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">
          등록된 설교가 없습니다.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.map((sermon) => (
            <Link
              key={sermon.id}
              href={`/sermons/${sermon.id}`}
              className="group overflow-hidden rounded-2xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
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
                    <Play className="h-6 w-6 fill-primary text-primary" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
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
      )}

      <div className="mt-8">
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
