// pages/kiosk/Question2Page.tsx
import React from 'react';
import { KioskHeader } from '@/components/kiosk/header/KioskHeader';
import QuestionTitle from './components/QuestionTitle';
import InsaStreetImage from './components/InsaStreetImage';
import { BehaviorButton } from './components/BehaviorButton';
import insaroadBgImg from '@/assets/img-insaroad.png';
import { InsaroadFootBackground } from '@/components/kiosk/background/InsaroadFootBackground';

import icon1 from './assets/icon1.png';
import icon2 from './assets/icon2.png';
import icon3 from './assets/icon3.png';
import icon4 from './assets/icon4.png';
import icon5 from './assets/icon5.png';

import styles from './AnimalPage2.module.css';

export const AnimalPage2: React.FC = () => {
    return (
        <div className={styles.page}>
            <KioskHeader />
            <InsaroadFootBackground src={insaroadBgImg} />
            <QuestionTitle
                text={`2. 당신은 인사동 길의 입구에 도착했습니다.\n 가장 먼저 어떤 행동을 하시겠습니까?`}
                marginTop={100}
                marginBottom={100}
            />

            <InsaStreetImage />

            <div className={styles.buttonContainer}>
                <BehaviorButton
                    iconSrc={icon1}
                    text="인사동 입구의 전경을 사진으로 남긴다"
                />
                <BehaviorButton
                    iconSrc={icon2}
                    text="왼쪽에 있는 전통 수공예품 가게부터 둘러본다"
                />
                <BehaviorButton
                    iconSrc={icon3}
                    text="길을 천천히 걸으며 볼만한 것이 있는지 살핀다"
                />
                <BehaviorButton
                    iconSrc={icon4}
                    text="복작이는 가게 앞 군중 속으로 들어가 같이 살펴본다"
                />
                <BehaviorButton
                    iconSrc={icon5}
                    text="근처 떡집이나 찻집으로 들어가 시간을 보낸다"
                />
            </div>
        </div>
    );
};

export default AnimalPage2;
