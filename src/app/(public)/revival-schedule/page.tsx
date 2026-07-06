export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { generatePageMetadata } from "@/lib/seo";
import { CHURCH_INFO } from "@/lib/constants";

export const metadata = generatePageMetadata({
  title: "해외성회일정",
  description: "성은세계선교교회 해외성회 일정 안내",
  path: "/revival-schedule",
});

export default async function RevivalSchedulePage() {
  const supabase = await createClient();
  const { data: page } = await supabase
    .from("page_contents")
    .select("*")
    .eq("page_key", "revival_schedule")
    .single();

  return (
    <div>
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1100px] px-5 py-12 sm:py-16">
          <p className="text-[13px] font-medium text-primary">Schedule</p>
          <h1 className="mt-2 text-[36px] font-bold text-gray-900 sm:text-[44px]">해외성회일정</h1>
          <p className="mt-3 text-[16px] text-gray-500">
            전 세계에서 진행되는 부흥성회 일정
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[800px] px-5 py-12 sm:py-16">
        {/* Summary */}
        <div className="card-tinted p-6 text-center sm:p-8">
          <p className="text-[18px] font-bold text-gray-900">
            해외 {CHURCH_INFO.missionStats.countries}개국 성회 사역
          </p>
          <p className="mt-2 text-[14px] text-gray-500">
            {CHURCH_INFO.missionStats.revivals}차 {CHURCH_INFO.missionStats.meetings.toLocaleString()}회 성회를 진행해 왔습니다
          </p>
        </div>

        {/* Dynamic content */}
        {page ? (
          <div className="mt-10">
            <h2 className="mb-4 text-[20px] font-bold text-gray-900">
              {page.title || "성회 일정"}
            </h2>
            <div
              className="prose prose-sm sm:prose max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
        ) : (
          <div className="mt-8 card-soft p-6 text-center sm:p-8">
            <p className="text-[15px] font-bold text-gray-900">성회 일정 안내</p>
            <p className="mt-2 text-[14px] text-gray-500">
              해외성회 일정은 관리자 페이지에서 업데이트됩니다.
            </p>
            <p className="mt-1 text-[13px] text-gray-400">
              자세한 일정은 교회 사무실({CHURCH_INFO.phone})로 문의해 주세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
