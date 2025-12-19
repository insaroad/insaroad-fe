import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignBoardPage1.module.css';

import { KioskHeader } from '@/components/kiosk/header/KioskHeader';
import { InsaroadButton } from '@/components/kiosk/button/InsaroadButton';

import { InsaroadFootBackground } from '@/components/kiosk/background/InsaroadFootBackground';
import insaroadBgImg from '@/assets/img-insaroad.png';

import checkRedImg from '@/assets/kiosk/check-red.png';
import checkGreenImg from '@/assets/kiosk/check-green.png';

import CountDown from '@/components/kiosk/countDown/CountDown';
import { hangulSignAPI, type QuizResponse } from '@/api/hangulSign';

type Feedback = 'correct' | 'wrong';

export const SignBoardPage1: React.FC = () => {
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState<QuizResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const [fadeOut, setFadeOut] = useState<boolean>(false);

    // ✅ 진입 페이드인 트리거
    const [entered, setEntered] = useState(false);

    // ✅ 페이지 전환용(페이드아웃)
    const [isLeaving, setIsLeaving] = useState<boolean>(false);

    const timeoutRef = useRef<number | null>(null);
    const fadeRef = useRef<number | null>(null);
    const navRef = useRef<number | null>(null);

    const isFeedbackOpen = feedback !== null;

    // ✅ mount 직후 enter 실행
    useEffect(() => {
        const t = window.setTimeout(() => setEntered(true), 0);
        return () => window.clearTimeout(t);
    }, []);

    // ✅ 퀴즈 데이터 불러오기
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const data = await hangulSignAPI.getRandomQuiz();
                setQuiz(data);
            } catch (error) {
                console.error('Failed to fetch quiz:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchQuiz();
    }, []);

    const handleChoice = async (choiceNumber: number) => {
        if (isFeedbackOpen || !quiz) return;

        // ✅ 프론트엔드에서 정답 검증
        const isCorrect = choiceNumber === quiz.correctChoice;
        const nextFeedback: Feedback = isCorrect ? 'correct' : 'wrong';

        setFeedback(nextFeedback);
        setFadeOut(false);

        fadeRef.current = window.setTimeout(() => {
            setFadeOut(true);
        }, 750);

        // ✅ 정답인 경우에만 API 제출
        if (isCorrect) {
            try {
                const userCode = localStorage.getItem('userCode');
                const currentLocationId = localStorage.getItem('currentLocationId');

                if (userCode && currentLocationId) {
                    const response = await hangulSignAPI.submitAnswer(quiz.id, {
                        userCode,
                        currentLocationId: Number(currentLocationId),
                        userAnswer: choiceNumber,
                    });
                    // ✅ localStorage에 answerImageUrl 저장
                    if (response.answerImageUrl) {
                        localStorage.setItem('insaroad_answerImageUrl', response.answerImageUrl);
                    }
                }
            } catch (error) {
                console.error('Failed to submit answer:', error);
            }
        }

        timeoutRef.current = window.setTimeout(() => {
            if (nextFeedback === 'correct') {
                setIsLeaving(true);

                navRef.current = window.setTimeout(() => {
                    navigate('/kiosk/missions/signboard/page2');
                }, 350);
            } else {
                setFeedback(null);
                setFadeOut(false);
            }
        }, 1000);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
            if (fadeRef.current) window.clearTimeout(fadeRef.current);
            if (navRef.current) window.clearTimeout(navRef.current);
        };
    }, []);

    return (
        <main
            className={[
                styles.container,
                entered ? styles.enter : '',
                isLeaving ? styles.leaving : '',
            ].join(' ')}
        >
            <KioskHeader />

            <div className={styles.backgroundLayer}>
                <InsaroadFootBackground src={insaroadBgImg} />
            </div>
            <CountDown
                className={styles.countdown}
                initialSeconds={60}
                onExpire={() => navigate('/kiosk')}
            />
            <div className={`${styles.stage} ${isFeedbackOpen ? styles.dimmed : ''}`}>
                <h1 className={styles.title}>한글 간판 맞추기</h1>

                {isLoading ? (
                    <div className={styles.loading}>로딩 중...</div>
                ) : quiz ? (
                    <>
                        <div className={styles.imageWrapper}>
                            <img
                                src={quiz.questionImageUrl}
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
                            text={`1. ${quiz.choice1}`}
                            onClick={() => handleChoice(1)}
                        />
                        <InsaroadButton
                            width={900}
                            height={130}
                            x={460}
                            y={860}
                            text={`2. ${quiz.choice2}`}
                            onClick={() => handleChoice(2)}
                        />
                        <InsaroadButton
                            width={900}
                            height={130}
                            x={460}
                            y={1020}
                            text={`3. ${quiz.choice3}`}
                            onClick={() => handleChoice(3)}
                        />
                    </>
                ) : (
                    <div className={styles.error}>퀴즈를 불러오는데 실패했습니다.</div>
                )}
            </div>

            {feedback && (
                <div className={styles.feedbackOverlay}>
                    <img
                        src={feedback === 'correct' ? checkGreenImg : checkRedImg}
                        alt=""
                        className={`${styles.feedbackImage} ${fadeOut ? styles.fadeOut : ''}`}
                    />
                </div>
            )}
        </main>
    );
};

export default SignBoardPage1;
