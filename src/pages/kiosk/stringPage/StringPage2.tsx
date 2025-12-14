import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StringPage2.module.css';

import { InsaroadFootBackground } from '@/components/kiosk/background/InsaroadFootBackground';
import insaroadBgImg from '@/assets/img-insaroad.png';

import StringPage from '@/pages/kiosk/stringPage/StringPage';

import string21 from '@/assets/kiosk/string_2_1.png';
import string22 from '@/assets/kiosk/string_2_2.png';

export const StringPage2: React.FC = () => {
    const navigate = useNavigate();

    const handleComplete = useCallback(() => {
        // 전환 컷신 종료 후 다음 화면으로 이동
        navigate('/kiosk/qr'); // 실제 다음 라우트로 변경
    }, [navigate]);

    return (
        <main className={styles.container}>
            <div className={styles.backgroundLayer}>
                <InsaroadFootBackground src={insaroadBgImg} />
            </div>

            <div className={styles.center}>
                <StringPage
                    fromSrc={string21}
                    toSrc={string22}
                    alt="매듭 전환"
                    width={450}
                    height={900}
                    fadeInMs={2500}
                    swapDelayMs={0}
                    popMs={350}
                    afterPopDelayMs={1900}
                    fadeOutMs={350} // ✅ 사라질 때 페이드아웃
                    onComplete={handleComplete}
                />
            </div>
        </main>
    );
};

export default StringPage2;
