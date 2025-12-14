// AnimalPage3.tsx
import React, { useState } from 'react';
import styles from './AnimalPage3.module.css';
import { useNavigate } from 'react-router-dom';

import { KioskHeader } from '@/components/kiosk/header/KioskHeader';
import QuestionTitle from './components/QuestionTitle';
import ChoiceGrid from './components/ChoiceGrid';

import insaroadBgImg from '@/assets/img-insaroad.png';
import { InsaroadFootBackground } from '@/components/kiosk/background/InsaroadFootBackground';

import { NextButton } from '@/components/kiosk/button/NextButton';
import useRouteFadeNavigate from '@/hooks/kiosk/useRouteFadeNavigate';

import CountDown from '@/components/kiosk/countDown/CountDown';

import painting1 from './assets/painting1.png';
import painting2 from './assets/painting2.png';
import painting3 from './assets/painting3.png';
import painting4 from './assets/painting4.png';
import painting5 from './assets/painting5.png';

export const AnimalPage3: React.FC = () => {
    const navigate = useNavigate();
    const [selectedCount, setSelectedCount] = useState(0);

    const { isLeaving, fadeNavigate, durationMs } = useRouteFadeNavigate({
        durationMs: 350, // ✅ 통일
    });

    return (
        <div
            className={`${styles.page} ${styles.enter} ${isLeaving ? styles.leaving : ''}`}
            style={{ ['--fadeMs' as any]: `${durationMs}ms` }}
        >
            <KioskHeader />

            <div className={styles.backgroundLayer}>
                <InsaroadFootBackground src={insaroadBgImg} />
            </div>

            {/* ✅ CountDown만 (50초 버튼 없음) */}
            <CountDown
                className={styles.countdown}
                initialSeconds={60}
                onExpire={() => navigate('/kiosk')}
            />

            <QuestionTitle
                text="3. 다음 중 가장 마음에 드는 민화는 무엇인가요?"
                marginBottom={60}
            />

            <ChoiceGrid
                items={[
                    { index: 1, imageSrc: painting1 },
                    { index: 2, imageSrc: painting2 },
                    { index: 3, imageSrc: painting3 },
                    { index: 4, imageSrc: painting4 },
                    { index: 5, imageSrc: painting5 },
                ]}
                imageWidth={400}
                imageHeight={400}
                maxSelectable={1}
                columnGap={100}
                onSelectionChange={(selected) => setSelectedCount(selected.length)}
            />

            {selectedCount === 1 && (
                <NextButton
                    to="/kiosk/missions/animal/result"
                    width={320}
                    height={100}
                    positionMode="center-x"
                    y={1850}
                    onBeforeNavigate={(to) => fadeNavigate(to)}
                />
            )}
        </div>
    );
};

export default AnimalPage3;
