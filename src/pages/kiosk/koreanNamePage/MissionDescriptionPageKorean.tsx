import React from 'react';
import { KioskHeader } from '@/components/kiosk/header/KioskHeader';
import { MissionDescriptionPage } from '@/components/kiosk/missionDescriptionPage/MissionDescriptionPage';
import insaroadBgImg from '@/assets/img-insaroad.png';
import { InsaroadFootBackground } from '@/components/kiosk/background/InsaroadFootBackground';

export const MissionDescriptionPageKorean: React.FC = () => {
    return (
        <div className="kiosk-page">
            <KioskHeader />
            <InsaroadFootBackground src={insaroadBgImg} />
            <MissionDescriptionPage
                mainTitle="한글 이름 짓기"
                subTitle={
                    '본인의 생일과 성별을 입력하고 나만의 한글 이름을 만들어보세요!'
                }
                position="center-both"
            />
        </div>
    );
};

export default MissionDescriptionPageKorean;
