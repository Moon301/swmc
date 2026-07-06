import { generatePageMetadata } from "@/lib/seo";
import { CHURCH_INFO } from "@/lib/constants";

export const metadata = generatePageMetadata({
  title: "건축지원",
  description: "성은세계선교교회 건축 후원 안내",
  path: "/building",
});

export default function BuildingPage() {
  return (
    <div>
      <div className="border-b border-gray-200/70">
        <div className="mx-auto max-w-[1100px] px-5 py-12 sm:py-16">
          <p className="text-[13px] font-medium text-primary">Building</p>
          <h1 className="mt-2 text-[36px] font-bold text-gray-900 sm:text-[44px]">건축지원</h1>
          <p className="mt-3 text-[16px] text-gray-500">
            하나님의 집을 세우는 사역에 동참해 주세요
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[640px] px-5 py-12 sm:py-16">
        <div className="card-soft p-6 sm:p-8">
          <p className="text-[15px] font-bold text-gray-900">건축헌금 안내</p>
          <p className="mt-3 text-[14px] leading-relaxed text-gray-500">
            {CHURCH_INFO.name}의 성전 건축을 위해 기도와 후원으로 동참해 주시기 바랍니다.
            자세한 내용은 교회 사무실로 문의해 주세요.
          </p>
          <div className="mt-4 space-y-1 text-[13px] text-gray-500">
            <p>전화: {CHURCH_INFO.phone} / {CHURCH_INFO.phone2}</p>
            <p>핸드폰: {CHURCH_INFO.mobile}</p>
          </div>
        </div>

        <div className="mt-6 card-tinted p-6 sm:p-8">
          <blockquote className="text-[15px] leading-relaxed text-gray-700 italic">
            &ldquo;각각 그 마음에 정한 대로 할 것이요
            인색함으로나 억지로 하지 말지니
            하나님은 즐겨 내는 자를 사랑하시느니라&rdquo;
          </blockquote>
          <cite className="mt-3 block text-[13px] text-gray-500 not-italic">
            고린도후서 9:7
          </cite>
        </div>
      </div>
    </div>
  );
}
