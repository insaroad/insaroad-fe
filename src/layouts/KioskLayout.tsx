import { useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './KioskLayout.module.css';

const BASE_WIDTH = 1820;
const BASE_HEIGHT = 2250;

export default function KioskLayout() {
    const [viewport, setViewport] = useState(() => ({
        w: typeof window !== 'undefined' ? window.innerWidth : BASE_WIDTH,
        h: typeof window !== 'undefined' ? window.innerHeight : BASE_HEIGHT,
    }));

    useEffect(() => {
        const onResize = () => {
            setViewport({ w: window.innerWidth, h: window.innerHeight });
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const scale = useMemo(() => {
        const s = Math.min(viewport.w / BASE_WIDTH, viewport.h / BASE_HEIGHT);
        // 너무 과한 확대가 싫으면 상한을 걸 수 있음. (예: 1)
        // return Math.min(s, 1);
        return s;
    }, [viewport.w, viewport.h]);

    return (
        <div className={styles.shell} aria-label="kiosk-viewport-shell">
            <div
                className={styles.stage}
                style={{
                    width: BASE_WIDTH,
                    height: BASE_HEIGHT,
                    transform: `translate(-50%, -50%) scale(${scale})`,
                }}
            >
                <Outlet />
            </div>
        </div>
    );
}
