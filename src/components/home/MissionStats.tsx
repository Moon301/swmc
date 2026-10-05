"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { CHURCH_INFO } from "@/lib/constants";

const { countries, missionaries } = CHURCH_INFO.missionStats;

const STATS = [
  { value: missionaries, suffix: "명", label: "파송 선교사" },
  { value: countries, suffix: "여 개국", label: "선교 국가" },
];

/* 화면에 들어오면 0부터 차오르는 숫자 (MissionHero와 같은 패턴) */
function CountUp({ target }: { target: number }) {
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

  return <span ref={ref}>{value.toLocaleString()}</span>;
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export function MissionStats() {
  return (
    <section className="relative overflow-hidden bg-navy">
      {/* 배경 사진 — 우주에서 본 지구와 빛의 네트워크, 세계로 뻗어나가는 선교 */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800&q=80&auto=format&fit=crop)",
        }}
      />
      {/* 교회 전경 — 우측에 겹쳐 떠오르는 오버레이. 밝기만 남겨 네이비 톤에 녹인다 */}
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-[58%] opacity-35 [mask-image:linear-gradient(to_left,black_35%,transparent_96%)]"
      >
        <Image
          src="/images/church-building.jpg"
          alt=""
          fill
          sizes="60vw"
          className="object-cover object-[50%_28%] mix-blend-luminosity"
        />
      </div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/70 to-navy/30" />

      <div className="relative z-10 mx-auto max-w-[1100px] px-5 py-20 sm:py-28">
        <motion.div {...fadeUp} transition={{ duration: 0.6, ease: "easeOut" }}>
          <h2 className="text-[32px] font-bold leading-[1.25] text-white sm:text-[44px]">
            {missionaries}명 선교사 파송,
            <br />
            {countries}여 개국 열방으로
          </h2>
          <p className="mt-6 max-w-[520px] text-[15px] leading-[1.85] text-slate-400 sm:text-[17px]">
            1993년 6개국 12명의 선교사 파송으로 시작된 놀라운 하나님의 역사.
            해외 {countries}여 개국 열방을 향한 뜨거운 선교지원이 지금도 이어지고 있습니다.
          </p>
        </motion.div>

        {/* 지표 — 1px 간격으로 나눈 격자. 숫자는 차오르는 애니메이션 */}
        <motion.dl
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="mt-12 grid max-w-[520px] grid-cols-2 gap-px overflow-hidden rounded-[20px] bg-white/10"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-navy px-5 py-6 sm:px-6 sm:py-7">
              <dd className="text-[26px] font-bold tracking-tight text-white sm:text-[32px]">
                <CountUp target={stat.value} />
                <span className="ml-0.5 text-[15px] font-semibold text-slate-400 sm:text-[17px]">
                  {stat.suffix}
                </span>
              </dd>
              <dt className="mt-1.5 text-[13px] text-slate-400 sm:text-[14px]">{stat.label}</dt>
            </div>
          ))}
        </motion.dl>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <Link
            href="/offering"
            className="inline-block rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-gray-900 transition-colors hover:bg-gray-100"
          >
            선교헌금
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
