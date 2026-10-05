import { generatePageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import Link from "next/link";
import Image from "next/image";

export const metadata = generatePageMetadata({
  title: "신부단장",
  description: "거룩한 신부로 단장되는 옳은 행실과 매일 회개하는 삶, 성은세계선교교회 신부단장 사역",
  path: "/bride",
});

/* 원본 강조(파란 굵은 글씨) */
function Em({ children }: { children: React.ReactNode }) {
  return <strong className="font-bold text-secondary">{children}</strong>;
}

/* 단락마다 어울리는 그림(교회 소장 회화)을 옆에 세운다 — 원본과 같은 세 그림.
   데스크톱: 그림 260px + 본문 / 모바일: 그림이 위, 본문 아래 */
function Passage({
  image,
  alt,
  reverse = false,
  children,
}: {
  image: string;
  alt: string;
  reverse?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`grid gap-6 sm:items-start sm:gap-9 ${
        reverse ? "sm:grid-cols-[1fr_260px]" : "sm:grid-cols-[260px_1fr]"
      }`}
    >
      {/* 그림은 항상 260×347(3:4) — 좌우가 바뀌어도 열 폭을 같이 뒤집어 크기가 유지된다 */}
      <div
        className={`relative aspect-[3/4] w-full max-w-[260px] overflow-hidden rounded-[24px] shadow-feature ${
          reverse ? "sm:order-2" : ""
        }`}
      >
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 640px) 260px, 100vw"
          className="object-cover"
        />
      </div>
      <div className={reverse ? "sm:order-1" : ""}>{children}</div>
    </div>
  );
}

const body = "text-[15px] leading-[1.95] text-gray-600 sm:text-[16px]";
const verse = "border-l-2 border-primary/30 pl-4 text-[14px] leading-relaxed text-gray-500 sm:text-[15px]";

/* 원본(Wix) 사이트의 신부단장 페이지 전문 — 문장·줄바꿈·강조를 그대로 따른다.
   성회 횟수(국내 1,434회·해외 956회)만 사용자 지시로 노출하지 않는다 */
export default function BridePage() {
  return (
    <div>
      <PageHero
        title="신부단장"
        description={<>거룩한 신부로 단장되는 옳은 행실과 매일 회개하는 삶</>}
      />

      <div className="mx-auto max-w-[880px] px-5 py-12 sm:py-16">
        {/* 성구 — 원본은 2·3행이 굵고, 구원의 옷/의의 겉옷이 파란 강조 */}
        <div className="card-tinted p-6 text-center sm:p-9">
          <p className="text-[15px] leading-[1.95] text-gray-600 sm:text-[16px]">
            내가 여호와로 인하여 크게 기뻐하며 내 영혼이 나의 하나님으로 인하여 즐거워하리니
            <br />
            <span className="font-semibold text-gray-800">
              이는 그가 <Em>구원의 옷</Em>으로 내게 입히시며 <Em>의의 겉옷</Em>으로 내게 더하심이
            </span>
            <br />
            <span className="font-semibold text-gray-800">
              신랑이 사모를 쓰며 신부가 자기 보물로 단장함 같게 하셨음이라
            </span>
          </p>
          <p className="mt-3 text-[13px] text-gray-400">이사야 61:10</p>
        </div>

        <h2 className="mt-14 text-[24px] font-bold text-gray-900 sm:mt-16 sm:text-[28px]">
          신부단장 사역
        </h2>

        <section className="mt-8 space-y-14 sm:space-y-20">
          {/* 지금은 — 원본에서 이 단락 옆에 천사 그림 */}
          <Passage image="/images/bride/angel.jpg" alt="예복을 들고 있는 천사">
            <h3 className="text-[20px] font-bold text-gray-900">지금은,</h3>
            <div className={`mt-4 space-y-4 ${body}`}>
              <p>
                예수님의 거룩한 신부로 단장되어 다시 오실 주님을 기다리는 <Em>마지막 때</Em>입니다.
              </p>
              <p>
                예수님을 믿고 구원받은 후, 성도로서의 합당한 삶을 살게 되면 신부의 예복인
                빛나고 깨끗한 세마포(흰옷)를 입혀주십니다.
              </p>
              <blockquote className={verse}>
                [계 19:8] 그에게 빛나고 깨끗한 세마포 옷을 입도록 허락하셨으니
                이 세마포 옷은 성도들의 옳은 행실이로다 하더라
              </blockquote>
              <p>
                이 예복은 특정한 누구의 힘으로, 어떤 집회에서만 입을 수 있는 옷이 아니라
                전 세계 곳곳에서 하나님 앞에 합당한 삶을 사는 자들에게 예수님께서 친히
                입히시는 옷입니다.
              </p>
            </div>
          </Passage>

          {/* 하지만 */}
          <Passage image="/images/bride/robes.jpg" alt="하늘에서 내려오는 빛나고 깨끗한 세마포 옷" reverse>
            <h3 className="text-[20px] font-bold text-gray-900">하지만,</h3>
            <div className={`mt-4 space-y-4 ${body}`}>
              <p>
                이 마지막 때 전 세계 신부단장을 위한 사명이 있으신 나현숙 목사님을 통해
                회개와 신부단장의 말씀을 들은 후, 통곡으로 자신의 죄를 회개하며 신부로
                단장되길 사모하는 자들에게는 성회 때 <Em>은혜로 예복을 입혀주시는</Em> 놀라운
                역사가 본 교회 신부단장성회를 통해 일어나고 있습니다.
              </p>
              <blockquote className={verse}>
                [마 7:7] 구하라 그리하면 너희에게 주실 것이요 찾으라 그리하면 찾아낼 것이요
                문을 두드리라 그리하면 너희에게 열릴 것이니
              </blockquote>
              <p>
                <Em>나현숙 목사님께서는</Em> 열아홉 살 때부터 하루 8~10시간씩의 기도 훈련을 통해
                주님께서 예복을 볼 수 있도록 영안을 열어주셔서 마지막 때 신부단장하는 도구로
                사용되고 계십니다.
              </p>
              <p>
                목사님께서는 예복으로 단장된 여부와 상태만 확인해 주시는 것이며, 예복은 사람의
                힘으로 입히는 것이 아니라 마음의 중심을 보시는 하나님만이 친히 입히실 수 있는
                옷입니다.
              </p>
            </div>
          </Passage>

          {/* 앞으로는 */}
          <Passage image="/images/bride/bride.jpg" alt="흰 예복으로 단장한 신부">
            <h3 className="text-[20px] font-bold text-gray-900">앞으로는,</h3>
            <div className={`mt-4 space-y-4 ${body}`}>
              <p>
                주님의 신부로서 <Em>옳은 행실과 매일 회개하는 삶</Em>을 통해 세마포를 깨끗하게
                관리해야 합니다.
              </p>
              <p>
                다시 하나님을 멀리 떠나 죄악된 삶을 살아 예복이 더러워지고, 찢어지며, 벗겨지면
                주님께서 다시 오시는 날에 아름다운 신부로서 혼인잔치에 참여하지 못하게 됩니다.
              </p>
              <blockquote className={verse}>
                [계 20:6] 이 첫째부활에 참여하는 자들은 복이 있고 거룩하도다
              </blockquote>
            </div>
          </Passage>
        </section>

        {/* 마무리 + CTA — 원본은 마지막 두 줄이 굵은 글씨 */}
        <div className="card-soft mt-14 p-6 text-center sm:mt-20 sm:p-9">
          <p className={body}>
            지금까지 국내외 수많은 초교파적 성회를 통해
            <br className="hidden sm:block" />
            전 세계 수많은 영혼들이 예복을 입고 <Em>아름다운 신부</Em>로 단장되었습니다.
          </p>
          <p className="mt-4 text-[15px] font-bold leading-[1.95] text-gray-900 sm:text-[16px]">
            이 글을 보시는 여러분께서도 성은교회 신부단장 사역을 통해
            <br className="hidden sm:block" />
            신부로 단장되고 복된 첫째부활에 참여하시기를 축복합니다.
          </p>
          <Link
            href="/revival-schedule"
            className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            성회 일정 보기
          </Link>
        </div>
      </div>
    </div>
  );
}
