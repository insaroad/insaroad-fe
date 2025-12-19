// AnimalResultPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { KioskHeader } from '@/components/kiosk/header/KioskHeader';
import { InsaroadFootBackground } from '@/components/kiosk/background/InsaroadFootBackground';

import ResultTitle from './components/result/ResultTitle';
import ResultImageSection from './components/result/ResultImageSection';
import ResultDescription from './components/result/ResultDescription';

import insaroadBgImg from '@/assets/img-insaroad.png';
import styles from './AnimalResultPage.module.css';

import CountDown from '@/components/kiosk/countDown/CountDown';
import ImageButton from '@/components/kiosk/button/ImageButton';
import nextButtonImg from '@/assets/next.png';

import type { AnimalResultResponse } from '@/api/animalMission';

// 동물이미지 매핑 (호랑이, 까치, 해태, 학, 거북이 순서)
import tigerImg from './assets/result1.png';
import magpieImg from './assets/result2.png';
import haetaeImg from './assets/result3.png';
import craneImg from './assets/result4.png';
import turtleImg from './assets/result5.png';

const animalImageMap: Record<string, string> = {
    CRANE: craneImg,
    HAETAE: haetaeImg,
    TURTLE: turtleImg,
    TIGER: tigerImg,
    MAGPIE: magpieImg,
};

export const AnimalResultPage: React.FC = () => {
    const navigate = useNavigate();

    // ✅ ResultPage에서만 50초 버튼을 위해 tick 필요
    const [remainingSeconds, setRemainingSeconds] = useState<number>(60);
    const [resultData, setResultData] = useState<AnimalResultResponse | null>(null);

    const showHomeButton = remainingSeconds <= 50;

    useEffect(() => {
        // LocalStorage에서 결과 가져오기
        const storedResult = localStorage.getItem('animalResult');
        if (storedResult) {
            try {
                const parsed = JSON.parse(storedResult) as AnimalResultResponse;
                setResultData(parsed);
            } catch (error) {
                console.error('결과 가져오기 실패:', error);
            }
        }
    }, []);

    if (!resultData) {
        return (
            <div className={`${styles.page} ${styles.enter}`}>
                <div className={styles.backgroundLayer}>
                    <InsaroadFootBackground src={insaroadBgImg} />
                </div>
                <KioskHeader />
                <div style={{ textAlign: 'center', marginTop: '400px', fontSize: '32px' }}>
                    결과 불러오는 중 ..
                </div>
            </div>
        );
    }

    const imageSrc = animalImageMap[resultData.animal] || craneImg;

    return (
        <div className={`${styles.page} ${styles.enter}`}>
            {/* 배경 레이어 */}
            <div className={styles.backgroundLayer}>
                <InsaroadFootBackground src={insaroadBgImg} />
            </div>

            {/* ✅ CountDown */}
            <CountDown
                className={styles.countdown}
                initialSeconds={60}
                onExpire={() => navigate('/kiosk')}
                onTick={setRemainingSeconds}
            />

            {/* ✅ ResultPage에서만: 50초 이하 버튼 페이드인 */}
            {showHomeButton && (
                <div className={styles.extraButtonArea}>
                    <div className={styles.extraButton}>
                        <ImageButton
                            src={nextButtonImg}
                            width={100}
                            height={100}
                            x={1600}
                            y={1000}
                            alt="처음 화면 이동하기"
                            onClick={() => navigate('/kiosk/string/1')}
                        />
                    </div>
                </div>
            )}

            {/* 실제 콘텐츠 레이어 */}
            <div className={styles.contentLayer}>
                <KioskHeader />

                <ResultTitle title={resultData.title} />

                <ResultImageSection imageSrc={imageSrc} caption={resultData.caption} />

                <ResultDescription segments={resultData.description.intro} />
                <ResultDescription segments={resultData.description.traits} />
            </div>
        </div>
    );
};

export default AnimalResultPage;

