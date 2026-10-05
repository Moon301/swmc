"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_ITEMS, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

type NavItem = (typeof NAV_ITEMS)[number];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  const hasChildren = (item: NavItem): item is NavItem & { children: readonly { label: string; href: string; description: string }[] } => {
    return "children" in item && !!item.children;
  };

  /* 캡슐은 최상단에서 투명 — 히어로 하늘 위에 그대로 얹힌다.
     스크롤·드롭다운·모바일 메뉴가 열리면 유리 패널로 떠오른다 */
  const raised = scrolled || !!openDropdown || mobileOpen;

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-[1140px] px-4 pb-2 pt-3 sm:px-5">
        <div
          className={cn(
            "flex h-14 items-center justify-between rounded-[18px] pl-4 pr-2 transition-all duration-300 sm:h-[60px] sm:pl-5 sm:pr-3",
            raised ? "glass-panel" : "bg-transparent"
          )}
        >
          {/* Logo + wordmark */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt={`${SITE_NAME} 로고`}
              width={28}
              height={28}
              className="h-6 w-6 object-contain sm:h-7 sm:w-7"
              priority
            />
            <span className="text-[17px] font-bold tracking-[-0.01em] text-gray-900 sm:text-[18px]">
              {SITE_NAME}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden h-full items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) =>
              hasChildren(item) ? (
                <div
                  key={item.label}
                  className="relative flex h-full items-center"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 rounded-full px-3.5 py-2 text-[15px] font-semibold transition-colors duration-150",
                      openDropdown === item.label
                        ? "bg-primary/[0.08] text-gray-900"
                        : "text-gray-800 hover:bg-primary/[0.07] hover:text-gray-900"
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 text-gray-400 transition-transform duration-200",
                        openDropdown === item.label && "rotate-180"
                      )}
                      strokeWidth={2.5}
                    />
                  </Link>

                  {/* Mega menu — 캡슐에서 떨어져 나온 독립 카드 */}
                  {openDropdown === item.label && (
                    <div
                      className="absolute left-0 top-full z-50 pt-2"
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="animate-dropdown-in w-[290px] rounded-[20px] bg-background p-2 ring-1 ring-primary/10 shadow-[0_16px_44px_-10px_rgba(23,37,84,0.22)]">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            target={child.href.startsWith("http") ? "_blank" : undefined}
                            rel={child.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="group block rounded-[14px] px-4 py-3 transition-colors duration-150 hover:bg-primary/[0.06]"
                          >
                            <span
                              className={cn(
                                "block text-[15px] font-semibold leading-snug transition-colors duration-150 group-hover:text-secondary",
                                pathname === child.href
                                  ? "text-secondary"
                                  : "text-gray-900"
                              )}
                            >
                              {child.label}
                            </span>
                            <span className="mt-0.5 block text-[13px] leading-snug text-gray-500">
                              {child.description}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "block rounded-full px-3.5 py-2 text-[15px] font-semibold transition-colors duration-150",
                    pathname.startsWith(item.href)
                      ? "text-gray-900"
                      : "text-gray-700",
                    "hover:bg-primary/[0.07] hover:text-gray-900"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-900 transition-colors hover:bg-primary/[0.07] lg:hidden"
            aria-label="메뉴"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu — 캡슐 아래에 붙는 카드 */}
        {mobileOpen && (
          <div className="animate-dropdown-in mt-2 max-h-[calc(100svh-5.5rem)] overflow-y-auto rounded-[20px] bg-background px-5 py-2 ring-1 ring-primary/10 shadow-[0_16px_44px_-10px_rgba(23,37,84,0.22)] lg:hidden">
            <nav>
              {NAV_ITEMS.map((item) =>
                hasChildren(item) ? (
                  <div key={item.label} className="border-b border-gray-100 last:border-0">
                    <button
                      onClick={() =>
                        setMobileExpanded(
                          mobileExpanded === item.label ? null : item.label
                        )
                      }
                      className={cn(
                        "flex w-full items-center justify-between py-4 text-[17px] font-semibold transition-colors",
                        pathname.startsWith(item.href)
                          ? "text-gray-900"
                          : "text-gray-700"
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 text-gray-400 transition-transform",
                          mobileExpanded === item.label && "rotate-180"
                        )}
                      />
                    </button>
                    {mobileExpanded === item.label && (
                      <div className="pb-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            target={child.href.startsWith("http") ? "_blank" : undefined}
                            rel={child.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="-mx-2 block rounded-[14px] px-2 py-2.5 transition-colors active:bg-primary/[0.06]"
                          >
                            <span
                              className={cn(
                                "block text-[15px] leading-snug",
                                pathname === child.href
                                  ? "font-semibold text-secondary"
                                  : "font-medium text-gray-800"
                              )}
                            >
                              {child.label}
                            </span>
                            <span className="mt-0.5 block text-[13px] leading-snug text-gray-400">
                              {child.description}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block border-b border-gray-100 py-4 text-[17px] font-semibold transition-colors last:border-0",
                      pathname.startsWith(item.href)
                        ? "text-gray-900"
                        : "text-gray-700"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
