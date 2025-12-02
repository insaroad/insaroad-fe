// pages/kiosk/StartPage.tsx
import React, { useEffect, useState } from 'react';
import { InsaroadFootBackground } from '@/components/kiosk/background/InsaroadFootBackground';
import InsaroadTitle, {
    type PositionMode,
} from '@/components/kiosk/insaroadTitle/InsaroadTitle';
import InsaroadSubtitle from '@/components/kiosk/insaroadTitle/InsaroadSubtitle';
import InsaroadButton from '@/components/kiosk/button/InsaroadButton';
import StringDecor from '@/components/kiosk/decor/StringDecor';
import QuestionDecor from '@/components/kiosk/decor/QuestionDecor';

import styles from './StartPage.module.css';

// 배경 발자국 이미지 (권장: import 방식)
import insaroadBgImg from '@/assets/img-insaroad.png';

export const StartPage: React.FC = () => {
    const [mode, setMode] = useState<PositionMode>('center-both');
    const [titleY, setTitleY] = useState<number | undefined>(undefined);
    const [contentVisible, setContentVisible] = useState(false);

    useEffect(() => {
        // 1단계: 0.5초 후 타이틀을 위로 200px 이동 + center-x 로 전환
        const moveTimer = setTimeout(() => {
            if (typeof window !== 'undefined') {
                const centerY = window.innerHeight / 2;
                // 중앙 기준 위로 150px
                setTitleY(centerY - 150);
            } else {
                setTitleY(200);
            }
            setMode('center-x');
        }, 500);

        // 2단계: 이동 애니메이션(0.4s) 후 컨텐츠 페이드인
        const contentTimer = setTimeout(() => {
            setContentVisible(true);
        }, 500 + 400); // 0.5s + 0.4s

        return () => {
            clearTimeout(moveTimer);
            clearTimeout(contentTimer);
        };
    }, []);

    // 버튼 위치(예시): 중앙 기준으로 적당히 배치
    const buttonWidth = 350;
    const buttonHeight = 60;
    const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 375;
    const buttonX = centerX - buttonWidth / 2;

    return (
        <div className={styles.container}>
            <InsaroadFootBackground src={insaroadBgImg} />

            {/* 타이틀: 처음 center-both → 이후 center-x + y - 200 */}
            <InsaroadTitle text="INSAROAD" mode={mode} y={titleY} />

            {/* 타이틀 이동 이후 페이드인되는 영역 */}
            <div
                className={`${styles.contentGroup} ${
                    contentVisible ? styles.contentGroupVisible : ''
                }`}
            >
                {/* 1. 안내 문구 (타이틀 아래) */}
                {titleY !== undefined && <InsaroadSubtitle y={titleY + 60} />}

                {/* 2. 버튼 두 개 */}
                <InsaroadButton
                    width={buttonWidth}
                    height={buttonHeight}
                    x={buttonX}
                    y={(titleY ?? 200) + 200}
                    text="새로운 이벤트 참여하기"
                />
                <InsaroadButton
                    width={buttonWidth}
                    height={buttonHeight}
                    x={buttonX}
                    y={(titleY ?? 200) + 270}
                    text="이벤트 이어서 진행하기"
                />

                {/* 3. string / question 데코 이미지 */}
                <StringDecor />
                <QuestionDecor />
            </div>
        </div>
    );
};

export default StartPage;
