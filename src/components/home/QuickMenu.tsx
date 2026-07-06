import Link from "next/link";

const menus: { label: string; href: string; external?: boolean }[] = [
  { label: "목사님 소개", href: "/pastor" },
  { label: "찬양대", href: "/departments" },
  { label: "다음카페", href: "https://m.cafe.daum.net/hgwmc", external: true },
  { label: "오시는길", href: "/directions" },
  { label: "청년부", href: "/departments" },
];

export function QuickMenu() {
  return (
    <section className="border-t border-gray-100 bg-white">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-8 sm:gap-x-14 sm:py-10">
        {menus.map((menu) =>
          menu.external ? (
            <a
              key={menu.label}
              href={menu.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] font-medium text-gray-500 transition-colors hover:text-gray-900 sm:text-[15px]"
            >
              {menu.label}
            </a>
          ) : (
            <Link
              key={menu.label}
              href={menu.href}
              className="text-[14px] font-medium text-gray-500 transition-colors hover:text-gray-900 sm:text-[15px]"
            >
              {menu.label}
            </Link>
          )
        )}
      </div>
    </section>
  );
}
