"use client";

/* 사역 발자취 — 원본 Wix처럼 한 장씩 넘겨 보는 갤러리 (좌우 화살표 + 1/10 카운터).
   홈 배너와 같은 embla + 유리 화살표 버튼 문법을 쓴다 */

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type Footprint = { src: string; caption: string };

export function FootprintSlider({ items }: { items: Footprint[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [index, setIndex] = useState(0);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  /* 홈 배너와 같은 반투명 네이비 원 버튼 */
  const arrow =
    "absolute top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-navy/20 text-white opacity-80 backdrop-blur-md transition hover:bg-navy/35 hover:opacity-100 active:scale-95 sm:h-10 sm:w-10";

  return (
    <div>
      <div className="relative overflow-hidden rounded-[24px] bg-gray-900 shadow-feature">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {items.map((f, i) => (
              <figure key={f.src} className="relative min-w-0 flex-[0_0_100%]">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={f.src}
                    alt={`사역 발자취 ${i + 1}, ${f.caption}`}
                    fill
                    priority={i === 0}
                    sizes="(min-width: 880px) 840px, 100vw"
                    className="object-contain"
                  />
                </div>
              </figure>
            ))}
          </div>
        </div>

        <button onClick={prev} className={`${arrow} left-3 sm:left-4`} aria-label="이전 사진">
          <ChevronLeft className="h-5 w-5" strokeWidth={2} />
        </button>
        <button onClick={next} className={`${arrow} right-3 sm:right-4`} aria-label="다음 사진">
          <ChevronRight className="h-5 w-5" strokeWidth={2} />
        </button>

        {/* 카운터 — 원본의 1/10 표기 */}
        <div className="absolute bottom-3 right-4 z-20 rounded-full bg-black/45 px-3 py-1 text-[13px] font-medium tabular-nums text-white/90 backdrop-blur-md sm:bottom-4">
          {index + 1} / {items.length}
        </div>
      </div>

      <p className="mt-3 text-center text-[15px] text-gray-700" aria-live="polite">
        {items[index]?.caption}
      </p>
    </div>
  );
}
