'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function MainPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-gray-800 ">
            {/* 컨텐츠 래퍼: 모바일(기본)~데스크탑까지 중앙 정렬 & 패딩 조정 */}

            <section className="w-full text-center px-4 sm:px-6  mb-5">
                {/* 강조 문구 */}
                <p className="text-[17px] sm:text-xl font-light text-gray-700 leading-relaxed tracking-wide">
                    마지막 때를 향한 <span className="font-semibold text-[#8b5c49]">하나님의 말씀,</span>
                </p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900 tracking-wide">
                    여러분을 초청합니다.
                </p>
            </section>

            <section className="w-full text-center px-4 sm:px-0">
                {/* 모바일 전용 이미지 (3:4 비율) */}
                <div className="block sm:hidden">
                    <Link
                        href="https://www.seongeunch.com"
                        className="relative w-full max-w-md mx-auto overflow-hidden rounded-lg mb-4 link-hover-effect"
                        style={{ aspectRatio: '3 / 4' }} // 고정된 3:4 비율
                    >
                        <Image
                            src="/images/app_main.png"
                            alt="성령대부흥성회"
                            fill
                            sizes="100vw"
                            className="object-cover"
                            priority
                        />
                    </Link>
                </div>

                {/* 웹 전용 이미지 (16:9 비율) */}
                <div className="hidden sm:block">
                    <Link
                        href="https://www.seongeunch.com"
                        className="w-full max-w-3xl mx-auto relative overflow-hidden rounded-lg mb-6 link-hover-effect"
                        style={{ aspectRatio: '16 / 9' }} // 고정된 16:9 비율
                    >
                        <Image
                            src="/images/web_main.png"
                            alt="성령대부흥성회"
                            fill
                            sizes="(min-width: 768px) 768px"
                            className="object-cover"
                            priority
                        />
                    </Link>
                </div>

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

