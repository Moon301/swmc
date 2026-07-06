export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "부서소개",
  description: "성은세계선교교회 각 부서를 소개합니다.",
  path: "/departments",
});

const defaultDepartments = [
  { name: "교육부", description: "주일학교 및 성경공부를 통한 신앙교육" },
  { name: "찬양대", description: "예배를 섬기는 찬양과 찬송의 사역" },
  { name: "유아부/유치부", description: "어린 자녀들의 신앙 양육" },
  { name: "청년부", description: "청년들의 신앙 성장과 교제" },
  { name: "권사회/집사회", description: "교회 봉사와 기도 사역" },
  { name: "방송부", description: "예배 방송 및 유튜브 중계 사역" },
];

export default async function DepartmentsPage() {
  const supabase = await createClient();
  const { data: page } = await supabase
    .from("page_contents")
    .select("*")
    .eq("page_key", "departments")
    .single();

  return (
    <div>
      <div className="border-b border-gray-200/70">
        <div className="mx-auto max-w-[1100px] px-5 py-12 sm:py-16">
          <p className="text-[13px] font-medium text-primary">Departments</p>
          <h1 className="mt-2 text-[36px] font-bold text-gray-900 sm:text-[44px]">부서소개</h1>
          <p className="mt-3 text-[16px] text-gray-500">
            각 부서가 하나 되어 하나님 나라를 섬깁니다
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[800px] px-5 py-12 sm:py-16">
        {page ? (
          <div
            className="prose prose-sm sm:prose max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {defaultDepartments.map((dept) => (
              <div
                key={dept.name}
                className="card-soft card-soft-hover px-6 py-5"
              >
                <p className="text-[15px] font-bold text-gray-900">{dept.name}</p>
                <p className="mt-1.5 text-[14px] text-gray-500">{dept.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
