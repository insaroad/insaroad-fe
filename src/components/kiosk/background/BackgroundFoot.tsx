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
    size = 140,
}) => {
    return (
        <img
            src={src}
            alt="foot"
            style={{
                position: 'absolute',
                left: x,
                top: y,
                width: size,
                height: size,
                opacity,
                transform: `rotate(${angle}deg)`,
                pointerEvents: 'none',
            }}
        />
    );
};

export default BackgroundFoot;
