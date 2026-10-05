export const dynamic = "force-dynamic";

import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { generatePageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { CHURCH_INFO } from "@/lib/constants";
import { FootprintSlider, type Footprint } from "@/components/pastor/FootprintSlider";

export const metadata = generatePageMetadata({
  title: "목사님소개",
  description: "성은세계선교교회 담임 나현숙 목사님을 소개합니다.",
  path: "/pastor",
});

/* 원본(Wix) 목사님소개 구성:
   표어 + 목사님 사진 → 인사말 → 저서소개 → 사역 발자취 갤러리 (약력은 사용자 지시로 제외) */

/* 원본 갤러리 10장 — 순서와 설명 그대로 */
const FOOTPRINTS: Footprint[] = [
  { src: "/images/pastor/footprint-01.jpg", caption: "조용기 목사님과의 만남" },
  { src: "/images/pastor/footprint-02.jpg", caption: "조용기 목사님과의 만남" },
  { src: "/images/pastor/footprint-03.jpg", caption: "조용기 목사님과의 만남" },
  { src: "/images/pastor/footprint-04.jpg", caption: "조용기 목사님과의 만남" },
  { src: "/images/pastor/footprint-05.jpg", caption: "페루 기독교 방송 출연" },
  { src: "/images/pastor/footprint-06.jpg", caption: "브라질 성회" },
  { src: "/images/pastor/footprint-07.jpg", caption: "브라질 성회" },
  { src: "/images/pastor/footprint-08.jpg", caption: "제55차 인도네시아(메단) 성회" },
  { src: "/images/pastor/footprint-09.jpg", caption: "제55차 인도네시아(메단) 성회" },
  { src: "/images/pastor/footprint-10.jpg", caption: "제55차 인도네시아(메단) 성회" },
];

export default async function PastorPage() {
  const supabase = await createClient();
  const { data: page } = await supabase
    .from("page_contents")
    .select("*")
    .eq("page_key", "about_pastor")
    .single();

  return (
    <div>
      <PageHero
        title="목사님소개"
        description={<>{CHURCH_INFO.name} 담임목사 나현숙</>}
      />

      <div className="mx-auto max-w-[880px] px-5 py-12 sm:py-16">
        {/* 사진 + 표어 */}
        <div className="card-soft overflow-hidden">
          <div className="grid sm:grid-cols-[300px_1fr]">
            <div className="relative aspect-square w-full bg-[oklch(97%_0.01_20)]">
              <Image
                src="/images/pastor/pastor.png"
                alt="나현숙 담임목사"
                fill
                priority
                sizes="(min-width: 640px) 300px, 100vw"
                className="object-cover object-top"
              />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-9">
              <p className="text-[13px] font-semibold text-secondary">담임목사</p>
              <p className="mt-1 text-[24px] font-bold text-gray-900">나현숙 목사</p>
              <p className="mt-5 text-[20px] font-bold leading-snug text-gray-900 sm:text-[22px]">
                매일 기도하는 교회
                <br />
                복음 전도와 선교에 힘쓰는 복 있는 교회
              </p>
              <p className="mt-4 text-[15px] leading-[1.85] text-gray-600">
                오직 하나님 말씀에 순종하고 예수님과 동행하며 성령의 힘으로 능력을 행하시는
                이 시대 참된 목자
              </p>
            </div>
          </div>
        </div>

        {/* 인사말 — 원본 전문 */}
        <section className="mt-14 sm:mt-20">
          <h2 className="text-[24px] font-bold text-gray-900 sm:text-[28px]">담임목사님 인사말</h2>
          {/* 괘선 32px — 글줄 박스(32px) 바닥에서 3px 위에 선이 오도록 시작점을 패딩에 맞춘다
              (테두리 상자 기준: pt 48px → 31px, sm pt 64px → 47px). 블록 간격은 전부 32px 배수(mt-8=32, mt-16=64) */}
          <div className="letter-paper mt-6 px-7 pb-12 pt-12 font-serif text-[15px] leading-[32px] text-gray-700 [--letter-offset:31px] sm:px-14 sm:pb-16 sm:pt-16 sm:text-[16px] sm:[--letter-offset:47px]">
            <p className="text-[18px] font-bold leading-[32px] text-gray-900 sm:text-[19px]">샬롬!</p>
            <p className="mt-8">
              사랑하는 해외 선교사님들과 협력하는 목사님들과 귀한 성은교회 모든 성도들을
              진정으로 사랑하며, 또 해외와 국내에서 성은교회를 지지하며 함께 천국의 소망을
              가진 모든 분들께 감사 인사드립니다.
            </p>
            <p className="mt-8">저희 성은교회는,</p>
            <ul className="mt-8 space-y-0">
              <li className="flex gap-3">
                <span className="shrink-0 font-bold text-secondary">첫째,</span>
                <span>오직 하나님의 법대로 살아서 복을 받고</span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 font-bold text-secondary">둘째,</span>
                <span>오직 성령의 음성을 듣고 즉각 순종하는 믿음으로 사명을 감당하고</span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 font-bold text-secondary">셋째,</span>
                <span>
                  성령의 감화 감동과 이끌림을 받아서 하나님이 가장 기뻐하고 권세 있는
                  복음 전도와 선교에 힘쓰는 교회와 성도가 되어 하나님께 복을 받고
                </span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 font-bold text-secondary">넷째,</span>
                <span>
                  이 마지막 시대 하나님은 노아와 소돔 고모라 시대처럼 죄악 때문에 심판하시기에,
                  하나님의 심판을 받지 않고 자기 영혼을 사랑하여 회개와 성령운동과 예수님의
                  신부로 단장되고, 더욱 무르익은 신부로 더 성숙한 변화와 성장을 통해 주님 오실 때
                  첫째부활을 사모하며 준비하는 교회입니다.
                </span>
              </li>
            </ul>
            <p className="mt-8">
              그래서 매일 기도하는 교회요, 전 세계 선교사역과 복음전도에 힘쓰고 있습니다.
              함께 동참하여 첫째부활에 참여하길 원하시는 분들을 초교파적으로 환영합니다.
            </p>
            <p className="mt-8">감사합니다. 사랑합니다.</p>

            {/* 서명 */}
            <div className="mt-16 flex items-baseline justify-end gap-3 leading-[32px]">
              <span className="text-[14px] text-gray-500 sm:text-[15px]">{CHURCH_INFO.name} 담임목사</span>
              <span className="text-[24px] font-bold tracking-[0.18em] text-gray-900 sm:text-[28px]">나현숙</span>
            </div>
          </div>
        </section>

        {/* 저서 소개 */}
        <section className="mt-14 sm:mt-20">
          <h2 className="text-[24px] font-bold text-gray-900 sm:text-[28px]">저서소개</h2>
          <div className="card-tinted mt-6 grid gap-7 p-6 sm:grid-cols-[200px_1fr] sm:gap-9 sm:p-9">
            <div className="mx-auto w-[180px] sm:mx-0 sm:w-full">
              <Image
                src="/images/banners/book-cover.png"
                alt="아름다운 영의 나라 표지"
                width={640}
                height={879}
                sizes="200px"
                className="h-auto w-full drop-shadow-[0_16px_32px_rgba(10,16,40,0.18)]"
              />
            </div>
            <div>
              <p className="text-[20px] font-bold text-gray-900">아름다운 영의 나라</p>
              <blockquote className="mt-4 text-[15px] leading-[1.95] text-gray-600">
                하루는 기도하는 중에 주님께서 제 영을 데리고 천국에 갔습니다.
                천국에 가서 &ldquo;앞으로 마지막에 될 일이다&rdquo; 하시면서 &ldquo;저 세상을
                보라&rdquo; 하시자 갑자기 하늘이 열려서 세상이 보이는데, 캄캄한 밤 어둠 속에 까만
                개미가 우글우글하는데 주님이 &ldquo;자세히 보라&rdquo; 하셔서 보니까 개미가 아니라
                사람들이 개미처럼 보였습니다. 그런데 어떤 개미는 까만색이요, 어떤 개미는 흰색인데…
                주님께서 &ldquo;까만 개미는 하나님을 안 믿는 자요, 빛을 내는 개미는 예수를 구주로
                믿는 자요, 흰 개미는 흰 예복을 입은 신부다…&rdquo;
              </blockquote>
              <p className="mt-3 text-[13px] text-gray-400">본문 중에서</p>

              <div className="mt-6 border-t border-gray-200/70 pt-5">
                <p className="text-[14px] font-semibold text-gray-900">목차</p>
                <ol className="mt-3 space-y-1.5 text-[14px] text-gray-600">
                  <li><span className="mr-2 font-semibold text-gray-800">제1편</span>부르시는 하나님의 큰 음성</li>
                  <li><span className="mr-2 font-semibold text-gray-800">제2편</span>나의 목회, 나의 선교</li>
                  <li><span className="mr-2 font-semibold text-gray-800">제3편</span>아름다운 천국</li>
                  <li><span className="mr-2 font-semibold text-gray-800">제4편</span>예수님의 신부단장</li>
                  <li><span className="mr-2 font-semibold text-gray-800">제5편</span>지옥의 참상</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* 사역 발자취 */}
        <section className="mt-14 sm:mt-20">
          <h2 className="text-[24px] font-bold text-gray-900 sm:text-[28px]">사역 발자취</h2>
          <div className="mt-6">
            <FootprintSlider items={FOOTPRINTS} />
          </div>
        </section>

        {/* 관리자 페이지에서 추가한 콘텐츠 */}
        {page && (
          <div className="mt-12">
            <h2 className="mb-4 text-[20px] font-bold text-gray-900">
              {page.title || "목사님 소개"}
            </h2>
            <div
              className="prose prose-sm sm:prose max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
