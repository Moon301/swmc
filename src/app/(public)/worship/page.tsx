export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { generatePageMetadata } from "@/lib/seo";
import { CHURCH_INFO } from "@/lib/constants";

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

  const fallback = [
    { name: "주일낮예배", time: "매주 일요일 오전 11:00", location: "본당" },
    { name: "주일저녁예배", time: "매주 일요일 오후 7:00", location: "본당" },
    { name: "수요예배", time: "매주 수요일 오후 7:30", location: "본당" },
    { name: "금요기도회", time: "매주 금요일 오후 9:00", location: "본당" },
    { name: "새벽기도회", time: "매일 오전 5:00", location: "본당" },
    { name: "특별새벽기도회", time: "매일 오전 4:00~7:00", location: "본당" },
  ];

  const list = services && services.length > 0
    ? services.map((s) => ({ name: s.name, time: `${s.day_of_week} ${s.time}`, location: s.location }))
    : fallback;

  return (
    <div>
      <div className="border-b border-gray-200/70">
        <div className="mx-auto max-w-[1100px] px-5 py-12 sm:py-16">
          <p className="text-[13px] font-medium text-primary">Worship</p>
          <h1 className="mt-2 text-[36px] font-bold text-gray-900 sm:text-[44px]">예배안내</h1>
          <p className="mt-3 text-[16px] text-gray-500">
            하나님을 예배하는 거룩한 시간에 함께해 주세요
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[800px] px-5 py-12 sm:py-16">
        <div className="grid gap-3 sm:grid-cols-2">
          {list.map((service, i) => (
            <div
              key={i}
              className="card-soft card-soft-hover px-6 py-5"
            >
              <p className="text-[15px] font-bold text-gray-900">{service.name}</p>
              <p className="mt-2 text-[14px] text-gray-600">{service.time}</p>
              {service.location && (
                <p className="mt-0.5 text-[13px] text-gray-400">{service.location}</p>
              )}
            </div>
          ))}
        </div>

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
