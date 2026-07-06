"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import DottedMap from "dotted-map";
import { motion, useInView } from "framer-motion";
import { CHURCH_INFO } from "@/lib/constants";

const KOREA = { lat: 35.8, lng: 127.1 };

const DESTINATIONS = [
  // 동아시아·동남아
  { name: "일본", lat: 36.2, lng: 138.3 },
  { name: "몽골", lat: 46.9, lng: 103.8 },
  { name: "필리핀", lat: 12.9, lng: 121.8 },
  { name: "베트남", lat: 14.1, lng: 108.3 },
  { name: "태국", lat: 15.9, lng: 101.0 },
  { name: "캄보디아", lat: 12.6, lng: 105.0 },
  { name: "미얀마", lat: 21.9, lng: 95.9 },
  { name: "말레이시아", lat: 4.2, lng: 102.0 },
  { name: "인도네시아", lat: -2.5, lng: 118.0 },
  // 남아시아·중앙아시아
  { name: "인도", lat: 20.6, lng: 79.0 },
  { name: "네팔", lat: 28.4, lng: 84.1 },
  { name: "카자흐스탄", lat: 48.0, lng: 66.9 },
  // 유럽·중동
  { name: "러시아", lat: 55.8, lng: 37.6 },
  { name: "독일", lat: 51.2, lng: 10.4 },
  { name: "프랑스", lat: 46.6, lng: 2.2 },
  { name: "영국", lat: 52.4, lng: -1.5 },
  { name: "스페인", lat: 40.5, lng: -3.7 },
  { name: "튀르키예", lat: 39.0, lng: 35.2 },
  // 아프리카
  { name: "이집트", lat: 26.8, lng: 30.8 },
  { name: "에티오피아", lat: 9.1, lng: 40.5 },
  { name: "케냐", lat: -0.02, lng: 37.9 },
  { name: "나이지리아", lat: 9.1, lng: 8.7 },
  { name: "탄자니아", lat: -6.4, lng: 34.9 },
  { name: "남아공", lat: -30.6, lng: 22.9 },
  // 아메리카
  { name: "미국", lat: 39.8, lng: -98.6 },
  { name: "캐나다", lat: 53.0, lng: -106.3 },
  { name: "멕시코", lat: 23.6, lng: -102.5 },
  { name: "브라질", lat: -14.2, lng: -51.9 },
  { name: "페루", lat: -9.2, lng: -75.0 },
  { name: "아르헨티나", lat: -34.6, lng: -63.6 },
  // 오세아니아
  { name: "호주", lat: -25.3, lng: 133.8 },
  { name: "파푸아뉴기니", lat: -6.3, lng: 143.9 },
];

function project(lat: number, lng: number) {
  return {
    x: ((lng + 180) / 360) * 800,
    y: ((90 - lat) / 180) * 400,
  };
}

function arcPath(from: { x: number; y: number }, to: { x: number; y: number }) {
  const midX = (from.x + to.x) / 2;
  const midY = Math.min(from.y, to.y) - Math.abs(to.x - from.x) * 0.16 - 24;
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
      const progress = Math.min((now - start) / duration, 1);
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
  const mapSvg = useMemo(() => {
    const map = new DottedMap({ height: 100, grid: "diagonal" });
    return map.getSVG({
      radius: 0.22,
      color: "#3a4a68",
      shape: "circle",
      backgroundColor: "transparent",
    });
  }, []);

  const korea = project(KOREA.lat, KOREA.lng);
  const arcs = DESTINATIONS.map((d) => ({
    ...d,
    point: project(d.lat, d.lng),
  }));

  const stats = [
    { label: "선교 파송국", value: CHURCH_INFO.missionStats.countries, suffix: "개국" },
    { label: "해외 선교사", value: CHURCH_INFO.missionStats.missionaries, suffix: "여 명" },
    { label: "해외성회", value: CHURCH_INFO.missionStats.revivals, suffix: "차" },
    { label: "성회 개최", value: CHURCH_INFO.missionStats.meetings, suffix: "회" },
  ];

  return (
    <section className="relative overflow-hidden bg-navy">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-[-200px] h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-blue-600/25 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-[-100px] right-[-100px] h-[400px] w-[400px] rounded-full bg-sky-400/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1100px] px-5 pb-16 pt-16 sm:pb-24 sm:pt-24">
        {/* Heading */}
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[13px] font-semibold text-sky-300 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400" />
            World Mission
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-[36px] font-bold leading-[1.25] tracking-tight text-white sm:text-[52px]"
          >
            대한민국에서 <span className="bg-gradient-to-r from-sky-300 via-blue-400 to-sky-300 bg-clip-text text-transparent">땅끝까지</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 max-w-[520px] text-[15px] leading-relaxed text-slate-400 sm:text-[17px]"
          >
            {CHURCH_INFO.name}는 전 세계 {CHURCH_INFO.missionStats.countries}개국에{" "}
            {CHURCH_INFO.missionStats.missionaries}여 명의 선교사를 파송하여 복음을 전하고 있습니다
          </motion.p>
        </div>

        {/* World map with arcs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mx-auto mt-10 aspect-[2/1] w-full max-w-[900px] sm:mt-14"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(mapSvg)}`}
            alt="세계 선교 지도"
            className="h-full w-full select-none opacity-90 [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]"
            draggable={false}
          />

          <svg viewBox="0 0 800 400" className="pointer-events-none absolute inset-0 h-full w-full">
            <defs>
              <linearGradient id="mission-arc" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="25%" stopColor="#38bdf8" stopOpacity="1" />
                <stop offset="75%" stopColor="#38bdf8" stopOpacity="1" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Arcs from Korea */}
            {arcs.map((arc, i) => (
              <motion.path
                key={arc.name}
                d={arcPath(korea, arc.point)}
                fill="none"
                stroke="url(#mission-arc)"
                strokeWidth="1.1"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0.35] }}
                transition={{
                  duration: 2.6,
                  delay: 0.6 + i * 0.1,
                  times: [0, 0.55, 1],
                  repeat: Infinity,
                  repeatDelay: DESTINATIONS.length * 0.1 * 0.5,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Destination pulse dots */}
            {arcs.map((arc, i) => (
              <g key={`dot-${arc.name}`}>
                <circle cx={arc.point.x} cy={arc.point.y} r="2" fill="#7dd3fc" />
                <motion.circle
                  cx={arc.point.x}
                  cy={arc.point.y}
                  r="2"
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="0.8"
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ scale: [1, 3.2], opacity: [0.9, 0] }}
                  transition={{
                    duration: 1.6,
                    delay: 1.4 + i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 1.2,
                    ease: "easeOut",
                  }}
                  style={{ transformOrigin: `${arc.point.x}px ${arc.point.y}px` }}
                />
              </g>
            ))}

            {/* Korea origin marker */}
            <circle cx={korea.x} cy={korea.y} r="3.4" fill="#3b82f6" />
            <circle cx={korea.x} cy={korea.y} r="3.4" fill="none" stroke="#60a5fa" strokeWidth="1" />
            {[0, 1].map((ring) => (
              <motion.circle
                key={ring}
                cx={korea.x}
                cy={korea.y}
                r="3.4"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="0.9"
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
          className="mx-auto mt-12 grid max-w-[860px] grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-white/10 bg-white/10 sm:mt-16 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white/[0.04] px-6 py-7 text-center backdrop-blur">
              <p className="text-[28px] font-bold tracking-tight text-white sm:text-[32px]">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-[13px] font-medium text-slate-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Fade to light section below */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white" />
    </section>
  );
}
