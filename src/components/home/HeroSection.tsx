"use client";

import { useState, useEffect, useCallback, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BRANCHES } from "@/lib/constants";
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
            {BRANCHES.map((b) => (
              <div key={b.name}>
                <p className="text-[clamp(16px,2cqw,22px)] font-semibold text-white">{b.short}</p>
                <p className="mt-1 text-[clamp(14px,1.6cqw,18px)] text-white/80">{b.address}</p>
                {/* 전철역은 모바일에서 숨긴다 — 4:3 배너에 글이 꽉 차서 */}
                <p className="mt-0.5 hidden text-[clamp(13px,1.4cqw,16px)] text-white/60 sm:block">{b.subway}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* 미국 워싱턴 연합 성회 — 1번 배너.
   수채 블루 하늘 + 명조 대형 타이틀. 이 슬라이드가 화면에 돌아올 때마다 모션그래픽으로 다시 그려진다:
   링이 그려지고 → 표어 세 마디가 차례로 오르고 → 타이틀이 글자 단위로 마스크에서 솟고 →
   금색 선이 가운데서 펼쳐지며 마름모가 돌아 앉고 → 날짜가 올라온다.
   첫 로드에는 인트로가 걷힌 뒤 재생한다. 모션 축소 환경에서는 바로 완성 상태로 둔다. */
const TITLE = "미국 워싱턴 연합 성회";
const MOTTO = ["회개운동", "성령운동", "신부단장"];
const GOLD_LINE = "bg-[oklch(75%_0.1_85)]";

function DefaultSlide0({ active = false }: { active?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  /* 타임라인은 한 번만 만들고, 활성화될 때마다 처음부터 재생한다 */
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const q = gsap.utils.selector(root);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      tl.fromTo(q("[data-b-sky]"), { scale: 1.1 }, { scale: 1, duration: 3.2, ease: "power2.out" }, 0)
        .fromTo(q("[data-b-ring]"), { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.4, stagger: 0.12, ease: "power2.out" }, 0)
        .fromTo(q("[data-b-motto]"), { yPercent: 110 }, { yPercent: 0, duration: 0.7, stagger: 0.12, ease: "power4.out" }, 0.15)
        .fromTo(q("[data-b-bar]"), { scaleY: 0 }, { scaleY: 1, duration: 0.4, stagger: 0.12 }, 0.4)
        .fromTo(q("[data-b-char]"), { yPercent: 115 }, { yPercent: 0, duration: 0.85, stagger: 0.045, ease: "power4.out" }, 0.45)
        .fromTo(q("[data-b-line]"), { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power3.inOut" }, 1.1)
        .fromTo(q("[data-b-gem]"), { scale: 0, rotation: -135 }, { scale: 1, rotation: 45, duration: 0.6, ease: "back.out(2)" }, 1.2)
        .fromTo(q("[data-b-date]"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 1.35);
      tlRef.current = tl;
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      tl.progress(1);
      return;
    }
    if (!active) {
      /* 슬라이드가 완전히 빠져나간 뒤 처음 상태로 되돌려 둔다 (빠지는 도중에 사라지지 않게) */
      const t = setTimeout(() => tl.pause(0), 800);
      return () => clearTimeout(t);
    }
    /* 인트로 오버레이가 덮고 있으면 걷힐 때까지 기다렸다가 재생 */
    let raf = 0;
    const start = performance.now();
    const waitIntro = () => {
      const introOn = document.querySelector("[data-ground]");
      if (introOn && performance.now() - start < 16000) {
        raf = requestAnimationFrame(waitIntro);
        return;
      }
      tl.restart();
    };
    tl.pause(0);
    raf = requestAnimationFrame(waitIntro);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return (
    /* 링크 없음 — 안내용 배너 (사용자 지시) */
    <div
      ref={ref}
      className="relative block aspect-[4/3] w-full overflow-hidden sm:aspect-video bg-[linear-gradient(180deg,oklch(99%_0.003_240)_0%,oklch(96%_0.02_236)_48%,oklch(85%_0.065_232)_100%)]"
    >
      {/* 맨 뒤 — 파란 하늘에 선 십자가 (Unsplash, 무료 라이선스). 십자가가 오른쪽에 와서 타이틀을 가리지 않는다 */}
      <div aria-hidden className="absolute inset-0 bg-[oklch(74%_0.11_245)]" />
      <div
        aria-hidden
        data-b-sky
        className="absolute inset-y-0 left-[24%] w-full [mask-image:linear-gradient(to_right,transparent,black_28%)]"
      >
        <Image
          src="/images/banners/cross-sky.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1100px) 1100px, 100vw"
          className="origin-[45%_50%] scale-x-[1.22] object-cover object-[50%_30%] opacity-90"
        />
      </div>
      {/* 사진 위에 하늘색을 한 겹 — 원색을 눌러 배너 톤으로 */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-white/45 via-white/30 to-[oklch(70%_0.1_240)]/30" />

      {/* 수채 번짐 — 아래쪽에 고이는 블루 + 좌상단 보랏빛 한 방울 + 우측 골드 한 줄기 */}
      <div aria-hidden className="absolute -bottom-[32%] left-[6%] h-[70%] w-[55%] rounded-full bg-[oklch(76%_0.1_235)] opacity-45 blur-[70px]" />
      <div aria-hidden className="absolute -bottom-[28%] right-[4%] h-[60%] w-[46%] rounded-full bg-[oklch(80%_0.09_245)] opacity-50 blur-[60px]" />
      <div aria-hidden className="absolute -left-[6%] top-[8%] h-[38%] w-[26%] rounded-full bg-[oklch(82%_0.08_278)] opacity-30 blur-[55px]" />
      <div aria-hidden className="absolute right-[10%] top-[14%] h-[30%] w-[22%] rounded-full bg-[oklch(90%_0.07_90)] opacity-35 blur-[50px]" />
      {/* 상단에서 내려오는 빛 */}
      <div aria-hidden className="absolute -top-[38%] left-1/2 h-[75%] w-[72%] -translate-x-1/2 rounded-full bg-white opacity-75 blur-[60px]" />

      {/* 가는 링 — 타이틀 뒤에 겹치는 큰 원 장식 (등장 시 퍼지며 그려진다) */}
      <div aria-hidden data-b-ring className="absolute -right-[8%] top-[4%] aspect-square w-[42%] rounded-full border border-primary/15" />
      <div aria-hidden data-b-ring className="absolute -left-[10%] top-[58%] aspect-square w-[36%] rounded-full border border-primary/10" />
      <div aria-hidden data-b-ring className="absolute left-[16%] top-[18%] aspect-square w-[9%] rounded-full border border-[oklch(75%_0.1_85)]/25" />

      {/* 떠 있는 입자 */}
      <div aria-hidden className="absolute left-[22%] top-[30%] h-2.5 w-2.5 rounded-full bg-primary/30 blur-[1px]" />
      <div aria-hidden className="absolute right-[24%] top-[22%] h-2 w-2 rounded-full bg-[oklch(80%_0.1_88)]/60 blur-[1px]" />
      <div aria-hidden className="absolute right-[18%] top-[64%] h-3 w-3 rounded-full bg-primary/20 blur-[2px]" />
      <div aria-hidden className="absolute left-[14%] top-[70%] h-2 w-2 rounded-full bg-white/80 blur-[1px]" />
      <div aria-hidden className="absolute right-[36%] top-[12%] h-1.5 w-1.5 rounded-full bg-primary/35" />

      {/* ── 카피 ── */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pb-8 text-center sm:pb-0">
        <p className="flex items-center gap-[0.7em] text-[clamp(15px,2.3cqw,28px)] font-semibold tracking-[0.04em] text-primary">
          {MOTTO.map((m, i) => (
            <span key={m} className="contents">
              {i > 0 && <span aria-hidden data-b-bar className="h-[0.9em] w-px origin-center bg-primary/35" />}
              <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <span data-b-motto className="inline-block">
                  {m}
                </span>
              </span>
            </span>
          ))}
        </p>

        <h2
          aria-label={TITLE}
          className="relative mt-[0.3em] text-[clamp(34px,7.4cqw,92px)] font-black leading-[1.15] tracking-[-0.03em] [filter:drop-shadow(0_3px_10px_rgba(12,30,80,0.22))_drop-shadow(0_1px_1px_rgba(255,255,255,0.5))]"
        >
          {Array.from(TITLE).map((ch, i) =>
            ch === " " ? (
              <span key={i} className="inline-block w-[0.3em]" />
            ) : (
              <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.06em] align-bottom">
                <span
                  data-b-char
                  className="inline-block bg-gradient-to-b from-[oklch(32%_0.14_264)] via-[oklch(45%_0.19_258)] to-[oklch(60%_0.17_240)] bg-clip-text text-transparent"
                >
                  {ch}
                </span>
              </span>
            )
          )}
        </h2>

        {/* 금색 헤어라인 + 마름모 */}
        <div aria-hidden className="mt-[clamp(14px,2.4cqw,30px)] flex items-center gap-3">
          <span data-b-line className={`h-px w-[clamp(36px,7cqw,90px)] origin-right ${GOLD_LINE}`} />
          <span data-b-gem className="h-[7px] w-[7px] rotate-45 border border-[oklch(75%_0.1_85)]" />
          <span data-b-line className={`h-px w-[clamp(36px,7cqw,90px)] origin-left ${GOLD_LINE}`} />
        </div>

        <p data-b-date className="mt-[clamp(14px,2.4cqw,30px)] text-[clamp(18px,3.1cqw,40px)] font-bold text-gray-900">
          2026년 11월 2일<span className="mx-1.5 font-medium text-gray-600">~</span>6일
          <span className="ml-2 font-medium text-gray-600">(월~금)</span>
        </p>
      </div>
    </div>
  );
}

const DEFAULT_SLIDES: React.ComponentType<{ active?: boolean }>[] = [DefaultSlide0, DefaultSlide1, DefaultSlide2, DefaultSlide3];

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
    /* 인트로가 덮고 있는 동안에는 자동 넘김을 시작하지 않는다 — 인트로가 걷히면 1번 배너부터 */
    /* 머무는 시간 — 1번 배너는 모션그래픽(약 2초)이 끝난 뒤 충분히 읽히도록 8초, 나머지는 6초 */
    let timer: ReturnType<typeof setTimeout> | undefined;
    const dwell = (i: number) => (i === 0 && banners.length === 0 ? 8000 : 6000);
    const schedule = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => emblaApi.scrollNext(), dwell(emblaApi.selectedScrollSnap()));
    };
    const startAutoplay = () => {
      emblaApi.scrollTo(0, true);
      emblaApi.on("select", schedule);
      schedule();
    };
    const waiter = setInterval(() => {
      if (!document.querySelector("[data-ground]")) {
        clearInterval(waiter);
        startAutoplay();
      }
    }, 200);
    return () => {
      clearInterval(waiter);
      if (timer) clearTimeout(timer);
      emblaApi.off("select", schedule);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, banners.length]);

  /* Default slides carousel */
  if (banners.length === 0) {
    return (
      <section className={FRAME}>
        <BannerFrame>
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {DEFAULT_SLIDES.map((Slide, i) => (
                <div key={i} className="min-w-0 flex-[0_0_100%]">
                  <Slide active={i === selectedIndex} />
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
