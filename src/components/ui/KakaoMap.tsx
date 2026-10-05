"use client";

/* 카카오맵 공용 컴포넌트 — 마커 하나 + 라벨.
 *
 * SDK는 이 컴포넌트가 마운트된 페이지에서만 afterInteractive로 로드한다.
 * 루트 레이아웃 beforeInteractive로 두면 SDK 로드 실패(광고차단·ORB) 시
 * 사이트 전체 하이드레이션이 멈추는 것을 확인했다 — 전역으로 올리지 말 것 */

import { useCallback, useId } from "react";
import Script from "next/script";

export function KakaoMap({
  lat,
  lng,
  label,
  level = 4,
  className = "h-72 w-full overflow-hidden rounded-2xl sm:h-[400px]",
}: {
  lat: number;
  lng: number;
  label: string;
  level?: number;
  className?: string;
}) {
  const id = useId();
  const containerId = `kakao-map-${id.replace(/[^a-zA-Z0-9]/g, "")}`;

  const init = useCallback(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById(containerId);
      if (!container) return;
      const pos = new window.kakao.maps.LatLng(lat, lng);
      const map = new window.kakao.maps.Map(container, { center: pos, level });
      const marker = new window.kakao.maps.Marker({ position: pos, clickable: true });
      marker.setMap(map);
      const iw = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:5px 10px;font-size:13px;white-space:nowrap">${label}</div>`,
        removable: true,
      });
      window.kakao.maps.event.addListener(marker, "click", () => iw.open(map, marker));
      iw.open(map, marker);
    });
  }, [containerId, lat, lng, label, level]);

  return (
    <>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`}
        strategy="afterInteractive"
        onLoad={init}
        onReady={() => {
          // 클라이언트 네비게이션으로 재진입하면 스크립트는 이미 로드돼 있다
          if (window.kakao?.maps) init();
        }}
      />
      <div id={containerId} className={className} />
    </>
  );
}
