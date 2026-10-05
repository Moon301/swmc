export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { NewsList } from "./NewsList";
import { generatePageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";

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
      <PageHero
        title="교회소식"
        description={
          <>
            성은세계선교교회의 소식과 공지사항
          </>
        }
      />
      <div className="mx-auto max-w-[1100px] px-5 py-12 sm:py-16">
        <NewsList initialNews={news ?? []} />
      </div>
    </div>
  );
}
