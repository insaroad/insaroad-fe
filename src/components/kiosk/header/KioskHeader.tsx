import React from 'react';
import { useNavigate } from 'react-router-dom';
import InsaroadTitle from '@/components/kiosk/insaroadTitle/InsaroadTitle';
import { HomeButton } from '@/components/kiosk/button/HomeButton';
import styles from './KioskHeader.module.css';

export const KioskHeader: React.FC = () => {
    const navigate = useNavigate();
    return (
        <header className={styles.header}>
            {/* 좌측 상단 INSAROAD 타이틀 (살짝 작은 크기) */}
            <InsaroadTitle text="INSAROAD" mode="manual" x={70} y={100} fontSize={50} />

            {/* 우측 상단 홈 버튼 */}
            <HomeButton onClick={() => navigate('/kiosk')} />
        </header>
    );
};

export default KioskHeader;
