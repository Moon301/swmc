export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { generatePageMetadata } from "@/lib/seo";
import { CHURCH_INFO } from "@/lib/constants";

export const metadata = generatePageMetadata({
  title: "성회안내",
  description: "성은세계선교교회 부흥성회 안내",
  path: "/revival-info",
});

export default async function RevivalInfoPage() {
  const supabase = await createClient();
  const { data: page } = await supabase
    .from("page_contents")
    .select("*")
    .eq("page_key", "revival_info")
    .single();

  return (
    <div>
      <div className="border-b border-gray-200/70">
        <div className="mx-auto max-w-[1100px] px-5 py-12 sm:py-16">
          <p className="text-[13px] font-medium text-primary">Revival</p>
          <h1 className="mt-2 text-[36px] font-bold text-gray-900 sm:text-[44px]">성회안내</h1>
          <p className="mt-3 text-[16px] text-gray-500">
            부흥성회를 통해 많은 영혼에게 복음을 전합니다
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[800px] px-5 py-12 sm:py-16">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "해외성회", value: `${CHURCH_INFO.missionStats.revivals}차` },
            { label: "성회 개최", value: `${CHURCH_INFO.missionStats.meetings.toLocaleString()}회` },
            { label: "사역국", value: `${CHURCH_INFO.missionStats.countries}개국` },
          ].map((stat) => (
            <div key={stat.label} className="card-soft px-4 py-5 text-center">
              <p className="text-[22px] font-bold text-gray-900">{stat.value}</p>
              <p className="mt-1 text-[12px] text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Dynamic content */}
        {page ? (
          <div className="mt-10">
            <h2 className="mb-4 text-[20px] font-bold text-gray-900">
              {page.title || "성회 안내"}
            </h2>
            <div
              className="prose prose-sm sm:prose max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            <div className="card-soft p-6">
              <p className="text-[15px] font-bold text-gray-900">성회 초청 안내</p>
              <p className="mt-2 text-[14px] text-gray-500">
                {CHURCH_INFO.pastor}님을 성회 강사로 초청하고자 하시는 교회는
                아래 연락처로 문의해 주시기 바랍니다.
              </p>
              <div className="mt-3 space-y-0.5 text-[13px] text-gray-500">
                <p>전화: {CHURCH_INFO.phone} / {CHURCH_INFO.phone2}</p>
                <p>핸드폰: {CHURCH_INFO.mobile}</p>
              </div>
            </div>

            <div className="card-soft p-6">
              <p className="text-[15px] font-bold text-gray-900">국내 성회 실적</p>
              <p className="mt-2 text-[14px] text-gray-500">
                주안장로교회, 의정부순복음교회, 목양교회, 대구중앙침례교회 등
                전국 각지 교회에서 746회 이상의 성회를 인도했습니다.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
