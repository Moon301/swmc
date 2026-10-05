export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { SkyBackdrop } from "@/components/home/SkyBackdrop";
import { PopupOverlay } from "@/components/home/PopupOverlay";
import { QuickLinks } from "@/components/home/QuickLinks";
import { ChurchIntroPreview } from "@/components/home/ChurchIntroPreview";
import { QuickMenu } from "@/components/home/QuickMenu";
import { MissionStats } from "@/components/home/MissionStats";
import { NewsPreview } from "@/components/home/NewsPreview";
import { ChurchJsonLd } from "@/components/seo/JsonLd";
import { IntroLoader } from "@/components/home/IntroLoader";
import { LiveWorshipPopup } from "@/components/home/LiveWorshipPopup";
import { Reveal } from "@/components/ui/Reveal";

export default async function HomePage() {
  const supabase = await createClient();
  const now = new Date().toISOString();

  const [bannersRes, popupsRes, newsRes] = await Promise.all([
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
    supabase
      .from("news")
      .select("*")
      .eq("is_published", true)
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  return (
    <>
      <Header />
      <main>
        <ChurchJsonLd />
        <IntroLoader />
        <PopupOverlay popups={popupsRes.data ?? []} />
        {/* 주일 09~12시·14~17시(KST)에만 뜨는 실시간 예배 안내 — 유튜브 라이브로 연결 */}
        <LiveWorshipPopup />

        {/* 1~2. 배너 + 퀵링크는 같은 하늘 배경 위에 올린다 */}
        <SkyBackdrop>
          <div className="animate-fade-up">
            <HeroSection banners={bannersRes.data ?? []} />
          </div>
          <div className="animate-fade-up [animation-delay:80ms]">
            <QuickLinks />
          </div>
        </SkyBackdrop>

        {/* 3. 표어 + 바로가기 — 원본 홈처럼 한 덩어리 (스크롤 등장) */}
        <Reveal>
          <ChurchIntroPreview />
          <QuickMenu />
        </Reveal>

        {/* 5. 교회소식 — 콘텐츠가 홈에 바로 보이게 (만나교회 참고). 갤러리 섹션은 사용자 지시로 제거 */}
        <Reveal>
          <NewsPreview news={newsRes.data ?? []} />
        </Reveal>

        {/* 6. Mission stats — 내부에서 자체 모션 처리 */}
        <MissionStats />
      </main>
      <Footer />
    </>
  );
}
