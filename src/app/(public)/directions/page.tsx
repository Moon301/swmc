import { generatePageMetadata } from "@/lib/seo";
import { DirectionsContent } from "./DirectionsContent";

export const metadata = generatePageMetadata({
  title: "오시는길",
  description: "성은세계선교교회 전주 본 교회와 서울 영등포·서초 지성전 오시는 길, 주소와 연락처 안내",
  path: "/directions",
});

/* 지도·복사 버튼 등 클라이언트 로직은 DirectionsContent에 있고, 여기서는 메타데이터만 붙인다 */
export default function DirectionsPage() {
  return <DirectionsContent />;
}
