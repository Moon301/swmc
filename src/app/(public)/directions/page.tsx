"use client";

import { useEffect } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { CHURCH_INFO } from "@/lib/constants";

export default function DirectionsPage() {
  useEffect(() => {
    const initMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        if (!container) return;

        const lat = CHURCH_INFO.lat;
        const lng = CHURCH_INFO.lng;
        const options = {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 4,
        };

        const map = new window.kakao.maps.Map(container, options);
        const marker = new kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(lat, lng),
          clickable: true,
        });
        marker.setMap(map);

        const iw = new kakao.maps.InfoWindow({
          content: `<div style="padding:5px 10px;font-size:13px;white-space:nowrap">${CHURCH_INFO.name}</div>`,
          removable: true,
        });
        kakao.maps.event.addListener(marker, "click", () => iw.open(map, marker));
        iw.open(map, marker);
      });
    };

    if (window.kakao && window.kakao.maps) initMap();
  }, []);

  const copyAddress = () => {
    navigator.clipboard.writeText(`${CHURCH_INFO.address} ${CHURCH_INFO.addressDetail}`);
    toast.success("주소가 복사되었습니다");
  };

  return (
    <div>
      <div className="border-b border-gray-200/70">
        <div className="mx-auto max-w-[1100px] px-5 py-12 sm:py-16">
          <p className="text-[13px] font-medium text-primary">Directions</p>
          <h1 className="mt-2 text-[36px] font-bold text-gray-900 sm:text-[44px]">오시는길</h1>
        </div>
      </div>

      <div className="mx-auto max-w-[800px] px-5 py-12 sm:py-16">
        <div id="map" className="h-72 w-full overflow-hidden rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:h-[400px]" />

        <div className="mt-6 text-center">
          <p className="text-[18px] font-bold text-gray-900">{CHURCH_INFO.name}</p>
          <p className="mt-1 text-[13px] text-gray-500">{CHURCH_INFO.denomination}</p>

          <button
            onClick={copyAddress}
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-4 py-2 text-[13px] text-gray-600 transition-colors hover:bg-gray-200"
          >
            <Copy className="h-3.5 w-3.5" />
            {CHURCH_INFO.address} {CHURCH_INFO.addressDetail}
          </button>

          <div className="mt-3 flex justify-center gap-2">
            <a
              href={`https://map.kakao.com/link/map/${encodeURIComponent(CHURCH_INFO.name)},${CHURCH_INFO.lat},${CHURCH_INFO.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#FFCD00] px-5 py-2 text-[13px] font-medium text-black transition-colors hover:bg-[#f3ba00]"
            >
              카카오맵
            </a>
            <a
              href={`https://map.naver.com/v5/search/${encodeURIComponent(CHURCH_INFO.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#03C75A] px-5 py-2 text-[13px] font-medium text-white transition-colors hover:bg-[#02b351]"
            >
              네이버맵
            </a>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {[
            { label: "전화번호", value: `${CHURCH_INFO.phone} / ${CHURCH_INFO.phone2}` },
            { label: "팩스", value: CHURCH_INFO.fax },
            { label: "담임목사", value: `${CHURCH_INFO.pastor} (${CHURCH_INFO.mobile})` },
            { label: "주소", value: `${CHURCH_INFO.address} ${CHURCH_INFO.addressDetail}` },
          ].map((item) => (
            <div key={item.label} className="card-soft px-5 py-4">
              <p className="text-[13px] font-semibold text-gray-700">{item.label}</p>
              <p className="mt-1 text-[14px] text-gray-500">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
