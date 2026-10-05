import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SupabaseProvider } from "@/components/providers/SupabaseProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

/* 명조 — 성회 배너 등 품격이 필요한 타이틀 전용 */
const notoSerifKR = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["600", "700", "900"],
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "성은세계선교교회",
    "전주교회",
    "장로교회",
    "대한예수교장로회",
    "전주시교회",
    "완산구교회",
  ],
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} ${notoSerifKR.variable}`}>
      <body className="font-sans antialiased">
        <SupabaseProvider>
          <AuthProvider>
            {children}
            <ToastProvider />
          </AuthProvider>
        </SupabaseProvider>
        <Analytics />
      </body>
    </html>
  );
}
