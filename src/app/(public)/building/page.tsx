import { generatePageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";

export const metadata = generatePageMetadata({
  title: "해외 성전건축",
  description: "성은세계선교교회 해외 성전건축 지원 현황",
  path: "/building",
});

/* 원본 사이트의 국가별 지원 현황 — 총 5개국 6개 성전 */
const SUPPORTED = [
  { country: "베트남", count: 2 },
  { country: "필리핀", count: 1 },
  { country: "미얀마", count: 1 },
  { country: "페루", count: 1 },
  { country: "이스라엘", count: 1 },
];

export default function BuildingPage() {
  return (
    <div>
      <PageHero
        title="해외 성전건축"
        description={
          <>
            네가 이제 이 전을 건축하니 네가 만일 내 법도를 따르며 내 율례를 행하며
            나의 모든 계명을 지켜 그대로 행하면 내가 네 아비 다윗에게 한 말을 네게 확실히 이룰 것이요
            <span className="ml-2 text-[14px] text-gray-400">열왕기상 6:12</span>
          </>
        }
      />

      <div className="mx-auto max-w-[800px] px-5 py-12 sm:py-16">
        <h2 className="text-[22px] font-bold leading-snug text-gray-900 sm:text-[26px]">
          땅 끝까지 하나님의 복음이 전파되도록
        </h2>
        <p className="mt-4 text-[15px] leading-[1.9] text-gray-600">
          우리 교회는 현재까지 총 5개국의 나라에 6개의 성전이 건축될 수 있도록
          건축비를 지원하였습니다.
        </p>

        {/* 해외 성전건축 지원 — 원본의 다섯 나라 */}
        <h3 className="mt-12 text-[20px] font-bold text-gray-900">해외 성전건축 지원</h3>
        <p className="mt-3 text-[16px] font-semibold text-gray-800 sm:text-[17px]">
          {SUPPORTED.map((s) => s.country).join("  ·  ")}
        </p>

        {/* 국가별 지원 현황 */}
        <h3 className="mt-12 text-[20px] font-bold text-gray-900">국가별 지원 현황</h3>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {SUPPORTED.map((item) => (
            <div key={item.country} className="card-soft px-5 py-6 text-center">
              <p className="text-[26px] font-bold text-secondary">{item.count}</p>
              <p className="mt-1 text-[14px] font-medium text-gray-700">{item.country}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
