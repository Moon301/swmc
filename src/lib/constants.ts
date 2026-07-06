export const SITE_NAME = "성은세계선교교회";
export const SITE_DESCRIPTION =
  "세계선교와 복음전도에 힘쓰는 이 시대 깨어있는 교회, 성은세계선교교회 공식 홈페이지";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://seongeunch.com";

export const NAV_ITEMS = [
  {
    label: "교회안내",
    href: "/about",
    children: [
      { label: "교회소개", href: "/about", description: "성은세계선교교회를 소개합니다" },
      { label: "목사님소개", href: "/pastor", description: "담임 나현숙 목사" },
      { label: "부서소개", href: "/departments", description: "교회 부서와 섬기는 사람들" },
      { label: "예배안내", href: "/worship", description: "예배 시간과 장소 안내" },
      { label: "오시는길", href: "/directions", description: "위치와 교통편 안내" },
    ],
  },
  {
    label: "교회사역",
    href: "/sermons",
    children: [
      { label: "금주단상", href: "/bulletin", description: "금주의 말씀과 주보" },
      { label: "설교말씀", href: "/sermons", description: "설교 영상과 말씀" },
      { label: "갤러리", href: "/gallery", description: "교회 활동 사진" },
    ],
  },
  {
    label: "해외선교",
    href: "/missionaries",
    children: [
      { label: "해외성회", href: "/revival-info", description: "해외 부흥성회 사역" },
      { label: "300명 선교사", href: "/missionaries", description: "세계 각지의 선교사들" },
      { label: "해외 성회일정", href: "/revival-schedule", description: "성회 일정 안내" },
    ],
  },
  { label: "온라인헌금", href: "/offering" },
] as const;

export const ADMIN_NAV_ITEMS = [
  { label: "대시보드", href: "/admin" },
  { label: "배너 관리", href: "/admin/banners" },
  { label: "팝업 관리", href: "/admin/popups" },
  { label: "설교 관리", href: "/admin/sermons" },
  { label: "소식 관리", href: "/admin/news" },
  { label: "갤러리 관리", href: "/admin/gallery" },
  { label: "주보 관리", href: "/admin/bulletin" },
  { label: "페이지 편집", href: "/admin/pages" },
  { label: "사용자 관리", href: "/admin/users" },
] as const;

export const NEWS_CATEGORIES = [
  { value: "notice", label: "공지" },
  { value: "news", label: "소식" },
  { value: "event", label: "행사" },
] as const;

export const SERMON_TYPES = [
  { value: "sunday_morning", label: "주일낮예배" },
  { value: "sunday_evening", label: "주일저녁예배" },
  { value: "wednesday", label: "수요예배" },
  { value: "friday", label: "금요기도회" },
  { value: "dawn", label: "새벽기도회" },
  { value: "special", label: "특별집회" },
  { value: "revival", label: "부흥성회" },
  { value: "other", label: "기타" },
] as const;

export const CHURCH_INFO = {
  name: "성은세계선교교회",
  nameEn: "Holy Grace World Mission Church",
  denomination: "대한예수교장로회(합동중앙)",
  pastor: "나현숙 목사",
  address: "전북 전주시 완산구 쑥고개로 384-6",
  addressDetail: "(효자동2가 232-12)",
  zipCode: "560-868",
  phone: "063-224-2245",
  phone2: "063-224-8179",
  fax: "063-225-8174",
  mobile: "010-9370-7706",
  youtube: "https://www.youtube.com/@HyunSookNa",
  lat: 35.8033995,
  lng: 127.1067748,
  slogan: "세계선교와 복음전도에 힘쓰는 이 시대 깨어있는 교회",
  missionStats: {
    countries: 81,
    missionaries: 300,
    revivals: 91,
    meetings: 1386,
  },
};
