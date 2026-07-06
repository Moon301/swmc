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
    title: fullTitle,
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
