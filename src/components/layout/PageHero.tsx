import { WebsiteShaderCanvas } from "@/components/ui/shader-aurora-veil";

/* 상세 페이지 공용 히어로.
 *
 * 홈 배경의 aurora-veil 셰이더를 투명도를 낮춰 은은하게 깔아 통일감을 주고,
 * 하단 페이드(.page-hero-fade)로 본문과의 구분감을 만든다.
 * 헤더가 sticky라 홈과 같은 방식으로 헤더 뒤까지 배경을 끌어올린다.
 */
export function PageHero({
  title,
  description,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <div className="page-hero-fade relative -mt-[76px] overflow-hidden pt-[76px] sm:-mt-20 sm:pt-20">
      {/* 홈보다 띠가 두껍고 색이 진한 bold 변형 (사용자 지정) */}
      <WebsiteShaderCanvas
        preset="aurora-veil-bold"
        tone="light"
        intensity={1.3}
        className="absolute inset-0 h-full w-full"
      />
      <div className="relative z-10 mx-auto max-w-[1100px] px-5 pb-14 pt-10 sm:pb-16 sm:pt-14">
        <h1 className="text-[36px] font-bold text-gray-900 sm:text-[44px]">{title}</h1>
        {description && (
          <p className="mt-3 max-w-[720px] text-[16px] leading-relaxed text-gray-500">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
