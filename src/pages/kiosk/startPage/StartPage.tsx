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
import { startGame } from '@/api/game';
import { storage } from '@/utils/storage';

import styles from './StartPage.module.css';
import insaroadBgImg from '@/assets/img-insaroad.png';

import { KIOSK_VIEWPORT } from '@/constants/kioskViewport';

const CURRENT_LOCATION_ID_KEY = 'currentLocationId';
const INITIAL_LOCATION_ID = '1';

export const StartPage: React.FC = () => {
    const [mode, setMode] = useState<PositionMode>('center-both');
    const [titleY, setTitleY] = useState<number | undefined>(undefined);
    const [contentVisible, setContentVisible] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const moveTimer = setTimeout(() => {
            const centerY = KIOSK_VIEWPORT.height / 2;
            setTitleY(centerY - 500);
            setMode('center-x');
        }, 500);

        const contentTimer = setTimeout(() => {
            setContentVisible(true);
        }, 900);

        return () => {
            clearTimeout(moveTimer);
            clearTimeout(contentTimer);
        };
    }, []);

    const buttonWidth = 900;
    const buttonHeight = 150;
    const centerX = KIOSK_VIEWPORT.width / 2;
    const buttonX = centerX - buttonWidth / 2;

    // ✅ "새로운 이벤트 참여하기"
    const handleNewEventClick = async () => {
        try {
            setIsLeaving(true);

            const { userCode, startStage } = await startGame();
            storage.setUserCode(userCode);

            // ✅ 새 이벤트 시작 시: currentLocationId=1 세팅
            localStorage.setItem(CURRENT_LOCATION_ID_KEY, INITIAL_LOCATION_ID);

            void startStage;

            setTimeout(() => {
                navigate('/kiosk/missions/korean-name');
            }, 400);
        } catch (e) {
            setIsLeaving(false);
            alert('게임 시작에 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
    };

    // ✅ "이벤트 이어서 진행하기"
    const handleContinueClick = () => {
        setIsLeaving(true);

        // ✅ 이어서 시작 “진입” 시점에 초기화가 필요하다면 여기서 세팅
        localStorage.setItem(CURRENT_LOCATION_ID_KEY, INITIAL_LOCATION_ID);

        setTimeout(() => {
            navigate('/kiosk/keep');
        }, 400);
    };

    return (
        <div
            className={`${styles.container} ${isLeaving ? styles.containerLeaving : ''}`}
        >
            <InsaroadFootBackground src={insaroadBgImg} />

            <InsaroadTitle text="INSAROAD" mode={mode} y={titleY} fontSize={100} />

            <div
                className={`${styles.contentGroup} ${contentVisible ? styles.contentGroupVisible : ''}`}
            >
                {titleY !== undefined && <InsaroadSubtitle y={titleY + 130} />}

                <InsaroadButton
                    width={buttonWidth}
                    height={buttonHeight}
                    x={buttonX}
                    y={(titleY ?? 1000) + 600}
                    text="새로운 이벤트 참여하기"
                    onClick={handleNewEventClick}
                />

                <InsaroadButton
                    width={buttonWidth}
                    height={buttonHeight}
                    x={buttonX}
                    y={(titleY ?? 200) + 800}
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
