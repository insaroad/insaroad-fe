import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignBoardPage2.module.css';

import { KioskHeader } from '@/components/kiosk/header/KioskHeader';
import { InsaroadFootBackground } from '@/components/kiosk/background/InsaroadFootBackground';
import CountDown from '@/components/kiosk/countDown/CountDown';

import insaroadBgImg from '@/assets/img-insaroad.png';
import startbucksImg from './assets/starbucks.png';

import nextButtonImg from '@/assets/next.png';
import ImageButton from '@/components/kiosk/button/ImageButton';

export const SignBoardPage2: React.FC = () => {
    const navigate = useNavigate();

    const [remainingSeconds, setRemainingSeconds] = useState<number>(60);
    const showExtraButton = remainingSeconds <= 50;
    
    // ✅ localStorage에서 answerImageUrl 가져오기
    const [answerImageUrl, setAnswerImageUrl] = useState<string>(startbucksImg);

    // ✅ 페이드 전환 상태
    const [entered, setEntered] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);
    const navRef = useRef<number | null>(null);

    // ✅ 진입 페이드인 트리거
    useEffect(() => {
        // 다음 프레임에 enter 붙여서 자연스럽게
        const raf = requestAnimationFrame(() => setEntered(true));
        return () => cancelAnimationFrame(raf);
    }, []);

    // ✅ localStorage에서 이미지 로드
    useEffect(() => {
        const savedImageUrl = localStorage.getItem('answerImageUrl');
        if (savedImageUrl) {
            setAnswerImageUrl(savedImageUrl);
        }
    }, []);

    const fadeOutAndNavigate = useCallback(
        (to: string) => {
            if (isLeaving) return;
            setIsLeaving(true);

            // CSS transition 시간과 동일하게
            navRef.current = window.setTimeout(() => {
                navigate(to);
            }, 350);
        },
        [isLeaving, navigate]
    );

    useEffect(() => {
        return () => {
            if (navRef.current) window.clearTimeout(navRef.current);
        };
    }, []);

    const handleExpire = useCallback(() => {
        fadeOutAndNavigate('/kiosk');
    }, [fadeOutAndNavigate]);

    const handleNext = useCallback(() => {
        fadeOutAndNavigate('/kiosk/string/3'); // 실제 라우트로 변경
    }, [fadeOutAndNavigate]);

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
                onExpire={handleExpire}
                onTick={setRemainingSeconds}
            />
            <div className={styles.stage}>
                {/* ✅ 50초 이하에서만 오른쪽 next.png 버튼 */}
                {showExtraButton && (
                    <div className={styles.extraButtonArea}>
                        <div className={styles.extraButton}>
                            {' '}
                            {/* ✅ 페이드인 애니메이션 적용 */}
                            <ImageButton
                                src={nextButtonImg}
                                width={100}
                                height={100}
                                x={1600}
                                y={550}
                                alt="다음 버튼"
                                onClick={handleNext}
                            />
                        </div>
                    </div>
                )}

                <h1 className={styles.title}>한글 간판 맞추기</h1>

                <div className={styles.imageWrapper}>
                    <img
                        src={answerImageUrl}
                        alt="한글 간판 예시 이미지"
                        className={styles.exampleImage}
                        loading="eager"
                        decoding="async"
                    />
                </div>

                <section className={styles.textSection} aria-label="한글 간판 문화 설명">
                    <p className={styles.paragraph}>
                        인사동에서는 전통 문화를 지키기 위해 가게 이름을 한글로 적는
                        <br />
                        <strong className={styles.emphasis}> ‘한글 간판 문화’</strong>를
                        이어오고 있어요.
                    </p>

                    <p className={styles.paragraph}>
                        스타벅스, 메가커피 같은 브랜드도 이곳에서는 모두 한글 간판을
                        사용하며,
                        <br />
                        덕분에 거리 전체가 한국적인 멋을 그대로 담고 있어요.
                    </p>

                    <p className={styles.paragraphStrong}>
                        한글만의 아름다움을 느끼며 인사동을 둘러보세요!
                    </p>
                </section>
            </div>
        </main>
    );
};

export default SignBoardPage2;
