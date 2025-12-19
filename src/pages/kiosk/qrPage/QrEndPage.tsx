// QrEndPage.tsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './QrEndPage.module.css';

import { KioskHeader } from '@/components/kiosk/header/KioskHeader';
import { InsaroadFootBackground } from '@/components/kiosk/background/InsaroadFootBackground';
import CountDown from '@/components/kiosk/countDown/CountDown';

import insaroadBgImg from '@/assets/img-insaroad.png';
import { InsaroadButton } from '@/components/kiosk/button/InsaroadButton';

import qrImg from '@/assets/kiosk/qr.png';

import { qrToDataUrl } from '@/utils/qr/qr';
import { buildQrUrl } from '@/utils/qr/buildQrUrl';

// (선택) End 화면용 캐시
const qrCache = new Map<string, string>();

export const QrEndPage: React.FC = () => {
    const navigate = useNavigate();

    const [remainingSeconds, setRemainingSeconds] = useState<number>(60);
    const showHomeButton = remainingSeconds <= 50;

    // ✅ userCode: localStorage
    const [userCode, setUserCode] = useState<string>('');

    useEffect(() => {
        const stored = localStorage.getItem('userCode');
        if (stored) setUserCode(stored.trim());
    }, []);

    // ✅ TICKET용 base URL: env에서 가져오기
    const baseQrTargetUrl = import.meta.env.VITE_TICKET_BASE_WEB_URL as
        | string
        | undefined;

    const qrTargetUrl = useMemo(() => {
        if (!baseQrTargetUrl?.trim() || !userCode) return '';
        return buildQrUrl(baseQrTargetUrl, userCode);
    }, [baseQrTargetUrl, userCode]);

    const [qrSrc, setQrSrc] = useState<string>(qrImg);

    useEffect(() => {
        let cancelled = false;

        if (!qrTargetUrl) {
            setQrSrc(qrImg);
            return;
        }

        (async () => {
            const cached = qrCache.get(qrTargetUrl);
            if (cached) {
                if (!cancelled) setQrSrc(cached);
                return;
            }

            try {
                const dataUrl = await qrToDataUrl(qrTargetUrl, {
                    size: 320,
                    errorCorrectionLevel: 'Q',
                    margin: 2,
                    mimeType: 'image/png',
                });

                qrCache.set(qrTargetUrl, dataUrl);
                if (!cancelled) setQrSrc(dataUrl);
            } catch {
                if (!cancelled) setQrSrc(qrImg);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [qrTargetUrl]);

    const goHome = useCallback(() => {
        // ✅ 메모리 정리(권장)
        qrCache.clear();
        navigate('/kiosk', { replace: true });
    }, [navigate]);

    const handleExpire = useCallback(() => {
        goHome();
    }, [goHome]);

    return (
        <main className={styles.container}>
            <KioskHeader />

            <div className={styles.backgroundLayer}>
                <InsaroadFootBackground src={insaroadBgImg} />
            </div>

            <CountDown
                className={styles.countdown}
                initialSeconds={60}
                onExpire={handleExpire}
                onTick={setRemainingSeconds}
            />

            <section className={styles.content} aria-label="QR 안내">
                <p className={`${styles.fadeUp} ${styles.step1}`}>이벤트 참여 완료!!!</p>

                {/* ✅ 여기에 "티켓 발급(교환권)" QR이 들어감 */}
                <div className={`${styles.fadeUp} ${styles.step2} ${styles.qrWrap}`}>
                    <img
                        src={qrSrc}
                        alt="매듭 교환권 발급 QR 코드"
                        className={styles.qrImage}
                        draggable={false}
                    />
                </div>

                <p className={`${styles.fadeUp} ${styles.step3} ${styles.floating}`}>
                    QR 코드 찍고 매듭 교환권을 받으세요!
                </p>
            </section>

            {showHomeButton && (
                <div className={styles.homeBtnArea} aria-label="처음 화면 이동">
                    <div className={styles.homeBtnFadeIn}>
                        <InsaroadButton
                            width={520}
                            height={120}
                            x={650}
                            y={1500}
                            text="처음 화면으로 이동하기"
                            onClick={goHome}
                        />
                    </div>
                </div>
            )}
        </main>
    );
};

export default QrEndPage;
