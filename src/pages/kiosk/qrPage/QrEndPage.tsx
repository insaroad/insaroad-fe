import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './QrEndPage.module.css';

import { KioskHeader } from '@/components/kiosk/header/KioskHeader';
import { InsaroadFootBackground } from '@/components/kiosk/background/InsaroadFootBackground';
import CountDown from '@/components/kiosk/countDown/CountDown';

import insaroadBgImg from '@/assets/img-insaroad.png';
import { InsaroadButton } from '@/components/kiosk/button/InsaroadButton';

// ✅ QR 이미지 경로는 프로젝트에 맞게 교체하세요.
import qrImg from '@/assets/kiosk/qr.png';

export const QrEndPage: React.FC = () => {
    const navigate = useNavigate();

    const [remainingSeconds, setRemainingSeconds] = useState<number>(60);
    const showHomeButton = remainingSeconds <= 50;

    const handleExpire = useCallback(() => {
        navigate('/kiosk');
    }, [navigate]);

    return (
        <main className={styles.container}>
            <KioskHeader />

            <div className={styles.backgroundLayer}>
                <InsaroadFootBackground src={insaroadBgImg} />
            </div>

            {/* ✅ CountDown: 우상단에 표시되도록 CSS로 위치 제어 */}
            <CountDown
                className={styles.countdown}
                initialSeconds={60}
                onExpire={handleExpire}
                onTick={setRemainingSeconds}
            />

            {/* (1) 순차 등장: 문구 → QR → 질문 */}
            <section className={styles.content} aria-label="QR 안내">
                <p className={`${styles.fadeUp} ${styles.step1}`}>이벤트 참여 완료!!!</p>

                <div className={`${styles.fadeUp} ${styles.step2} ${styles.qrWrap}`}>
                    <img
                        src={qrImg}
                        alt="이벤트 참여 QR 코드"
                        className={styles.qrImage}
                        draggable={false}
                    />
                </div>

                {/* (3) 둥둥 애니메이션: 등장 후 계속 y축 왕복 */}
                <p className={`${styles.fadeUp} ${styles.step3} ${styles.floating}`}>
                    QR 코드 찍고 매듭 교환권을 받으세요!
                </p>
            </section>

            {/* (2) 50초가 되면 버튼 등장(페이드인) */}
            {showHomeButton && (
                <div className={styles.homeBtnArea} aria-label="처음 화면 이동">
                    <div className={styles.homeBtnFadeIn}>
                        <InsaroadButton
                            width={520}
                            height={120}
                            x={650}
                            y={1500}
                            text="처음 화면으로 이동하기"
                            onClick={() => navigate('/kiosk')}
                        />
                    </div>
                </div>
            )}
        </main>
    );
};

export default QrEndPage;
