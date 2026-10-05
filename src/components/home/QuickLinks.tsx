import Link from "next/link";
import Image from "next/image";
import { CHURCH_INFO } from "@/lib/constants";

/* 원본(Wix) 홈과 같은 구성 — 이미지 위 중앙 라벨만. 이미지도 원본 사이트 것을 그대로 쓴다 */
const links = [
  { label: "주일말씀", href: CHURCH_INFO.youtube, external: true, image: "/images/quick/sermon.png" },
  { label: "예배안내", href: "/worship", image: "/images/quick/worship.png" },
  { label: "성회안내", href: "/revival-schedule", image: "/images/quick/revival.png" },
  { label: "온라인헌금", href: "/offering", image: "/images/quick/offering.png" },
];

export function QuickLinks() {
  return (
    <section className="pb-14 pt-5 sm:pb-20">
      <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-3 px-4 sm:gap-4 sm:px-5 lg:max-w-[min(1100px,calc((100svh-340px)*1.7778))] lg:grid-cols-4">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-900 lg:aspect-auto lg:h-[160px]"
          >
            {/* 이미지만 확대 — 라벨은 고정이라 글자가 흔들리지 않는다 */}
            <Image
              src={link.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 270px, 50vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.07]"
            />
            <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/25" />

            <div className="relative z-10 flex h-full items-center justify-center">
              <p className="text-[20px] font-bold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] sm:text-[22px] lg:text-[24px]">
                {link.label}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
