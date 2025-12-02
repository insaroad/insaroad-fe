// components/kiosk/insaroadTitle/InsaroadTitle.tsx
import React from 'react';
import styles from './InsaroadTitle.module.css';

export type PositionMode = 'manual' | 'center-x' | 'center-both';

type InsaroadTitleProps = {
    text?: string;
    x?: number; // manual 모드에서만 사용
    y?: number; // manual / center-x 모드에서 사용
    fontSize?: number;
    color?: string;
    mode?: PositionMode;
};

export const InsaroadTitle: React.FC<InsaroadTitleProps> = ({
    text = 'INSAROAD',
    x = 0,
    y = 0,
    fontSize = 40,
    color = '#D4634A',
    mode = 'manual',
}) => {
    // 기본 클래스 + 페이드인 클래스
    let className = `${styles.title} ${styles.fadeIn}`;

    // 모드에 따라 위치 클래스 추가
    if (mode === 'center-x') {
        className += ` ${styles.centerX}`;
    }

    if (mode === 'center-both') {
        className += ` ${styles.centerBoth}`;
    }

    // 동적 스타일 (색, 폰트 사이즈, top/left 등)
    const dynamicStyle: React.CSSProperties = {
        color,
        fontSize: `${fontSize}px`,
    };

    // manual 모드에서는 x, y 직접 지정
    if (mode === 'manual') {
        dynamicStyle.left = x;
        dynamicStyle.top = y;
    }

    // center-x 모드에서는 top만 y로 지정 (left/transform은 클래스에서 처리)
    if (mode === 'center-x') {
        dynamicStyle.top = y;
    }

    // center-both 모드에서는 top/left 모두 CSS에서 50%로 처리

    return (
        <h1 className={className} style={dynamicStyle}>
            {text}
        </h1>
    );
};

export default InsaroadTitle;
