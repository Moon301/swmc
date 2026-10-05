/* 글래스 표 — 옅은 블루 띠 위에 떠 있는 반투명 패널.
   행 단위 목록(연혁·사역 목록 등)을 하나의 표처럼 묶을 때 쓴다.
   자식은 `divide-y` 행들로 넘기고, 머리글이 필요하면 head로 넘긴다 */
export function GlassTable({
  head,
  children,
  className = "",
}: {
  head?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* 유리 뒤에 비칠 배경 — 패널보다 살짝만 큰 옅은 블루 띠 */}
      <div
        aria-hidden
        className="absolute -inset-2.5 rounded-[30px] bg-gradient-to-br from-[oklch(94%_0.03_238)] via-[oklch(96.5%_0.016_250)] to-[oklch(95%_0.024_265)] sm:-inset-3"
      />
      <div className="glass-panel relative overflow-hidden rounded-[24px]">
        {head && (
          <div className="border-b border-gray-900/[0.06] px-7 py-3.5 text-[13px] font-semibold text-gray-500">
            {head}
          </div>
        )}
        <div className="divide-y divide-gray-900/[0.06]">{children}</div>
      </div>
    </div>
  );
}
