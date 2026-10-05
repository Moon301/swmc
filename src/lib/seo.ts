import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "./constants";

interface SeoParams {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
}

export function generatePageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "",
  ogImage,
}: SeoParams): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const url = `${SITE_URL}${path}`;

  return {
    /* <title>은 루트 레이아웃의 템플릿("%s | 교회명")이 교회명을 붙이므로 페이지 제목만 넘긴다.
       (두 곳에서 붙여 "오시는길 | 교회명 | 교회명"으로 중복되던 버그 수정) */
    title: title ?? { absolute: SITE_NAME },
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "ko_KR",
      type: "website",
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] }),
    },
    alternates: { canonical: url },
  };
}
