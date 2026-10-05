export const dynamic = "force-dynamic";

import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { generatePageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { GlassTable } from "@/components/ui/GlassTable";
import { CHURCH_INFO } from "@/lib/constants";

export const metadata = generatePageMetadata({
  title: "교회소개",
  description: "성은세계선교교회를 소개합니다.",
  path: "/about",
});

/* 원본(Wix) 교회소개 페이지 구성을 따른다:
   성구(요 3:16) → 비전 문구 → 교회 조감도 → 교단·교회정보 → 5대 중점 사역 → 연혁 */

const MINISTRIES = [
  {
    name: "회개운동",
    desc: "지금까지 살아온 삶의 잘못된 부분을 자각하여 나는 죄인임을 깨달아 반성하고, 주님 앞에 잘못을 뉘우쳐 용서를 받아 구원에 이르는 영혼육이 정결해지는 운동",
  },
  {
    name: "성령운동",
    desc: "성령의 감동에 의해 그리스도인들의 신앙을 일깨우고 낙심한 영혼들을 회개시키며 구원하는 운동. 초대교회의 오순절 성령 강림 운동과 같은 역사가 일어난다",
  },
  {
    name: "신부단장",
    desc: "구원의 복음에서 그치는 것이 아니라 장성한 주님의 제자된 삶을 위해 예복이 단장되어, 영혼육의 성화가 일어나 주님의 아름다운 신부로 단장하는 운동",
  },
  {
    name: "세계선교",
    desc: "디아스포라를 넘어서는 글로벌 교회로 발전하여 전 세계에 있는 구원받지 못한 영혼들을 향하여 선교사 파송과 중보기도와 물질로 전 세계 영혼을 전인적으로 돌보는 운동",
  },
  {
    name: "예수복음",
    desc: "성경에 기록된 대로 오직 예수 그리스도의 십자가 복음을 통한 구원과 심판을 믿고 전하는 복음 (요한복음 14:6)",
  },
];

/* 원본 연혁. 원본은 시공을 2008-08-15로 적었으나 준공(2008-07-14)보다 뒤라 2007로 바로잡음 */
const HISTORY = [
  { year: "2008", date: "7월 14일", event: "전주성전 건축 준공" },
  { year: "2007", date: "8월 15일", event: "전주성전 건축 시공" },
  { year: "1993", date: "3월 10일", event: "선교사 파송 시작" },
  { year: "1991", date: "1월 31일", event: "교회 창립" },
];

/* 5대 중점 사역 — 원형 궤도 다이어그램.
   원본(오각형에 파란 원 다섯 개)의 구조는 유지하되, 블루 그라데이션 중심 원판 + 가는 궤도선 + 흰 노드.
   (그라데이션은 사용자 지정 — 다른 곳에 복제하지 말 것) 위에서부터 시계 방향: 회개운동 → 성령운동 → 신부단장 → 세계선교 → 예수복음 */
function FiveMinistriesDiagram() {
  const cx = 210;
  const cy = 210;
  const orbit = 146; // 노드 중심이 놓이는 궤도 반지름
  const node = 48; // 노드 반지름
  const core = 76; // 중심 원판 반지름
  const pt = (r: number, i: number) => {
    const a = ((-90 + i * 72) * Math.PI) / 180;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  };
  const nodes = MINISTRIES.map((m, i) => ({ ...m, ...pt(orbit, i) }));

  return (
    <svg
      viewBox="0 0 420 420"
      role="img"
      aria-label="5대 중점 사역: 회개운동, 성령운동, 신부단장, 세계선교, 예수복음"
      className="mx-auto w-full max-w-[420px]"
    >
      <defs>
        <filter id="node-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="oklch(17.5% 0.045 266)" floodOpacity="0.12" />
        </filter>
        {/* 중심 원판 — 깊은 브랜드 블루에서 스카이 블루로 (사용자 지정 그라데이션) */}
        <linearGradient id="core-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(50% 0.19 262)" />
          <stop offset="55%" stopColor="oklch(60% 0.18 250)" />
          <stop offset="100%" stopColor="oklch(72% 0.13 228)" />
        </linearGradient>
        {/* 왼쪽 위에 은은한 하이라이트 */}
        <radialGradient id="core-sheen" cx="30%" cy="25%" r="70%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <filter id="core-shadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="oklch(56.5% 0.186 258)" floodOpacity="0.28" />
        </filter>
      </defs>

      {/* 궤도 — 가는 선 하나 */}
      <circle cx={cx} cy={cy} r={orbit} fill="none" style={{ stroke: "var(--color-gray-300)" }} strokeWidth={1} />

      {/* 중심에서 노드로 이어지는 가는 살 */}
      {nodes.map((n) => (
        <line
          key={`spoke-${n.name}`}
          x1={cx}
          y1={cy}
          x2={n.x}
          y2={n.y}
          style={{ stroke: "var(--color-gray-200)" }}
          strokeWidth={1}
        />
      ))}

      {/* 중심 원판 — 네이비 + 안쪽 가는 링 */}
      <circle cx={cx} cy={cy} r={core} fill="url(#core-gradient)" filter="url(#core-shadow)" />
      <circle cx={cx} cy={cy} r={core} fill="url(#core-sheen)" />
      <circle cx={cx} cy={cy} r={core - 8} fill="none" stroke="#fff" strokeOpacity={0.28} strokeWidth={1} />
      <text x={cx} y={cy - 6} textAnchor="middle" fill="#fff" fontSize={24} fontWeight={700} letterSpacing="-0.5">
        5대
      </text>
      <text x={cx} y={cy + 22} textAnchor="middle" fill="#fff" fontSize={18} fontWeight={600} letterSpacing="-0.3">
        중점사역
      </text>

      {/* 노드 — 흰 원 + 브랜드 블루 가는 테두리, 전부 같은 위계 */}
      {nodes.map((n) => (
        <g key={n.name} filter="url(#node-shadow)">
          <circle cx={n.x} cy={n.y} r={node} fill="#fff" style={{ stroke: "var(--color-primary)" }} strokeOpacity={0.35} strokeWidth={1.25} />
          <text
            x={n.x}
            y={n.y + 5.5}
            textAnchor="middle"
            style={{ fill: "var(--color-gray-900)" }}
            fontSize={15}
            fontWeight={700}
            letterSpacing="-0.3"
          >
            {n.name}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default async function AboutPage() {
  const supabase = await createClient();
  const { data: pages } = await supabase
    .from("page_contents")
    .select("*")
    .in("page_key", ["about_greeting", "about_history", "about_vision"])
    .order("page_key");

  return (
    <div>
      <PageHero
        title="교회소개"
        description={
          <>
            예수님의 사랑을 실천하고, 하나님의 놀라운 은혜와 축복이 넘쳐나는 교회
            <br className="hidden sm:block" />
            마지막 때를 향한 하나님의 말씀을 선포하는 교회, {CHURCH_INFO.name}입니다.
          </>
        }
      />

      <div className="mx-auto max-w-[880px] px-5 py-12 sm:py-16">
        {/* 성구 — 원본 상단 */}
        <div className="card-tinted p-6 text-center sm:p-9">
          <p className="text-[16px] leading-[1.9] text-gray-700 sm:text-[17px]">
            하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니
            <br className="hidden sm:block" />
            이는 저를 믿는 자마다 멸망치 않고 영생을 얻게 하려 하심이니라
          </p>
          <p className="mt-3 text-[13px] text-gray-400">요한복음 3:16</p>
        </div>

        {/* 교회 조감도 */}
        <div className="relative mt-8 aspect-[1024/601] w-full overflow-hidden rounded-[24px] shadow-feature sm:mt-10">
          <Image
            src="/images/about/church-aerial.jpg"
            alt="성은세계선교교회 전주성전 조감도"
            fill
            priority
            sizes="(min-width: 880px) 840px, 100vw"
            className="object-cover"
          />
        </div>

        {/* 교회안내 — 교단 + 교회정보 */}
        <section className="mt-14 sm:mt-20">
          <h2 className="text-[24px] font-bold text-gray-900 sm:text-[28px]">교회안내</h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_1.4fr] sm:gap-5">
            {/* 교단안내 */}
            <div className="card-soft flex items-center gap-5 p-6">
              <Image
                src="/images/about/denomination.png"
                alt="대한예수교장로회 합동중앙총회 로고"
                width={72}
                height={72}
                className="h-[72px] w-[72px] shrink-0"
              />
              <div>
                <p className="text-[13px] font-semibold text-secondary">교단안내</p>
                <p className="mt-1.5 text-[17px] font-bold text-gray-900">대한예수교장로회</p>
                <p className="mt-0.5 text-[14px] text-gray-500">합동중앙총회 중앙노회 소속</p>
              </div>
            </div>

            {/* 교회정보 */}
            <dl className="card-soft divide-y divide-gray-100 px-6">
              {[
                {
                  label: "주소",
                  value: `(${CHURCH_INFO.zipCode}) ${CHURCH_INFO.address} ${CHURCH_INFO.addressDetail}`,
                },
                { label: "대표번호", value: `${CHURCH_INFO.phone}, ${CHURCH_INFO.phone2.split("-").pop()}` },
                { label: "팩스번호", value: CHURCH_INFO.fax },
              ].map((row) => (
                <div key={row.label} className="flex gap-5 py-4">
                  <dt className="w-16 shrink-0 text-[14px] font-semibold text-gray-500">{row.label}</dt>
                  <dd className="text-[15px] text-gray-800">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 비전 — 5대 중점 사역 */}
        <section className="mt-14 sm:mt-20">
          <h2 className="text-[24px] font-bold text-gray-900 sm:text-[28px]">5대 중점 사역</h2>
          <p className="mt-2 text-[15px] text-gray-500">
            회개운동, 성령운동, 신부단장, 세계선교, 예수복음의 다섯 사역이 한 몸을 이룹니다.
          </p>

          {/* 원본과 같은 오각형 다이어그램 — 다섯 사역이 같은 위계 */}
          <div className="mt-8">
            <FiveMinistriesDiagram />
          </div>

          <GlassTable className="mt-10 sm:mt-12">
            {MINISTRIES.map((item, i) => (
              <div key={item.name} className="flex items-center gap-5 px-6 py-5 sm:gap-6 sm:px-7">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-light text-[14px] font-bold text-secondary">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="text-[17px] font-bold text-gray-900">{item.name}</p>
                  <p className="mt-1.5 text-[15px] leading-[1.85] text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </GlassTable>
        </section>

        {/* 연혁 */}
        <section className="mt-14 sm:mt-20">
          <h2 className="text-[24px] font-bold text-gray-900 sm:text-[28px]">연혁</h2>
          <div className="card-soft mt-6 px-6 sm:px-8">
            {HISTORY.map((item) => (
              <div
                key={item.year + item.event}
                className="flex items-baseline gap-5 border-b border-gray-100 py-4 last:border-0"
              >
                <p className="w-14 shrink-0 text-[17px] font-bold text-secondary">{item.year}</p>
                <p className="w-20 shrink-0 text-[13px] text-gray-400">{item.date}</p>
                <p className="text-[15px] text-gray-800">{item.event}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[14px] text-gray-500">
            {CHURCH_INFO.address} {CHURCH_INFO.addressDetail}
          </p>
        </section>

        {/* 관리자 페이지에서 추가한 콘텐츠 */}
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
