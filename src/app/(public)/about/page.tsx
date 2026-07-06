export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { generatePageMetadata } from "@/lib/seo";
import { CHURCH_INFO } from "@/lib/constants";

export const metadata = generatePageMetadata({
  title: "교회소개",
  description: "성은세계선교교회를 소개합니다.",
  path: "/about",
});

export default async function AboutPage() {
  const supabase = await createClient();
  const { data: pages } = await supabase
    .from("page_contents")
    .select("*")
    .in("page_key", ["about_greeting", "about_history", "about_vision"])
    .order("page_key");

  return (
    <div>
      {/* Page header */}
      <div className="border-b border-gray-200/70">
        <div className="mx-auto max-w-[1100px] px-5 py-12 sm:py-16">
          <p className="text-[13px] font-medium text-primary">About</p>
          <h1 className="mt-2 text-[36px] font-bold text-gray-900 sm:text-[44px]">교회소개</h1>
          <p className="mt-3 text-[16px] text-gray-500">
            {CHURCH_INFO.slogan}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[800px] px-5 py-12 sm:py-16">
        {/* Church overview */}
        <div className="card-soft p-6 sm:p-8">
          <p className="text-[15px] font-bold text-gray-900">{CHURCH_INFO.name}</p>
          <p className="mt-1 text-[13px] text-gray-500">{CHURCH_INFO.denomination}</p>
          <p className="mt-0.5 text-[13px] text-gray-500">담임: {CHURCH_INFO.pastor}</p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "선교 파송국", value: `${CHURCH_INFO.missionStats.countries}개국` },
              { label: "해외 선교사", value: `${CHURCH_INFO.missionStats.missionaries}여 명` },
              { label: "해외성회", value: `${CHURCH_INFO.missionStats.revivals}차` },
              { label: "성회 개최", value: `${CHURCH_INFO.missionStats.meetings.toLocaleString()}회` },
            ].map((stat) => (
              <div key={stat.label} className="card-tinted px-4 py-4">
                <p className="text-[20px] font-bold text-gray-900">{stat.value}</p>
                <p className="mt-0.5 text-[13px] text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic content */}
        <div className="mt-12 space-y-12">
          {[
            { key: "about_greeting", fallbackTitle: "인사말" },
            { key: "about_history", fallbackTitle: "교회역사" },
            { key: "about_vision", fallbackTitle: "비전" },
          ].map((section) => {
            const page = pages?.find((p) => p.page_key === section.key);
            if (!page) return null;
            return (
              <section key={section.key}>
                <h2 className="mb-4 text-[20px] font-bold text-gray-900">
                  {page.title || section.fallbackTitle}
                </h2>
                <div
                  className="prose prose-sm sm:prose max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary"
                  dangerouslySetInnerHTML={{ __html: page.content }}
                />
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
