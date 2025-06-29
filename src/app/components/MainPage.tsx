'use client';
import Image from 'next/image';

export default function MainPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 font-serif ">
            {/* 컨텐츠 래퍼: 모바일(기본)~데스크탑까지 중앙 정렬 & 패딩 조정 */}
            <section className="w-full text-center">
                {/* 상단 소제목 */}
                <p className="text-sm sm:text-base text-gray-500 mb-3 tracking-wide">
                    회개 운동 · 성령 운동 · 신부 단장
                </p>
                {/* 메인 이미지: 반응형 비율 유지 (16:9) */}
                <div className="w-full aspect-video relative shadow-lg rounded-lg overflow-hidden mb-5">
                    <Image
                    src="/images/main_title.png"
                    alt="메인 이미지"
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover"
                    priority
                    />
                </div>
                {/* 시간 & 장소 등 안내문 */}

                {/* 일시 */}
                <p className="text-lg sm:text-xl text-gray-800 font-semibold mb-2">
                    2025. <span className="text-[#8b5c49] font-bold">8.15</span> (금) 오전 11:00
                </p>

                {/* 장소 */}
                <p className="text-md sm:text-lg font-medium">
                    장소 <span className="font-semibold">그랜드 워커힐 서울, 비스타홀</span>
                </p>
                <p className="text-sm mt-1 text-gray-600">(서울 광진구 워커힐로 177 지하 2층)</p>
            </section>
        </div>
    );
}

