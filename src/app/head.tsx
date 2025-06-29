// src/app/head.tsx
export default function Head() {
    return (
        <>
            <title>성령 대부흥 성회</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />

            {/* Open Graph (OG) 메타 태그 */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content="제19차 성령 대부흥 성회를 초청합니다." />
            <meta property="og:description" content="회개운동! 성령운동! 신부단장 ! 2025년 8월 15일(금) 오전 11시 워커힐 호텔." />
            <meta property="og:image" content="https://swmc.vercel.app/images/main_title.png" />
            <meta property="og:url" content="https://swmc.vercel.app" />

            {/* 카카오톡은 og:image 필수 + 가급적 절대 경로 URL */}
        </>
    );
}
