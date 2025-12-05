// 예: pages/kiosk/MissionPage.tsx
import React from 'react';
import { KioskHeader } from '@/components/kiosk/header/KioskHeader';
import { MissionDescriptionPage } from '@/components/kiosk/missionDescriptionPage/MissionDescriptionPage';
import insaroadBgImg from '@/assets/img-insaroad.png';
import { InsaroadFootBackground } from '@/components/kiosk/background/InsaroadFootBackground';

export const MissionDescriptionPageAnimal: React.FC = () => {
    return (
        <div className="kiosk-page">
            <KioskHeader />
            <InsaroadFootBackground src={insaroadBgImg} />
            <MissionDescriptionPage
                mainTitle="나와 어울리는 민화 속 동물은?"
                subTitle={
                    '내가 민화에 들어갔다면 어떤 동물이었을까요?\n간단한 테스트를 통해 알아보세요!'
                }
                position="center-both"
            />
        </div>
    );
};

export default MissionDescriptionPageAnimal;
