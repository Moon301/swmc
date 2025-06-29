'use client';

import { useEffect } from "react";

export default function MapSection() {
    useEffect(() => {
        const scriptLoaded = () => {
        window.kakao.maps.load(() => {
            const container = document.getElementById("map");
            if (!container) return; // null 체크 필수!

            const options = {
            center: new window.kakao.maps.LatLng(37.555946, 127.100155),
            level: 3,
            };

            new window.kakao.maps.Map(container, options);
        });
        };

        if (window.kakao && window.kakao.maps) {
        scriptLoaded();
        }
    }, []);

    return (
        <div id="map" className="w-full h-64 sm:h-96 rounded-lg shadow-md" />
    );
}
