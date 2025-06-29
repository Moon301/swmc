'use client';

import { useEffect } from "react";

export default function MapSection() {
    useEffect(() => {
        const scriptLoaded = () => {
        window.kakao.maps.load(() => {
            const container = document.getElementById("map");
            if (!container) return; 

            const options = {
            center: new window.kakao.maps.LatLng(37.554189, 127.111164),
            level: 5,
            };

            const map = new window.kakao.maps.Map(container, options);

            const markerPosition = new window.kakao.maps.LatLng(37.554189, 127.111164);

            const marker = new kakao.maps.Marker({
                position: markerPosition,
                clickable: true
            });

            marker.setMap(map)

            const iwContent = `<div style="padding: 5px 10px; font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px;">그랜드 워커힐 서울, 비스타홀 지하2층 </div>`;

            //const iwPosition= new window.kakao.maps.LatLng(37.554989, 127.111164);
            const iwRemoveable = true;

            const infoWindow = new kakao.maps.InfoWindow({
                content: iwContent,
                removable: iwRemoveable
            });

            kakao.maps.event.addListener(marker,'click', function(){
                infoWindow.open(map, marker);
            })
            
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
