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
      className="relative aspect-video w-full bg-gray-900 bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1502318217862-aa4e294ba657?w=1600&q=80&auto=format&fit=crop)",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(197,151,62,0.18)_0%,_transparent_70%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/65" />
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center text-white sm:px-12">
        <div>
          <p className="text-[12px] font-medium tracking-[0.2em] text-accent sm:text-[14px]">
            2026
          </p>
          <h2 className="mt-3 text-[26px] font-bold leading-[1.2] drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)] sm:mt-5 sm:text-[44px] lg:text-[56px]">
            하나님의 복을 받아
            <br />
            모두 복의 근원
          </h2>
          <p className="mt-4 text-[14px] text-white/80 sm:mt-6 sm:text-[18px]">
            익은 열매는 절대배가
          </p>
        </div>
      </div>
    </div>
  );
}

function DefaultSlide2() {
  return (
    <div
      className="relative aspect-video w-full bg-gray-900 bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=80&auto=format&fit=crop)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
      <div className="absolute inset-0 z-10 flex items-center px-6 sm:px-14 lg:px-20">
        <div className="max-w-[640px]">
          <p className="text-[12px] font-medium tracking-[0.15em] text-accent sm:text-[14px]">
            BOOK
          </p>
          <p className="mt-3 text-[13px] text-white/80 sm:text-[15px]">
            나현숙 담임목사님 저서
          </p>
          <h2 className="mt-2 text-[28px] font-bold leading-[1.15] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:mt-3 sm:text-[44px] lg:text-[56px]">
            아름다운 영의 나라
          </h2>
          <p className="mt-4 hidden text-[15px] leading-relaxed text-white/75 sm:block sm:text-[17px]">
            하나님의 나라를 향한 깊은 묵상과 은혜의 이야기
          </p>
          <Link
            href="/pastor"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/60 px-5 py-2 text-[13px] font-medium text-white transition-colors hover:border-white hover:bg-white/10 sm:mt-7 sm:px-6 sm:py-3 sm:text-[14px]"
          >
            자세히 보기
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function DefaultSlide3() {
  return (
    <div
      className="relative aspect-video w-full bg-gray-900 bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1538669715315-155098f0fb1d?w=1600&q=80&auto=format&fit=crop)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
      <div className="absolute inset-0 z-10 flex items-center px-6 sm:px-14 lg:px-20">
        <div className="max-w-[680px]">
          <p className="text-[12px] font-medium tracking-[0.15em] text-accent sm:text-[14px]">
            BRANCH
          </p>
          <h2 className="mt-3 text-[28px] font-bold leading-[1.15] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:mt-4 sm:text-[44px] lg:text-[56px]">
            서울 지성전 안내
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-8">
            <div>
              <p className="text-[15px] font-semibold text-white sm:text-[17px]">
                영등포 지성전
              </p>
              <p className="mt-1 text-[13px] text-white/70 sm:text-[14px]">
                서울 영등포구 당산로 123
              </p>
            </div>
            <div>
              <p className="text-[15px] font-semibold text-white sm:text-[17px]">
                서초 지성전
              </p>
              <p className="mt-1 text-[13px] text-white/70 sm:text-[14px]">
                서울 서초구 서초대로 456
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const DEFAULT_SLIDES = [DefaultSlide1, DefaultSlide2, DefaultSlide3];

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
      <section className="mx-auto max-w-[1100px] px-5 pt-6 sm:pt-8 lg:max-w-[min(1100px,calc((100svh-340px)*1.7778))]">
        <div className="relative overflow-hidden rounded-2xl">
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
        </div>
      </section>
    );
  }

  /* Single banner — no carousel controls */
  if (banners.length === 1) {
    const banner = banners[0];
    return (
      <section className="mx-auto max-w-[1100px] px-5 pt-6 sm:pt-8 lg:max-w-[min(1100px,calc((100svh-340px)*1.7778))]">
        <div className="relative overflow-hidden rounded-2xl">
          {banner.link_url ? (
            <Link href={banner.link_url}>
              <BannerImage banner={banner} />
            </Link>
          ) : (
            <BannerImage banner={banner} />
          )}
        </div>
      </section>
    );
  }

  /* Multiple DB banners */
  return (
    <section className="mx-auto max-w-[1100px] px-5 pt-6 sm:pt-8 lg:max-w-[min(1100px,calc((100svh-340px)*1.7778))]">
      <div className="relative overflow-hidden rounded-2xl">
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
      </div>
    </section>
  );
}

/* ── Shared carousel controls ── */

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
  return (
    <>
      <button
        onClick={scrollPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 transition hover:text-white"
        aria-label="이전"
      >
        <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.5} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 transition hover:text-white"
        aria-label="다음"
      >
        <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.5} />
      </button>
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {Array.from({ length: slideCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => onDotClick(i)}
            className={cn(
              "h-1.5 w-1.5 rounded-full transition-all",
              i === selectedIndex ? "bg-white" : "bg-white/40"
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
