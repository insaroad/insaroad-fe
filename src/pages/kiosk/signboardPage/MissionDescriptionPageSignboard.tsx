import React from 'react';
import { KioskHeader } from '@/components/kiosk/header/KioskHeader';
import { MissionDescriptionPage } from '@/components/kiosk/missionDescriptionPage/MissionDescriptionPage';
import insaroadBgImg from '@/assets/img-insaroad.png';
import { InsaroadFootBackground } from '@/components/kiosk/background/InsaroadFootBackground';

export const MissionDescriptionPageSignboard: React.FC = () => {
    return (
        <div className="kiosk-page">
            <KioskHeader />
            <InsaroadFootBackground src={insaroadBgImg} />
            <MissionDescriptionPage
                mainTitle="한글 간판 맞추기"
                subTitle={'인사동에 있는 가게들의 한글 간판 이름을 맞춰보세요!'}
                position="center-both"
            />
        </div>
    );
};

export default MissionDescriptionPageSignboard;
