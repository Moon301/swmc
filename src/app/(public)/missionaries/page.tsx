export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { generatePageMetadata } from "@/lib/seo";
import { CHURCH_INFO } from "@/lib/constants";
import Link from "next/link";

export const metadata = generatePageMetadata({
  title: "300명 선교사",
  description: "성은세계선교교회 해외 선교사 파송 현황",
  path: "/missionaries",
});

export default async function MissionariesPage() {
  const supabase = await createClient();
  const { data: page } = await supabase
    .from("page_contents")
    .select("*")
    .eq("page_key", "missionaries")
    .single();

  return (
    <div>
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1100px] px-5 py-12 sm:py-16">
          <p className="text-[13px] font-medium text-primary">Mission</p>
          <h1 className="mt-2 text-[36px] font-bold text-gray-900 sm:text-[44px]">300명 선교사</h1>
          <p className="mt-3 text-[16px] text-gray-500">
            세계 곳곳에서 복음을 전하는 선교사들
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[800px] px-5 py-12 sm:py-16">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "선교 파송국", value: `${CHURCH_INFO.missionStats.countries}개국` },
            { label: "해외 선교사", value: `${CHURCH_INFO.missionStats.missionaries}여 명` },
            { label: "해외성회", value: `${CHURCH_INFO.missionStats.revivals}차` },
            { label: "성회 개최", value: `${CHURCH_INFO.missionStats.meetings.toLocaleString()}회` },
          ].map((stat) => (
            <div key={stat.label} className="card-soft px-4 py-5 text-center">
              <p className="text-[22px] font-bold text-gray-900">{stat.value}</p>
              <p className="mt-1 text-[12px] text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="mt-8 card-soft p-6 sm:p-8">
          <p className="text-[15px] font-bold text-gray-900">세계선교 비전</p>
          <div className="mt-4 space-y-3 text-[14px] leading-relaxed text-gray-500">
            <p>
              {CHURCH_INFO.name}는 주님의 지상명령에 순종하여 해외{" "}
              {CHURCH_INFO.missionStats.countries}개국에{" "}
              {CHURCH_INFO.missionStats.missionaries}여 명의 선교사를 파송하고 있습니다.
            </p>
            <p>
              {CHURCH_INFO.missionStats.revivals}차에 걸쳐{" "}
              {CHURCH_INFO.missionStats.meetings.toLocaleString()}회의 해외성회를 개최하며
              전 세계에 복음을 전파하고 있습니다.
            </p>
          </div>
        </div>

        {/* Dynamic content */}
        {page && (
          <div className="mt-10">
            <h2 className="mb-4 text-[20px] font-bold text-gray-900">
              {page.title || "선교사 소개"}
            </h2>
            <div
              className="prose prose-sm sm:prose max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 card-tinted p-6 text-center sm:p-8">
          <p className="text-[15px] font-bold text-gray-900">선교 후원에 동참해 주세요</p>
          <p className="mt-2 text-[14px] text-gray-500">
            여러분의 기도와 후원이 세계선교의 큰 힘이 됩니다
          </p>
          <Link
            href="/offering"
            className="mt-5 inline-block rounded-full bg-primary px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-primary-hover"
          >
            후원하기
          </Link>
        </div>
      </div>
    </div>
  );
}
