import Link from "next/link";
import type { WorshipService } from "@/types";

interface WorshipScheduleProps {
  services: WorshipService[];
}

export function WorshipSchedule({ services }: WorshipScheduleProps) {
  if (services.length === 0) return null;

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-[1100px] px-5">
        <div className="text-center">
          <p className="text-[13px] font-medium text-primary">Worship</p>
          <h2 className="mt-2 text-[28px] font-bold text-gray-900">예배안내</h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-[800px] gap-3 sm:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-xl border border-gray-200 bg-white px-6 py-5 transition-shadow hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
            >
              <p className="text-[15px] font-bold text-gray-900">{service.name}</p>
              <p className="mt-2 text-[14px] text-gray-500">
                {service.day_of_week} {service.time}
              </p>
              {service.location && (
                <p className="mt-0.5 text-[13px] text-gray-400">{service.location}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/worship"
            className="text-[14px] font-medium text-primary transition-colors hover:text-primary-hover"
          >
            자세한 예배안내 &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
