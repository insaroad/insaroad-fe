import React from 'react';
import BrushIcon from './components/BrushIcon';
import LoadingTitle from './components/LoadingTitle';
import LoadingSubtitle from './components/LoadingSubtitle';
import styles from './KoreanNamePage3.module.css';
import { KioskHeader } from '@/components/kiosk/header/KioskHeader';
import { InsaroadFootBackground } from '@/components/kiosk/background/InsaroadFootBackground';
import insaroadBgImg from '@/assets/img-insaroad.png';

export const KoreanNamePage3: React.FC = () => {
    return (
        <main className={styles.container}>
            <KioskHeader />
            {/* 배경 레이어 */}
            <div className={styles.backgroundLayer}>
                <InsaroadFootBackground src={insaroadBgImg} />
            </div>

            <BrushIcon />
            <LoadingTitle />
            <LoadingSubtitle />
        </main>
    );
};

export default KoreanNamePage3;
