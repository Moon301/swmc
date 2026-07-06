export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { generatePageMetadata } from "@/lib/seo";
import { CHURCH_INFO } from "@/lib/constants";
import { MissionHero } from "@/components/mission/MissionHero";
import Link from "next/link";
import { Globe2, Flame, HeartHandshake } from "lucide-react";

export const metadata = generatePageMetadata({
  title: "300명 선교사",
  description: "성은세계선교교회 해외 선교사 파송 현황",
  path: "/missionaries",
});

const VISION_CARDS = [
  {
    icon: Globe2,
    title: "열방을 향한 파송",
    body: `주님의 지상명령에 순종하여 해외 ${CHURCH_INFO.missionStats.countries}개국에 ${CHURCH_INFO.missionStats.missionaries}여 명의 선교사를 파송하고 있습니다.`,
  },
  {
    icon: Flame,
    title: "부흥의 현장",
    body: `${CHURCH_INFO.missionStats.revivals}차에 걸쳐 ${CHURCH_INFO.missionStats.meetings.toLocaleString()}회의 해외성회를 개최하며 전 세계에 복음을 전파하고 있습니다.`,
  },
  {
    icon: HeartHandshake,
    title: "함께하는 동역",
    body: "온 성도가 기도와 물질로 선교사들과 동역하며, 세계선교의 비전을 함께 이루어가고 있습니다.",
  },
];

export default async function MissionariesPage() {
  const supabase = await createClient();
  const { data: page } = await supabase
    .from("page_contents")
    .select("*")
    .eq("page_key", "missionaries")
    .single();

  return (
    <div>
      <MissionHero />

      {/* Vision cards */}
      <section className="mx-auto max-w-[1100px] px-5 py-16 sm:py-24">
        <h2 className="text-center text-[24px] font-bold tracking-tight text-gray-900 sm:text-[30px]">
          세계선교 비전
        </h2>
        <p className="mt-3 text-center text-[15px] text-gray-500">{CHURCH_INFO.slogan}</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {VISION_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="rounded-[24px] bg-gray-50 p-7 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-[0_1px_4px_rgba(2,32,71,0.06)]">
                  <Icon className="h-[22px] w-[22px] text-accent" />
                </span>
                <p className="mt-4 text-[17px] font-bold text-gray-900">{card.title}</p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-gray-500">{card.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Dynamic content */}
      {page && (
        <section className="mx-auto max-w-[800px] px-5 pb-16 sm:pb-24">
          <h2 className="mb-6 text-[22px] font-bold tracking-tight text-gray-900 sm:text-[26px]">
            {page.title || "선교사 소개"}
          </h2>
          <div
            className="prose prose-sm sm:prose max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-[1100px] px-5 pb-20 sm:pb-28">
        <div className="relative overflow-hidden rounded-[28px] bg-navy px-7 py-14 text-center sm:py-16">
          <div className="pointer-events-none absolute left-1/2 top-[-120px] h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-accent/25 blur-[100px]" />
          <p className="relative text-[24px] font-bold text-white sm:text-[30px]">
            선교 후원에 동참해 주세요
          </p>
          <p className="relative mt-3 text-[15px] text-slate-400">
            여러분의 기도와 후원이 세계선교의 큰 힘이 됩니다
          </p>
          <Link
            href="/offering"
            className="relative mt-7 inline-block rounded-full bg-gradient-to-r from-accent to-accent-light px-8 py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(197,151,62,0.35)] transition-transform hover:scale-[1.03]"
          >
            후원하기
          </Link>
        </div>
      </section>
    </div>
  );
}
