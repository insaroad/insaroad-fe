// pages/kiosk/TraditionalPatternQuestionPage.tsx
import React, { useState } from 'react';
import { KioskHeader } from '@/components/kiosk/header/KioskHeader';
import QuestionTitle from './components/QuestionTitle';
import ChoiceGrid from './components/ChoiceGrid';
import insaroadBgImg from '@/assets/img-insaroad.png';
import { InsaroadFootBackground } from '@/components/kiosk/background/InsaroadFootBackground';
import { NextButton } from '@/components/kiosk/button/NextButton';

import painting1 from './assets/painting1.png';
import painting2 from './assets/painting2.png';
import painting3 from './assets/painting3.png';
import painting4 from './assets/painting4.png';
import painting5 from './assets/painting5.png';

export const AnimalPage3: React.FC = () => {
    const [selectedCount, setSelectedCount] = useState(0);

    return (
        <div className="kiosk-page" style={{ position: 'relative', height: '100vh' }}>
            <KioskHeader />
            <InsaroadFootBackground src={insaroadBgImg} />

            <QuestionTitle text="3. 다음 중 가장 마음에 드는 민화는 무엇인가요?" />

            <ChoiceGrid
                items={[
                    { index: 1, imageSrc: painting1 },
                    { index: 2, imageSrc: painting2 },
                    { index: 3, imageSrc: painting3 },
                    { index: 4, imageSrc: painting4 },
                    { index: 5, imageSrc: painting5 },
                ]}
                imageWidth={350}
                imageHeight={350}
                onSelectionChange={(selected) => setSelectedCount(selected.length)}
            />
            {selectedCount === 1 && (
                <NextButton
                    to="/kiosk/missions/animal/result"
                    width={320}
                    height={100}
                    positionMode="center-x"
                    y={1800} // 화면에서 원하는 Y 위치(px)
                />
            )}
        </div>
    );
};

export default AnimalPage3;
