'use client';

import { useEffect } from "react";
import Image from 'next/image';
import { Copy } from 'lucide-react';

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

    const copyAddress = () => {
        navigator.clipboard.writeText('서울특별시 광진구 워커힐로 177');
        alert('주소가 복사되었습니다!');
    };

    return (
        <section className="w-full text-center px-4 sm:px-6 mt-20 mb-50">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-10"> 오시는길 </h2>

            <div id="map" className="w-full max-w-3xl mx-auto h-70 sm:h-96 rounded-lg shadow-md sm:mb-10 mb-5" />

            <div className="mb-6 space-y-2">
                <h3 className="text-lg font-semibold">그랜드 워커힐 서울,<span className="text-[#8b5c49]"> 비스타홀</span></h3>
                <button
                    onClick={copyAddress}
                    className="flex items-center justify-center gap-2 bg-gray-100 px-4 py-1 rounded-lg text-sm hover:bg-gray-200 mx-auto"
                >
                    <Copy size={16} />
                    서울특별시 광진구 워커힐로 177
                </button>
            </div>
            

            <a
                href={`https://map.kakao.com/link/map/${encodeURIComponent('그랜드 워커힐 서울 비스타홀 지하 2층 - 성령 대부흥 성회')},37.554189,127.111164`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2 bg-[#FFCD00] hover:bg-[#f3ba00] text-black text-sm font-semibold rounded-full transition"
            >
                카카오맵에서 보기
            </a>

            {/* 자동차 안내 */}
            <div className="mt-25 text-center space-y-3">
                <h3 className="text-lg font-semibold">🚗 자동차를 이용해 오시나요?</h3>
                <p className="text-sm text-gray-700">
                    강변북로를 이용하여 구리 방면으로 오시다가 <b>워커힐, 광장 사거리</b> 입구로 진입하시기 바랍니다.
                </p>
            </div>

            {/* 지하철 안내 */}
            <div className="mt-15 text-center space-y-3">
                <h3 className="text-lg font-semibold">🚇 지하철을 이용해 오시나요?</h3>
                <p className="text-sm text-gray-700">
                    지하철을 타고 오시면, 다음 위치에서 워커힐 무료 셔틀버스를 이용하실 수 있습니다.
                </p>

                <div className="flex flex-col items-center sm:flex-row gap-5 justify-center mt-6  px-4 sm:px-8">
                    <Image
                        src="/images/fig_mapLine5.png"
                        alt="5호선 광나루역 셔틀버스 위치"
                        width={400}
                        height={280}
                        className="rounded-lg shadow bg-white"
                    />
                    <Image
                        src="/images/fig_mapLine2.png"
                        alt="2호선 강변역 셔틀버스 위치"
                        width={400}
                        height={280}
                        className="rounded-lg shadow bg-white"
                    />
                </div>
            </div>
        </section>
        
    
        
    );
}
