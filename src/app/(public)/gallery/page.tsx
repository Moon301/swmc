export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { GalleryGrid } from "./GalleryGrid";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "포토갤러리",
  description: "성은세계선교교회의 사진 갤러리입니다.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data: albums } = await supabase
    .from("gallery_albums")
    .select("*, gallery_photos(*)")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1100px] px-5 py-12 sm:py-16">
          <p className="text-[13px] font-medium text-primary">Gallery</p>
          <h1 className="mt-2 text-[36px] font-bold text-gray-900 sm:text-[44px]">포토갤러리</h1>
          <p className="mt-3 text-[16px] text-gray-500">
            교회의 소중한 순간들을 사진으로 만나보세요
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-[1100px] px-5 py-12 sm:py-16">
        <GalleryGrid albums={albums ?? []} />
      </div>
    </div>
  );
}
