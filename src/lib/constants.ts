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
      { label: "예배안내", href: "/worship", description: "예배 시간과 장소 안내" },
      { label: "오시는길", href: "/directions", description: "위치와 교통편 안내" },
    ],
  },
  {
    label: "교회사역",
    href: "/bride",
    children: [
      { label: "신부단장", href: "/bride", description: "거룩한 신부로 단장되는 삶" },
      { label: "성회안내", href: "/revival-schedule", description: "국내 성령대부흥성회 일정" },
    ],
  },
  {
    label: "해외선교",
    href: "/revival-info",
    children: [
      { label: "해외성회", href: "/revival-info", description: "전 세계를 향한 부흥성회 사역" },
      { label: "300명 선교사", href: "/missionaries", description: "90개국 300명 선교사 파송" },
      { label: "해외 성전건축", href: "/building", description: "5개국 6개 성전 건축 지원" },
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
  nameEn: "SUNG UN SEA KYE MISSION CHURCH",
  denomination: "대한예수교장로회 합동중앙총회 중앙노회 소속",
  pastor: "나현숙 목사",
  address: "전북특별자치도 전주시 완산구 쑥고개로 384-6",
  addressDetail: "(효자동2가 232-12)",
  zipCode: "55079",
  phone: "063-224-2245",
  phone2: "063-224-8179",
  fax: "063-225-8174",
  mobile: "010-9370-7706",
  youtube: "https://www.youtube.com/@HyunSookNa",
  cafe: "https://cafe.daum.net/hgwmc",
  lat: 35.8033995,
  lng: 127.1067748,
  slogan: "세계선교와 복음전도에 힘쓰는 이 시대 깨어있는 교회",
  // 수치는 대략 표기 — 정확한 집계가 없어 성회 횟수는 노출하지 않는다 (사용자 지시)
  missionStats: {
    countries: 90, // "90여 개국"으로 표기
    missionaries: 300,
  },
};

/* 서울 지성전 (원본 사이트 '수도권' 지성전 안내 기준, 2026-10-05 대조) */
export const BRANCHES = [
  {
    name: "서울 영등포 지성전",
    short: "영등포 지성전",
    zip: "07301",
    address: "서울특별시 영등포구 영등포로 194, 홍익금융프라자 3층",
    addressDetail: "(영등포동4가 147-1)",
    phones: ["010-6286-9119", "010-9176-2471", "010-9886-6785"],
    pastors: "이재오 목사",
    subway: "영등포시장역(5호선), 영등포역(1호선)",
  },
  {
    name: "서울 서초 지성전",
    short: "서초 지성전",
    zip: "04635",
    address: "서울특별시 서초구 방배로 178, 3층",
    addressDetail: "(방배동 851-4)",
    phones: ["010-7633-3217", "010-2242-3217"],
    pastors: "이문형 목사",
    subway: "내방역(7호선) 7번 출구",
  },
] as const;

/* 원본 사이트의 예배 시간표 (이미지 표를 그대로 옮김) */
export const WORSHIP_TIMES = {
  sunday: [
    { name: "주일대예배", time: "오전 11:00", location: "대성전" },
    { name: "주일저녁예배", time: "오후 03:00", location: "대성전" },
    { name: "청년부", time: "오후 01:10", location: "대성전" },
    { name: "중고등부", time: "오후 01:30", location: "바울성전(2층)" },
    { name: "주일학교", time: "오후 01:40", location: "다윗성전(1층)" },
  ],
  weekday: [
    { name: "수요예배", time: "오후 07:30", location: "대성전" },
    { name: "월화목기도회", time: "오후 07:30", location: "대성전" },
    { name: "금요성령집회", time: "오후 07:30", location: "대성전" },
  ],
  note: "매월 마지막 주 수요일은 남선교회 헌신예배입니다.",
} as const;

/* 온라인헌금 계좌 (예금주: 성은세계선교교회) */
export const OFFERING_ACCOUNTS = {
  /* 원본 온라인헌금 페이지 기준 (2026-10-05 대조) — 선교헌금은 9992-93, 일반헌금은 9990-13 + 하나 */
  mission: [{ bank: "농협은행", number: "355-0034-9992-93" }],
  general: [
    { bank: "농협은행", number: "355-0034-9990-13" },
    { bank: "KEB 하나은행", number: "162-890030-81204" },
  ],
  footer: [
    { bank: "농협", number: "355-0034-9990-13" },
    { bank: "국민", number: "762901-01-290714" },
    { bank: "하나", number: "630-006893-624" },
    { bank: "전북", number: "506-23-0315290" },
  ],
  foreign: {
    beneficiary: "SUNG UN SEA KYE MISSION CHURCH (대한예수교성은세계선교교회)",
    address:
      "232-12, Hyoja2-ga, Wansan-gu, Jeonju-si, Jeollabuk-do, Rep of Korea",
    tel: "82-63-224-8179",
    fax: "82-63-225-8174",
    bankName: "KEB Hana Bank (Jeonju Branch)",
    bankPhone: "82-63-288-8111",
    account: "650-007393-192",
    swift: "KOEXKRSE",
  },
} as const;
