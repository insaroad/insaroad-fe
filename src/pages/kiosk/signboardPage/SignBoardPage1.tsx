import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignBoardPage1.module.css';
import { KioskHeader } from '@/components/kiosk/header/KioskHeader';
import { InsaroadButton } from '@/components/kiosk/button/InsaroadButton';
import signboardImg from './assets/signboard.png';
import { InsaroadFootBackground } from '@/components/kiosk/background/InsaroadFootBackground';
import insaroadBgImg from '@/assets/img-insaroad.png';

import checkRedImg from '@/assets/kiosk/check-red.png';
import checkGreenImg from '@/assets/kiosk/check-green.png';

type Feedback = 'correct' | 'wrong';

export const SignBoardPage1: React.FC = () => {
    const navigate = useNavigate();

    /* ✅ 카운트다운 상태 */
    const [remainingSeconds, setRemainingSeconds] = useState<number>(60);

    const CORRECT_CHOICE = 3;

    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const [fadeOut, setFadeOut] = useState<boolean>(false);

    const timeoutRef = useRef<number | null>(null);
    const fadeRef = useRef<number | null>(null);

    const isFeedbackOpen = feedback !== null;

    /* ===============================
     * ✅ 카운트다운 useEffect (복구)
     * =============================== */
    useEffect(() => {
        const timerId = window.setInterval(() => {
            setRemainingSeconds((prev) => {
                if (prev <= 1) {
                    window.clearInterval(timerId);
                    navigate('/kiosk'); // 홈 화면
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            window.clearInterval(timerId);
        };
    }, [navigate]);

    /* ===============================
     * 정답/오답 선택 처리
     * =============================== */
    const handleChoice = (choiceNumber: number) => {
        if (isFeedbackOpen) return;

        const nextFeedback: Feedback =
            choiceNumber === CORRECT_CHOICE ? 'correct' : 'wrong';

        setFeedback(nextFeedback);
        setFadeOut(false);

        // fade-out 시작
        fadeRef.current = window.setTimeout(() => {
            setFadeOut(true);
        }, 750);

        // 1초 후 처리
        timeoutRef.current = window.setTimeout(() => {
            if (nextFeedback === 'correct') {
                navigate('/kiosk/next');
            } else {
                setFeedback(null);
                setFadeOut(false);
            }
        }, 1000);
    };

    /* ===============================
     * cleanup
     * =============================== */
    useEffect(() => {
        return () => {
            if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
            if (fadeRef.current) window.clearTimeout(fadeRef.current);
        };
    }, []);

    return (
        <main className={styles.container}>
            <KioskHeader />

            {/* dim 처리 영역 */}
            <div className={`${styles.stage} ${isFeedbackOpen ? styles.dimmed : ''}`}>
                <div className={styles.backgroundLayer}>
                    <InsaroadFootBackground src={insaroadBgImg} />
                </div>

                {/* ✅ 카운트다운 표시 */}
                <div className={styles.countdown}>{remainingSeconds}</div>

                <h1 className={styles.title}>한글 간판 맞추기</h1>

                <div className={styles.imageWrapper}>
                    <img
                        src={signboardImg}
                        alt="간판 이미지"
                        className={styles.signboardImage}
                    />
                </div>

                <p className={styles.subtitle}>
                    인사동에 있는 해당 가게의 간판 이름은 뭘까요?
                </p>

                <InsaroadButton
                    width={900}
                    height={130}
                    x={460}
                    y={700}
                    text="1. 스타벅수"
                    onClick={() => handleChoice(1)}
                />
                <InsaroadButton
                    width={900}
                    height={130}
                    x={460}
                    y={860}
                    text="2. 스타벜스"
                    onClick={() => handleChoice(2)}
                />
                <InsaroadButton
                    width={900}
                    height={130}
                    x={460}
                    y={1020}
                    text="3. 스타벅스"
                    onClick={() => handleChoice(3)}
                />
            </div>

            {/* ✅ 피드백 오버레이 */}
            {feedback && (
                <div className={styles.feedbackOverlay}>
                    <img
                        src={feedback === 'correct' ? checkGreenImg : checkRedImg}
                        alt=""
                        className={`${styles.feedbackImage} ${
                            fadeOut ? styles.fadeOut : ''
                        }`}
                    />
                </div>
            )}
        </main>
    );
};

export default SignBoardPage1;
