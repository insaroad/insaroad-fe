// src/pages/kiosk/KoreanNameResultPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResultImage from './components/ResultImage';
import QrSaveSection from './components/QrSaveSection';
import styles from './KoreanNameResultPage.module.css';
import { KioskHeader } from '@/components/kiosk/header/KioskHeader';
import { InsaroadFootBackground } from '@/components/kiosk/background/InsaroadFootBackground';
import insaroadBgImg from '@/assets/img-insaroad.png';
import nextButtonImg from '@/assets/next.png';
import ImageButton from '@/components/kiosk/button/ImageButton';

export const KoreanNameResultPage: React.FC = () => {
    const navigate = useNavigate();

    const [remainingSeconds, setRemainingSeconds] = useState<number>(60);
    // 테스트용 버튼 표시 트리거
    const showExtraButton = remainingSeconds <= 50;
    // TODO: 실제 백엔드에서 내려오는 값으로 대체
    const englishTitle = 'Your Korean Name is...';
    const koreanTitle = '당신의 이름은...';
    const koreanName = '슬 설';
    const romanization = '[Seul-seol]';
    const summaryText = '당신은 ‘물’의 기운을 가지고 있습니다.';
    const detailText1 =
        '‘슬’은 ‘신’의 기운을 가지고 있어, 집념과 결단력으로 당신을 세상으로 인도합니다.';
    const detailText2 =
        '‘설’은 ‘신’의 기운을 가지고 있어, 신념과 결단력으로 당신을 세상으로 인도합니다.';

    // 카운트다운
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

    return (
        <main className={styles.container}>
            <KioskHeader />
            {/* 배경 레이어 */}
            <div className={styles.backgroundLayer}>
                <InsaroadFootBackground src={insaroadBgImg} />
            </div>

            {/* 좌상단 카운트다운 숫자 */}
            <div className={styles.countdown}>{remainingSeconds}</div>
            {/* 50초 이하에서만 버튼 등장 */}
            {showExtraButton && (
                <div className={styles.extraButtonArea}>
                    {/* 50초 이하에서 나타나는 next.png 버튼 */}
                    {remainingSeconds <= 50 && (
                        <ImageButton
                            src={nextButtonImg}
                            width={100}
                            height={100}
                            x={1600} // 원하는 위치 조정
                            y={1050} // 원하는 위치 조정
                            alt="다음 버튼"
                            onClick={() => navigate('/kiosk/next')}
                        />
                    )}
                </div>
            )}
            {/* 상단 텍스트 + QR */}
            <section className={styles.topSection}>
                <div className={styles.topTextGroup}>
                    <p className={styles.engTitle}>{englishTitle}</p>
                    <p className={styles.krTitle}>{koreanTitle}</p>
                    <h1 className={styles.koreanName}>{koreanName}</h1>
                    <p className={styles.romanization}>{romanization}</p>
                </div>

                <div className={styles.qrArea}>
                    <QrSaveSection />
                </div>
            </section>

            {/* 결과 이미지 */}
            <ResultImage />

            {/* 설명 텍스트 영역 */}
            <section className={styles.descriptionSection}>
                <hr className={styles.divider} />
                <p className={styles.summary}>{summaryText}</p>

                <p className={styles.detail}>{detailText1}</p>
                <p className={styles.detail}>{detailText2}</p>
            </section>
        </main>
    );
};

export default KoreanNameResultPage;
