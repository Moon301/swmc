'use client';

import Image from 'next/image';

export default function PastorSection() {
    const speakers = [
        {
        time: '1부 강사 (오전 11:00)',
        name: '나현숙 목사',
        image: '/images/speaker.png', 
        description: [
            '성은세계선교교회 담임목사',
            '300명 세계선교사 총재',
            '90개국 300명 선교사 파송',
            '국내 및 해외 성령부흥성회 인도',
            '예복 단장 사역 인도',
            '『아름다운 영의 나라』 저자',
        ],
        },
        {
        time: '2부 강사 (오후 4:00)',
        name: '진명석 목사',
        image: '/images/speaker.png',
        description: [
            '장재침례교회 담임목사',
            '300명 세계선교사 고문',
        ],
        },
    ];

    return (
        <section className="w-full max-w-4xl mx-auto px-4 mt-30 mb-30">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-10">
            강사님 소개
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {speakers.map((speaker, index) => (
            <div
                key={index}
                className="bg-white shadow-md border border-gray-200 rounded-2xl p-6 flex flex-col items-center text-center"
            >
                <Image
                src={speaker.image}
                alt={speaker.name}
                width={140}
                height={140}
                className="rounded-full mb-4 object-cover"
                />
                <p className="text-sm text-gray-600 mb-1">{speaker.time}</p>
                <h3 className="text-lg font-bold text-[#8b5c49] mb-3">{speaker.name}</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                {speaker.description.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
                </ul>
            </div>
            ))}
        </div>
        </section>
    );
}
