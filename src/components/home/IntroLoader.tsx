"use client";

/* 인트로 모션그래픽 — 사진 + 키네틱 타이포 + 도형 (2026-10 재해석).
 *
 * 네 장면 모두 사진을 깔고, 그 위에서 글자와 헤어라인 도형이 "뜻"을 몸으로 보여준다.
 * 발광·블러 없이 선과 면만 쓴다. 장면 사이는 도형이 다음 장면의 창(마스크)이 되어 이어진다.
 *
 *  1. 회개운동  — 말씀 앞의 손 사진. 수평선이 그어지고 글자가 선 아래에서 올라온다.
 *                 궤도 원이 그려지며 돌고, 퇴장은 마지막 글자부터 거꾸로 가라앉는다 (돌이킴, 엎드림).
 *  2. 성령운동  — 그 수평선을 따라 화면이 위아래로 갈라지며 집회 사진이 열린다.
 *                 중심에서 동심원 파문이 퍼지고, 흩어진 글자가 가운데로 모였다가 불꽃처럼 기울며 오른다.
 *  3. 신부단장  — 파문이 원형 창이 되어 실제 성회 사진이 열린다 (사용자 제공 사진 고정).
 *                 헤어라인 액자가 한 획으로 둘러지고 그 위에 십자가가 그어지며 명조 글자가 떠오른다.
 *  4. 피날레    — 네이비 기둥 여섯 개가 아래에서 올라와 화면을 덮고, 위로 빠지며 교회 전경을 연다 (고정).
 *                 표어와 교회 이름이 마스크 아래에서 올라오고 금색 선이 가운데서 펼쳐진다.
 *                 충분히 머문 뒤 오버레이 전체가 위로 걷힌다.
 *
 * - 세션당 1회 (sessionStorage), prefers-reduced-motion이면 건너뛴다
 * - SSR부터 오프화이트 오버레이를 깔아 첫 페인트를 가린다. 어두운 레이어는 재생 시작 때만 드러나
 *   이미 본 방문자에게는 어두운 번쩍임이 없다
 * - 웹폰트가 준비된 뒤(최대 0.7초 대기) 시작해 글자 분해가 흔들리지 않게 한다
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const SEEN_KEY = "swmc_intro_seen";

const REPENT_IMG =
  "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1600&q=80&auto=format&fit=crop"; // 말씀 앞에 선 손
const SPIRIT_IMG =
  "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1600&q=80&auto=format&fit=crop"; // 뜨거운 집회

/* 금색은 인트로 안에서만, 점·선 한두 개에만 쓴다 */
const GOLD = "oklch(82% 0.085 85)";
const SKY = "var(--color-accent-light)";

const hidden = { transform: "translateY(110%)" } as const;

/* 성령운동 빛줄기 — 가운데가 가장 길고 바깥으로 갈수록 짧다. 끝은 글자 위에서 멈춘다 (h는 vh) */
const RAYS = [
  { l: 50, h: 34, o: 0.85 },
  { l: 45, h: 30, o: 0.6, gold: true },
  { l: 55, h: 30, o: 0.6, gold: true },
  { l: 39, h: 24, o: 0.4 },
  { l: 61, h: 24, o: 0.4 },
];

/* 글자(또는 단어) 단위로 쪼갠다. mask면 각 조각이 자기 상자 안에서만 보인다 */
function Split({
  text,
  k,
  by = "char",
  mask = true,
}: {
  text: string;
  k: string;
  by?: "char" | "word";
  mask?: boolean;
}) {
  const parts = by === "word" ? text.split(" ") : Array.from(text);
  return (
    <>
      {parts.map((p, i) => (
        <span
          key={i}
          className={mask ? "inline-block overflow-hidden pb-[0.1em] align-bottom" : "inline-block"}
          style={by === "word" && i < parts.length - 1 ? { marginRight: "0.28em" } : undefined}
        >
          <span data-k={k} className="inline-block will-change-transform" style={mask ? hidden : { opacity: 0 }}>
            {p}
          </span>
        </span>
      ))}
    </>
  );
}

export function IntroLoader() {
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
    let cancelled = false;

    const finish = () => {
      sessionStorage.setItem(SEEN_KEY, "1");
      document.body.style.overflow = "";
      setShow(false);
    };

    const q = gsap.utils.selector(root);
    const ctx = gsap.context(() => {
      const ground = q("[data-ground]");
      const repent = q("[data-repent]");
      const repentImg = q("[data-repent-img]");
      const spirit = q("[data-spirit]");
      const spiritImg = q("[data-spirit-img]");
      const orbit = q("[data-orbit]");
      const orbitRing = q("[data-orbit-ring]");
      const orbitDot = q("[data-orbit-dot]");
      const rings = q("[data-ring]");
      const w1 = q('[data-k="w1"]');
      const w1Line = q("[data-w1-line]");
      const w2 = q('[data-k="w2"]');
      const w2Wrap = q("[data-w2-wrap]");
      const bride = q("[data-bride]");
      const brideImg = q("[data-bride-img]");
      const edges = q("[data-edge]");
      const crossV = q("[data-cross-v]");
      const crossH = q("[data-cross-h]");
      const w3 = q('[data-k="w3"]');
      const rays = q("[data-ray]");
      const inner = q("[data-inner]");
      const gems = q("[data-gem]");
      const veil = q("[data-veil]");
      const sub = q("[data-bride-sub]");
      const cols = q("[data-col]");
      const church = q("[data-church]");
      const churchImg = q("[data-church-img]");
      const f1 = q('[data-k="f1"]');
      const rule = q("[data-rule]");
      const f2 = q('[data-k="f2"]');

      /* 시작 상태를 GSAP 값으로 통일 — CSS의 translateY(110%)를 GSAP가 px(y)로 읽어 들여
         yPercent만 0으로 돌리면 px 오프셋이 남아 글자가 마스크 아래 숨어 버린다 */
      gsap.set([w1, f1, f2], { y: 0, yPercent: 110 });
      gsap.set(w3, { opacity: 0 });
      gsap.set(w1Line, { scaleX: 0 });
      gsap.set(cols, { y: 0, yPercent: 100 });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
        onComplete: finish,
      });

      /* ── 0. 바탕 ───────────────────────────── */
      tl.to(ground, { opacity: 1, duration: 0.3, ease: "none" }, 0);

      /* ── 1. 회개운동 (0.1 – 1.75) ──────────── */
      tl.to(repent, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0.1)
        .fromTo(repentImg, { scale: 1.12 }, { scale: 1.02, duration: 1.9, ease: "power2.out" }, 0.1)
        .fromTo(w1Line, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power3.inOut" }, 0.15)
        .fromTo(orbitRing, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, 0.2)
        .fromTo(
          orbit,
          { rotation: -90, svgOrigin: "500 500" },
          { rotation: 40, svgOrigin: "500 500", duration: 1.6, ease: "power2.out" },
          0.2
        )
        .to(orbitDot, { opacity: 1, duration: 0.3 }, 0.45)
        .fromTo(w1, { y: 0, yPercent: 110 }, { y: 0, yPercent: 0, duration: 0.65, stagger: 0.07, ease: "power4.out" }, 0.35)
        /* 퇴장 — 마지막 글자부터 거꾸로 가라앉는다 */
        .to(w1, { yPercent: 110, duration: 0.4, stagger: { each: 0.05, from: "end" }, ease: "power3.in" }, 1.3)
        .to(orbitRing, { strokeDashoffset: -1, duration: 0.5, ease: "power2.in" }, 1.3)
        .to(orbitDot, { opacity: 0, duration: 0.25 }, 1.4);

      /* ── 2. 성령운동 (1.6 – 3.15) ──────────── */
      /* 수평선이 이음매가 되어 화면이 위아래로 갈라지며 다음 사진이 열린다.
         그 위로 빛줄기가 내려오고(강림), 글자도 위에서 천천히 내려앉는다. 서두르지 않는 sine 곡선 */
      tl.set(spirit, { visibility: "visible" }, 1.6)
        .fromTo(
          spirit,
          { clipPath: "inset(50% 0% 50% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.75, ease: "power4.inOut" },
          1.62
        )
        .to(w1Line, { opacity: 0, duration: 0.3, ease: "none" }, 1.75)
        .fromTo(spiritImg, { scale: 1.14 }, { scale: 1.02, duration: 2.0, ease: "power2.out" }, 1.62)
        /* 빛줄기 — 흩뿌리지 않고 한 장의 막처럼 함께, 천천히 내려온다 */
        .fromTo(
          rays,
          { scaleY: 0, opacity: 1 },
          { scaleY: 1, duration: 1.3, stagger: 0.02, ease: "power2.inOut" },
          1.75
        )
        /* 글자 — 한 덩어리로, 살짝 크게 떠 있다가 무게를 싣고 내려앉는다 */
        .fromTo(
          w2,
          { opacity: 0, y: -22, scale: 1.06 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2, stagger: 0.03, ease: "power2.out" },
          1.95
        )
        /* 장면 전체가 아주 느리게 다가온다 (카메라 푸시인) */
        .fromTo(w2Wrap, { scale: 1 }, { scale: 1.04, duration: 1.5, ease: "none" }, 1.95)
        /* 파문 한 겹, 느리고 옅게 */
        .fromTo(
          rings[0],
          { attr: { r: 110 }, opacity: 0.5 },
          { attr: { r: 520 }, opacity: 0, duration: 2.0, ease: "sine.out" },
          2.5
        )
        /* 퇴장 — 흩어지지 않고 함께 조용히 사라진다 */
        .to(w2, { opacity: 0, y: -14, duration: 0.6, ease: "power2.in" }, 2.95)
        .to(rays, { opacity: 0, duration: 0.55, ease: "power1.in" }, 2.95);

      /* ── 3. 신부단장 (3.1 – 4.95) ──────────── */
      /* 파문이 창이 되어 원형으로 열리고, 청첩장 같은 이중 액자 + 모서리 보석 + 베일이 걷히며 글자 */
      const S3 = 3.1;
      tl.set(bride, { visibility: "visible" }, S3)
        .fromTo(
          bride,
          { clipPath: "circle(0% at 50% 50%)" },
          { clipPath: "circle(75% at 50% 50%)", duration: 1.0, ease: "power4.inOut" },
          S3
        )
        .fromTo(brideImg, { scale: 1.2 }, { scale: 1.04, duration: 2.2, ease: "power2.out" }, S3)
        /* 바깥 액자 — 시계 방향 한 획 */
        .to(edges[0], { scaleX: 1, duration: 0.22, ease: "power1.in" }, S3 + 0.45)
        .to(edges[1], { scaleY: 1, duration: 0.14, ease: "none" })
        .to(edges[2], { scaleX: 1, duration: 0.22, ease: "none" })
        .to(edges[3], { scaleY: 1, duration: 0.14, ease: "power1.out" })
        /* 안쪽 액자 — 반시계 방향으로 겹쳐 그린다 */
        .to(inner[0], { scaleX: 1, duration: 0.22, ease: "power1.in" }, S3 + 0.6)
        .to(inner[1], { scaleY: 1, duration: 0.14, ease: "none" })
        .to(inner[2], { scaleX: 1, duration: 0.22, ease: "none" })
        .to(inner[3], { scaleY: 1, duration: 0.14, ease: "power1.out" })
        /* 모서리 보석 */
        .fromTo(
          gems,
          { scale: 0, rotation: 0 },
          { scale: 1, rotation: 45, duration: 0.45, stagger: 0.06, ease: "back.out(2.2)" },
          S3 + 1.15
        )
        .fromTo(crossV, { scaleY: 0 }, { scaleY: 1, duration: 0.4, ease: "power3.out" }, S3 + 0.5)
        .fromTo(crossH, { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: "power3.out" }, S3 + 0.7)
        /* 베일 — 흰 막이 왼쪽에서 덮었다가 오른쪽으로 걷히며 글자를 남긴다 */
        .fromTo(veil, { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.38, ease: "power3.in" }, S3 + 0.55)
        .set(w3, { opacity: 1 }, S3 + 0.93)
        .set(veil, { transformOrigin: "100% 50%" }, S3 + 0.93)
        .to(veil, { scaleX: 0, duration: 0.45, ease: "power3.out" }, S3 + 0.93)
        .fromTo(w3, { y: 10 }, { y: 0, duration: 0.7, stagger: 0.05, ease: "power3.out" }, S3 + 0.93)
        .fromTo(sub, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, S3 + 1.25);

      /* ── 4. 피날레 (4.95 –) ────────────────── */
      const F = 4.95;
      tl.to(cols, { y: 0, yPercent: 0, duration: 0.5, stagger: 0.05, ease: "power4.inOut" }, F)
        .set(church, { opacity: 1 }, F + 0.7)
        .set([bride, spirit, repent], { visibility: "hidden" }, F + 0.7)
        .to(cols, { yPercent: -100, duration: 0.65, stagger: 0.05, ease: "power4.inOut" }, F + 0.75)
        .fromTo(churchImg, { scale: 1.16 }, { scale: 1, duration: 2.2, ease: "power2.out" }, F + 0.75)
        .fromTo(f1, { y: 0, yPercent: 110 }, { y: 0, yPercent: 0, duration: 0.7, stagger: 0.06, ease: "power4.out" }, F + 1.2)
        .fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power3.inOut" }, F + 1.45)
        .fromTo(f2, { y: 0, yPercent: 110 }, { y: 0, yPercent: 0, duration: 0.8, stagger: 0.045, ease: "power4.out" }, F + 1.55)
        /* 교회 전경과 이름을 충분히 보여준 뒤 걷힌다 */
        .to(root, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "+=2.1");

      /* 점검용 — ?intro-debug 이면 타임라인을 노출해 특정 시점으로 멈춰 볼 수 있게 한다 */
      if (new URLSearchParams(window.location.search).has("intro-debug")) {
        (window as unknown as { __introTl?: gsap.core.Timeline }).__introTl = tl;
      }

      /* 웹폰트가 준비되면 시작 — 글자 폭이 바뀌면 분해한 글자가 흔들린다 */
      const fontsReady = (document as Document & { fonts?: FontFaceSet }).fonts?.ready ?? Promise.resolve();
      Promise.race([fontsReady, new Promise((r) => setTimeout(r, 700))]).then(() => {
        if (!cancelled) tl.play();
      });
    }, root);

    /* 어떤 이유로든(탭 전환 등) 타임라인이 멈춰도 사이트를 가리지 않게 */
    const failsafe = setTimeout(finish, 15000);

    return () => {
      cancelled = true;
      clearTimeout(failsafe);
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;

  const edge = "absolute bg-white/75";
  const word = "text-[clamp(44px,9vw,92px)] font-bold leading-[1.15] tracking-tight text-white drop-shadow-[0_2px_18px_rgba(10,16,40,0.5)]";

  return (
    <div ref={rootRef} aria-hidden className="fixed inset-0 z-[100] overflow-hidden bg-background">
      {/* 네이비 바탕 — 재생 시작 때만 깔린다 */}
      <div data-ground className="absolute inset-0 bg-navy opacity-0" />

      {/* 1. 회개운동 사진 */}
      <div data-repent className="absolute inset-0 opacity-0">
        <div data-repent-img className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={REPENT_IMG} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-navy/65" />
      </div>

      {/* 2. 성령운동 사진 — 수평선 자리에서 위아래로 갈라지며 열린다 */}
      <div data-spirit className="invisible absolute inset-0" style={{ clipPath: "inset(50% 0% 50% 0%)" }}>
        <div data-spirit-img className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={SPIRIT_IMG} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0" style={{ backgroundColor: "oklch(26% 0.1 262 / 0.66)" }} />
      </div>

      {/* 도형 레이어 — 1000×1000 좌표, 화면 중심 기준으로 꽉 채운다 */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <g data-orbit>
          <circle
            data-orbit-ring
            cx="500"
            cy="500"
            r="200"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset="1"
            stroke="white"
            strokeOpacity="0.4"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <circle data-orbit-dot cx="500" cy="300" r="4" fill={GOLD} opacity="0" />
        </g>
        {[0, 1].map((i) => (
          <circle
            key={i}
            data-ring
            cx="500"
            cy="500"
            r="90"
            style={{ stroke: SKY }}
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            opacity="0"
          />
        ))}
      </svg>

      {/* 1. 회개운동 — 선 위로 올라오는 글자 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className={word}>
          <Split text="회개운동" k="w1" />
        </p>
        <div
          data-w1-line
          className="mt-4 h-px w-[min(72vw,620px)] bg-white/55"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* 2. 성령운동 — 위에서 내려오는 빛줄기(헤어라인) */}
      <div className="pointer-events-none absolute inset-0">
        {RAYS.map((r, i) => (
          <span
            key={i}
            data-ray
            className="absolute top-0 w-px origin-top"
            style={{
              left: `${r.l}%`,
              height: `${r.h}vh`,
              transform: "scaleY(0)",
              backgroundImage: `linear-gradient(to bottom, transparent, ${r.gold ? GOLD : "rgba(255,255,255,0.75)"})`,
              opacity: r.o,
            }}
          />
        ))}
      </div>

      {/* 2. 성령운동 — 글자가 한 덩어리로 무게 있게 내려앉는다 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p data-w2-wrap className={word}>
          <Split text="성령운동" k="w2" mask={false} />
        </p>
      </div>

      {/* 3. 신부단장 — 실제 성회 사진이 원형 창으로 열린다 */}
      <div data-bride className="invisible absolute inset-0" style={{ clipPath: "circle(0% at 50% 50%)" }}>
        <div data-bride-img className="absolute inset-0">
          <Image src="/images/intro/bride.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-navy/55" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative px-[clamp(28px,5vw,64px)] py-[clamp(16px,2.6vw,32px)]">
            {/* 헤어라인 액자 */}
            <span data-edge className={`${edge} left-0 top-0 h-px w-full origin-left`} style={{ transform: "scaleX(0)" }} />
            <span data-edge className={`${edge} right-0 top-0 h-full w-px origin-top`} style={{ transform: "scaleY(0)" }} />
            <span data-edge className={`${edge} bottom-0 right-0 h-px w-full origin-right`} style={{ transform: "scaleX(0)" }} />
            <span data-edge className={`${edge} bottom-0 left-0 h-full w-px origin-bottom`} style={{ transform: "scaleY(0)" }} />
            {/* 액자 위 십자가 */}
            <span className="absolute bottom-full left-1/2 mb-[clamp(14px,2vw,22px)] block h-[clamp(34px,5vw,56px)] w-[clamp(22px,3.2vw,36px)] -translate-x-1/2">
              <span
                data-cross-v
                className="absolute left-1/2 top-0 h-full w-px origin-top bg-white/85"
                style={{ transform: "scaleY(0)" }}
              />
              <span
                data-cross-h
                className="absolute left-0 top-[28%] h-px w-full origin-center bg-white/85"
                style={{ transform: "scaleX(0)" }}
              />
            </span>
            {/* 안쪽 액자 — 7px 안쪽, 반시계 방향 */}
            <span data-inner className={`${edge} left-[7px] top-[7px] h-px w-[calc(100%-14px)] origin-right bg-white/45`} style={{ transform: "scaleX(0)" }} />
            <span data-inner className={`${edge} left-[7px] top-[7px] h-[calc(100%-14px)] w-px origin-top bg-white/45`} style={{ transform: "scaleY(0)" }} />
            <span data-inner className={`${edge} bottom-[7px] left-[7px] h-px w-[calc(100%-14px)] origin-left bg-white/45`} style={{ transform: "scaleX(0)" }} />
            <span data-inner className={`${edge} bottom-[7px] right-[7px] h-[calc(100%-14px)] w-px origin-bottom bg-white/45`} style={{ transform: "scaleY(0)" }} />
            {/* 모서리 보석 — 마름모 */}
            {[
              "left-0 top-0 -ml-[5px] -mt-[5px]",
              "right-0 top-0 -mr-[5px] -mt-[5px]",
              "bottom-0 right-0 -mb-[5px] -mr-[5px]",
              "bottom-0 left-0 -mb-[5px] -ml-[5px]",
            ].map((pos) => (
              <span
                key={pos}
                data-gem
                className={`absolute ${pos} h-[10px] w-[10px] border border-white bg-navy/40`}
                style={{ transform: "scale(0)", borderColor: GOLD }}
              />
            ))}
            <p className="relative font-serif text-[clamp(44px,9vw,92px)] font-bold leading-[1.2] text-white drop-shadow-[0_2px_16px_rgba(10,16,40,0.45)]">
              <Split text="신부단장" k="w3" mask={false} />
              {/* 베일 */}
              <span data-veil className="absolute inset-0 bg-white" style={{ transform: "scaleX(0)" }} />
            </p>
            <p
              data-bride-sub
              className="absolute left-1/2 top-full mt-[clamp(14px,2vw,22px)] w-max -translate-x-1/2 text-[clamp(14px,1.6vw,17px)] font-medium tracking-[0.12em] text-white/85 opacity-0"
            >
              거룩한 신부로 단장되는 교회
            </p>
          </div>
        </div>
      </div>

      {/* 4. 피날레 — 교회 전경 + 표어 + 교회 이름, 위를 네이비 기둥이 지나간다 */}
      <div className="absolute inset-0">
        <div data-church className="absolute inset-0 opacity-0">
          <div data-church-img className="absolute inset-0">
            <Image src="/images/church-building.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
        </div>

        <div className="absolute inset-x-0 bottom-[11%] px-6 text-center text-white">
          <p className="text-[clamp(18px,2.4vw,26px)] font-medium text-white/90 drop-shadow-[0_2px_12px_rgba(10,16,40,0.5)]">
            <Split text="마지막 시대, 깨어있는 교회" k="f1" by="word" />
          </p>
          <div
            data-rule
            className="mx-auto my-4 h-px w-[min(36vw,200px)] sm:my-5"
            style={{ backgroundColor: GOLD, transform: "scaleX(0)" }}
          />
          <p className="text-[clamp(36px,6.4vw,68px)] font-bold leading-[1.15] tracking-tight drop-shadow-[0_2px_16px_rgba(10,16,40,0.55)]">
            <Split text="성은세계선교교회" k="f2" />
          </p>
        </div>

        <div className="absolute inset-0 flex">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              data-col
              className="h-full flex-1 bg-navy"
              style={{ transform: "translateY(100%)", marginLeft: i === 0 ? 0 : -1 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
