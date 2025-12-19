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

import type { AnimalType } from '@/api/animalMission';
import { submitAnimalMission } from '@/api/animalMission';

// 인덱스 -> 동물 타입 매핑
const indexToAnimalMap: Record<number, AnimalType> = {
    1: 'CRANE',
    2: 'HAETAE',
    3: 'TURTLE',
    4: 'TIGER',
    5: 'MAGPIE',
};

export const AnimalPage3: React.FC = () => {
    const navigate = useNavigate();
    const [selectedCount, setSelectedCount] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { isLeaving, fadeNavigate, durationMs } = useRouteFadeNavigate({
        durationMs: 350, // ✅ 통일
    });

    const handleSubmit = async () => {
        if (isSubmitting || selectedIndex === null) return;
        setIsSubmitting(true);

        try {
            // LocalStorage에서 이전 선택들 가져오기
            const userCode = localStorage.getItem('userCode') || '';
            const currentLocationId = localStorage.getItem('currentLocationId') || '';
            const patternAnimalsStr = localStorage.getItem('patternAnimals');
            const entranceAnimal = localStorage.getItem('entranceAnimal') as AnimalType;
            const paintingAnimal = indexToAnimalMap[selectedIndex];

            if (!patternAnimalsStr || !entranceAnimal) {
                console.error('이전 선택 데이터가 없습니다.');
                return;
            }

            const patternAnimals = JSON.parse(patternAnimalsStr) as [AnimalType, AnimalType];

            // API 호출
            const result = await submitAnimalMission({
                userCode,
                currentLocationId,
                patternAnimals,
                entranceAnimal,
                paintingAnimal,
            });

            // 결과를 LocalStorage에 저장
            localStorage.setItem('animalResult', JSON.stringify(result));

            // 결과 페이지로 이동
            fadeNavigate('/kiosk/missions/animal/result');
        } catch (error) {
            console.error('API 호출 실패:', error);
            setIsSubmitting(false);
        }
    };

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
                onSelectionChange={(selected) => {
                    setSelectedCount(selected.length);
                    setSelectedIndex(selected[0] || null);
                }}
            />

            {selectedCount === 1 && (
                <NextButton
                    to="/kiosk/missions/animal/result"
                    width={320}
                    height={100}
                    positionMode="center-x"
                    y={1850}
                    onBeforeNavigate={() => handleSubmit()}
                />
            )}
        </div>
    );
};

export default AnimalPage3;
