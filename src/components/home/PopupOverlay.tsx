"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import type { Popup } from "@/types";

interface PopupOverlayProps {
  popups: Popup[];
}

export function PopupOverlay({ popups }: PopupOverlayProps) {
  const [visiblePopups, setVisiblePopups] = useState<Popup[]>([]);

  useEffect(() => {
    const filtered = popups.filter((popup) => {
      const key = `popup_closed_${popup.id}`;
      const closedAt = localStorage.getItem(key);
      if (closedAt && popup.show_today_close) {
        const closedDate = new Date(closedAt).toDateString();
        const today = new Date().toDateString();
        if (closedDate === today) return false;
      }
      return true;
    });
    setVisiblePopups(filtered);
  }, [popups]);

  const closePopup = (popup: Popup, todayClose: boolean) => {
    if (todayClose) {
      localStorage.setItem(`popup_closed_${popup.id}`, new Date().toISOString());
    }
    setVisiblePopups((prev) => prev.filter((p) => p.id !== popup.id));
  };

  if (visiblePopups.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      {visiblePopups.map((popup) => (
        <div
          key={popup.id}
          className="relative mx-2 max-h-[80vh] w-full max-w-md overflow-y-auto rounded-xl bg-card shadow-xl"
        >
          <button
            onClick={() => closePopup(popup, false)}
            className="absolute right-3 top-3 z-10 rounded-full bg-black/40 p-1 text-white hover:bg-black/60"
            aria-label="닫기"
          >
            <X className="h-4 w-4" />
          </button>

          {popup.image_url && (
            <div className="relative aspect-[3/4] w-full">
              {popup.link_url ? (
                <Link href={popup.link_url} onClick={() => closePopup(popup, false)}>
                  <Image
                    src={popup.image_url}
                    alt={popup.title}
                    fill
                    className="rounded-t-xl object-cover"
                  />
                </Link>
              ) : (
                <Image
                  src={popup.image_url}
                  alt={popup.title}
                  fill
                  className="rounded-t-xl object-cover"
                />
              )}
            </div>
          )}

          {popup.content && (
            <div
              className="p-4 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: popup.content }}
            />
          )}

          {popup.show_today_close && (
            <div className="border-t border-border p-3">
              <button
                onClick={() => closePopup(popup, true)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                오늘 하루 보지 않기
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
