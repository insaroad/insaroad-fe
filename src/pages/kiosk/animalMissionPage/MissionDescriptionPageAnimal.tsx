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
                nextTo="/kiosk/missions/animal/page1" // ✅ 5초 후 페이드아웃 → page1 이동
                autoNextMs={5000} // ✅ 기본이 5000이라 생략 가능
                fadeMs={350} // ✅ 기본이 350이라 생략 가능
            />
        </div>
    );
};

export default MissionDescriptionPageAnimal;
