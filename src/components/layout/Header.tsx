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

  const hasChildren = (item: NavItem): item is NavItem & { children: readonly { label: string; href: string }[] } => {
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
        <nav className="hidden items-center gap-9 lg:flex">
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
                    "py-6 text-[15px] font-medium transition-colors",
                    pathname.startsWith(item.href)
                      ? "text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  {item.label}
                </Link>

                {/* Dropdown — light, minimal */}
                {openDropdown === item.label && (
                  <div
                    className="absolute left-1/2 top-full -translate-x-1/2"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="mt-1 min-w-[160px] overflow-hidden rounded-2xl bg-white py-2 shadow-[0_8px_24px_rgba(0,0,0,0.08)] ring-1 ring-gray-100">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "block px-5 py-2.5 text-[14px] transition-colors",
                            pathname === child.href
                              ? "font-medium text-gray-900"
                              : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                          )}
                        >
                          {child.label}
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
                  "py-6 text-[15px] font-medium transition-colors",
                  pathname.startsWith(item.href)
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
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
                    <div className="pb-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "block py-3 text-[15px] transition-colors",
                            pathname === child.href
                              ? "font-medium text-gray-900"
                              : "text-gray-500"
                          )}
                        >
                          {child.label}
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
