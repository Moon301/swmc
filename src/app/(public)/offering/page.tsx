import {
  Heart,
  Coins,
  Gift,
  Calendar,
  Building2,
  Globe,
  Landmark,
} from "lucide-react";
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
      { bank: "농협은행", number: "355-0034-9990-13", holder: "예금주: 성은세계선교교회" },
      { bank: "KEB 하나은행", number: "162-890030-81204", holder: "예금주: 성은세계선교교회" },
    ],
  },
  {
    type: "일반헌금 계좌",
    accounts: [
      { bank: "농협은행", number: "355-0034-9992-93", holder: "예금주: 성은세계선교교회" },
    ],
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
    icon: Heart,
    description:
      "주일에 드리는 헌금과 내 삶속에서 인도하시는 하나님의 은혜와 기쁨에 감사를 표현하는 헌금",
  },
  {
    name: "십일조헌금",
    icon: Coins,
    description:
      "모든 것이 하나님이 공급하시는 것을 인정하며 주님이 주시는 축복의 약속과 성경 계명에 있는 소득의 십분의 일을 드리는 헌금",
  },
  {
    name: "감사헌금",
    icon: Gift,
    description: "하나님의 사랑과 돌보심에 대한 감사의 표시로 드리는 헌금",
  },
  {
    name: "절기헌금",
    icon: Calendar,
    description: "각 절기나 특별 주일의 경우 드리는 절기 헌금(부활절헌금, 추수감사헌금, 성탄절헌금 등)",
  },
  {
    name: "건축헌금",
    icon: Building2,
    description: "주님의 성전을 지을때나 선교지 성전건축을 지을때 내는 주님이 기뻐하시는 헌금",
  },
  {
    name: "선교헌금",
    icon: Globe,
    description: "파송선교사 사역지원과 국내/국외 교회지원으로 사용되는 헌금",
  },
];

export default function OfferingPage() {
  return (
    <div className="bg-white">
      {/* Hero — Toss product-page style */}
      <section className="bg-gradient-to-b from-[#f7f9fb] to-white">
        <div className="mx-auto max-w-[800px] px-5 pb-16 pt-20 text-center sm:pb-24 sm:pt-28">
          <span className="inline-flex items-center rounded-full bg-primary-light px-3.5 py-1.5 text-[13px] font-semibold text-secondary">
            온라인헌금
          </span>
          <h1 className="mt-5 text-[36px] font-bold leading-[1.25] tracking-tight text-gray-900 sm:text-[52px]">
            감사와 사랑의 마음을
            <br />
            헌금으로 드립니다
          </h1>
        </div>
      </section>

      {/* 온라인헌금 국내계좌 안내 */}
      <section className="mx-auto max-w-[800px] px-5 py-14 sm:py-20">
        <h2 className="text-center text-[24px] font-bold tracking-tight text-gray-900 sm:text-[30px]">
          온라인헌금 국내계좌 안내
        </h2>
        <div className="mt-8 space-y-4 sm:mt-10">
          {DOMESTIC_ACCOUNTS.map((item) => (
            <div key={item.type} className="rounded-[24px] bg-gray-50 p-7 sm:p-9">
              <p className="text-[14px] font-semibold text-secondary">{item.type}</p>
              <ul className="mt-4 space-y-5">
                {item.accounts.map((account) => (
                  <li key={account.number} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white shadow-[0_1px_4px_rgba(2,32,71,0.06)]">
                      <Landmark className="h-5 w-5 text-secondary" />
                    </span>
                    <div>
                      <p className="text-[18px] font-bold leading-snug text-gray-900 sm:text-[20px]">
                        {account.bank} {account.number}
                      </p>
                      <p className="mt-0.5 text-[14px] text-gray-500">({account.holder})</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 선교 외환계좌 안내 */}
      <section className="mx-auto max-w-[800px] px-5 py-14 sm:py-20">
        <h2 className="text-center text-[24px] font-bold tracking-tight text-gray-900 sm:text-[30px]">
          선교 외환계좌 안내
        </h2>
        <div className="mt-8 overflow-hidden rounded-[24px] bg-gray-50 sm:mt-10">
          <dl className="divide-y divide-gray-200/70">
            {FOREIGN_ACCOUNT.map((row) => (
              <div
                key={row.label}
                className="flex flex-col gap-1 px-7 py-5 sm:flex-row sm:items-center sm:gap-6 sm:px-9"
              >
                <dt className="text-[14px] font-medium text-gray-500 sm:w-[300px] sm:shrink-0">
                  {row.label}
                </dt>
                <dd
                  className={
                    row.highlight
                      ? "text-[15px] font-bold text-secondary"
                      : "text-[15px] font-semibold text-gray-900"
                  }
                >
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 온라인헌금 안내 */}
      <section className="mx-auto max-w-[800px] px-5 py-14 pb-24 sm:py-20 sm:pb-32">
        <h2 className="text-center text-[24px] font-bold tracking-tight text-gray-900 sm:text-[30px]">
          온라인헌금 안내
        </h2>
        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2">
          {OFFERING_TYPES.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.name} className="rounded-[24px] bg-gray-50 p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-[0_1px_4px_rgba(2,32,71,0.06)]">
                  <Icon className="h-[22px] w-[22px] text-secondary" />
                </span>
                <p className="mt-4 text-[17px] font-bold text-gray-900">{item.name}</p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-gray-500">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
