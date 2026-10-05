import Image from "next/image";
import { Youtube, MapPin, Phone } from "lucide-react";
import { SITE_NAME, CHURCH_INFO, OFFERING_ACCOUNTS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-gray-200/70">
      <div className="mx-auto max-w-[1100px] px-5 py-16 sm:py-20">
        <div className="flex flex-col gap-12 sm:flex-row sm:justify-between sm:gap-16">
          {/* Identity */}
          <div className="max-w-[320px]">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt={`${SITE_NAME} 로고`}
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
              />
              <p className="text-[20px] font-bold tracking-tight text-gray-900 sm:text-[22px]">
                {SITE_NAME}
              </p>
            </div>
            <p className="mt-4 text-[14px] leading-relaxed text-gray-500">
              {CHURCH_INFO.slogan}
            </p>
            <a
              href={CHURCH_INFO.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/70 px-4 py-2 text-[13px] font-medium text-gray-700 backdrop-blur-sm transition-all hover:border-primary/20 hover:bg-white hover:text-gray-900"
            >
              <Youtube className="h-4 w-4 text-primary" strokeWidth={2} />
              YouTube 채널
            </a>

          </div>

          {/* 교회 안내 (바로가기 메뉴는 사용자 지시로 제거) */}
            <div>
              <p className="text-[13px] font-semibold tracking-wide text-gray-900">교회 안내</p>
              <ul className="mt-4 space-y-3 text-[13px] leading-relaxed text-gray-500">
                <li className="flex gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" strokeWidth={2} />
                  <span>
                    {CHURCH_INFO.address}
                    <br />
                    {CHURCH_INFO.addressDetail}
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" strokeWidth={2} />
                  <span>
                    TEL {CHURCH_INFO.phone} / {CHURCH_INFO.phone2}
                    <br />
                    FAX {CHURCH_INFO.fax}
                  </span>
                </li>
              </ul>
            </div>
        </div>

        {/* 선교후원 계좌 — 원본 사이트 푸터 정보 */}
        <div className="mt-12 rounded-2xl bg-gray-50 px-5 py-4 sm:px-6">
          <p className="text-[13px] font-semibold text-gray-700">
            선교후원 (예금주: {SITE_NAME})
          </p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-gray-500">
            {OFFERING_ACCOUNTS.footer.map((a) => `${a.bank} ${a.number}`).join("  |  ")}
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-14 border-t border-gray-200/70 pt-6">
          {/* 원본 Wix 푸터의 저작권 표기 그대로 (사용자 지정) */}
          <p className="text-[13px] text-gray-400">&copy;2023 by SeongEun Young Adult Midea Team Created</p>
        </div>
      </div>
    </footer>
  );
}
