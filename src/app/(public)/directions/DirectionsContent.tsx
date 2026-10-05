"use client";

import { Copy } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { toast } from "sonner";
import { CHURCH_INFO, BRANCHES } from "@/lib/constants";
import { GlassTable } from "@/components/ui/GlassTable";
import { KakaoMap } from "@/components/ui/KakaoMap";

export function DirectionsContent() {
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

        {/* 서울 지성전 — 원본 사이트 '수도권' 안내 */}
        <h2 className="mt-16 text-[22px] font-bold text-gray-900">서울 지성전</h2>
        <GlassTable className="mt-9 sm:mt-10">
          {BRANCHES.map((b) => (
            <div key={b.name} className="grid gap-4 px-6 py-6 sm:grid-cols-[170px_1fr] sm:gap-8 sm:px-7">
              <div>
                <p className="text-[17px] font-bold text-gray-900">{b.name}</p>
                <a
                  href={`https://map.kakao.com/link/search/${encodeURIComponent(b.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block rounded-full border border-[#FFCD00] bg-transparent px-4 py-1.5 text-[13px] font-medium text-gray-700 transition-colors hover:bg-[#FFCD00]/15"
                >
                  카카오맵
                </a>
              </div>
              <dl className="grid gap-y-2 text-[14px] sm:grid-cols-[72px_1fr] sm:gap-x-5">
                <dt className="font-semibold text-gray-500">주소</dt>
                <dd className="text-gray-800">
                  ({b.zip}) {b.address} <span className="text-gray-500">{b.addressDetail}</span>
                </dd>
                <dt className="font-semibold text-gray-500">대표번호</dt>
                <dd className="text-gray-800">{b.phones.join("  |  ")}</dd>
                <dt className="font-semibold text-gray-500">목사</dt>
                <dd className="text-gray-800">{b.pastors}</dd>
                <dt className="font-semibold text-gray-500">전철역</dt>
                <dd className="text-gray-800">{b.subway}</dd>
              </dl>
            </div>
          ))}
        </GlassTable>
      </div>
    </div>
  );
}
