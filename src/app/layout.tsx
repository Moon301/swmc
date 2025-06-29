import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "성령 대부흥 성회",
  description: "회개운동・성령운동・신부단장 마지막 때를 향한 하나님의 말씀",
  openGraph: {
    title: "성령 대부흥 성회에 여러분을 초청합니다.",
    description: "회개운동・성령운동・신부단장 마지막 때를 향한 하나님의 말씀",
    url: "https://swmc.vercel.app",
    siteName: "성령대부흥성회",
    images: [
      {
        url: "https://swmc.vercel.app/images/main_title.png",
        width: 1200,
        height: 630,
        alt: "성령대부흥성회",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <Script
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`}
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
