import Link from "next/link";
import type { News } from "@/types";
import { formatDate } from "@/lib/utils";
import { NEWS_CATEGORIES } from "@/lib/constants";

interface NewsPreviewProps {
  news: News[];
}

export function NewsPreview({ news }: NewsPreviewProps) {
  if (news.length === 0) return null;

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-[1100px] px-5">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-[28px] font-bold text-gray-900">교회소식</h2>
          </div>
          <Link
            href="/news"
            className="hidden text-[14px] font-medium text-gray-500 transition-colors hover:text-gray-900 sm:block"
          >
            전체보기 &rarr;
          </Link>
        </div>

        <div className="mt-8 divide-y divide-gray-100">
          {news.map((item) => {
            const cat = NEWS_CATEGORIES.find((c) => c.value === item.category);
            return (
              <Link
                key={item.id}
                href={`/news/${item.id}`}
                className="flex items-center gap-3 py-4 transition-colors hover:bg-gray-50 -mx-3 px-3 rounded-lg"
              >
                {cat && (
                  <span className={`shrink-0 rounded px-2 py-0.5 text-[13px] font-medium ${
                    item.category === "notice"
                      ? "bg-primary/8 text-primary"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {cat.label}
                  </span>
                )}
                <span className="flex-1 truncate text-[15px] text-gray-800">
                  {item.title}
                </span>
                <span className="shrink-0 text-[13px] text-gray-400">
                  {formatDate(item.created_at)}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
