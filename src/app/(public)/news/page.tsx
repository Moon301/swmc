export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { NewsList } from "./NewsList";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "교회소식",
  description: "성은세계선교교회의 소식과 공지사항을 확인하세요.",
  path: "/news",
});

export default async function NewsPage() {
  const supabase = await createClient();
  const { data: news } = await supabase
    .from("news")
    .select("*")
    .eq("is_published", true)
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1100px] px-5 py-12 sm:py-16">
          <p className="text-[13px] font-medium text-primary">News</p>
          <h1 className="mt-2 text-[36px] font-bold text-gray-900 sm:text-[44px]">교회소식</h1>
          <p className="mt-3 text-[16px] text-gray-500">
            성은세계선교교회의 소식과 공지사항
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-[1100px] px-5 py-12 sm:py-16">
        <NewsList initialNews={news ?? []} />
      </div>
    </div>
  );
}
