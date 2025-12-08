// src/components/kiosk/loading/LoadingTitle.tsx
import React from 'react';
import styles from './LoadingTitle.module.css';

export const LoadingTitle: React.FC = () => {
    return (
        <h1 className={styles.title}>
            이름 만드는 중<span className={styles.dots}></span>
        </h1>
    );
};

export default LoadingTitle;
