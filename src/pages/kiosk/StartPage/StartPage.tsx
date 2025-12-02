import React from 'react';
import { InsaroadFootBackground } from '@/components/kiosk/background/InsaroadFootBackground';
import styles from './StartPage.module.css';
import InsaroadTitle from '@/components/kiosk/insaroadTitle/InsaroadTitle';

export const StartPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <InsaroadFootBackground src="/src/assets/img-insaroad.png" />

            {/* 이 아래의 컴포넌트들은 배경의 영향 없이 자유롭게 배치 */}
            <InsaroadTitle text="INSAROAD" mode="center-both" />
        </div>
    );
};

export default StartPage;
