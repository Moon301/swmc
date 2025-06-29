'use client';

import YouTube from 'react-youtube';

export default function YoutubeSection() {
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
        autoplay: 0,
        },
    };

    return (
        <div className=" w-full max-w-3xl mx-auto px-4 text-center mt-16 mb-30">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-7"> 14차 성령대부흥 성회 </h2>
            <YouTube videoId="Pv4qSSNpUL4" opts={opts} />
        </div>
    );
}
