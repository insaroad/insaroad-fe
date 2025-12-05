import React from 'react';

type BackgroundFootProps = {
    src: string; // 발바닥 이미지 경로
    angle?: number; // 회전각도
    opacity?: number; // 투명도 (0~1)
    x: number; // x 위치 (px)
    y: number; // y 위치 (px)
    size?: number; // 이미지 크기(px), 기본값 있음
};

export const BackgroundFoot: React.FC<BackgroundFootProps> = ({
    src,
    angle = 0,
    opacity = 1,
    x,
    y,
    size = 0.2,
}) => {
    return (
        <img
            src={src}
            alt="foot"
            style={{
                position: 'absolute',
                left: `${x * 100}%`,
                top: `${y * 100}%`,
                width: `${size * 100}%`, // 컨테이너 기준 비율로 크기 조정
                height: 'auto',
                opacity,
                transform: `rotate(${angle}deg)`,
                transformOrigin: 'center center',
                pointerEvents: 'none',
            }}
        />
    );
};

export default BackgroundFoot;
