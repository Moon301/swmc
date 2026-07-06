# 성은세계선교교회 디자인 시스템

모든 UI 작업은 이 문서를 기준으로 한다. 새 페이지·컴포넌트를 만들 때 임의의 색상/스타일을 추가하지 말고 여기 정의된 토큰과 패턴을 사용할 것.

## 디자인 방향

- **레퍼런스**: 토스뱅크(tossbank.com) — 넉넉한 여백, 큰 타이포, 큰 라운드 카드, 절제된 색
- **톤**: 고급스럽고 차분하게. 화려함이 필요한 곳(선교 히어로 등)은 다크 네이비 + 골드 조합
- **원칙**: 색은 포인트로만. 본문은 그레이 스케일, 강조는 브랜드 컬러 1~2곳

## 색상 (OKLCH)

색상은 전부 **OKLCH**로 정의한다 (`src/app/globals.css`의 `@theme`). 디스플레이(sRGB/P3)에 따라 색이 바래거나 과포화되는 것을 막고, 밝기(L)가 지각적으로 균일해 팔레트 확장이 쉽다.
**컴포넌트에 hex를 하드코딩하지 말 것.** 반드시 토큰 클래스를 사용한다.

### 브랜드 컬러

| 토큰 | OKLCH | 참고 hex | 용도 |
|---|---|---|---|
| `primary` / `secondary` | `oklch(45.9% 0.115 257.9)` | #2B5797 | 브랜드 블루. 링크, 활성 상태, 아이콘, 강조 텍스트 |
| `primary-hover` / `secondary-hover` | `oklch(41.2% 0.11 257.1)` | #1F4A85 | 블루 호버 |
| `primary-light` | `oklch(95.3% 0.021 261.8)` | #e8f0fe | 블루 칩/배지 배경 |
| `accent` | `oklch(70.3% 0.119 81)` | #C5973E | 브랜드 골드. 라이트 배경 위 포인트 전용 (다크 배경에는 블루 사용) |
| `accent-hover` | `oklch(66% 0.118 79.9)` | #B8892F | 골드 호버 |
| `accent-light` | `oklch(80.7% 0.109 82)` | #e3b96a | 밝은 골드. 다크 배경 위 텍스트/그라데이션 |
| `emerald` | `oklch(76% 0.09 168)` | — | 배경 앰비언트 전용 (단독 사용 금지) |
| `navy` | `oklch(18.6% 0.048 268.7)` | #0a1128 | 다크 섹션 배경 (선교 히어로, CTA) |

사용 예: `text-secondary`, `bg-primary-light`, `text-accent`, `bg-navy`, `from-accent to-accent-light`

### 그레이 스케일 (토스 뉴트럴)

`gray-50`(98.5%) ~ `gray-900`(23.7%) — Tailwind 기본 대신 이 팔레트가 적용되어 있다.
- 본문 제목: `text-gray-900` / 본문: `text-gray-600~700` / 보조 설명: `text-gray-500` / 비활성: `text-gray-400`
- 카드 배경: `bg-gray-50` / 호버 배경: `bg-gray-100` (유리 위에서는 `bg-gray-500/10`)

### 배경

`body`에 골드·에메랄드 라디얼 그라데이션이 아주 옅게(알파 3.5~5.5%) 깔려 있다 (`background-attachment: fixed`).
- **페이지 루트에 `bg-white`를 깔지 말 것** — 앰비언트가 가려진다. 콘텐츠 대비가 필요하면 카드(`bg-gray-50`, `card-soft`)로 해결
- 알파를 6% 이상 올리면 촌스러워진다. 조정은 globals.css에서만

## 타이포그래피

폰트: Noto Sans KR (`next/font/google`), `letter-spacing: -0.01em` 전역 적용.

| 용도 | 크기 |
|---|---|
| 히어로 헤드라인 | `text-[36px] sm:text-[52px] font-bold leading-[1.25] tracking-tight` |
| 섹션 제목 | `text-[24px] sm:text-[30px] font-bold tracking-tight` |
| 카드 제목 | `text-[15px]~[17px] font-bold` |
| 본문 | `text-[14px]~[15px] leading-relaxed` |
| 보조/캡션 | `text-[13px] text-gray-500` |
| 칩/배지 | `text-[13px] font-semibold` + `rounded-full px-3.5 py-1.5` |

## 레이아웃

- 콘텐츠 최대 폭: `max-w-[1100px]` (본문 좁은 페이지는 `max-w-[800px]`), 좌우 `px-5`
- 섹션 세로 여백: `py-14 sm:py-20` (히어로는 `pt-20 sm:pt-28`)
- 히어로 패턴: 중앙 정렬, 칩 배지 → 큰 헤드라인 → 회색 서브텍스트 순

## 라운드 / 그림자

| 요소 | 라운드 | 그림자 |
|---|---|---|
| 큰 카드 (섹션 카드) | `rounded-[24px]` | 없음 (배경색으로 구분: `bg-gray-50`) |
| 드롭다운/팝오버 | `rounded-b-[20px]` (헤더에 붙는 상단은 직각) | `shadow-[0_0_1px_rgba(2,32,71,0.16),0_12px_40px_rgba(2,32,71,0.14)]` |
| 카드 내 아이콘 박스 | `rounded-2xl bg-white` | `shadow-[0_1px_4px_rgba(2,32,71,0.06)]` |
| 버튼/CTA | `rounded-full` | 강조 CTA: `shadow-[0_8px_24px_rgba(49,130,246,0.35)]` (블루 글로우) |
| 작은 인터랙션 (네브 필, 리스트 호버) | `rounded-[10px]~[14px]` | 없음 |

그림자 색은 검정 대신 네이비 계열 `rgba(2,32,71,…)`을 쓴다 — 더 차분하고 고급스럽다.

## 헤더 / 메가 메뉴

- 헤더: 글래스모피즘 — `bg-white/60 backdrop-blur-2xl backdrop-saturate-[1.8]`, 스크롤 시 `border-b + shadow`
- 글래스는 **네비 바에만**. 드롭다운 카드는 **불투명 흰색** (토스 방식 — 가독성)
- 드롭다운은 헤더 하단선에서 시작 (아이템 래퍼 `h-full` + `top-full`), 항목은 제목+설명 2줄 구조
- 메뉴 데이터는 `src/lib/constants.ts`의 `NAV_ITEMS` (label/href/description)

## 모션

- 등장: `animate-fade-up` (0.6s) 또는 framer-motion `initial/animate` + `y: 12~24, opacity: 0`
- 드롭다운: `animate-dropdown-in` (0.18s, 살짝 떠오름)
- 스크롤 등장: framer-motion `whileInView` + `viewport={{ once: true }}`
- 숫자 강조: CountUp 패턴 (`src/components/mission/MissionHero.tsx` 참고)
- 지도/화려한 연출: `dotted-map` + framer-motion `pathLength` 애니메이션 (선교 히어로 참고)
- 과한 모션 금지: duration 0.2~0.8s, 반복 애니메이션은 히어로 같은 특수 섹션에만

## 다크 섹션 (선교 히어로, CTA)

- 다크 배경 위 포인트 컬러는 **토스 계열 블루** (Tailwind 기본 `blue-500`/`sky-300~400` — v4라서 이미 OKLCH). 골드는 다크 배경에서 올드해 보이므로 쓰지 않는다
- 배경: `bg-navy` + 라디얼 글로우 (`bg-blue-600/25`, `bg-sky-400/10` + `blur-[100px~140px]`)
- 텍스트: 흰색 제목, `text-slate-400` 본문, `text-sky-300` 포인트
- 그라데이션 텍스트: `bg-gradient-to-r from-sky-300 via-blue-400 to-sky-300 bg-clip-text text-transparent`
- CTA 버튼: `bg-gradient-to-r from-blue-500 to-sky-400` + 블루 글로우 그림자
- 아래 밝은 섹션과의 연결: 하단에 `bg-gradient-to-b from-transparent to-white` 페이드

## 금지 사항

- 컴포넌트에 hex 하드코딩 (`text-[#2B5797]` ❌ → `text-secondary` ✅)
- 페이지 루트 `bg-white` (앰비언트 그라데이션 차단)
- 검정 그림자 (`rgba(0,0,0,…)` 대신 네이비 계열)
- 드롭다운에 반투명/블러 (가독성 저하)
- 새 라이브러리 추가 전 기존 스택 확인: framer-motion, lucide-react, dotted-map, embla-carousel
