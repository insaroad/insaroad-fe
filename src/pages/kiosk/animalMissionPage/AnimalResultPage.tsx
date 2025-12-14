// AnimalResultPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KioskHeader } from '@/components/kiosk/header/KioskHeader';
import { InsaroadFootBackground } from '@/components/kiosk/background/InsaroadFootBackground';

import ResultTitle from './components/result/ResultTitle';
import ResultImageSection from './components/result/ResultImageSection';
import ResultDescription from './components/result/ResultDescription';

import insaroadBgImg from '@/assets/img-insaroad.png';
import result1 from './assets/result1.png';
import styles from './AnimalResultPage.module.css';

import CountDown from '@/components/kiosk/countDown/CountDown';
import ImageButton from '@/components/kiosk/button/ImageButton';
import nextButtonImg from '@/assets/next.png';

export interface ResultTextSegment {
    text: string;
    bold?: boolean;
}

export const AnimalResultPage: React.FC = () => {
    const navigate = useNavigate();

    // ✅ ResultPage에서만 50초 버튼을 위해 tick 필요
    const [remainingSeconds, setRemainingSeconds] = useState<number>(60);
    const showHomeButton = remainingSeconds <= 50;

    const introSegments: ResultTextSegment[] = [
        {
            text: '당신은 악귀를 쫓고 가정을 지키는 수호자이자, 산의 왕, 기세와 용맹의 상징인 ',
        },
        { text: '범(虎)의 기질', bold: true },
        { text: '을 지녔습니다.\n\n' },
        { text: '「삼국유사」와 여러 민담에서 호랑이는 ' },
        { text: '용맹·결단·기운의 상징', bold: true },
        {
            text: '으로 등장합니다. 민화 「까치호랑이」에서처럼 익살스러운 모습을 보이곤 하지만, 본질적으로는 ',
        },
        { text: '강한 에너지와 추진력', bold: true },
        { text: '을 지닌 존재입니다.' },
    ];

    const traitSegments: ResultTextSegment[] = [
        { text: '[당신의 성향은…]\n', bold: true },
        { text: '1. 목표가 생기면 바로 ' },
        { text: '행동하는 추진력', bold: true },
        { text: '을 갖고 있습니다.\n' },
        { text: '2. 앞길이 막혀더라도, 고난을 뚫고 가려는 ' },
        { text: '기백', bold: true },
        { text: '을 지녔습니다.\n' },
        { text: '3. 사람들에게 강한 인상과 ' },
        { text: '에너지를 주는 타입', bold: true },
        { text: '입니다.\n' },
        { text: '4. 한번 “해야겠다”는 결정을 하면, 쉽게 ' },
        { text: '흔들리지 않습니다.', bold: true },
    ];

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

                <ResultTitle title="[기세(氣勢)와 용맹(勇猛)의 상징]" />

                <ResultImageSection
                    imageSrc={result1}
                    caption="[작호도(虎虎圖), 민화종(추정 미상)]"
                />

                <ResultDescription segments={introSegments} />
                <ResultDescription segments={traitSegments} />
            </div>
        </div>
    );
};

export default AnimalResultPage;
