"use client";

/* 주일 실시간 예배 안내 팝업.
 *
 * 한국 시간 기준 매주 일요일 09:00~12:00, 14:00~17:00 에만 홈에 뜬다 (방문자 시간대와 무관).
 * 누르면 유튜브 채널 라이브 페이지가 새 탭으로 열린다. 닫으면 그 세션 동안은 다시 안 뜬다.
 * 09:00~10:30 / 14:00~14:30 은 "라이브 예정", 10:30~12:00 / 14:30~17:00 은 "지금 라이브 중".
 * 미리보기: ?live-preview=1 (라이브 중) 또는 ?live-preview=upcoming (라이브 예정). */

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Youtube } from "lucide-react";
import { CHURCH_INFO } from "@/lib/constants";

const DISMISS_KEY = "swmc_live_popup_dismissed";

type LiveState = {
  status: "upcoming" | "live";
  service: string; // 예배 이름
  time: string; // 예배 시작 시각 표기
};

/* 표시 구간(분 단위, KST) — 시작 30분 전부터 "라이브 예정", 시작 30분 전 지점부터 "라이브 중" */
const WINDOWS = [
  { from: 9 * 60, liveFrom: 10 * 60 + 30, until: 12 * 60, service: "주일 대예배", time: "오전 11시" },
  { from: 14 * 60, liveFrom: 14 * 60 + 30, until: 17 * 60, service: "주일 저녁예배", time: "오후 3시" },
];

function liveStateKST(now = new Date()): LiveState | null {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Seoul",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(now);
  const weekday = parts.find((p) => p.type === "weekday")?.value;
  if (weekday !== "Sun") return null;
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? -1) % 24;
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  const m = hour * 60 + minute;
  const w = WINDOWS.find((x) => m >= x.from && m < x.until);
  if (!w) return null;
  return { status: m >= w.liveFrom ? "live" : "upcoming", service: w.service, time: w.time };
}

export function LiveWorshipPopup() {
  const [state, setState] = useState<LiveState | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const preview = params.get("live-preview"); // "1"|"live" → 라이브 중, "upcoming" → 라이브 예정
    const update = () => {
      if (preview) {
        setState(
          preview === "upcoming"
            ? { status: "upcoming", service: "주일 대예배", time: "오전 11시" }
            : { status: "live", service: "주일 대예배", time: "오전 11시" }
        );
        return;
      }
      if (sessionStorage.getItem(DISMISS_KEY)) return setState(null);
      setState(liveStateKST());
    };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  if (!state) return null;
  const live = state.status === "live";

  const close = () => {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setState(null);
  };

  const liveHref = `${CHURCH_INFO.youtube}/live`;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-navy/45 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="live-worship-title"
    >
      <div className="relative w-full max-w-[460px] overflow-hidden rounded-[28px] bg-background shadow-[0_24px_64px_rgba(10,16,40,0.3)]">
        <button
          onClick={close}
          className="absolute right-3.5 top-3.5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-md transition-colors hover:bg-black/50"
          aria-label="닫기"
        >
          <X className="h-4 w-4" strokeWidth={2} />
        </button>

        {/* 썸네일 — 가운데, 전체 폭. 이미지 자체도 라이브 링크 */}
        <a href={liveHref} target="_blank" rel="noopener noreferrer" onClick={close} className="block">
          <div className="relative aspect-video w-full">
            <Image
              src="/images/live-worship.png"
              alt="성은세계선교교회 주일예배 실시간 라이브, 나현숙 목사님"
              fill
              priority
              sizes="(min-width: 640px) 460px, 100vw"
              className="object-cover"
            />
          </div>
        </a>

        <div className="p-6 text-center sm:p-7">
          {/* 상태 배지 — 내용 카드 안, 제목 위 (이미지 위에 얹으면 썸네일 글자와 겹침) */}
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-semibold ${
              live ? "bg-rose-50 text-rose-600" : "bg-primary-light text-secondary"
            }`}
          >
            <span className="relative flex h-2 w-2">
              {live && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-60" />}
              <span className={`relative inline-flex h-2 w-2 rounded-full ${live ? "bg-rose-500" : "bg-primary"}`} />
            </span>
            {live ? "LIVE" : "라이브 예정"}
          </span>
          <h2 id="live-worship-title" className="mt-3 text-[19px] font-bold leading-snug text-gray-900 sm:text-[20px]">
            {live ? `${state.service} 실시간 생중계 중` : `${state.service} ${state.time} 생중계 예정`}
          </h2>
          <p className="mt-2 text-[14px] leading-[1.75] text-gray-500">
            {live
              ? "지금 이 시간, 어디에 계시든 함께 예배드리실 수 있습니다."
              : "예배 시작에 맞춰 유튜브 채널에서 생중계가 시작됩니다."}
          </p>

          {/* 은은한 블루 그라데이션 버튼 — 팝업 내 유일한 강조 (사용자 지정, 다른 곳에 복제하지 말 것) */}
          <a
            href={liveHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[oklch(52%_0.19_262)] via-[oklch(58%_0.185_255)] to-[oklch(66%_0.15_238)] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_24px_oklch(56.5%_0.186_258_/_0.32)] transition-[filter,transform] hover:brightness-105 active:scale-[0.99]"
          >
            <Youtube className="h-5 w-5" strokeWidth={2} />
            {live ? "유튜브로 실시간 예배 보기" : "유튜브 채널 미리 열기"}
          </a>
          <button
            onClick={close}
            className="mt-2.5 w-full py-2 text-[14px] text-gray-500 transition-colors hover:text-gray-700"
          >
            다음에 볼게요
          </button>
        </div>
      </div>
    </div>
  );
}
