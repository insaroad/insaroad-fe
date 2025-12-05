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
                x={0.3621}
                y={0.0571}
                size={0.32}
                angle={30}
                opacity={0.3}
            />

            {/* 가운데 오른쪽 발자국 */}
            <BackgroundFoot
                src={src}
                x={0.6034}
                y={0.3714}
                size={0.27}
                angle={30}
                opacity={0.3}
            />

            {/* 가운데 왼쪽 작은 발자국 */}
            <BackgroundFoot
                src={src}
                x={0.2241}
                y={0.5286}
                size={0.19}
                angle={25}
                opacity={0.3}
            />

            {/* 아래쪽 작은 발자국 */}
            <BackgroundFoot
                src={src}
                x={0.2586}
                y={0.8143}
                size={0.16}
                angle={25}
                opacity={0.3}
            />
        </div>
    );
};

export default InsaroadFootBackground;
