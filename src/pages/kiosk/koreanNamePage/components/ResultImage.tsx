// src/components/kiosk/koreanName/ResultImage.tsx
import React from 'react';
import styles from './ResultImage.module.css';
import fishImage from '../assets/result_img.png';

interface ResultImageProps {
    src?: string;
    alt?: string;
}

export const ResultImage: React.FC<ResultImageProps> = ({
    src = fishImage,
    alt = '이름 결과 이미지',
}) => {
    return (
        <div className={styles.wrapper}>
            <img src={src} alt={alt} className={styles.image} />
        </div>
    );
};

export default ResultImage;
