// InsaroadFootBackground.tsx
import React from 'react';
import { BackgroundFoot } from './BackgroundFoot';

type InsaroadFootBackgroundProps = {
    src: string; // 발자국 이미지 경로
};

export const InsaroadFootBackground: React.FC<InsaroadFootBackgroundProps> = ({
    src,
}) => {
    return (
        <div aria-hidden="true" className="background_container">
            {/* 위쪽 큰 발자국 */}
            <BackgroundFoot
                src={src}
                x={210}
                y={40}
                size={190}
                angle={30}
                opacity={0.3}
            />

            {/* 가운데 오른쪽 발자국 */}
            <BackgroundFoot
                src={src}
                x={350}
                y={260}
                size={160}
                angle={30}
                opacity={0.3}
            />

            {/* 가운데 왼쪽 작은 발자국 */}
            <BackgroundFoot
                src={src}
                x={130}
                y={370}
                size={110}
                angle={25}
                opacity={0.3}
            />

            {/* 아래쪽 작은 발자국 */}
            <BackgroundFoot
                src={src}
                x={150}
                y={570}
                size={100}
                angle={25}
                opacity={0.3}
            />
        </div>
    );
};

export default InsaroadFootBackground;
