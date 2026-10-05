import { WebsiteShaderCanvas } from "@/components/ui/shader-aurora-veil";

/* 히어로 영역 배경 — WebGL aurora-veil 셰이더 (사용자 지정).
 *
 * - 스카이 블루와 황금 베일이 유기적으로 흐르는 대기 느낌. CSS 띠 방식은
 *   "촌스럽다"는 피드백으로 폐기하고 셰이더로 교체했다.
 * - 헤더가 sticky라 흐름을 차지하므로, 헤더 높이만큼 끌어올리고(-mt) 같은 값만큼
 *   패딩으로 되돌려 배경이 헤더 뒤까지 이어지게 한다.
 * - .sky-fade(::after)가 캔버스 하단을 본문 배경으로 녹인다.
 * - WebGL 불가 환경에선 컴포넌트 내 폴백 그라데이션이 깔린다.
 */
export function SkyBackdrop({ children }: { children: React.ReactNode }) {
  return (
    <div className="sky-fade relative -mt-[76px] overflow-hidden pt-[76px] sm:-mt-20 sm:pt-20">
      <WebsiteShaderCanvas
        preset="aurora-veil"
        tone="light"
        className="absolute inset-0 h-full w-full"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
