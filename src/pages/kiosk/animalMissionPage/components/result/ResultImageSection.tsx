import React from 'react';
import styles from './ResultImageSection.module.css';

interface ResultImageSectionProps {
    imageSrc: string;
    imageAlt?: string;
    caption: string; // 작품명, 작가, 추정 연대 등
}

export const ResultImageSection: React.FC<ResultImageSectionProps> = ({
    imageSrc,
    imageAlt = 'result image',
    caption,
}) => {
    return (
        <section className={styles.wrapper}>
            <div className={styles.lineTop} />

            <img src={imageSrc} alt={imageAlt} className={styles.image} />

            <p className={styles.caption}>{caption}</p>

            <div className={styles.lineBottom} />
        </section>
    );
};

export default ResultImageSection;
