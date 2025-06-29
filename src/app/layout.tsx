import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "성령 대부흥 성회",
  description: "회개운동! 성령운동! 신부단장 ! 2025년 8월 15일(금) 오전 11시 워커힐 호텔.",
  openGraph: {
    title: "제19차 성령 대부흥 성회를 초청합니다.",
    description: "회개운동! 성령운동! 신부단장 ! 2025년 8월 15일(금) 오전 11시 워커힐 호텔.",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
