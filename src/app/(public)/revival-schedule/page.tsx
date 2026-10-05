export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { generatePageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { CHURCH_INFO } from "@/lib/constants";
import { KakaoMap } from "@/components/ui/KakaoMap";

export const metadata = generatePageMetadata({
  title: "성회안내",
  description: "성은세계선교교회 성령대부흥성회 일정 안내",
  path: "/revival-schedule",
});

/* 서울 성회 장소 — 그랜드 워커힐 서울 (비스타홀) */
const WALKERHILL = {
  name: "그랜드 워커힐 서울",
  hall: "비스타홀",
  address: "서울 광진구 워커힐로 177",
  lat: 37.5553,
  lng: 127.1097,
};

/* 원본 사이트의 2026 국내 성회일정 */
const SCHEDULE = [
  { date: "5월 5일", series: "제22차", place: "서울 워커힐호텔" },
  { date: "7월 17일", series: "", place: "전주 본 교회" },
  { date: "10월 9일", series: "제23차", place: "서울 워커힐호텔" },
];

export default async function RevivalSchedulePage() {
  const supabase = await createClient();
  const { data: page } = await supabase
    .from("page_contents")
    .select("*")
    .eq("page_key", "revival_schedule")
    .single();

  return (
    <div>
      <PageHero
        title="성회안내"
        description={
          <>
            마지막 때를 향한 하나님의 말씀, 회개를 통하여 역사하는 하나님의 놀라운 은혜와 축복
          </>
        }
      />

      <div className="mx-auto max-w-[800px] px-5 py-12 sm:py-16">
        {/* 성구 */}
        <div className="card-tinted p-6 text-center sm:p-8">
          <p className="text-[15px] leading-[1.9] text-gray-600">
            어린 양의 혼인 기약이 이르렀고 그의 아내가 자신을 준비하였으므로
            <br className="hidden sm:block" />
            그에게 빛나고 깨끗한 세마포 옷을 입도록 허락하셨으니
          </p>
          <p className="mt-3 text-[13px] text-gray-400">요한계시록 19:7-8</p>
        </div>

        {/* Dynamic content (관리자 작성 시 우선) */}
        {page ? (
          <div className="mt-10">
            <h2 className="mb-4 text-[20px] font-bold text-gray-900">
              {page.title || "성회 일정"}
            </h2>
            <div
              className="prose prose-sm sm:prose max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
        ) : (
          <>
            {/* 2026 성회일정 */}
            <h2 className="mt-12 text-[22px] font-bold text-gray-900">2026 성회일정</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {SCHEDULE.map((item) => (
                <div key={item.date} className="card-soft px-6 py-6 text-center">
                  <p className="text-[20px] font-bold text-gray-900">{item.date}</p>
                  <p className="mt-1 text-[14px] font-semibold text-secondary">
                    {item.series ? `${item.series} 성령대부흥성회` : "성령대부흥성회"}
                  </p>
                  <p className="mt-1 text-[14px] text-gray-500">{item.place}</p>
                </div>
              ))}
            </div>

            {/* 성회 장소 안내 — 카카오맵 */}
            <h2 className="mt-14 text-[22px] font-bold text-gray-900">서울 워커힐 성회장소</h2>
            <div className="card-soft mt-5 overflow-hidden">
              <KakaoMap
                lat={WALKERHILL.lat}
                lng={WALKERHILL.lng}
                label={`${WALKERHILL.name} ${WALKERHILL.hall}`}
                level={4}
                className="h-64 w-full sm:h-[360px]"
              />
              <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                <div>
                  <p className="text-[17px] font-bold text-gray-900">
                    {WALKERHILL.name} <span className="font-semibold text-secondary">{WALKERHILL.hall}</span>
                  </p>
                  <p className="mt-1 text-[14px] text-gray-500">{WALKERHILL.address}</p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`https://map.kakao.com/link/map/${encodeURIComponent(WALKERHILL.name)},${WALKERHILL.lat},${WALKERHILL.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-[#FFCD00] px-5 py-2 text-[13px] font-medium text-black transition-colors hover:bg-[#f3ba00]"
                  >
                    카카오맵
                  </a>
                  <a
                    href={`https://map.kakao.com/link/to/${encodeURIComponent(WALKERHILL.name)},${WALKERHILL.lat},${WALKERHILL.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gray-100 px-5 py-2 text-[13px] font-medium text-gray-700 transition-colors hover:bg-gray-200"
                  >
                    길찾기
                  </a>
                </div>
              </div>
            </div>

            {/* 성회 영상 — 원본 사이트처럼 임베드로 바로 재생 */}
            <h2 className="mt-14 text-[22px] font-bold text-gray-900">
              제14차 성령대부흥성회 영상
            </h2>
            <div className="mt-5 aspect-video overflow-hidden rounded-2xl bg-gray-900 shadow-feature">
              <iframe
                src="https://www.youtube.com/embed/Pv4qSSNpUL4"
                title="제14차 성령대부흥성회 나현숙 목사"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
            <a
              href={CHURCH_INFO.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-[14px] font-medium text-primary transition-colors hover:text-primary-hover"
            >
              더 많은 성회 영상 보기 →
            </a>
          </>
        )}
      </div>
    </div>
  );
}
