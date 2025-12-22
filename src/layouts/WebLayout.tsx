import { Outlet } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import styles from './WebLayout.module.css';

const PHONE_W = 390;
const PHONE_H = 844;
const DESKTOP_MIN_WIDTH = 768;

export default function WebLayout() {
    const [vw, setVw] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth : PHONE_W
    );
    const [vh, setVh] = useState(() =>
        typeof window !== 'undefined' ? window.innerHeight : PHONE_H
    );

    useEffect(() => {
        const onResize = () => {
            setVw(window.innerWidth);
            setVh(window.innerHeight);
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    // ✅ Web route로 들어오면, body 스크롤을 강제로 정상화 (kiosk에서 overflow hidden을 걸어둔 경우 대비)
    useEffect(() => {
        const prevHtmlOverflow = document.documentElement.style.overflow;
        const prevBodyOverflow = document.body.style.overflow;
        const prevBodyHeight = document.body.style.height;

        document.documentElement.style.overflow = 'auto';
        document.body.style.overflow = 'auto';
        document.body.style.height = 'auto';

        return () => {
            document.documentElement.style.overflow = prevHtmlOverflow;
            document.body.style.overflow = prevBodyOverflow;
            document.body.style.height = prevBodyHeight;
        };
    }, []);

    const isDesktop = vw >= DESKTOP_MIN_WIDTH;

    const scale = useMemo(() => Math.min(vw / PHONE_W, vh / PHONE_H), [vw, vh]);

    // ✅ 모바일: "문서(body) 스크롤"로 처리 (가장 안정적)
    if (!isDesktop) {
        return (
            <div className={styles.mobileRoot}>
                <Outlet />
            </div>
        );
    }

    // ✅ 데스크탑: 폰 프레임(stage) + 내부 스크롤
    return (
        <div className={styles.shell}>
            <div
                className={styles.stage}
                style={{
                    width: PHONE_W,
                    height: PHONE_H,
                    transform: `translate(-50%, -50%) scale(${scale})`,
                }}
            >
                <div className={styles.scrollArea}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
