import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "온라인헌금",
  description: "성은세계선교교회 온라인 헌금 안내",
  path: "/offering",
});

const DOMESTIC_ACCOUNTS = [
  {
    type: "선교헌금 계좌",
    accounts: [
      "농협은행 355-0034-9990-13 (예금주: 성은세계선교교회)",
      "KEB 하나은행 162-890030-81204 (예금주: 성은세계선교교회)",
    ],
  },
  {
    type: "일반헌금 계좌",
    accounts: ["농협은행 355-0034-9992-93 (예금주: 성은세계선교교회)"],
  },
];

const FOREIGN_ACCOUNT = [
  {
    label: "수취인 성함(Beneficiary's Name)",
    value: "SUNG UN SEA KYE MISSION CHURCH (대한예수교성은세계선교교회)",
  },
  {
    label: "수취인 주소(Beneficiary's Address)",
    value: "232-12, Hyoja2-ga, Wansan-gu, Jeonju-si, Jeollabuk-do, Seoul 560-868 Rep of Korea.",
  },
  { label: "수취인 전화번호(Beneficiary's Tel. no)", value: "82-063-224-8179" },
  { label: "수취인 팩스번호(Beneficiary's Fax. no)", value: "82-063-225-8174" },
  { label: "은행 이름(Beneficiary's Bank Name)", value: "Kebhana bank", highlight: true },
  { label: "은행 주소(Beneficiary's Bank Address)", value: "Jeonju Branch of Kebhana bank" },
  { label: "은행 전화번호(Beneficiary's Bank Phone)", value: "82-063-288-8111" },
  { label: "계좌번호(Beneficiary's A/C No)", value: "650-007393-192", highlight: true },
  { label: "은행 코드번호(SWIFT Code)", value: "koexkrse" },
];

const OFFERING_TYPES = [
  {
    name: "주일/감사헌금",
    description:
      "주일에 드리는 헌금과 내 삶속에서 인도하시는 하나님의 은혜와 기쁨에 감사를 표현하는 헌금",
  },
  {
    name: "십일조헌금",
    description:
      "모든 것이 하나님이 공급하시는 것을 인정하며 주님이 주시는 축복의 약속과 성경 계명에 있는 소득의 십분의 일을 드리는 헌금",
  },
  {
    name: "감사헌금",
    description: "하나님의 사랑과 돌보심에 대한 감사의 표시로 드리는 헌금",
  },
  {
    name: "절기헌금",
    description: "각 절기나 특별 주일의 경우 드리는 절기 헌금(부활절헌금, 추수감사헌금, 성탄절헌금 등)",
  },
  {
    name: "건축헌금",
    description: "주님의 성전을 지을때나 선교지 성전건축을 지을때 내는 주님이 기뻐하시는 헌금",
  },
  {
    name: "선교헌금",
    description: "파송선교사 사역지원과 국내/국외 교회지원으로 사용되는 헌금",
  },
];

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

      <div className="mx-auto max-w-[800px] px-5 py-12 sm:py-16">
        {/* 온라인헌금 국내계좌 안내 */}
        <section>
          <h2 className="flex items-center gap-2.5 text-[22px] font-bold text-gray-900">
            <span className="h-2.5 w-2.5 rounded-[3px] bg-[#2B5797]" />
            온라인헌금 국내계좌 안내
          </h2>
          <div className="mt-6 space-y-3">
            {DOMESTIC_ACCOUNTS.map((item) => (
              <div
                key={item.type}
                className="flex flex-col overflow-hidden rounded-2xl bg-gray-50 sm:flex-row"
              >
                <div className="flex items-center justify-center bg-gray-100 px-6 py-4 sm:w-[200px] sm:shrink-0">
                  <p className="text-[15px] font-bold text-gray-900">{item.type}</p>
                </div>
                <ul className="flex flex-1 flex-col justify-center gap-2 px-6 py-4">
                  {item.accounts.map((account) => (
                    <li key={account} className="flex items-start gap-2 text-[15px] font-medium text-gray-800">
                      <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#2B5797]" />
                      {account}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 선교 외환계좌 안내 */}
        <section className="mt-14">
          <h2 className="flex items-center gap-2.5 text-[22px] font-bold text-gray-900">
            <span className="h-2.5 w-2.5 rounded-[3px] bg-[#2B5797]" />
            선교 외환계좌 안내
          </h2>
          <dl className="mt-6 space-y-6">
            {FOREIGN_ACCOUNT.map((row) => (
              <div key={row.label}>
                <dt className="flex items-start gap-2 text-[15px] font-semibold text-gray-900">
                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#2B5797]" />
                  {row.label}
                </dt>
                <dd
                  className={
                    row.highlight
                      ? "mt-1 pl-3 text-[15px] font-medium text-[#2B5797]"
                      : "mt-1 pl-3 text-[15px] text-gray-600"
                  }
                >
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 온라인헌금 안내 */}
        <section className="mt-14">
          <h2 className="flex items-center gap-2.5 text-[22px] font-bold text-gray-900">
            <span className="h-2.5 w-2.5 rounded-[3px] bg-[#2B5797]" />
            온라인헌금 안내
          </h2>
          <ul className="mt-6 space-y-6">
            {OFFERING_TYPES.map((item) => (
              <li key={item.name}>
                <p className="flex items-start gap-2 text-[15px] font-semibold text-gray-900">
                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#2B5797]" />
                  {item.name}
                </p>
                <p className="mt-1 pl-3 text-[15px] leading-relaxed text-gray-600">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
