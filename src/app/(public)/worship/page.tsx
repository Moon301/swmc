export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { generatePageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { GlassTable } from "@/components/ui/GlassTable";
import { CHURCH_INFO, WORSHIP_TIMES } from "@/lib/constants";

export const metadata = generatePageMetadata({
  title: "예배안내",
  description: "성은세계선교교회 예배시간 및 장소 안내",
  path: "/worship",
});

export default async function WorshipPage() {
  const supabase = await createClient();
  const { data: services } = await supabase
    .from("worship_services")
    .select("*")
    .order("display_order");

  const hasDb = services && services.length > 0;

  return (
    <div>
      <PageHero
        title="예배안내"
        description={
          <>
            하나님은 영이시니 예배하는 자가 신령과 진정으로 예배할지니라
            <span className="ml-2 text-[14px] text-gray-400">요한복음 4:24</span>
          </>
        }
      />

      <div className="mx-auto max-w-[800px] px-5 py-12 sm:py-16">
        {hasDb ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((service) => (
              <div key={service.id} className="card-soft card-soft-hover px-6 py-5">
                <p className="text-[15px] font-bold text-gray-900">{service.name}</p>
                <p className="mt-2 text-[14px] text-gray-600">
                  {service.day_of_week} {service.time}
                </p>
                {service.location && (
                  <p className="mt-0.5 text-[13px] text-gray-400">{service.location}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-10">
            {[
              { title: "주일 예배시간", rows: WORSHIP_TIMES.sunday },
              { title: "주중 예배시간", rows: WORSHIP_TIMES.weekday },
            ].map((group) => (
              <section key={group.title}>
                <h2 className="text-[20px] font-bold text-gray-900">{group.title}</h2>
                {/* 바탕과 구분되도록 글래스 표 (연혁·5대 사역과 같은 스타일) */}
                <GlassTable
                  className="mt-7"
                  head={
                    <div className="grid grid-cols-[1.3fr_1fr_1fr] gap-4">
                      <p>예배</p>
                      <p>시간</p>
                      <p>장소</p>
                    </div>
                  }
                >
                  {group.rows.map((row) => (
                    <div key={row.name} className="grid grid-cols-[1.3fr_1fr_1fr] items-center gap-4 px-6 py-4 sm:px-7">
                      <p className="text-[15px] font-bold text-gray-900">{row.name}</p>
                      <p className="text-[15px] font-semibold text-secondary">{row.time}</p>
                      <p className="text-[14px] text-gray-600">{row.location}</p>
                    </div>
                  ))}
                </GlassTable>
              </section>
            ))}
            <p className="text-[14px] text-gray-500">{WORSHIP_TIMES.note}</p>
          </div>
        )}

        {/* YouTube */}
        <div className="mt-10 card-soft p-6 text-center sm:p-8">
          <p className="text-[15px] font-bold text-gray-900">온라인 예배</p>
          <p className="mt-2 text-[14px] text-gray-500">
            주일 대예배를 유튜브로 실시간 중계합니다
          </p>
          <a
            href={CHURCH_INFO.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block rounded-full bg-gray-900 px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-gray-800"
          >
            YouTube 채널
          </a>
        </div>

        {/* Location */}
        <div className="mt-6 card-soft p-6 sm:p-8">
          <p className="text-[15px] font-bold text-gray-900">예배 장소</p>
          <div className="mt-3 space-y-1 text-[14px] text-gray-500">
            <p>{CHURCH_INFO.address} {CHURCH_INFO.addressDetail}</p>
            <p>TEL {CHURCH_INFO.phone} / {CHURCH_INFO.phone2}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
