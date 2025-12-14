import React, { useCallback, useState } from 'react';
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

    const handleExpire = useCallback(() => {
        navigate('/kiosk');
    }, [navigate]);

    const handleNext = useCallback(() => {
        navigate('/kiosk/signboard/3'); // 실제 라우트로 변경
    }, [navigate]);

    return (
        <main className={styles.container}>
            <KioskHeader />

            <div className={styles.backgroundLayer}>
                <InsaroadFootBackground src={insaroadBgImg} />
            </div>

            <div className={styles.stage}>
                <CountDown
                    className={styles.countdown}
                    initialSeconds={60}
                    onExpire={handleExpire}
                    onTick={setRemainingSeconds} // ✅ 매초 남은 시간 업데이트
                />

                {/* ✅ 50초 이하에서만 오른쪽 next.png 버튼 */}
                {showExtraButton && (
                    <div className={styles.extraButtonArea}>
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
                )}

                <h1 className={styles.title}>한글 간판 맞추기</h1>

                <div className={styles.imageWrapper}>
                    <img
                        src={startbucksImg}
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
