import React from 'react';
import styles from './QrGuideText.module.css';

type QrGuideTextProps = {
    y: number; // 세로 위치만 바꿀 수 있게
    text?: string; // 기본 문구 외에 바꾸고 싶을 때
};

export const QrGuideText: React.FC<QrGuideTextProps> = ({
    y,
    text = 'QR 코드로 발급 받은 숫자를 입력해주세요!',
}) => {
    return (
        <p className={styles.guide} style={{ top: y }}>
            {text}
        </p>
    );
};

export default QrGuideText;
