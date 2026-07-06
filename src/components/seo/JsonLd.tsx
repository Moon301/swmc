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
        name: "성은세계선교교회",
        alternateName: "Seongeun World Mission Church",
        url: "https://seongeunch.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "쑥고개로 384-6",
          addressLocality: "전주시 완산구",
          addressRegion: "전라북도",
          addressCountry: "KR",
        },
        telephone: "063-224-2245",
        parentOrganization: {
          "@type": "Organization",
          name: "대한예수교장로회",
        },
      }}
    />
  );
}
