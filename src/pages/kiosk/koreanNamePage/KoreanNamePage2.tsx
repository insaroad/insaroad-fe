import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { InsaroadButton } from '@/components/kiosk/button/InsaroadButton';
import { TitleSection } from './components/TitleSection';
import { GenderSelector } from './components/GenderSelector';
import type { Gender } from './components/GenderSelector';
import styles from './KoreanNamePage2.module.css';
import { KioskHeader } from '@/components/kiosk/header/KioskHeader';
import { InsaroadFootBackground } from '@/components/kiosk/background/InsaroadFootBackground';
import insaroadBgImg from '@/assets/img-insaroad.png';

import CountDown from '@/components/kiosk/countDown/CountDown';
import useRouteFadeNavigate from '@/hooks/kiosk/useRouteFadeNavigate';

export const KoreanNamePage2: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const birthDate = (location.state as any)?.birthDate as string | undefined;
    const [gender, setGender] = useState<Gender>('male');
    const [entered, setEntered] = useState(false);

    const { isLeaving, fadeNavigate, durationMs } = useRouteFadeNavigate({
        durationMs: 350,
    });

    useEffect(() => setEntered(true), []);

    const handleExpire = useCallback(() => {
        fadeNavigate('/kiosk');
    }, [fadeNavigate]);

    // const handleConfirm = useCallback(() => {
    //     console.log('Selected gender:', gender);
    //     fadeNavigate('/kiosk/missions/korean-name/page3'); // TODO: 실제 라우트로 맞추세요
    // }, [fadeNavigate, gender]);

    const handleConfirm = useCallback(() => {
        if (!birthDate) {
            // Page1을 거치지 않고 들어온 경우 방어
            fadeNavigate("/kiosk/missions/korean-name/page1");
            return;
    }

    // 프론트 gender("male"/"female") -> 백엔드 "MALE"/"FEMALE"
    const apiGender = gender === "male" ? "MALE" : "FEMALE";

    navigate("/kiosk/missions/korean-name/page3", {
        state: { birthDate, gender: apiGender },
    });
    }, [birthDate, gender, navigate, fadeNavigate]);

    return (
        <main
            className={[
                styles.container,
                entered ? styles.enter : '',
                isLeaving ? styles.leaving : '',
            ].join(' ')}
            style={{ ['--fadeMs' as any]: `${durationMs}ms` }}
        >
            <KioskHeader />

            <div className={styles.backgroundLayer}>
                <InsaroadFootBackground src={insaroadBgImg} />
            </div>

            {/* ✅ CountDown 교체 */}
            <CountDown
                className={styles.countdown}
                initialSeconds={60}
                onExpire={handleExpire}
            />

            <TitleSection />

            <section className={styles.questionSection} aria-label="성별 선택">
                <p className={styles.questionText}>당신의 성별은 무엇인가요?</p>

                <div className={styles.selectorSection}>
                    <GenderSelector value={gender} onChange={setGender} />
                </div>
            </section>

            <InsaroadButton
                width={520}
                height={120}
                x={650}
                y={1450}
                text="확인"
                onClick={handleConfirm}
            />
        </main>
    );
};

export default KoreanNamePage2;
