"use client";

import { Copy } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { toast } from "sonner";
import { CHURCH_INFO } from "@/lib/constants";
import { KakaoMap } from "@/components/ui/KakaoMap";

export default function DirectionsPage() {
  const copyAddress = () => {
    navigator.clipboard.writeText(`${CHURCH_INFO.address} ${CHURCH_INFO.addressDetail}`);
    toast.success("주소가 복사되었습니다");
  };

  return (
    <div>
      <PageHero title="오시는길" />

      <div className="mx-auto max-w-[800px] px-5 py-12 sm:py-16">
        <KakaoMap
          lat={CHURCH_INFO.lat}
          lng={CHURCH_INFO.lng}
          label={CHURCH_INFO.name}
          className="h-72 w-full overflow-hidden rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:h-[400px]"
        />

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
