"use client";

import Link from "next/link";
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

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-white/70 backdrop-blur-xl backdrop-saturate-150 shadow-[0_1px_0_rgba(0,0,0,0.05)]"
          : "bg-white"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-5 sm:h-[68px]">
        {/* Wordmark logo */}
        <Link href="/" className="text-[17px] font-bold tracking-tight text-gray-900 sm:text-[18px]">
          {SITE_NAME}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) =>
            hasChildren(item) ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "block rounded-[10px] px-3.5 py-2 text-[15px] font-semibold transition-colors duration-150",
                    pathname.startsWith(item.href)
                      ? "text-gray-900"
                      : "text-gray-700",
                    "hover:bg-[#f2f4f6] hover:text-gray-900"
                  )}
                >
                  {item.label}
                </Link>

                {/* Mega menu — Toss-style card */}
                {openDropdown === item.label && (
                  <div
                    className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="animate-dropdown-in w-[300px] rounded-[20px] bg-white p-2 shadow-[0_0_1px_rgba(2,32,71,0.08),0_12px_40px_rgba(2,32,71,0.12)]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="group block rounded-[14px] px-4 py-3 transition-colors duration-150 hover:bg-[#f2f4f6]"
                        >
                          <span
                            className={cn(
                              "block text-[15px] font-semibold leading-snug",
                              pathname === child.href
                                ? "text-[#2B5797]"
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
                  "block rounded-[10px] px-3.5 py-2 text-[15px] font-semibold transition-colors duration-150",
                  pathname.startsWith(item.href)
                    ? "text-gray-900"
                    : "text-gray-700",
                  "hover:bg-[#f2f4f6] hover:text-gray-900"
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
          className="flex h-10 w-10 items-center justify-center -mr-2 text-gray-900 lg:hidden"
          aria-label="메뉴"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-white lg:hidden sm:top-[68px]">
          <nav className="h-full overflow-y-auto px-5 pb-12 pt-2">
            {NAV_ITEMS.map((item) =>
              hasChildren(item) ? (
                <div key={item.label} className="border-b border-gray-100">
                  <button
                    onClick={() =>
                      setMobileExpanded(
                        mobileExpanded === item.label ? null : item.label
                      )
                    }
                    className={cn(
                      "flex w-full items-center justify-between py-5 text-[17px] font-semibold transition-colors",
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
                          className="-mx-2 block rounded-[14px] px-2 py-2.5 transition-colors active:bg-[#f2f4f6]"
                        >
                          <span
                            className={cn(
                              "block text-[15px] leading-snug",
                              pathname === child.href
                                ? "font-semibold text-[#2B5797]"
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
                    "block border-b border-gray-100 py-5 text-[17px] font-semibold transition-colors",
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
    </header>
  );
}
