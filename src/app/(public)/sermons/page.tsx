export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { SermonsList } from "./SermonsList";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "말씀",
  description: "성은세계선교교회 설교 영상을 만나보세요.",
  path: "/sermons",
});

export default async function SermonsPage() {
  const supabase = await createClient();
  const { data: sermons } = await supabase
    .from("sermons")
    .select("*")
    .eq("is_published", true)
    .order("sermon_date", { ascending: false });

  return (
    <div>
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1100px] px-5 py-12 sm:py-16">
          <p className="text-[13px] font-medium text-primary">Sermons</p>
          <h1 className="mt-2 text-[36px] font-bold text-gray-900 sm:text-[44px]">말씀</h1>
          <p className="mt-3 text-[16px] text-gray-500">
            성은세계선교교회의 설교 영상을 만나보세요
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-[1100px] px-5 py-12 sm:py-16">
        <SermonsList initialSermons={sermons ?? []} />
      </div>
    </div>
  );
}
