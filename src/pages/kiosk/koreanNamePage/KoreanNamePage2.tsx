// src/pages/kiosk/GenderPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InsaroadButton } from '@/components/kiosk/button/InsaroadButton';
import { TitleSection } from './components/TitleSection';
import { GenderSelector } from './components/GenderSelector';
import type { Gender } from './components/GenderSelector';
import styles from './KoreanNamePage2.module.css';
import { KioskHeader } from '@/components/kiosk/header/KioskHeader';
import { InsaroadFootBackground } from '@/components/kiosk/background/InsaroadFootBackground';
import insaroadBgImg from '@/assets/img-insaroad.png';

const COUNTDOWN_ENABLED = false; // 필요 시 true로 변경하면 동작

export const GenderPage: React.FC = () => {
    const navigate = useNavigate();
    const [gender, setGender] = useState<Gender>('male'); // 기본값: 남자
    const [remainingSeconds, setRemainingSeconds] = useState<number>(60);

    // 카운트다운
    useEffect(() => {
        const timerId = window.setInterval(() => {
            setRemainingSeconds((prev) => {
                if (prev <= 1) {
                    window.clearInterval(timerId);
                    // 0초가 되면 홈 화면으로 이동 (Home 버튼과 동일 동작)
                    navigate('/kiosk'); // 필요 시 경로 수정
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            window.clearInterval(timerId);
        };
    }, [navigate]);

    const handleConfirm = () => {
        console.log('Selected gender:', gender);
        navigate('/kiosk/result'); // 실제 다음 페이지 라우트에 맞게 수정
    };

    return (
        <main className={styles.container}>
            <KioskHeader />
            {/* 배경 레이어 */}
            <div className={styles.backgroundLayer}>
                <InsaroadFootBackground src={insaroadBgImg} />
            </div>
            {/* 1. 좌상단 카운트다운 숫자 */}
            <div className={styles.countdown}>{remainingSeconds}</div>

            {/* 상단 공통 타이틀 (한글 이름 짓기) */}
            <TitleSection />

            {/* 2. 질문 텍스트 + 성별 선택 */}
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

export default GenderPage;
