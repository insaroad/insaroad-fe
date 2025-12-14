import React from 'react';
import styles from './ActionLinks.module.css';

type ActionLinksProps = {
    onOpenKakaoDirections?: () => void;
    onOpenKioskPhoto?: () => void;
};

const KakaoIcon: React.FC = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3C6.6 3 2.2 6.4 2.2 10.6c0 2.7 1.9 5.1 4.8 6.4l-1 3.6c-.1.4.3.8.7.6l4.2-2.7c.4 0 .7.1 1.1.1 5.4 0 9.8-3.4 9.8-7.6S17.4 3 12 3z" />
    </svg>
);

const PhotoIcon: React.FC = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 6h-3.2l-1.4-2.1c-.2-.3-.5-.5-.9-.5H8.5c-.4 0-.7.2-.9.5L6.2 6H3c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-9 14.2c-2.3 0-4.2-1.9-4.2-4.2S9.7 11.8 12 11.8s4.2 1.9 4.2 4.2-1.9 4.2-4.2 4.2z" />
    </svg>
);

export const ActionLinks: React.FC<ActionLinksProps> = ({
    onOpenKakaoDirections,
    onOpenKioskPhoto,
}) => {
    return (
        <nav className={styles.nav} aria-label="추가 액션">
            <button type="button" className={styles.row} onClick={onOpenKakaoDirections}>
                <span className={styles.icon}>
                    <KakaoIcon />
                </span>
                <span className={styles.text}>카카오 지도로 길찾기</span>
            </button>

            <button type="button" className={styles.row} onClick={onOpenKioskPhoto}>
                <span className={styles.icon}>
                    <PhotoIcon />
                </span>
                <span className={styles.text}>키오스크 위치 사진 보기</span>
            </button>
        </nav>
    );
};
