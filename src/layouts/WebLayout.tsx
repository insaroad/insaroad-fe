import React, { useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './WebLayout.module.css';

const PHONE_W = 390; // iPhone 12/12 Pro CSS viewport width
const PHONE_H = 844; // iPhone 12/12 Pro CSS viewport height
const DESKTOP_MIN_WIDTH = 768;

export default function WebLayout() {
    const [viewport, setViewport] = useState(() => ({
        w: typeof window !== 'undefined' ? window.innerWidth : PHONE_W,
        h: typeof window !== 'undefined' ? window.innerHeight : PHONE_H,
    }));

    useEffect(() => {
        const onResize = () =>
            setViewport({ w: window.innerWidth, h: window.innerHeight });
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const isDesktop = viewport.w >= DESKTOP_MIN_WIDTH;

    const scale = useMemo(() => {
        const s = Math.min(viewport.w / PHONE_W, viewport.h / PHONE_H);
        // 확대를 제한하고 싶으면 상한을 두세요. (예: 1.15)
        // return Math.min(s, 1.15);
        return s;
    }, [viewport.w, viewport.h]);

    // ✅ 모바일: 기존 반응형 그대로
    if (!isDesktop) {
        return (
            <div className={styles.mobileStage}>
                <Outlet />
            </div>
        );
    }

    // ✅ 데스크탑: 폰 프레임(390x844) + 검은 배경
    return (
        <div className={styles.shell} aria-label="web-phone-frame-shell">
            <div
                className={styles.stage}
                style={{
                    width: PHONE_W,
                    height: PHONE_H,
                    transform: `translate(-50%, -50%) scale(${scale})`,
                }}
            >
                <Outlet />
            </div>
        </div>
    );
}
