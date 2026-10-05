/* 표어 섹션 — 원본(Wix) 홈처럼 카드 없이 플랫한 텍스트.
   바로 아래 QuickMenu 바로가기가 붙어 하나의 덩어리로 읽힌다. */
export function ChurchIntroPreview() {
  return (
    <section className="pb-10 pt-16 sm:pb-12 sm:pt-24">
      <div className="mx-auto max-w-[800px] px-6 text-center">
        <h2 className="text-[28px] font-bold leading-[1.3] tracking-tight text-gray-900 sm:text-[40px]">
          마지막 시대, 깨어있는 교회
        </h2>

        <p className="mt-7 text-[15px] leading-[1.95] text-gray-500 sm:text-[16px]">
          보라 내가 도적 같이 오리니 누구든지 깨어 자기 옷을 지켜 벌거벗고 다니지 아니하며{" "}
          <br className="hidden sm:block" />
          자기의 부끄러움을 보이지 아니하는 자가 복이 있도다
        </p>

        <p className="mt-5 text-[14px] text-gray-400">요한계시록 16:15</p>
      </div>
    </section>
  );
}
