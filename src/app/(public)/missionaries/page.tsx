export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { generatePageMetadata } from "@/lib/seo";
import { CHURCH_INFO } from "@/lib/constants";
import { MissionHero } from "@/components/mission/MissionHero";
import { Globe2, Flame, HeartHandshake } from "lucide-react";

export const metadata = generatePageMetadata({
  title: "300명 선교사",
  description: "성은세계선교교회 해외 선교사 파송 현황",
  path: "/missionaries",
});

/* 원본 사이트의 지역별 선교사 파송 현황 — 합계 90개국 */
const CONTINENTS = [
  {
    region: "아시아",
    count: 16,
    countries: ["대한민국", "동티모르", "말레이시아", "미얀마", "베트남", "우즈베키스탄", "인도", "인도네시아", "일본", "중국", "카자흐스탄", "캄보디아", "키르기스스탄", "타지키스탄", "태국", "필리핀"],
  },
  {
    region: "유럽",
    count: 12,
    countries: ["그리스", "네덜란드", "독일", "러시아", "벨기에", "스위스", "스페인", "영국", "오스트리아", "이탈리아", "포르투갈", "프랑스"],
  },
  {
    region: "오세아니아",
    count: 11,
    countries: ["나우루", "뉴질랜드", "마셜제도", "사모아", "솔로몬제도", "통가", "투발루", "파푸아뉴기니", "팔라우", "피지", "호주"],
  },
  {
    region: "아프리카",
    count: 10,
    countries: ["가나", "가봉", "나미비아", "나이지리아", "남아프리카공화국", "말라위", "이집트", "케냐", "콩고공화국", "토고"],
  },
  {
    region: "남아메리카",
    count: 6,
    countries: ["멕시코", "브라질", "아르헨티나", "온두라스", "칠레", "페루"],
  },
  { region: "중동", count: 5, countries: ["요르단", "이라크", "이스라엘", "튀르키예", "팔레스타인"] },
  { region: "북아메리카", count: 2, countries: ["미국", "캐나다"] },
  { region: "기타", count: 28, countries: [] },
];

const VISION_CARDS = [
  {
    icon: Globe2,
    title: "열방을 향한 파송",
    body: `주님의 지상명령에 순종하여 해외 ${CHURCH_INFO.missionStats.countries}여 개국에 ${CHURCH_INFO.missionStats.missionaries}여 명의 선교사를 파송하고 있습니다.`,
  },
  {
    icon: Flame,
    title: "부흥의 현장",
    body: "수많은 해외 부흥성회를 통해 전 세계에 복음을 전파하고 있습니다.",
  },
  {
    icon: HeartHandshake,
    title: "함께하는 동역",
    body: "온 성도가 기도와 물질로 선교사들과 동역하며, 세계선교의 비전을 함께 이루어가고 있습니다.",
  },
];

export default async function MissionariesPage() {
  const supabase = await createClient();
  const { data: page } = await supabase
    .from("page_contents")
    .select("*")
    .eq("page_key", "missionaries")
    .single();

  return (
    <div>
      <MissionHero />

      {/* 원본 사이트 상단 — 성구 + 소개 문구 */}
      <section className="mx-auto max-w-[880px] px-5 pt-14 sm:pt-20">
        <div className="card-tinted p-6 text-center sm:p-9">
          <p className="text-[15px] leading-[1.95] text-gray-700 sm:text-[16px]">
            오직 성령이 너희에게 임하시면 너희가 권능을 받고
            <br className="hidden sm:block" />
            예루살렘과 온 유대와 사마리아와 땅끝까지 이르러 내 증인이 되리라 하시니라
          </p>
          <p className="mt-3 text-[13px] text-gray-400">사도행전 1:8</p>
        </div>
        <div className="mt-8 text-center">
          <p className="text-[20px] font-bold leading-snug text-gray-900 sm:text-[24px]">
            {CHURCH_INFO.missionStats.countries}여 개국 {CHURCH_INFO.missionStats.missionaries}명 선교사, 열방을 향한 뜨거운 세계선교 사역
          </p>
          <p className="mt-3 text-[15px] leading-[1.85] text-gray-600 sm:text-[16px]">
            1993년 6개국 12명의 선교사 파송으로 시작된 성은세계선교의 시작, 놀라운 하나님의 역사
          </p>
        </div>
      </section>

      {/* 세계선교 비전 */}
      <section className="mx-auto max-w-[1100px] px-5 py-14 sm:py-20">
        <div className="text-center">
          <h2 className="text-[24px] font-bold tracking-tight text-gray-900 sm:text-[30px]">
            세계선교 비전
          </h2>
          <p className="mt-3 text-[15px] text-gray-500">{CHURCH_INFO.slogan}</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {VISION_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="card-soft p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light">
                  <Icon className="h-[22px] w-[22px] text-secondary" strokeWidth={1.8} />
                </span>
                <p className="mt-5 text-[17px] font-bold text-gray-900">{card.title}</p>
                <p className="mt-2 text-[15px] leading-[1.8] text-gray-600">{card.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 시작과 현재 — 1993년 6개국 12명 → 오늘 */}
      <section className="mx-auto max-w-[1100px] px-5 pb-14 sm:pb-20">
        <div className="card-tinted grid gap-8 px-7 py-9 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-10 sm:px-12 sm:py-11">
          <div className="text-center sm:text-left">
            <p className="text-[13px] font-semibold text-gray-500">1993년 3월, 첫 파송</p>
            <p className="mt-2 text-[30px] font-bold tracking-tight text-gray-900 sm:text-[36px]">
              6개국 <span className="text-gray-400">·</span> 12명
            </p>
            <p className="mt-1.5 text-[14px] text-gray-500">여섯 나라에 열두 명의 선교사로 시작했습니다</p>
          </div>
          <div aria-hidden className="mx-auto h-px w-16 bg-gray-300 sm:h-16 sm:w-px" />
          <div className="text-center sm:text-left">
            <p className="text-[13px] font-semibold text-secondary">오늘</p>
            <p className="mt-2 text-[30px] font-bold tracking-tight text-gray-900 sm:text-[36px]">
              {CHURCH_INFO.missionStats.countries}여 개국 <span className="text-gray-400">·</span>{" "}
              {CHURCH_INFO.missionStats.missionaries}여 명
            </p>
            <p className="mt-1.5 text-[14px] text-gray-500">전 세계 일곱 대륙으로 복음이 뻗어가고 있습니다</p>
          </div>
        </div>
      </section>

      {/* 지역별 파송 현황 */}
      <section className="mx-auto max-w-[1100px] px-5 pb-14 sm:pb-20">
        <div className="text-center">
          <h2 className="text-[24px] font-bold tracking-tight text-gray-900 sm:text-[30px]">
            국가별 선교사 파송 현황
          </h2>
          <p className="mt-3 text-[15px] text-gray-500">
            일곱 지역과 그 외 나라들에 선교사가 파송되어 있습니다
          </p>
        </div>

        {/* 지역 요약 타일 */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {CONTINENTS.map((c) => (
            <div key={c.region} className="card-soft px-5 py-5 text-center">
              <p className="text-[28px] font-bold tracking-tight text-secondary">
                {c.count}
                <span className="ml-0.5 text-[15px] font-semibold text-gray-500">개국</span>
              </p>
              <p className="mt-1 text-[14px] font-semibold text-gray-800">{c.region === "기타" ? "그 외 지역" : c.region}</p>
            </div>
          ))}
        </div>

        {/* 지역별 국가 목록 */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {CONTINENTS.filter((c) => c.countries.length > 0).map((c) => (
            <div key={c.region} className="card-soft p-6">
              <div className="flex items-baseline justify-between">
                <p className="text-[17px] font-bold text-gray-900">{c.region}</p>
                <p className="text-[14px] font-semibold text-secondary">{c.count}개국</p>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {c.countries.map((name) => (
                  <li
                    key={name}
                    className="rounded-full bg-gray-50 px-3 py-1.5 text-[13px] font-medium text-gray-700"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-[13px] text-gray-400">
          위 지역 외 28개국에도 선교사가 파송되어 있습니다.
        </p>
      </section>

      {/* 관리자 페이지에서 추가한 콘텐츠 */}
      {page && (
        <section className="mx-auto max-w-[800px] px-5 pb-14 sm:pb-20">
          <h2 className="mb-6 text-[22px] font-bold tracking-tight text-gray-900 sm:text-[26px]">
            {page.title || "선교사 소개"}
          </h2>
          <div
            className="prose prose-sm sm:prose max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </section>
      )}

    </div>
  );
}
