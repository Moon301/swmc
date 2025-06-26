'use client';
import Image from 'next/image';

export default function MainPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 font-serif">
            {/* 컨텐츠 래퍼: 모바일(기본)~데스크탑까지 중앙 정렬 & 패딩 조정 */}
            <section className="w-full text-center">
                {/* 소제목 */}
                <p className="text-xs tracking-widest text-gray-400 uppercase mb-3">
                신부단장 회개운동 성령운동
                </p>
                {/* 메인 타이틀: 화면 크기에 따라 글자 크기 확대 */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-snug mb-8">
                    성령대부흥성회
                </h1>
                {/* 메인 이미지: 반응형 비율 유지 (16:9) */}
                <div className="w-full aspect-video relative shadow-lg rounded-lg overflow-hidden mb-8">
                    <Image
                    src="/images/main-photo.jpg"
                    alt="메인 이미지"
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover"
                    priority
                    />
                </div>
                {/* 시간 & 장소 등 안내문 */}
                <div className="not-italic text-base sm:text-lg md:text-xl leading-relaxed tracking-wide">
                    2025년 8월 15일(금) 오전 11시<br />
                    워커힐 호텔
                </div>
            </section>
        </div>
    );
}

