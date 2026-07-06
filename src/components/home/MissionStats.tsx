import Link from "next/link";
import { CHURCH_INFO } from "@/lib/constants";

export function MissionStats() {
  return (
    <section
      className="relative flex min-h-[420px] items-center bg-gray-900 bg-cover bg-center sm:min-h-[480px]"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1800&q=80&auto=format&fit=crop)",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,_rgba(197,151,62,0.18)_0%,_transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/85 via-gray-900/65 to-gray-900/40" />
      <div className="relative z-10 mx-auto max-w-[1100px] px-6 py-16">
        <p className="text-[13px] font-medium tracking-wide text-accent">World Mission</p>
        <h2 className="mt-3 text-[32px] font-bold leading-tight text-white sm:text-[44px]">
          300명 선교사 파송
        </h2>
        <p className="mt-5 text-[15px] leading-[1.85] text-white/70 sm:text-[17px]">
          놀라운 하나님의 역사, 성은세계선교의 시작
          <br className="hidden sm:block" />
          해외 {CHURCH_INFO.missionStats.countries}개국 열방을 향한 뜨거운 선교지원
        </p>
        <Link
          href="/offering"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-gray-900 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,255,255,0.15)]"
        >
          선교 후원하기
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
