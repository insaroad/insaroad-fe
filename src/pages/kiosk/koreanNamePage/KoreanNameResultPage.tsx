// src/pages/kiosk/KoreanNameResultPage.tsx
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import ResultImage from './components/ResultImage';
import QrSaveSection from './components/QrSaveSection';
import styles from './KoreanNameResultPage.module.css';

import { KioskHeader } from '@/components/kiosk/header/KioskHeader';
import { InsaroadFootBackground } from '@/components/kiosk/background/InsaroadFootBackground';
import CountDown from '@/components/kiosk/countDown/CountDown';

import insaroadBgImg from '@/assets/img-insaroad.png';
import nextButtonImg from '@/assets/next.png';
import ImageButton from '@/components/kiosk/button/ImageButton';

export const KoreanNameResultPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const result = (location.state as any)?.result;

    if (!result) {
        // 새로고침/직접 접근 방어
        navigate('/kiosk/missions/korean-name/page1');
        return null;
    }

    const [remainingSeconds, setRemainingSeconds] = useState<number>(60);
    const showExtraButton = remainingSeconds <= 50;

    // TODO: 실제 백엔드 데이터로 교체
    // const englishTitle = 'Your Korean Name is...';
    // const koreanTitle = '당신의 이름은...';
    // const koreanName = '슬 설';
    // const romanization = '[Seul-seol]';
    // const summaryText = '당신은 ‘물’의 기운을 가지고 있습니다.';
    // const detailText1 =
    //     '‘슬’은 ‘신’의 기운을 가지고 있어, 집념과 결단력으로 당신을 세상으로 인도합니다.';
    // const detailText2 =
    //     '‘설’은 ‘신’의 기운을 가지고 있어, 신념과 결단력으로 당신을 세상으로 인도합니다.';
    const englishTitle = 'Your Korean Name is...';
    const koreanTitle = '당신의 이름은...';
    const koreanName = result.koreanName; // "슬설"이면 화면에서 띄어쓰기 넣을지 결정
    const romanization = `[${result.romanizedName}]`;

    const overallExplanation = result.overallExplanation;
    const syllableDescriptions: string[] = (result.syllables ?? []).map(
        (s: any) => s.description
    );

    // const summaryText = `당신은 ‘${result.mainElementType}’의 기운을 가지고 있습니다.`;
    // const detailText1 = result.syllables?.[0]
    // ? `‘${result.syllables[0].syllable}’은 '${result.syllables[0].elementType}'의 기운을 보완해, ${result.syllables[0].description}`
    // : "";

    // const detailText2 = result.syllables?.[1]
    // ? `‘${result.syllables[1].syllable}’은 '${result.syllables[1].elementType}'의 기운을 보완해, ${result.syllables[1].description}`
    // : "";

    const handleExpire = useCallback(() => {
        navigate('/kiosk');
    }, [navigate]);

    return (
        <main className={styles.container}>
            <KioskHeader />

            {/* 배경 */}
            <div className={styles.backgroundLayer}>
                <InsaroadFootBackground src={insaroadBgImg} />
            </div>

            {/* ✅ CountDown 컴포넌트 */}
            <CountDown
                className={styles.countdown}
                initialSeconds={60}
                onExpire={handleExpire}
                onTick={setRemainingSeconds}
            />

            {/* ✅ 50초 이하에서 next 버튼 */}
            {showExtraButton && (
                <div className={styles.extraButtonArea}>
                    <div className={styles.extraButton}>
                        <ImageButton
                            src={nextButtonImg}
                            width={100}
                            height={100}
                            x={1600}
                            y={1050}
                            alt="다음 버튼"
                            onClick={() => navigate('/kiosk/string/1')}
                        />
                    </div>
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
            {/* <ResultImage />*/}
            <ResultImage src={result.elementImageUrl} />

            {/* 설명 텍스트 */}
            {/* <section className={styles.descriptionSection}>
                <hr className={styles.divider} />
                <p className={styles.summary}>{summaryText}</p>
                <p className={styles.detail}>{detailText1}</p>
                <p className={styles.detail}>{detailText2}</p>
            </section> */}
            <section className={styles.descriptionSection}>
                <hr className={styles.divider} />

                <p className={styles.summary}>{overallExplanation}</p>

                {syllableDescriptions.map((text, idx) => (
                    <p key={idx} className={styles.detail}>
                        {text}
                    </p>
                ))}
            </section>
        </main>
    );
};

export default KoreanNameResultPage;
