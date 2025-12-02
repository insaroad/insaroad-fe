// components/kiosk/layout/HomeButton.tsx
import React, { useState } from 'react';
import styles from './HomeButton.module.css';
import homeIcon from '@/assets/kiosk/home.png';

type HomeButtonProps = {
    onClick?: () => void;
};

export const HomeButton: React.FC<HomeButtonProps> = ({ onClick }) => {
    const [pressed, setPressed] = useState(false);

    const handleClick = () => {
        // 애니메이션 중복 재생 방지용
        if (!pressed) {
            setPressed(true);
            setTimeout(() => {
                setPressed(false);
            }, 260); // 애니메이션 길이와 맞춰서
        }

        onClick?.();
    };

    return (
        <button
            type="button"
            className={`${styles.homeButton} ${pressed ? styles.pressed : ''}`}
            onClick={handleClick}
        >
            <img src={homeIcon} alt="홈 아이콘" className={styles.icon} />
            <span className={styles.label}>홈 버튼</span>
        </button>
    );
};

export default HomeButton;
