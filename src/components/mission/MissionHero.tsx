"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import DottedMap from "dotted-map";
import { motion, useInView } from "framer-motion";
import { CHURCH_INFO } from "@/lib/constants";

const KOREA = { lat: 35.8, lng: 127.1 };

/* 원본 '국가별 선교사 파송 현황'의 실제 나라들 (대한민국은 출발점). 좌표는 각 나라 중심부 */
const DESTINATIONS = [
  // 아시아
  { name: "동티모르", lat: -8.9, lng: 125.7 },
  { name: "말레이시아", lat: 4.2, lng: 102.0 },
  { name: "미얀마", lat: 21.9, lng: 95.9 },
  { name: "베트남", lat: 14.1, lng: 108.3 },
  { name: "우즈베키스탄", lat: 41.4, lng: 64.6 },
  { name: "인도", lat: 20.6, lng: 79.0 },
  { name: "인도네시아", lat: -2.5, lng: 118.0 },
  { name: "일본", lat: 36.2, lng: 138.3 },
  { name: "중국", lat: 35.9, lng: 104.2 },
  { name: "카자흐스탄", lat: 48.0, lng: 66.9 },
  { name: "캄보디아", lat: 12.6, lng: 105.0 },
  { name: "키르기스스탄", lat: 41.2, lng: 74.8 },
  { name: "타지키스탄", lat: 38.9, lng: 71.3 },
  { name: "태국", lat: 15.9, lng: 101.0 },
  { name: "필리핀", lat: 12.9, lng: 121.8 },
  // 유럽
  { name: "그리스", lat: 39.1, lng: 21.8 },
  { name: "네덜란드", lat: 52.1, lng: 5.3 },
  { name: "독일", lat: 51.2, lng: 10.4 },
  { name: "러시아", lat: 55.8, lng: 37.6 },
  { name: "벨기에", lat: 50.5, lng: 4.5 },
  { name: "스위스", lat: 46.8, lng: 8.2 },
  { name: "스페인", lat: 40.5, lng: -3.7 },
  { name: "영국", lat: 52.4, lng: -1.5 },
  { name: "오스트리아", lat: 47.5, lng: 14.6 },
  { name: "이탈리아", lat: 41.9, lng: 12.6 },
  { name: "포르투갈", lat: 39.4, lng: -8.2 },
  { name: "프랑스", lat: 46.6, lng: 2.2 },
  // 오세아니아
  { name: "나우루", lat: -0.5, lng: 166.9 },
  { name: "뉴질랜드", lat: -40.9, lng: 174.9 },
  { name: "마셜제도", lat: 7.1, lng: 171.2 },
  { name: "사모아", lat: -13.8, lng: -172.1 },
  { name: "솔로몬제도", lat: -9.6, lng: 160.2 },
  { name: "통가", lat: -21.2, lng: -175.2 },
  { name: "투발루", lat: -7.1, lng: 177.6 },
  { name: "파푸아뉴기니", lat: -6.3, lng: 143.9 },
  { name: "팔라우", lat: 7.5, lng: 134.6 },
  { name: "피지", lat: -17.7, lng: 178.1 },
  { name: "호주", lat: -25.3, lng: 133.8 },
  // 아프리카
  { name: "가나", lat: 7.9, lng: -1.0 },
  { name: "가봉", lat: -0.8, lng: 11.6 },
  { name: "나미비아", lat: -22.9, lng: 18.5 },
  { name: "나이지리아", lat: 9.1, lng: 8.7 },
  { name: "남아프리카공화국", lat: -30.6, lng: 22.9 },
  { name: "말라위", lat: -13.3, lng: 34.3 },
  { name: "이집트", lat: 26.8, lng: 30.8 },
  { name: "케냐", lat: -0.02, lng: 37.9 },
  { name: "콩고공화국", lat: -0.2, lng: 15.8 },
  { name: "토고", lat: 8.6, lng: 0.8 },
  // 아메리카
  { name: "멕시코", lat: 23.6, lng: -102.5 },
  { name: "브라질", lat: -14.2, lng: -51.9 },
  { name: "아르헨티나", lat: -34.6, lng: -63.6 },
  { name: "온두라스", lat: 15.2, lng: -86.2 },
  { name: "칠레", lat: -35.7, lng: -71.5 },
  { name: "페루", lat: -9.2, lng: -75.0 },
  { name: "미국", lat: 39.8, lng: -98.6 },
  { name: "캐나다", lat: 56.1, lng: -106.3 },
  // 중동
  { name: "요르단", lat: 30.6, lng: 36.2 },
  { name: "이라크", lat: 33.2, lng: 43.7 },
  { name: "이스라엘", lat: 31.0, lng: 34.9 },
  { name: "튀르키예", lat: 39.0, lng: 35.2 },
  { name: "팔레스타인", lat: 31.9, lng: 35.2 },
];


type XY = { x: number; y: number };

/* 출발점에서 목적지로 위로 살짝 휘는 곡선. lift는 지도 폭 기준 비율 */
function arcPath(from: XY, to: XY, lift: number) {
  const midX = (from.x + to.x) / 2;
  const midY = Math.min(from.y, to.y) - Math.abs(to.x - from.x) * 0.16 - lift;
  return `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;
}

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      // rAF 첫 타임스탬프는 start보다 이전일 수 있다 — 음수로 떨어지면 숫자가 -로 깜빡인다
      const progress = Math.min(Math.max((now - start) / duration, 0), 1);
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

export function MissionHero() {
  /* 점 지도와 같은 투영·좌표계를 쓰기 위해 getPin()으로 좌표를 받는다 */
  const { mapSvg, W, H, korea, arcs } = useMemo(() => {
    /* 기본 범위(경도 ±168°)는 피지·뉴질랜드·사모아가 잘려 나가서 ±180°로 넓힌다 */
    const map = new DottedMap({
      height: 100,
      grid: "diagonal",
      region: { lat: { min: -56, max: 71 }, lng: { min: -180, max: 180 } },
    });
    const svg = map.getSVG({
      radius: 0.22,
      color: "#3a4a68",
      shape: "circle",
      backgroundColor: "transparent",
    });
    const origin = map.getPin(KOREA) ?? { x: 0, y: 0 };
    const points = DESTINATIONS.flatMap((d) => {
      const pin = map.getPin({ lat: d.lat, lng: d.lng });
      return pin ? [{ ...d, point: { x: pin.x, y: pin.y } }] : [];
    });
    return { mapSvg: svg, W: map.image.width, H: map.image.height, korea: origin, arcs: points };
  }, []);

  /* 지도 좌표계 기준 단위 — 선 굵기·점 크기를 폭에 비례시킨다 */
  const u = W / 800;
  /* 날짜변경선 너머(사모아·통가)는 화면 반대편이라 선 대신 점만 찍는다 */
  const drawArc = (lng: number) => lng > -150;

  const stats = [
    { label: "선교 파송국", value: CHURCH_INFO.missionStats.countries, suffix: "여 개국" },
    { label: "해외 선교사", value: CHURCH_INFO.missionStats.missionaries, suffix: "여 명" },
  ];

  return (
    <section className="relative overflow-hidden bg-navy">

      <div className="relative mx-auto max-w-[1100px] px-5 pb-16 pt-16 sm:pb-24 sm:pt-24">
        {/* Heading */}
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[14px] font-semibold text-accent-light sm:text-[15px]"
          >
            300명 선교사 · 해외선교
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-[36px] font-bold leading-[1.25] tracking-tight text-white sm:text-[52px]"
          >
            대한민국에서 <span className="text-accent-light">땅끝까지</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 max-w-[520px] text-[15px] leading-relaxed text-slate-400 sm:text-[17px]"
          >
            {CHURCH_INFO.name}는 전 세계 {CHURCH_INFO.missionStats.countries}여 개국에{" "}
            {CHURCH_INFO.missionStats.missionaries}여 명의 선교사를 파송하여 복음을 전하고 있습니다
          </motion.p>
        </div>

        {/* World map with arcs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mx-auto mt-10 w-full max-w-[900px] sm:mt-14"
          style={{ aspectRatio: `${W} / ${H}` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(mapSvg)}`}
            alt="세계 선교 지도"
            className="h-full w-full select-none opacity-90 [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]"
            draggable={false}
          />

          <svg viewBox={`0 0 ${W} ${H}`} className="pointer-events-none absolute inset-0 h-full w-full">
            <defs>
              <linearGradient id="mission-arc" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="25%" stopColor="#38bdf8" stopOpacity="1" />
                <stop offset="75%" stopColor="#38bdf8" stopOpacity="1" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Arcs from Korea */}
            {arcs.filter((a) => drawArc(a.lng)).map((arc, i) => (
              <motion.path
                key={arc.name}
                d={arcPath(korea, arc.point, 24 * u)}
                fill="none"
                stroke="url(#mission-arc)"
                strokeWidth={0.9 * u}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 1], opacity: [0, 0.9, 0.3] }}
                transition={{
                  duration: 2.6,
                  delay: 0.6 + i * 0.06,
                  times: [0, 0.55, 1],
                  repeat: Infinity,
                  repeatDelay: arcs.length * 0.06 * 0.5,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Destination pulse dots */}
            {arcs.map((arc, i) => (
              <g key={`dot-${arc.name}`}>
                <circle cx={arc.point.x} cy={arc.point.y} r={1.8 * u} fill="#7dd3fc" />
                <motion.circle
                  cx={arc.point.x}
                  cy={arc.point.y}
                  r={1.8 * u}
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth={0.8 * u}
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ scale: [1, 3.2], opacity: [0.9, 0] }}
                  transition={{
                    duration: 1.6,
                    delay: 1.4 + i * 0.06,
                    repeat: Infinity,
                    repeatDelay: 1.2,
                    ease: "easeOut",
                  }}
                  style={{ transformOrigin: `${arc.point.x}px ${arc.point.y}px` }}
                />
              </g>
            ))}

            {/* Korea origin marker */}
            <circle cx={korea.x} cy={korea.y} r={3.4 * u} fill="#3b82f6" />
            <circle cx={korea.x} cy={korea.y} r={3.4 * u} fill="none" stroke="#60a5fa" strokeWidth={1 * u} />
            {[0, 1].map((ring) => (
              <motion.circle
                key={ring}
                cx={korea.x}
                cy={korea.y}
                r={3.4 * u}
                fill="none"
                stroke="#60a5fa"
                strokeWidth={0.9 * u}
                initial={{ scale: 1, opacity: 0.9 }}
                animate={{ scale: [1, 4.5], opacity: [0.9, 0] }}
                transition={{
                  duration: 2.4,
                  delay: ring * 1.2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                style={{ transformOrigin: `${korea.x}px ${korea.y}px` }}
              />
            ))}
          </svg>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-12 grid max-w-[560px] grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-white/10 bg-white/10 sm:mt-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white/[0.04] px-6 py-7 text-center">
              <p className="text-[28px] font-bold tracking-tight text-white sm:text-[32px]">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-[14px] font-medium text-slate-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Fade to light section below */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}
