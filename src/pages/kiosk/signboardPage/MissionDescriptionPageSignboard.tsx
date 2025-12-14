import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MissionDescriptionPageSignboard.module.css';

import { KioskHeader } from '@/components/kiosk/header/KioskHeader';
import { MissionDescriptionPage } from '@/components/kiosk/missionDescriptionPage/MissionDescriptionPage';
import { InsaroadFootBackground } from '@/components/kiosk/background/InsaroadFootBackground';
import insaroadBgImg from '@/assets/img-insaroad.png';

export const MissionDescriptionPageSignboard: React.FC = () => {
    const navigate = useNavigate();

    const [entered, setEntered] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const navRef = useRef<number | null>(null);
    const startRef = useRef<number | null>(null);

    useEffect(() => {
        const t = window.setTimeout(() => setEntered(true), 0);
        return () => window.clearTimeout(t);
    }, []);

    useEffect(() => {
        startRef.current = window.setTimeout(() => {
            setLeaving(true);

            navRef.current = window.setTimeout(() => {
                navigate('/kiosk/missions/signboard/page1');
            }, 350);
        }, 5000);

        return () => {
            if (startRef.current) window.clearTimeout(startRef.current);
            if (navRef.current) window.clearTimeout(navRef.current);
        };
    }, [navigate]);

    return (
        <div
            className={[
                styles.page,
                entered ? styles.enter : '',
                leaving ? styles.leaving : '',
            ].join(' ')}
        >
            <KioskHeader />
            <InsaroadFootBackground src={insaroadBgImg} />

            <MissionDescriptionPage
                mainTitle="한글 간판 맞추기"
                subTitle={'인사동의 한글 간판 문화를\n퀴즈로 체험해보세요!'}
                position="center-both"
            />
        </div>
    );
};

export default MissionDescriptionPageSignboard;
