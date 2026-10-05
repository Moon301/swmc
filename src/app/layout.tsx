import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SupabaseProvider } from "@/components/providers/SupabaseProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";

/* 폰트는 런타임에 Google Fonts 스타일시트로 불러온다.
   next/font/google은 빌드 때 fonts.gstatic.com에서 파일을 내려받는데, Vercel 빌드 머신에서
   그 다운로드가 실패하면 빌드 전체가 깨진다 (2026-10-05 실제 발생). 런타임 로드는 빌드와 무관하고
   Google이 unicode-range로 한글 서브셋을 나눠 주므로 용량도 next/font와 같다. */
const GOOGLE_FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&family=Noto+Serif+KR:wght@600;700;900&display=swap";

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
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={GOOGLE_FONTS_HREF} />
      </head>
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
