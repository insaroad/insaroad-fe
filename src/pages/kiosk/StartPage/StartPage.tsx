// pages/kiosk/StartPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InsaroadFootBackground } from '@/components/kiosk/background/InsaroadFootBackground';
import InsaroadTitle, {
    type PositionMode,
} from '@/components/kiosk/insaroadTitle/InsaroadTitle';
import InsaroadSubtitle from '@/components/kiosk/insaroadTitle/InsaroadSubtitle';
import InsaroadButton from '@/components/kiosk/button/InsaroadButton';
import StringDecor from '@/components/kiosk/decor/StringDecor';
import QuestionDecor from '@/components/kiosk/decor/QuestionDecor';

import styles from './StartPage.module.css';

import insaroadBgImg from '@/assets/img-insaroad.png';

export const StartPage: React.FC = () => {
    const [mode, setMode] = useState<PositionMode>('center-both');
    const [titleY, setTitleY] = useState<number | undefined>(undefined);
    const [contentVisible, setContentVisible] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false); // ✅ 페이드아웃 상태

    const navigate = useNavigate();

    useEffect(() => {
        const moveTimer = setTimeout(() => {
            if (typeof window !== 'undefined') {
                const centerY = window.innerHeight / 2;
                setTitleY(centerY - 150);
            } else {
                setTitleY(200);
            }
            setMode('center-x');
        }, 500);

        const contentTimer = setTimeout(() => {
            setContentVisible(true);
        }, 500 + 400);

        return () => {
            clearTimeout(moveTimer);
            clearTimeout(contentTimer);
        };
    }, []);

    const buttonWidth = 350;
    const buttonHeight = 60;
    const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 375;
    const buttonX = centerX - buttonWidth / 2;

    // ✅ "이벤트 이어서 진행하기" 버튼 클릭 시
    const handleContinueClick = () => {
        // 1) 먼저 현재 화면 페이드아웃
        setIsLeaving(true);

        // 2) 페이드아웃 트랜지션 시간 후 실제 라우팅
        //    (CSS에서 transition: 0.4s 로 맞출 예정)
        setTimeout(() => {
            navigate('/kiosk/keep');
        }, 400);
    };

    return (
        <div
            className={`${styles.container} ${isLeaving ? styles.containerLeaving : ''}`}
        >
            <InsaroadFootBackground src={insaroadBgImg} />

            <InsaroadTitle text="INSAROAD" mode={mode} y={titleY} />

            <div
                className={`${styles.contentGroup} ${
                    contentVisible ? styles.contentGroupVisible : ''
                }`}
            >
                {titleY !== undefined && <InsaroadSubtitle y={titleY + 60} />}

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
                    onClick={handleContinueClick}
                />

                <StringDecor />
                <QuestionDecor />
            </div>
        </div>
    );
};

export default StartPage;
