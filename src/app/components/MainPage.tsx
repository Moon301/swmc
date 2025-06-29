'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function MainPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 ">
            {/* 컨텐츠 래퍼: 모바일(기본)~데스크탑까지 중앙 정렬 & 패딩 조정 */}
            <section className="w-full text-center px-4 sm:px-0">
                <p className="text-sm sm:text-lg text-gray-500 mb-5 tracking-wide">
                    회개 운동 · 성령 운동 · 신부 단장
                </p>

                <Link 
                    href="https://www.seongeunch.com"
                    className="link-hover-effect w-full max-w-xl mx-auto aspect-video relative rounded-lg overflow-hidden mb-6"
                >
                    <Image
                        src="/images/main_title.png"
                        alt="성령대부흥성회"
                        fill
                        sizes="(max-width: 768px) 100vw, 768px"
                        className="object-cover"
                        priority
                    />
                </Link>

                <p className="text-lg sm:text-xl text-gray-800 font-semibold mb-2">
                    2025. <span className="text-[#8b5c49] font-bold">8.15</span> (금) 오전 11:00
                </p>

                <p className="text-md sm:text-lg font-medium">
                    장소 <span className="font-semibold">그랜드 워커힐 서울, 비스타홀</span>
                </p>
                <p className="text-sm mt-1 text-gray-600">(서울 광진구 워커힐로 177 지하 2층)</p>
            </section>
        </div>
    );
}

