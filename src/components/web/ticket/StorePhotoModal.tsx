import React, { useEffect } from 'react';
import styles from './StorePhotoModal.module.css';

import closeIcon from '@/assets/cross.png'; // ✅ X 아이콘 이미지

type StorePhotoModalProps = {
    imageSrc: string;
    onClose: () => void;
};

export const StorePhotoModal: React.FC<StorePhotoModalProps> = ({
    imageSrc,
    onClose,
}) => {
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
        };
    }, []);

    return (
        <div
            className={styles.overlay}
            role="dialog"
            aria-modal="true"
            aria-label="가게 사진 보기"
        >
            <button
                type="button"
                className={styles.close}
                onClick={onClose}
                aria-label="닫기"
            >
                <img src={closeIcon} alt="" />
            </button>

            <img className={styles.image} src={imageSrc} alt="가게 위치 사진" />
        </div>
    );
};
