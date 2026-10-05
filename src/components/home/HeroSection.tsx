"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Banner } from "@/types";

interface HeroSectionProps {
  banners: Banner[];
}

/* ── Default slides (shown when no DB banners exist) ── */

function DefaultSlide1() {
  return (
    <div
      className="relative aspect-[4/3] w-full bg-gray-900 bg-cover bg-center sm:aspect-video"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1502318217862-aa4e294ba657?w=1600&q=80&auto=format&fit=crop)",
      }}
    >
      <div className="absolute inset-0 bg-radial-[at_50%_45%] from-primary/30 to-transparent to-70%" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/45 to-navy/70" />
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6 pb-10 text-center text-white sm:px-12 sm:pb-0">
        <div>
          <p className="text-[clamp(15px,1.9cqw,21px)] font-medium text-white/75">
            2026년 교회 표어
          </p>
          {/* 표어 세 줄은 모두 같은 위계 (사용자 지정) */}
          <h2 className="mt-3 text-[clamp(28px,5cqw,56px)] font-bold leading-[1.2] drop-shadow-[0_2px_12px_rgba(10,16,40,0.45)] sm:mt-5">
            하나님의 복을 받아
            <br />
            모두 복의 근원
            <br />
            익은 열매는 절대배가
          </h2>
        </div>
      </div>
    </div>
  );
}

function DefaultSlide2() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#2b2118] sm:aspect-video">
      {/* 원본 사이트의 골드 보케 배경 */}
      <Image
        src="/images/banners/book-bg.jpg"
        alt=""
        fill
        sizes="(min-width: 1100px) 1100px, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/25" />

      {/* 모바일은 버튼이 없으므로 배너 전체를 탭하면 저서 소개로 이동 (중첩 a 방지를 위해 모바일에서만) */}
      <Link href="/pastor" aria-label="아름다운 영의 나라 자세히 보기" className="absolute inset-0 z-20 sm:hidden" />

      <div className="absolute inset-0 z-10 flex items-center justify-between px-7 pb-10 sm:px-14 sm:pb-0 lg:px-20">
        {/* 좌측 카피 — 원본 배너와 같은 구성 */}
        <div>
          <p className="text-[clamp(15px,1.9cqw,21px)] text-white/80">
            나현숙 담임목사님 저서
          </p>
          <h2 className="mt-2 text-[clamp(28px,5cqw,56px)] font-bold leading-[1.2] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)] sm:mt-3">
            아름다운 영의 나라
          </h2>
          <Link
            href="/pastor"
            className="mt-5 hidden border border-white/70 px-5 py-2 text-[clamp(14px,1.6cqw,18px)] font-medium text-white transition-colors hover:bg-white/15 sm:mt-8 sm:inline-block sm:px-6 sm:py-2.5"
          >
            자세히 보기
          </Link>
        </div>

        {/* 우측 책 표지 — 모바일에서도 보인다 (대신 버튼을 숨김). 배너 전체가 /pastor 링크 역할 */}
        <div className="relative ml-4 w-[38%] shrink-0 sm:ml-0 sm:w-[31%] lg:w-[27%]">
          <Image
            src="/images/banners/book-cover.png"
            alt="아름다운 영의 나라 표지"
            width={640}
            height={879}
            sizes="280px"
            className="h-auto w-full drop-shadow-[0_14px_30px_rgba(0,0,0,0.5)] sm:drop-shadow-[0_22px_48px_rgba(0,0,0,0.5)]"
          />
        </div>
      </div>
    </div>
  );
}

function DefaultSlide3() {
  return (
    <div
      className="relative aspect-[4/3] w-full bg-gray-900 bg-cover bg-center sm:aspect-video"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1538669715315-155098f0fb1d?w=1600&q=80&auto=format&fit=crop)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-navy/75 via-navy/45 to-navy/15" />
      <div className="absolute inset-0 z-10 flex items-center px-7 pb-10 sm:px-14 sm:pb-0 lg:px-20">
        <div className="max-w-[680px]">
          <h2 className="text-[clamp(28px,5cqw,56px)] font-bold leading-[1.15] text-white drop-shadow-[0_2px_12px_rgba(10,16,40,0.5)] sm:mt-4">
            서울 지성전 안내
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-8">
            <div>
              <p className="text-[clamp(16px,2cqw,22px)] font-semibold text-white">
                영등포 지성전
              </p>
              <p className="mt-1 text-[clamp(14px,1.6cqw,18px)] text-white/70">
                서울 영등포구 당산로 123
              </p>
            </div>
            <div>
              <p className="text-[clamp(16px,2cqw,22px)] font-semibold text-white">
                서초 지성전
              </p>
              <p className="mt-1 text-[clamp(14px,1.6cqw,18px)] text-white/70">
                서울 서초구 서초대로 456
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 제23차 성령대부흥성회 — 1번 배너.
   포스터 이미지가 사이트 톤과 안 맞아(사용자 피드백) 내용만 가져와 코드로 디자인:
   수채 블루 그라데이션 + 명조 대형 타이틀, 포스터와 같은 중앙 구성. */
function DefaultSlide0() {
  return (
    <Link
      href="/revival-schedule"
      className="relative block aspect-[4/3] w-full overflow-hidden sm:aspect-video bg-[linear-gradient(180deg,oklch(99%_0.003_240)_0%,oklch(96%_0.02_236)_48%,oklch(85%_0.065_232)_100%)]"
    >
      {/* ── 배경 오브젝트 ── */}
      {/* 수채 번짐 — 아래쪽에 고이는 블루 + 좌상단 보랏빛 한 방울 + 우측 골드 한 줄기 */}
      <div aria-hidden className="absolute -bottom-[32%] left-[6%] h-[70%] w-[55%] rounded-full bg-[oklch(76%_0.1_235)] opacity-45 blur-[70px]" />
      <div aria-hidden className="absolute -bottom-[28%] right-[4%] h-[60%] w-[46%] rounded-full bg-[oklch(80%_0.09_245)] opacity-50 blur-[60px]" />
      <div aria-hidden className="absolute -left-[6%] top-[8%] h-[38%] w-[26%] rounded-full bg-[oklch(82%_0.08_278)] opacity-30 blur-[55px]" />
      <div aria-hidden className="absolute right-[10%] top-[14%] h-[30%] w-[22%] rounded-full bg-[oklch(90%_0.07_90)] opacity-35 blur-[50px]" />
      {/* 상단에서 내려오는 빛 */}
      <div aria-hidden className="absolute -top-[38%] left-1/2 h-[75%] w-[72%] -translate-x-1/2 rounded-full bg-white opacity-75 blur-[60px]" />

      {/* 가는 링 — 타이틀 뒤에 겹치는 큰 원 장식 */}
      <div aria-hidden className="absolute -right-[8%] top-1/2 aspect-square w-[42%] -translate-y-1/2 rounded-full border border-primary/15" />
      <div aria-hidden className="absolute -left-[10%] top-[58%] aspect-square w-[36%] rounded-full border border-primary/10" />
      <div aria-hidden className="absolute left-[16%] top-[18%] aspect-square w-[9%] rounded-full border border-[oklch(75%_0.1_85)]/25" />

      {/* 떠 있는 입자 */}
      <div aria-hidden className="absolute left-[22%] top-[30%] h-2.5 w-2.5 rounded-full bg-primary/30 blur-[1px]" />
      <div aria-hidden className="absolute right-[24%] top-[22%] h-2 w-2 rounded-full bg-[oklch(80%_0.1_88)]/60 blur-[1px]" />
      <div aria-hidden className="absolute right-[18%] top-[64%] h-3 w-3 rounded-full bg-primary/20 blur-[2px]" />
      <div aria-hidden className="absolute left-[14%] top-[70%] h-2 w-2 rounded-full bg-white/80 blur-[1px]" />
      <div aria-hidden className="absolute right-[36%] top-[12%] h-1.5 w-1.5 rounded-full bg-primary/35" />

      {/* ── 카피 ── */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pb-8 text-center sm:pb-0">
        <p className="text-[clamp(15px,2.1cqw,27px)] font-semibold text-rose-600">
          깨어 일어나라!
        </p>
        <p className="mt-2 text-[clamp(16px,2.3cqw,30px)] font-medium tracking-[0.02em] text-gray-700 sm:mt-3.5">
          <span className="font-bold text-gray-900">회개</span>운동{" "}
          <span className="font-bold text-gray-900">성령</span>운동{" "}
          <span className="font-bold text-gray-900">신부</span>단장
        </p>

        <p className="mt-3 text-[clamp(17px,2.5cqw,34px)] font-semibold text-primary-hover sm:mt-6">
          제 23차
        </p>
        <h2 className="font-serif mt-1 bg-gradient-to-b from-[oklch(35%_0.13_260)] via-[oklch(50%_0.18_256)] to-[oklch(64%_0.16_238)] bg-clip-text pb-2 text-[clamp(34px,7.6cqw,96px)] font-black leading-[1.1] tracking-tight text-transparent">
          성령대부흥성회
        </h2>

        <p className="mt-3 text-[clamp(18px,3.1cqw,40px)] font-bold text-gray-900 sm:mt-6">
          26년 10월 9일<span className="font-medium text-gray-600">(금)</span> 오전 11:00
        </p>
        <p className="mt-1.5 text-[clamp(15px,2.3cqw,28px)] font-medium text-gray-600 sm:mt-2.5">
          장소 <span className="mx-1 text-gray-400">|</span> 그랜드 워커힐 서울, 비스타홀
        </p>
      </div>
    </Link>
  );
}

const DEFAULT_SLIDES = [DefaultSlide0, DefaultSlide1, DefaultSlide2, DefaultSlide3];

/* 배너 비율은 16:9 고정(DESIGN.md 정책). 폭으로만 조절해 배너+퀵링크가 첫 화면에 들어오게 한다 */
const FRAME =
  "mx-auto max-w-[1100px] px-4 pt-6 sm:px-5 lg:max-w-[min(1100px,calc((100svh-340px)*1.7778))]";

/* 토스식 큰 라운드 카드 — 테두리 없이 라운드와 옅은 그림자만 */
function BannerFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="@container relative overflow-hidden rounded-[24px] bg-gray-900 shadow-feature">
      {children}
    </div>
  );
}

/* ── Main Component ── */

export function HeroSection({ banners }: HeroSectionProps) {
  const useCarousel = banners.length > 1 || banners.length === 0;
  const [emblaRef, emblaApi] = useEmblaCarousel(
    useCarousel ? { loop: true } : undefined
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const slideCount =
    banners.length === 0 ? DEFAULT_SLIDES.length : banners.length;

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    const interval = setInterval(() => emblaApi.scrollNext(), 6000);
    return () => {
      clearInterval(interval);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  /* Default slides carousel */
  if (banners.length === 0) {
    return (
      <section className={FRAME}>
        <BannerFrame>
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {DEFAULT_SLIDES.map((Slide, i) => (
                <div key={i} className="min-w-0 flex-[0_0_100%]">
                  <Slide />
                </div>
              ))}
            </div>
          </div>
          <CarouselControls
            scrollPrev={scrollPrev}
            scrollNext={scrollNext}
            slideCount={slideCount}
            selectedIndex={selectedIndex}
            onDotClick={(i) => emblaApi?.scrollTo(i)}
          />
        </BannerFrame>
      </section>
    );
  }

  /* Single banner — no carousel controls */
  if (banners.length === 1) {
    const banner = banners[0];
    return (
      <section className={FRAME}>
        <BannerFrame>
          {banner.link_url ? (
            <Link href={banner.link_url}>
              <BannerImage banner={banner} />
            </Link>
          ) : (
            <BannerImage banner={banner} />
          )}
        </BannerFrame>
      </section>
    );
  }

  /* Multiple DB banners */
  return (
    <section className={FRAME}>
      <BannerFrame>
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {banners.map((banner) => (
              <div key={banner.id} className="min-w-0 flex-[0_0_100%]">
                {banner.link_url ? (
                  <Link href={banner.link_url}>
                    <BannerImage banner={banner} />
                  </Link>
                ) : (
                  <BannerImage banner={banner} />
                )}
              </div>
            ))}
          </div>
        </div>
        <CarouselControls
          scrollPrev={scrollPrev}
          scrollNext={scrollNext}
          slideCount={slideCount}
          selectedIndex={selectedIndex}
          onDotClick={(i) => emblaApi?.scrollTo(i)}
        />
      </BannerFrame>
    </section>
  );
}

/* ── Shared carousel controls ── */

/* 화살표는 유리 버튼, 인디케이터는 활성 항목만 길어지는 바 — 배너 사진을 가리지 않는 선에서 조작감을 준다 */
function CarouselControls({
  scrollPrev,
  scrollNext,
  slideCount,
  selectedIndex,
  onDotClick,
}: {
  scrollPrev: () => void;
  scrollNext: () => void;
  slideCount: number;
  selectedIndex: number;
  onDotClick: (i: number) => void;
}) {
  /* 밝은 배너(성회)·어두운 배너(표어·책) 양쪽에서 보이되 튀지 않게 —
     그림자·테두리 없는 반투명 네이비 원 + 흰 화살표, 호버 시에만 또렷해진다 */
  const arrow =
    "absolute top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-navy/20 text-white opacity-80 backdrop-blur-md transition hover:bg-navy/35 hover:opacity-100 active:scale-95 sm:h-10 sm:w-10";

  return (
    <>
      <button onClick={scrollPrev} className={cn(arrow, "hidden sm:flex", "left-3 sm:left-4")} aria-label="이전">
        <ChevronLeft className="h-5 w-5" strokeWidth={2} />
      </button>
      <button onClick={scrollNext} className={cn(arrow, "hidden sm:flex", "right-3 sm:right-4")} aria-label="다음">
        <ChevronRight className="h-5 w-5" strokeWidth={2} />
      </button>
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/25 bg-black/20 px-2.5 py-2 backdrop-blur-md">
        {Array.from({ length: slideCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => onDotClick(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === selectedIndex ? "w-5 bg-white" : "w-1.5 bg-white/45 hover:bg-white/70"
            )}
            aria-label={`배너 ${i + 1}`}
          />
        ))}
      </div>
    </>
  );
}

/* ── Banner image for DB banners ── */

function BannerImage({ banner }: { banner: Banner }) {
  return (
    <div className="relative aspect-video w-full">
      <Image
        src={banner.image_url}
        alt={banner.title}
        fill
        className="hidden object-cover sm:block"
        priority
      />
      <Image
        src={banner.mobile_image_url || banner.image_url}
        alt={banner.title}
        fill
        className="block object-cover sm:hidden"
        priority
      />
    </div>
  );
}
