import React from 'react';
import styles from './LoadingSubtitle.module.css';

export const LoadingSubtitle: React.FC = () => {
    return (
        <p className={styles.subtitle}>
            당신과 어울리는 이름을 만드는 중이에요!
            <br />
            잠시만 기다려주세요!!
        </p>
    );
};

export default LoadingSubtitle;
