import React, { useEffect } from 'react';
import styles from './PhotoModal.module.css';
import closeIcon from '@/assets/cross.png';
type PhotoModalProps = {
    imageSrc: string;
    onClose: () => void;
};

export const PhotoModal: React.FC<PhotoModalProps> = ({ imageSrc, onClose }) => {
    // 스크롤 잠금 (모바일 필수)
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div className={styles.overlay} role="dialog" aria-modal="true">
            <button
                type="button"
                className={styles.close}
                onClick={onClose}
                aria-label="닫기"
            >
                <img src={closeIcon} alt="" />
            </button>

            <img src={imageSrc} alt="키오스크 위치 사진" className={styles.image} />
        </div>
    );
};

export default PhotoModal;
