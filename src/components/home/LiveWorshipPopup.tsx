"use client";

/* 주일 실시간 예배 안내 팝업.
 *
 * 한국 시간 기준 매주 일요일 09:00~12:00, 14:00~17:00 에만 홈에 뜬다 (방문자 시간대와 무관).
 * 누르면 유튜브 채널 라이브 페이지가 새 탭으로 열린다. 닫으면 그 세션 동안은 다시 안 뜬다.
 * 미리보기: 주소 뒤에 ?live-preview=1 을 붙이면 요일·시간과 상관없이 표시된다. */

import { useEffect, useState } from "react";
import { X, Youtube } from "lucide-react";
import { CHURCH_INFO } from "@/lib/constants";

const DISMISS_KEY = "swmc_live_popup_dismissed";
const WINDOWS: Array<[number, number]> = [
  [9, 12],
  [14, 17],
];

function isLiveWindowKST(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Seoul",
    weekday: "short",
    hour: "numeric",
    hour12: false,
  }).formatToParts(now);
  const weekday = parts.find((p) => p.type === "weekday")?.value;
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? -1) % 24;
  if (weekday !== "Sun") return false;
  return WINDOWS.some(([start, end]) => hour >= start && hour < end);
}

export function LiveWorshipPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const preview = new URLSearchParams(window.location.search).get("live-preview") === "1";
    const update = () => {
      if (!preview && sessionStorage.getItem(DISMISS_KEY)) return setOpen(false);
      setOpen(preview || isLiveWindowKST());
    };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  if (!open) return null;

  const close = () => {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-navy/40 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="live-worship-title"
    >
      <div className="relative w-full max-w-[420px] rounded-[28px] bg-background p-7 shadow-[0_24px_64px_rgba(10,16,40,0.28)] sm:p-9">
        <button
          onClick={close}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700"
          aria-label="닫기"
        >
          <X className="h-4 w-4" strokeWidth={2} />
        </button>

        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-500" />
          </span>
          <span className="text-[13px] font-semibold text-rose-600">지금 예배 중</span>
        </div>

        <h2 id="live-worship-title" className="mt-4 text-[24px] font-bold leading-snug text-gray-900 sm:text-[26px]">
          실시간 주일예배에
          <br />
          함께하세요
        </h2>
        <p className="mt-3 text-[15px] leading-[1.8] text-gray-600">
          주일 대예배 오전 11시, 주일 저녁예배 오후 3시.
          <br />
          현장에 오지 못하시는 분들은 유튜브 생중계로 함께 예배드릴 수 있습니다.
        </p>

        <a
          href={`${CHURCH_INFO.youtube}/live`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          <Youtube className="h-5 w-5" strokeWidth={2} />
          유튜브로 실시간 예배 보기
        </a>
        <button
          onClick={close}
          className="mt-3 w-full py-2 text-[14px] text-gray-500 transition-colors hover:text-gray-700"
        >
          다음에 볼게요
        </button>
      </div>
    </div>
  );
}
