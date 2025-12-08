import React from 'react';
import styles from './QrSaveSection.module.css';
import qrImage from '@/assets/kiosk/qr.png';

export const QrSaveSection: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <img src={qrImage} alt="QR 코드" className={styles.qr} />
            <span className={styles.label}>사진으로 저장하기</span>
        </div>
    );
};

export default QrSaveSection;
