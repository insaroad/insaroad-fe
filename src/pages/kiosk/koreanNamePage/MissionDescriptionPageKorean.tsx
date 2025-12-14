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
                nextTo="/kiosk/missions/korean-name/page1" // ✅ 5초 후 페이드아웃 → page1 이동
                autoNextMs={5000} // ✅ 기본이 5000이라 생략 가능
                fadeMs={350} // ✅ 기본이 350이라 생략 가능
            />
        </div>
    );
};

export default MissionDescriptionPageKorean;
