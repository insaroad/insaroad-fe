// components/InsaroadTitle.tsx
import React from 'react';
import styles from './InsaroadTitle.module.css';

// 위치 모드 타입 정의
// manual: x, y 좌표 직접 지정
// center-x: 가로 중앙 정렬, y 좌표 지정
// center-both: 가로/세로 모두 중앙 정렬
type PositionMode = 'manual' | 'center-x' | 'center-both';

type InsaroadTitleProps = {
    text?: string;
    x?: number; // manual 모드에서만 사용
    y?: number; // manual / center-x 모드에서 사용
    fontSize?: number;
    color?: string;
    mode?: PositionMode; // 위치 모드 추가
};

export const InsaroadTitle: React.FC<InsaroadTitleProps> = ({
    text = 'INSAROAD',
    x = 0,
    y = 0,
    fontSize = 48,
    color = '#ff532cff',
    mode = 'manual',
}) => {
    // 기본 클래스
    let className = styles.title;

    // 모드에 따라 클래스 추가
    if (mode === 'center-x') {
        className += ` ${styles.centerX}`;
    }

    if (mode === 'center-both') {
        className += ` ${styles.centerBoth}`;
    }

    // inline 스타일 (동적 값은 CSS로 분리 불가)
    const dynamicStyle: React.CSSProperties = {
        color,
        fontSize: `${fontSize}px`,
    };

    // manual 모드일 때만 x, y 직접 지정
    if (mode === 'manual') {
        dynamicStyle.left = x;
        dynamicStyle.top = y;
    }

    // center-x 모드일 때 y는 위치 지정 가능
    if (mode === 'center-x') {
        dynamicStyle.top = y;
    }

    return (
        <h1 className={className} style={dynamicStyle}>
            {text}
        </h1>
    );
};

export default InsaroadTitle;
