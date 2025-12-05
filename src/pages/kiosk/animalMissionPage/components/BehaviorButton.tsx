// components/kiosk/common/InsaroadButton.tsx
import React, { useState } from 'react';
import styles from './BehaviorButton.module.css';

interface BehaviorButtonProps {
    iconSrc: string;
    text: string;
    onClick?: () => void;
}

export const BehaviorButton: React.FC<BehaviorButtonProps> = ({
    iconSrc,
    text,
    onClick,
}) => {
    const [pressed, setPressed] = useState(false);

    const handleClick = () => {
        setPressed(true);
        setTimeout(() => {
            setPressed(false);
            onClick?.();
        }, 160);
    };

    return (
        <button
            className={`${styles.button} ${pressed ? styles.pressed : ''}`}
            onClick={handleClick}
        >
            <img src={iconSrc} alt="" className={styles.icon} />
            <span className={styles.text}>{text}</span>
        </button>
    );
};

export default BehaviorButton;
