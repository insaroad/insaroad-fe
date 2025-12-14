import React from 'react';
import styles from './MapPlaceholder.module.css';

type MapPlaceholderProps = {
    label?: string;
};

export const MapPlaceholder: React.FC<MapPlaceholderProps> = ({ label }) => {
    return (
        <section className={styles.wrap} aria-label={label ?? '지도 영역'}>
            {/* 추후 여기에 카카오 지도 SDK mount */}
            <div
                className={styles.map}
                role="application"
                aria-label="카카오 지도 인터랙션 영역"
            />
        </section>
    );
};
