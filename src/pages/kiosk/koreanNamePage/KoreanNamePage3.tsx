// import React from 'react';
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { recommendKoreanName } from "@/api/koreanName";
import BrushIcon from './components/BrushIcon';
import LoadingTitle from './components/LoadingTitle';
import LoadingSubtitle from './components/LoadingSubtitle';
import styles from './KoreanNamePage3.module.css';
import { KioskHeader } from '@/components/kiosk/header/KioskHeader';
import { InsaroadFootBackground } from '@/components/kiosk/background/InsaroadFootBackground';
import insaroadBgImg from '@/assets/img-insaroad.png';

export const KoreanNamePage3: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
    const state = location.state as any;
    const birthDate = state?.birthDate as string | undefined;
    const gender = state?.gender as "MALE" | "FEMALE" | undefined;

    if (!birthDate || !gender) {
        navigate("/kiosk/missions/korean-name/page1");
        return;
    }

    (async () => {
        try {
        const result = await recommendKoreanName({ birthDate, gender });
        navigate("/kiosk/missions/korean-name/result", {
            state: { result },
        });
        } catch (e) {
        // 실패하면 Page2로 보내거나, 에러 화면 만들기
        navigate("/kiosk/missions/korean-name/page2");
        }
    })();
    }, [location.state, navigate]);
    return (
        <main className={styles.container}>
            <KioskHeader />
            {/* 배경 레이어 */}
            <div className={styles.backgroundLayer}>
                <InsaroadFootBackground src={insaroadBgImg} />
            </div>

            <BrushIcon />
            <LoadingTitle />
            <LoadingSubtitle />
        </main>
    );
};

export default KoreanNamePage3;
