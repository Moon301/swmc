"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { News } from "@/types";
import { formatDate } from "@/lib/utils";
import { Pagination } from "@/components/ui/Pagination";
import { NEWS_CATEGORIES } from "@/lib/constants";

const ITEMS_PER_PAGE = 15;

export function NewsList({ initialNews }: { initialNews: News[] }) {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");

  const filtered = useMemo(() => {
    if (!category) return initialNews;
    return initialNews.filter((n) => n.category === category);
  }, [initialNews, category]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2 border-b border-gray-100 pb-2">
        <button
          onClick={() => { setCategory(""); setPage(1); }}
          className={`px-3 py-2 text-[14px] font-medium transition-colors ${
            !category
              ? "border-b-2 border-gray-900 text-gray-900"
              : "border-b-2 border-transparent text-gray-400 hover:text-gray-700"
          }`}
        >
          전체
        </button>
        {NEWS_CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => { setCategory(cat.value); setPage(1); }}
            className={`px-3 py-2 text-[14px] font-medium transition-colors ${
              category === cat.value
                ? "border-b-2 border-gray-900 text-gray-900"
                : "border-b-2 border-transparent text-gray-400 hover:text-gray-700"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {paginated.length === 0 ? (
        <p className="py-12 text-center text-gray-400">
          등록된 소식이 없습니다.
        </p>
      ) : (
        <div className="divide-y divide-gray-100">
          {paginated.map((item) => {
            const cat = NEWS_CATEGORIES.find((c) => c.value === item.category);
            return (
              <Link
                key={item.id}
                href={`/news/${item.id}`}
                className="flex items-center gap-4 py-5 transition-colors hover:bg-gray-50/60"
              >
                <span className="w-14 shrink-0 text-[13px] text-gray-400">
                  {cat?.label || item.category}
                </span>
                <span className="flex-1 truncate font-medium text-gray-900">
                  {item.is_pinned && <span className="mr-1.5 text-primary">·</span>}
                  {item.title}
                </span>
                <span className="shrink-0 text-[13px] text-gray-400">
                  {formatDate(item.created_at)}
                </span>
              </Link>
            );
          })}
        </div>
      )}

      <div className="mt-8">
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
