'use client';

import YouTube from 'react-youtube';

export default function YoutubeSection() {
    const opts = {
        width: '100%',
        height: '100%',
        playerVars: {
            autoplay: 0,
        },
    };

    return (
        <section className='min-h-screen flex flex-col items-center justify-center'>
            <div className=" w-full max-w-3xl mx-auto px-4 text-center mt-20 sm:mb-30 mb-20">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-10"> 14차 성령대부흥 성회 </h2>
                <blockquote className="italic text-sm leading-relaxed mb-10">
                    ”그에게 허락하사 빛나고 깨끗한 <b>세마포</b>를 입게 하셨은즉 <br />
                    이 세마포는 성도들의 <b>옳은 행실</b>이로다 하더라”
                    <br />
                    <span className="block mt-2 font-normal text-[13px] text-gray-500">
                    (요한계시록 19:8)
                    </span>
                </blockquote>

                <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden shadow-lg mb-10">
                    <div className="absolute inset-0">
                        <YouTube videoId="Pv4qSSNpUL4" opts={opts} className="w-full h-full" />
                    </div>
                </div>

                <div className='mb-6'>
                    <p className="text-base sm:text-lg font-semibold text-gray-800">
                        날마다 죄를 대항하고 <span className="text-[#8b5c49]">매일 회개하는 삶</span>
                    </p>
                    <p className="text-base sm:text-lg font-semibold mt-1">
                        성령의 역사가 일어나는 <b className=' text-[#8b5c49]'>성회</b>
                    </p>
                </div>

            </div>
        </section>
    );
}
