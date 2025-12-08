import React from 'react';
import styles from './BrushIcon.module.css';
import brush from '@/assets/kiosk/icon-brush.png';

export const BrushIcon: React.FC = () => {
    return (
        <div className={styles.wrapper} aria-hidden="true">
            {/* 회색 베이스 아이콘 */}
            <img
                src={brush} // 실제 경로에 맞게 수정
                alt="붓 아이콘"
                className={styles.imageBase}
            />

            {/* 대각선으로 색이 채워지는 애니메이션 레이어 */}
            <div className={styles.imageFill} />
        </div>
    );
};

export default BrushIcon;
