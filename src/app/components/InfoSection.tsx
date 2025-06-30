'use client';

import { Phone, ClipboardCopy } from 'lucide-react';
import{ useState } from 'react';

export default function InfoSection() {
    const [ copied, setCopied ] = useState(false);

    const copyAccount = async() =>{
        try {
                await navigator.clipboard.writeText('농협 355-0040-5450-83');
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('복사 실패:', err);
        }
    }
    return (
        <section className="w-full max-w-3xl mx-auto px-4 mt-20 space-y-6 mb-50 text-center">

            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-10"> 안내・문의 </h2>
            {/* 회비 + 주관 카드 */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 sm:p-8">
                <div className="space-y-6 sm:space-y-0 sm:flex sm:justify-between sm:gap-8">
                {/* 회비 */}
                <div className="sm:w-1/2">
                    <h3 className="text-[#8b5c49] font-semibold mb-1">회비</h3>
                    <p className="text-gray-800">
                    <span className="font-bold">무료</span> (헌금시간 있음)
                    </p>
                    <div className="text-sm text-gray-700 mt-1 flex justify-center items-center gap-2">
                        헌금계좌 |
                        <span
                            onClick={copyAccount}
                            className="cursor-pointer font-bold hover:underline inline-flex items-center gap-1"
                        >
                            농협 355-0040-5450-83
                            <ClipboardCopy className="w-4 h-4 text-[#8b5c49]" />
                        </span>
                        {copied && <span className="text-green-600 text-xs ml-1">복사!</span>}
                    </div>
                </div>

                {/* 주관 */}
                <div className="sm:w-1/2">
                    <h3 className="text-[#8b5c49] font-semibold mb-1">주관</h3>
                    <p className="text-gray-800 font-semibold">성은세계선교교회</p>
                    <p className="text-sm text-gray-700">(대한예수교장로회)</p>
                    <p className="text-sm text-gray-700">전주시 완산구 쑥고개로 384-6</p>
                </div>
                </div>
            </div>

            {/* 문의 카드 */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 sm:p-8 text-center">
                <h3 className="text-[#8b5c49] font-semibold mb-4">문의</h3>
                <div className="space-y-2 text-gray-800 text-sm">
                <p className="flex justify-center items-center gap-2">
                    <Phone className="w-4 h-4 text-[#8b5c49]" />
                    <a href="tel:0632242245" className="hover:underline">
                        <b>전주 본교</b> 063-224-2245, 8179
                    </a>
                </p>
                <p className="flex justify-center items-center gap-2">
                    <Phone className="w-4 h-4 text-[#8b5c49]" />
                    <a href="tel:01076333217" className="hover:underline">
                        <b>영등포 지성전</b> 010-7633-3217
                    </a>
                </p>
                <p className="flex justify-center items-center gap-2">
                    <Phone className="w-4 h-4 text-[#8b5c49]" />
                    <a href="tel:01098866785" className="hover:underline">
                        <b>서울역 지성전</b> 010-9886-6785
                    </a>
                </p>
                </div>
            </div>

        </section>
    );
}
