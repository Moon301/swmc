"use client";

/* GSAP 인트로 (사용자 지정 — sharebien.com 참고).
 *
 * 회개운동 → 성령운동 → 신부단장 세 단어가 지나간 뒤, 교회 전경이 아래에서
 * 드러나며 "마지막 시대, 깨어있는 교회 / 성은세계선교교회"로 마무리 →
 * 오버레이가 위로 걷히며 홈이 나타난다.
 *
 * - 세션당 1회만 (sessionStorage) — 내부 네비게이션마다 뜨면 괴롭다
 * - prefers-reduced-motion이면 아예 건너뛴다
 * - 재생 중 body 스크롤 잠금, 끝나면 복원
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const SEEN_KEY = "swmc_intro_seen";

/* 단어마다 어울리는 배경 이미지가 함께 떠오른다 */
const STEPS = [
  {
    word: "회개운동",
    image:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1600&q=80&auto=format&fit=crop", // 말씀 앞에 선 손
  },
  {
    word: "성령운동",
    image:
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1600&q=80&auto=format&fit=crop", // 뜨거운 집회
  },
  {
    word: "신부단장",
    image: "/images/intro/bride.jpg", // 실제 성회 현장 (사용자 제공)
  },
];

export function IntroLoader() {
  /* SSR부터 오버레이를 깔아 첫 페인트가 인트로 뒤에 숨게 한다.
     이미 본 세션/모션 축소 환경은 마운트 직후 바로 걷는다 */
  const [show, setShow] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || sessionStorage.getItem(SEEN_KEY)) setShow(false);
  }, []);

  useEffect(() => {
    if (!show || !rootRef.current) return;

    const root = rootRef.current;
    document.body.style.overflow = "hidden";

    const finish = () => {
      sessionStorage.setItem(SEEN_KEY, "1");
      document.body.style.overflow = "";
      setShow(false);
    };

    const q = gsap.utils.selector(root);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: finish,
      });

      /* 1. 단어 + 배경 이미지 릴레이 — 빠르게 지나가고, 피날레(교회 전경)에 시간을 몰아준다 */
      const words = q("[data-intro-word]");
      const bgs = q("[data-intro-bg]");
      words.forEach((word, i) => {
        const at = i === 0 ? 0.1 : ">";
        tl.fromTo(
          bgs[i],
          { opacity: 0, scale: 1.08 },
          { opacity: 1, scale: 1.02, duration: 0.9, ease: "power2.out" },
          at
        )
          .fromTo(
            word,
            { opacity: 0, y: 34 },
            { opacity: 1, y: 0, duration: 0.4 },
            "<+0.08"
          )
          .to(
            word,
            { opacity: 0, y: -28, duration: 0.26, ease: "power2.in" },
            "+=0.32"
          )
          .to(bgs[i], { opacity: 0, duration: 0.3, ease: "power2.in" }, "<");
      });

      /* 2. 교회 전경이 아래에서 드러나며 줌아웃 */
      tl.fromTo(
        q("[data-intro-photo]"),
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.0, ease: "power4.inOut" },
        "-=0.05"
      )
        .fromTo(
          q("[data-intro-photo] img"),
          { scale: 1.14 },
          { scale: 1, duration: 1.6, ease: "power2.out" },
          "<"
        )
        /* 3. 마무리 카피 */
        .fromTo(
          q("[data-intro-final] > *"),
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.16 },
          "-=0.55"
        )
        /* 4. 교회 전경 + 카피를 충분히 보여준 뒤 오버레이가 위로 걷힌다 */
        .to(root, {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
          delay: 2.4,
        });
    }, root);

    /* 어떤 이유로든(탭 전환 등) 타임라인이 멈춰도 사이트를 가리지 않게 안전장치 */
    const failsafe = setTimeout(finish, 11000);

    return () => {
      clearTimeout(failsafe);
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="fixed inset-0 z-[100] overflow-hidden bg-background"
    >
      {/* 단어별 배경 이미지 — 네이비 스크림으로 눌러 흰 단어가 또렷하게 */}
      <div className="absolute inset-0">
        {STEPS.map((step) => (
          <div key={step.word} data-intro-bg className="absolute inset-0 opacity-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={step.image}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-navy/60" />
          </div>
        ))}
      </div>

      {/* 단어 릴레이 — 같은 자리에 겹쳐 두고 순서대로 등장/퇴장 */}
      <div className="absolute inset-0 flex items-center justify-center">
        {STEPS.map((step) => (
          <p
            key={step.word}
            data-intro-word
            className="absolute text-[48px] font-bold tracking-tight text-white opacity-0 drop-shadow-[0_2px_20px_rgba(10,16,40,0.55)] sm:text-[84px]"
          >
            {step.word}
          </p>
        ))}
      </div>

      {/* 교회 전경 + 마무리 카피 */}
      <div
        data-intro-photo
        className="absolute inset-0"
        style={{ clipPath: "inset(100% 0% 0% 0%)" }}
      >
        <Image
          src="/images/church-building.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* 하단 스크림 — 카피 가독성 */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/15 to-transparent" />

        <div
          data-intro-final
          className="absolute inset-x-0 bottom-[12%] px-6 text-center text-white"
        >
          {/* 교회 이름이 주인공 — 표어는 위에 작게 */}
          <p className="text-[18px] font-medium text-white/85 drop-shadow-[0_2px_12px_rgba(10,16,40,0.5)] sm:text-[26px]">
            마지막 시대, 깨어있는 교회
          </p>
          <p className="mt-3 text-[36px] font-bold leading-tight tracking-tight drop-shadow-[0_2px_16px_rgba(10,16,40,0.55)] sm:mt-4 sm:text-[64px]">
            성은세계선교교회
          </p>
        </div>
      </div>
    </div>
  );
}
