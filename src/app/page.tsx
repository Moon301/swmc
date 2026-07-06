export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { PopupOverlay } from "@/components/home/PopupOverlay";
import { QuickLinks } from "@/components/home/QuickLinks";
import { ChurchIntroPreview } from "@/components/home/ChurchIntroPreview";
import { QuickMenu } from "@/components/home/QuickMenu";
import { MissionStats } from "@/components/home/MissionStats";
import { ChurchJsonLd } from "@/components/seo/JsonLd";

export default async function HomePage() {
  const supabase = await createClient();
  const now = new Date().toISOString();

  const [bannersRes, popupsRes] = await Promise.all([
    supabase
      .from("banners")
      .select("*")
      .eq("is_active", true)
      .or(`start_date.is.null,start_date.lte.${now}`)
      .or(`end_date.is.null,end_date.gte.${now}`)
      .order("display_order"),
    supabase
      .from("popups")
      .select("*")
      .eq("is_active", true)
      .or(`start_date.is.null,start_date.lte.${now}`)
      .or(`end_date.is.null,end_date.gte.${now}`),
  ]);

  return (
    <>
      <Header />
      <main>
        <ChurchJsonLd />
        <PopupOverlay popups={popupsRes.data ?? []} />

        {/* 1. Hero banner slider */}
        <div className="animate-fade-up">
          <HeroSection banners={bannersRes.data ?? []} />
        </div>

        {/* 2. 4 image quick links */}
        <div className="animate-fade-up [animation-delay:80ms]">
          <QuickLinks />
        </div>

        {/* 3. 표어 */}
        <div className="animate-fade-up [animation-delay:160ms]">
          <ChurchIntroPreview />
        </div>

        {/* 4. Quick menu icons */}
        <div className="animate-fade-up [animation-delay:240ms]">
          <QuickMenu />
        </div>

        {/* 5. Mission stats */}
        <MissionStats />
      </main>
      <Footer />
    </>
  );
}
