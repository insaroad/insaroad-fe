import React, { useEffect, useRef } from 'react';

declare global {
    interface Window {
        kakao: any;
    }
}

type KakaoMapProps = {
    latitude: number;
    longitude: number;
};

export const KakaoMap: React.FC<KakaoMapProps> = ({ latitude, longitude }) => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = mapRef.current;
        if (!container) return;

        // 1. window.kakao가 있는지 확인
        if (!window.kakao || !window.kakao.maps) {
            console.error("Kakao Map script is not loaded yet!");
            return;
        }

        // ✅ 2. kakao.maps.load()를 사용하여 로딩이 완료된 후 실행
        window.kakao.maps.load(() => {
            const options = {
                center: new window.kakao.maps.LatLng(latitude, longitude),
                level: 3,
            };

            // 기존 지도 삭제 (중복 방지)
            container.innerHTML = '';

            // 지도 생성
            const map = new window.kakao.maps.Map(container, options);

            // 마커 생성
            const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
            const marker = new window.kakao.maps.Marker({
                position: markerPosition,
            });
            marker.setMap(map);
            
             // 레이아웃 깨짐 방지
            setTimeout(() => {
                map.relayout();
                map.setCenter(new window.kakao.maps.LatLng(latitude, longitude));
            }, 100);
        });

    }, [latitude, longitude]);

    return (
        <div 
            ref={mapRef} 
            style={{ width: '100%', height: '100%' }} 
        />
    );
};