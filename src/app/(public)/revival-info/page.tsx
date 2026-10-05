export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { generatePageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { GlassTable } from "@/components/ui/GlassTable";
import Image from "next/image";

export const metadata = generatePageMetadata({
  title: "해외성회",
  description: "성은세계선교교회 해외 부흥성회 사역과 일정",
  path: "/revival-info",
});

/* 성회 현장 사진 (오른쪽 2×2). 쿠팡은 사용자 제공, 브라질·메단은 사역 발자취 원본 */
const REVIVAL_PHOTOS = [
  { src: "/images/revival/kupang-1.jpg", alt: "쿠팡 지역 성회, 야외 집회에서 손을 든 수천 명의 회중", caption: "쿠팡 지역 성회" },
  { src: "/images/revival/kupang-2.jpg", alt: "쿠팡 지역 성회, 두 손을 들고 기도하는 회중", caption: "쿠팡 지역 성회" },
  { src: "/images/pastor/footprint-06.jpg", alt: "브라질 성회, 회중 가운데서 기도하는 나현숙 목사", caption: "브라질 성회" },
  { src: "/images/pastor/footprint-08.jpg", alt: "인도네시아 메단 성회, 야외 집회의 회중", caption: "인도네시아 메단 성회" },
];

/* 원본 사이트의 해외성회 연혁 */
const HISTORY = [
  {
    period: "1994년 - 1999년",
    series: "1차 - 25차",
    places:
      "나이지리아, 루마니아, 멕시코, 미국(뉴욕, 덴버), 스페인, 이스라엘, 이집트, 인도(뉴델리, 델리, 뱅갈로, 나가프로, 마드라스, 하이드라바), 인도네시아(쿠팡), 중국, 캐나다, 포르투갈, 필리핀(마닐라), 호주(멜버른, 브리즈번, 시드니)",
  },
  {
    period: "2000년 - 2004년",
    series: "26차 - 45차",
    places:
      "괌, 남아프리카공화국(더반), 말레이시아, 멕시코(뚝스뚤라, 몬테레이, 베라크루즈), 인도네시아(마나도, 술라웨시, 쿠팡), 중국(장춘), 칠레(산티아고, 콘셉시온), 페루, 피지, 필리핀(민다나오, 세부)",
  },
  {
    period: "2005년 - 2009년",
    series: "46차 - 58차",
    places:
      "남아프리카공화국, 미국(시애틀), 멕시코, 브라질(상파울루), 인도네시아(메단, 자와티무르, 쿠팡), 캐나다(밴쿠버), 필리핀",
  },
  {
    period: "2010년 - 2014년",
    series: "59차 - 84차",
    places: "인도네시아(발릭파판, 자와스마랑, 마나도, 쿠팡), 페루",
  },
  {
    period: "2015년 - 2019년",
    series: "85차 - 102차",
    places:
      "독일, 미국(시애틀), 미얀마, 이스라엘, 인도네시아, 인도(델리), 일본(도쿄), 캄보디아, 토고공화국, 필리핀(마닐라, 잠발레스)",
  },
  {
    period: "2020년 - 2024년",
    series: "103차 -",
    places: "미국(로스앤젤레스, 버지니아), 필리핀, 멕시코, 캐나다",
  },
];

export default async function RevivalInfoPage() {
  const supabase = await createClient();
  const { data: page } = await supabase
    .from("page_contents")
    .select("*")
    .eq("page_key", "revival_info")
    .single();

  return (
    <div>
      <PageHero
        title="해외성회"
        description={
          <>
            강력한 성령의 기름부음과 신유와 능력이 임하는 성회가
            대한민국을 넘어 전 세계로 이어지고 있습니다.
          </>
        }
      />

      <div className="mx-auto max-w-[880px] px-5 py-12 sm:py-16">
        {/* 성회 현장 — 이스라엘(큰 칸) + 쿠팡·브라질·인도네시아 메단 (2×2) */}
        <div className="grid gap-3 sm:grid-cols-[1.35fr_1fr] sm:gap-4">
          <figure className="relative aspect-[4/3] overflow-hidden rounded-[24px] shadow-feature sm:aspect-auto sm:h-full">
            <Image
              src="/images/revival/israel.jpg"
              alt="이스라엘 성회 현장, 강단에서 현지 목회자들을 위해 기도하는 모습"
              fill
              priority
              sizes="(min-width: 880px) 480px, 100vw"
              className="object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/70 to-transparent px-5 pb-4 pt-10 text-[14px] font-semibold text-white">
              이스라엘 성회
            </figcaption>
          </figure>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {REVIVAL_PHOTOS.map((photo) => (
              <figure key={photo.src} className="relative aspect-[4/3] overflow-hidden rounded-[20px] shadow-feature">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 880px) 180px, 50vw"
                  className="object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/70 to-transparent px-3.5 pb-2.5 pt-8 text-[13px] font-semibold text-white">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* 원본 사이트 소개 문구 */}
        <div className="mt-10 text-center sm:mt-12">
          <p className="text-[20px] font-bold leading-snug text-gray-900 sm:text-[24px]">
            강력한 성령의 기름부음과 신유와 능력이 임하는 성회
          </p>
          <p className="mt-3 text-[15px] leading-[1.85] text-gray-600 sm:text-[16px]">
            대한민국을 넘어 전 세계로, 마지막 때를 향한 하나님의 말씀 선포와 놀라운 은혜와 축복
          </p>
        </div>

        {/* Dynamic content (관리자 작성 시 우선) */}
        {page && (
          <div className="mt-10">
            <h2 className="mb-4 text-[20px] font-bold text-gray-900">
              {page.title || "성회 안내"}
            </h2>
            <div
              className="prose prose-sm sm:prose max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
        )}

        {/* 해외성회 연혁 — 원본 사이트 기록. 옅은 하늘빛 띠 위에 글래스 패널을 띄우고 안은 표 형식 */}
        <h2 className="mt-14 text-[22px] font-bold text-gray-900">해외성회 연혁</h2>
        <GlassTable
          className="mt-9 sm:mt-10"
          head={
            <div className="hidden grid-cols-[160px_120px_1fr] gap-6 sm:grid">
              <p>기간</p>
              <p>회차</p>
              <p>성회 장소</p>
            </div>
          }
        >
          {HISTORY.map((item) => (
            <div
              key={item.period}
              className="grid gap-1.5 px-6 py-5 sm:grid-cols-[160px_120px_1fr] sm:gap-6 sm:px-7"
            >
              <p className="text-[15px] font-bold text-gray-900">{item.period}</p>
              <p className="text-[14px] font-semibold text-secondary">{item.series}</p>
              <p className="mt-1 text-[14px] leading-relaxed text-gray-600 sm:mt-0">{item.places}</p>
            </div>
          ))}
        </GlassTable>
      </div>
    </div>
  );
}
