import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import type { Sermon } from "@/types";
import { formatDate, getYouTubeThumbnail } from "@/lib/utils";

interface YouTubeLiveProps {
  sermons: Sermon[];
}

export function YouTubeLive({ sermons }: YouTubeLiveProps) {
  if (sermons.length === 0) {
    return (
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-[1100px] px-5 text-center">
          <p className="text-[13px] font-medium text-primary">Sermon</p>
          <h2 className="mt-2 text-[28px] font-bold text-gray-900">설교 영상</h2>
          <p className="mt-3 text-[15px] text-gray-500">
            주일 대예배를 유튜브로 실시간 중계합니다
          </p>
          <a
            href="https://www.youtube.com/@HyunSookNa"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-lg bg-gray-900 px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-gray-800"
          >
            YouTube에서 보기
          </a>
        </div>
      </section>
    );
  }

  const featured = sermons[0];
  const rest = sermons.slice(1);

  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-[1100px] px-5">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[13px] font-medium text-primary">Sermon</p>
            <h2 className="mt-2 text-[28px] font-bold text-gray-900">최근 설교</h2>
          </div>
          <Link
            href="/sermons"
            className="hidden text-[14px] font-medium text-gray-500 transition-colors hover:text-gray-900 sm:block"
          >
            전체보기 &rarr;
          </Link>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-5">
          {/* Featured */}
          <div className="lg:col-span-3">
            <Link
              href={`/sermons/${featured.id}`}
              className="group block overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
            >
              <div className="relative aspect-video">
                <Image
                  src={getYouTubeThumbnail(featured.youtube_video_id)}
                  alt={featured.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="rounded-full bg-white/90 p-3.5">
                    <Play className="h-6 w-6 fill-gray-900 text-gray-900" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-[17px] font-bold text-gray-900 transition-colors group-hover:text-primary">
                  {featured.title}
                </h3>
                <p className="mt-2 text-[13px] text-gray-500">
                  {featured.preacher} · {formatDate(featured.sermon_date)}
                </p>
                {featured.scripture && (
                  <p className="mt-1 text-[13px] text-primary">{featured.scripture}</p>
                )}
              </div>
            </Link>
          </div>

          {/* Side list */}
          <div className="space-y-3 lg:col-span-2">
            {rest.map((sermon) => (
              <Link
                key={sermon.id}
                href={`/sermons/${sermon.id}`}
                className="group flex gap-3.5 rounded-xl border border-gray-200 bg-white p-3 transition-shadow hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              >
                <div className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={getYouTubeThumbnail(sermon.youtube_video_id)}
                    alt={sermon.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center py-0.5">
                  <h4 className="line-clamp-2 text-[14px] font-semibold text-gray-800 transition-colors group-hover:text-primary">
                    {sermon.title}
                  </h4>
                  <p className="mt-1 text-[12px] text-gray-500">
                    {formatDate(sermon.sermon_date)}
                  </p>
                  {sermon.scripture && (
                    <p className="mt-0.5 text-[12px] text-primary">
                      {sermon.scripture}
                    </p>
                  )}
                </div>
              </Link>
            ))}

            <Link
              href="/sermons"
              className="block rounded-xl border border-dashed border-gray-300 p-4 text-center text-[14px] text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-700 sm:hidden"
            >
              전체 설교 보기 &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
