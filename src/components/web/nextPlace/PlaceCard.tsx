import React from 'react';
import styles from './PlaceCard.module.css';

type PlaceCardProps = {
    nameKo: string;
    nameEn: string;
    addressKo: string;
};

export const PlaceCard: React.FC<PlaceCardProps> = ({ nameKo, nameEn, addressKo }) => {
    return (
        <section className={styles.card} aria-label="장소 정보">
            <div className={styles.bar} aria-hidden="true" />
            <div className={styles.body}>
                <div className={styles.nameKo}>{nameKo}</div>
                <div className={styles.nameEn}>{nameEn}</div>
                <div className={styles.addr}>{addressKo}</div>
            </div>
        </section>
    );
};
