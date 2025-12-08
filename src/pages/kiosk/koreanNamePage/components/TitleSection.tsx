// src/components/kiosk/birthday/TitleSection.tsx
import React from 'react';
import styles from './TitleSection.module.css';

export const TitleSection: React.FC = () => {
    return (
        <section className={styles.wrapper} aria-label="한글 이름 짓기 안내">
            <h1 className={styles.title}>한글 이름 짓기</h1>
            <p className={styles.subtitle}>
                본인의 생일과 성별을 입력하고 나만의 한글 이름을 만들어보세요!
            </p>
        </section>
    );
};

export default TitleSection;
