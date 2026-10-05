import { CHURCH_INFO, SITE_URL, SITE_DESCRIPTION } from "@/lib/constants";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ChurchJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Church",
        name: CHURCH_INFO.name,
        alternateName: CHURCH_INFO.nameEn,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
        image: `${SITE_URL}/opengraph-image.jpg`,
        description: SITE_DESCRIPTION,
        address: {
          "@type": "PostalAddress",
          streetAddress: "쑥고개로 384-6",
          addressLocality: "전주시 완산구",
          addressRegion: "전북특별자치도",
          postalCode: CHURCH_INFO.zipCode,
          addressCountry: "KR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: CHURCH_INFO.lat,
          longitude: CHURCH_INFO.lng,
        },
        telephone: `+82-${CHURCH_INFO.phone.replace(/^0/, "")}`,
        faxNumber: `+82-${CHURCH_INFO.fax.replace(/^0/, "")}`,
        sameAs: [CHURCH_INFO.youtube, CHURCH_INFO.cafe],
        parentOrganization: {
          "@type": "Organization",
          name: "대한예수교장로회 합동중앙총회",
        },
      }}
    />
  );
}
