// pages/kiosk/TraditionalPatternQuestionPage.tsx
import React, { useState } from 'react';
import { KioskHeader } from '@/components/kiosk/header/KioskHeader';
import QuestionTitle from './components/QuestionTitle';
import ChoiceGrid from './components/ChoiceGrid';
import insaroadBgImg from '@/assets/img-insaroad.png';
import { InsaroadFootBackground } from '@/components/kiosk/background/InsaroadFootBackground';
import { NextButton } from '@/components/kiosk/button/NextButton';

import pattern1 from './assets/pattern1.png';
import pattern2 from './assets/pattern2.png';
import pattern3 from './assets/pattern3.png';
import pattern4 from './assets/pattern4.png';
import pattern5 from './assets/pattern5.png';

export const AnimalPage1: React.FC = () => {
    const [selectedCount, setSelectedCount] = useState(0);

    return (
        <div className="kiosk-page" style={{ position: 'relative', height: '100vh' }}>
            <KioskHeader />
            <InsaroadFootBackground src={insaroadBgImg} />

            <QuestionTitle text="1. 다음 중 가장 마음이 끌리는 전통 문양을 2개 골라주세요." />

            <ChoiceGrid
                items={[
                    { index: 1, imageSrc: pattern1 },
                    { index: 2, imageSrc: pattern2 },
                    { index: 3, imageSrc: pattern3 },
                    { index: 4, imageSrc: pattern4 },
                    { index: 5, imageSrc: pattern5 },
                ]}
                imageWidth={300}
                imageHeight={300}
                maxSelectable={2}
                onSelectionChange={(selected) => setSelectedCount(selected.length)}
            />
            {selectedCount === 2 && (
                <NextButton
                    to="/kiosk/missions/animal/page2"
                    width={320}
                    height={100}
                    positionMode="center-x"
                    y={1800} // 화면에서 원하는 Y 위치(px)
                />
            )}
        </div>
    );
};

export default AnimalPage1;
