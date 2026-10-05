"use client";

/* 상세 페이지 공용 스크롤 등장 (GSAP ScrollTrigger).
 *
 * (public) 레이아웃에서 본문 전체를 감싼다. 페이지마다 마크업을 손대지 않도록
 * 공통 래퍼 구조(`.mx-auto` 컨테이너의 직계 자식 = 섹션 단위)를 자동으로 잡고,
 * 필요하면 어떤 요소든 `data-reveal`을 붙여 명시적으로 추가할 수 있다.
 *
 * - 그리드 컨테이너는 통째로가 아니라 자식 카드들을 stagger로 띄운다
 * - 한 번만 등장(once), 헤더가 sticky라 뷰포트 88% 지점에서 트리거
 * - prefers-reduced-motion이면 아무것도 하지 않는다
 * - 첫 페인트는 globals.css의 [data-reveal-pending] 규칙이 가려주고,
 *   하이드레이션 직후 useLayoutEffect에서 인라인 스타일로 넘겨받는다
 */

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AUTO_SELECTOR = [
  ":scope > div > .mx-auto > *",
  ":scope > .mx-auto > *",
  "[data-reveal]",
].join(",");

export function ScrollReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const found = Array.from(root.querySelectorAll<HTMLElement>(AUTO_SELECTOR));

    /* 그리드는 자식 단위로 */
    const targets: HTMLElement[] = [];
    const seen = new Set<HTMLElement>();
    for (const el of found) {
      if (el.tagName === "SCRIPT" || el.tagName === "STYLE") continue;
      const isGrid = el.classList.contains("grid") && el.children.length > 1;
      const list = isGrid ? (Array.from(el.children) as HTMLElement[]) : [el];
      if (isGrid) el.style.opacity = "1";
      for (const t of list) {
        if (!seen.has(t)) {
          seen.add(t);
          targets.push(t);
        }
      }
    }

    if (reduce || targets.length === 0) {
      for (const t of found) t.style.opacity = "1";
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y: 24 });
      ScrollTrigger.batch(targets, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            overwrite: true,
          }),
      });
      /* 이미지 로드로 높이가 바뀌면 트리거 위치를 다시 계산 */
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      root.querySelectorAll("img").forEach((img) => {
        if (!img.complete) img.addEventListener("load", refresh, { once: true });
      });
    }, root);

    /* 어떤 이유로든 트리거가 안 걸린 요소가 남지 않게 (탭 전환 등) */
    const failsafe = setTimeout(() => {
      for (const t of targets) if (getComputedStyle(t).opacity === "0") t.style.opacity = "1";
    }, 6000);

    return () => {
      clearTimeout(failsafe);
      ctx.revert();
    };
  }, [pathname]);

  return (
    <div ref={ref} data-reveal-pending>
      <noscript>
        <style>{`[data-reveal-pending] > div > .mx-auto > *, [data-reveal-pending] > .mx-auto > *, [data-reveal-pending] [data-reveal] { opacity: 1 !important; }`}</style>
      </noscript>
      {children}
    </div>
  );
}
