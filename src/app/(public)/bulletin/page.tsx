export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { Download } from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "주보",
  description: "성은세계선교교회 주보를 확인하세요.",
  path: "/bulletin",
});

export default async function BulletinPage() {
  const supabase = await createClient();
  const { data: bulletins } = await supabase
    .from("bulletins")
    .select("*")
    .order("bulletin_date", { ascending: false });

  return (
    <div>
      <div className="border-b border-gray-200/70">
        <div className="mx-auto max-w-[1100px] px-5 py-12 sm:py-16">
          <p className="text-[13px] font-medium text-primary">Bulletin</p>
          <h1 className="mt-2 text-[36px] font-bold text-gray-900 sm:text-[44px]">주보</h1>
          <p className="mt-3 text-[16px] text-gray-500">
            매주 발행되는 교회 주보를 확인하세요
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[800px] px-5 py-12 sm:py-16">
        {!bulletins || bulletins.length === 0 ? (
          <p className="py-12 text-center text-gray-400">
            등록된 주보가 없습니다.
          </p>
        ) : (
          <div className="divide-y divide-gray-100">
            {bulletins.map((bulletin) => (
              <div
                key={bulletin.id}
                className="flex items-center gap-4 py-5"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{bulletin.title}</p>
                  <p className="mt-0.5 text-[13px] text-gray-400">
                    {formatDate(bulletin.bulletin_date)}
                  </p>
                </div>
                {bulletin.pdf_url && (
                  <a
                    href={bulletin.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-4 py-2 text-[13px] font-medium text-gray-700 transition-colors hover:bg-gray-200"
                  >
                    <Download className="h-3.5 w-3.5" />
                    PDF
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
