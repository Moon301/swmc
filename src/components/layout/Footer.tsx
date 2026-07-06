import Link from "next/link";
import { SITE_NAME, CHURCH_INFO } from "@/lib/constants";

const QUICK_LINKS = [
  { label: "교회소개", href: "/about" },
  { label: "예배안내", href: "/worship" },
  { label: "설교영상", href: "/sermons" },
  { label: "성회안내", href: "/revival-info" },
  { label: "오시는길", href: "/directions" },
];

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-[1100px] px-5 py-16 sm:py-20">
        {/* Identity */}
        <p className="text-[20px] font-bold tracking-tight text-gray-900 sm:text-[22px]">
          {SITE_NAME}
        </p>

        {/* Quick links row */}
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[14px] text-gray-500 transition-colors hover:text-gray-900"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={CHURCH_INFO.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] text-gray-500 transition-colors hover:text-gray-900"
          >
            YouTube
          </a>
        </div>

        {/* Info */}
        <div className="mt-10 space-y-1.5 text-[13px] leading-relaxed text-gray-400">
          <p>
            {CHURCH_INFO.denomination} · 담임 {CHURCH_INFO.pastor}
          </p>
          <p>
            {CHURCH_INFO.address} {CHURCH_INFO.addressDetail}
          </p>
          <p>
            TEL {CHURCH_INFO.phone} / {CHURCH_INFO.phone2} · FAX {CHURCH_INFO.fax}
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex items-center justify-between border-t border-gray-100 pt-6">
          <p className="text-[12px] text-gray-400">
            &copy; {new Date().getFullYear()} {SITE_NAME}
          </p>
          <Link
            href="/login"
            className="text-[12px] text-gray-400 transition-colors hover:text-gray-600"
          >
            관리자
          </Link>
        </div>
      </div>
    </footer>
  );
}
