// components/kiosk/input/components/OrangeBar.tsx
import React from 'react';
import styles from './OrangeBar.module.css';

type PositionMode = 'manual' | 'center-x';

type OrangeBarProps = {
    width: number;
    x?: number; // manual 모드에서 사용
    y: number;
    mode?: PositionMode; // 'center-x'면 가로 기준 가운데
    digit?: string; // 바 위에 표시할 숫자 (없으면 빈칸)
};

export const OrangeBar: React.FC<OrangeBarProps> = ({
    width,
    x = 0,
    y,
    mode = 'manual',
    digit,
}) => {
    const style: React.CSSProperties = {
        width,
        top: y,
    };

    if (mode === 'manual') {
        style.left = x;
    }

    if (mode === 'center-x') {
        style.left = '50%';
        style.transform = 'translateX(-50%)';
    }

    return (
        <div className={styles.wrapper} style={style}>
            {/* 숫자 영역 */}
            <div className={styles.digit}>{digit ?? ''}</div>
            {/* 실제 주황 바 */}
            <div className={styles.bar} />
        </div>
    );
};

export default OrangeBar;
