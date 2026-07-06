import Link from "next/link";
import { CHURCH_INFO } from "@/lib/constants";

const links = [
  {
    label: "주일말씀",
    href: CHURCH_INFO.youtube,
    external: true,
    image:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=80&auto=format&fit=crop",
  },
  {
    label: "예배안내",
    href: "/worship",
    image:
      "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=800&q=80&auto=format&fit=crop",
  },
  {
    label: "성회안내",
    href: "/revival-info",
    image:
      "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=800&q=80&auto=format&fit=crop",
  },
  {
    label: "온라인헌금",
    href: "/offering",
    image:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80&auto=format&fit=crop",
  },
];

export function QuickLinks() {
  return (
    <section className="py-10 sm:py-14 lg:py-8">
      <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-3 px-5 sm:gap-4 lg:grid-cols-4 lg:max-w-[min(1100px,calc((100svh-340px)*1.7778))]">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className="@container group relative aspect-[4/3] lg:aspect-auto lg:h-[160px] overflow-hidden rounded-xl bg-gray-900 bg-cover bg-center"
            style={{ backgroundImage: `url(${link.image})` }}
          >
            <div className="absolute inset-0 bg-black/45 transition-colors duration-300 group-hover:bg-black/30" />
            <div className="relative z-10 flex h-full items-center justify-center">
              <p className="text-[clamp(16px,11cqw,26px)] font-bold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                {link.label}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
