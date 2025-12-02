import React from 'react';
import styles from './InsaroadSubtitle.module.css';

type InsaroadSubtitleProps = {
    y: number; // 세로 위치
};

export const InsaroadSubtitle: React.FC<InsaroadSubtitleProps> = ({ y }) => {
    return (
        <p className={styles.subtitle} style={{ top: y }}>
            인사동에 숨겨져있는 3개의 키오스크를 찾아 이벤트에 참여하고,
            <br />
            선물을 받아보세요!
        </p>
    );
};

export default InsaroadSubtitle;
