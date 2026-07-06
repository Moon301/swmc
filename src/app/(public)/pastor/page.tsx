export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { generatePageMetadata } from "@/lib/seo";
import { CHURCH_INFO } from "@/lib/constants";

export const metadata = generatePageMetadata({
  title: "목사님소개",
  description: "성은세계선교교회 담임 나현숙 목사님을 소개합니다.",
  path: "/pastor",
});

export default async function PastorPage() {
  const supabase = await createClient();
  const { data: page } = await supabase
    .from("page_contents")
    .select("*")
    .eq("page_key", "about_pastor")
    .single();

  return (
    <div>
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1100px] px-5 py-12 sm:py-16">
          <p className="text-[13px] font-medium text-primary">Pastor</p>
          <h1 className="mt-2 text-[36px] font-bold text-gray-900 sm:text-[44px]">목사님소개</h1>
          <p className="mt-3 text-[16px] text-gray-500">
            {CHURCH_INFO.name} 담임목사
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[800px] px-5 py-12 sm:py-16">
        {/* Profile card */}
        <div className="card-soft p-6 sm:p-8">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[20px] font-bold text-gray-500">
              나
            </div>
            <div>
              <p className="text-[20px] font-bold text-gray-900">나현숙 목사</p>
              <p className="mt-0.5 text-[14px] text-gray-500">담임목사 · 선교회장</p>
            </div>
          </div>

          <div className="mt-6 space-y-4 border-t border-gray-100 pt-6">
            {[
              {
                title: "정통 보수주의 신학 훈련",
                desc: "대한예수교장로회(합동중앙) 소속의 건전한 신앙을 가진 목사",
              },
              {
                title: "기도와 말씀에 헌신",
                desc: "하루 6~8시간을 기도와 설교 준비에 헌신하며 무보수로 사역",
              },
              {
                title: "세계선교 사역",
                desc: `해외 ${CHURCH_INFO.missionStats.countries}개국에 선교사 파송, ${CHURCH_INFO.missionStats.meetings.toLocaleString()}회 성회 인도`,
              },
            ].map((item) => (
              <div key={item.title}>
                <p className="text-[14px] font-semibold text-gray-800">{item.title}</p>
                <p className="mt-0.5 text-[14px] text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic content */}
        {page && (
          <div className="mt-12">
            <h2 className="mb-4 text-[20px] font-bold text-gray-900">
              {page.title || "목사님 소개"}
            </h2>
            <div
              className="prose prose-sm sm:prose max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
