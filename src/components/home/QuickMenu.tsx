import Link from "next/link";
import {
  UserRound,
  Sparkles,
  MessagesSquare,
  MapPin,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { CHURCH_INFO } from "@/lib/constants";

const menus: {
  label: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
}[] = [
  { label: "목사님 소개", href: "/pastor", icon: UserRound },
  { label: "신부단장", href: "/bride", icon: Sparkles },
  { label: "다음카페", href: CHURCH_INFO.cafe, icon: MessagesSquare, external: true },
  { label: "오시는길", href: "/directions", icon: MapPin },
];

/* 글래스 아이콘 타일 — 반투명 화이트 + 블러 + 인셋 화이트 링 (헤더 캡슐과 같은 문법) */
const tile =
  "flex h-16 w-16 items-center justify-center rounded-[22px] bg-white/60 ring-1 ring-white/70 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_4px_16px_-4px_rgba(23,37,84,0.1)] transition-all duration-200 group-hover:-translate-y-1 group-hover:bg-white/90 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_24px_-6px_rgba(23,37,84,0.16)] sm:h-[72px] sm:w-[72px]";

function MenuItem({
  label,
  icon: Icon,
  external,
}: {
  label: string;
  icon: LucideIcon;
  external?: boolean;
}) {
  return (
    <>
      <span className={tile}>
        <Icon
          className="h-6 w-6 text-secondary transition-transform duration-200 group-hover:scale-110 sm:h-7 sm:w-7"
          strokeWidth={1.8}
        />
      </span>
      <span className="flex items-center gap-0.5 text-[13px] font-medium text-gray-600 transition-colors group-hover:text-gray-900 sm:text-[14px]">
        {label}
        {external && (
          <ArrowUpRight className="h-3 w-3 text-gray-400" strokeWidth={2.5} />
        )}
      </span>
    </>
  );
}

export function QuickMenu() {
  return (
    <section className="pb-20 sm:pb-28">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-start justify-center gap-x-7 gap-y-6 px-5 sm:gap-x-10">
        {menus.map((menu) =>
          menu.external ? (
            <a
              key={menu.label}
              href={menu.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2.5"
            >
              <MenuItem {...menu} />
            </a>
          ) : (
            <Link
              key={menu.label}
              href={menu.href}
              className="group flex flex-col items-center gap-2.5"
            >
              <MenuItem {...menu} />
            </Link>
          )
        )}
      </div>
    </section>
  );
}
