import { generatePageMetadata } from "@/lib/seo";
import { CHURCH_INFO } from "@/lib/constants";

export const metadata = generatePageMetadata({
  title: "온라인헌금",
  description: "성은세계선교교회 온라인 헌금 안내",
  path: "/offering",
});

export default function OfferingPage() {
  return (
    <div>
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1100px] px-5 py-12 sm:py-16">
          <p className="text-[13px] font-medium text-primary">Offering</p>
          <h1 className="mt-2 text-[36px] font-bold text-gray-900 sm:text-[44px]">온라인헌금</h1>
          <p className="mt-3 text-[16px] text-gray-500">
            감사와 사랑의 마음을 헌금으로 드립니다
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[640px] px-5 py-12 sm:py-16">
        <div className="space-y-4">
          <div className="card-soft p-6">
            <p className="text-[15px] font-bold text-gray-900">헌금 계좌</p>
            <p className="mt-2 text-[14px] text-gray-500">
              교회 사무실로 문의해 주시면 정확한 계좌 정보를 안내해 드립니다.
            </p>
            <p className="mt-3 text-[13px] text-gray-500">
              TEL {CHURCH_INFO.phone} / {CHURCH_INFO.phone2}
            </p>
          </div>

          <div className="card-soft p-6">
            <p className="text-[15px] font-bold text-gray-900">선교후원 계좌</p>
            <p className="mt-2 text-[14px] text-gray-500">
              해외선교 후원을 원하시는 분은 교회 사무실로 연락해 주세요.
            </p>
            <p className="mt-3 text-[13px] text-gray-500">
              {CHURCH_INFO.mobile}
            </p>
          </div>
        </div>

        <div className="mt-8 card-tinted p-6 text-center">
          <p className="text-[14px] text-gray-500">
            헌금 시 이름과 헌금 종류를 기재해 주시면 감사하겠습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
