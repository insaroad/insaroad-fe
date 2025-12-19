// QrGuidePage.tsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './QrGuidePage.module.css';

import { KioskHeader } from '@/components/kiosk/header/KioskHeader';
import { InsaroadFootBackground } from '@/components/kiosk/background/InsaroadFootBackground';
import CountDown from '@/components/kiosk/countDown/CountDown';

import insaroadBgImg from '@/assets/img-insaroad.png';
import { InsaroadButton } from '@/components/kiosk/button/InsaroadButton';
import qrImg from '@/assets/kiosk/qr.png';

import { qrToDataUrl } from '@/utils/qr/qr';
import { buildQrUrl } from '@/utils/qr/buildQrUrl';

// (선택) 간단 캐시
const qrCache = new Map<string, string>();

export const QrGuidePage: React.FC = () => {
    const navigate = useNavigate();

    const [remainingSeconds, setRemainingSeconds] = useState<number>(60);
    const showHomeButton = remainingSeconds <= 50;

    // ✅ userCode: localStorage
    const [userCode, setUserCode] = useState<string>('');

    useEffect(() => {
        const stored = localStorage.getItem('userCode');
        if (stored) setUserCode(stored.trim());
    }, []);

    // ✅ NEXT용 base URL: env에서 가져오기
    const baseQrTargetUrl = import.meta.env.VITE_NEXT_BASE_WEB_URL as string | undefined;

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
        // ✅ 메모리 정리(권장): QR 캐시 비우기
        qrCache.clear();
        navigate('/kiosk', { replace: true });
    }, [navigate]);

    const handleExpire = useCallback(() => {
        goHome();
    }, [goHome]);

    const handleGoNext = useCallback(() => {
        navigate('/kiosk', {
            // End 페이지에서도 userCode를 localStorage에서 다시 읽을 거라 state 전달은 선택
            // 그래도 디버깅/추적용으로 남겨도 좋음
            state: { userCode, qrTargetUrl },
        });
    }, [navigate, userCode, qrTargetUrl]);

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
                <p className={`${styles.fadeUp} ${styles.step1}`}>
                    QR 코드 찍고, 이벤트에 계속 참여해보세요!
                </p>

                <div className={`${styles.fadeUp} ${styles.step2} ${styles.qrWrap}`}>
                    <img
                        src={qrSrc}
                        alt="다음 장소 이동 QR 코드"
                        className={styles.qrImage}
                        draggable={false}
                    />
                </div>

                <p className={`${styles.fadeUp} ${styles.step3} ${styles.floating}`}>
                    다음 장소로 이동해볼까요?
                </p>
            </section>

            {showHomeButton && (
                <div className={styles.homeBtnArea}>
                    <div className={styles.homeBtnFadeIn}>
                        <InsaroadButton
                            width={520}
                            height={120}
                            x={650}
                            y={1500}
                            text="처음 화면으로 이동하기"
                            onClick={handleGoNext}
                        />
                    </div>
                </div>
            )}
        </main>
    );
};

export default QrGuidePage;
