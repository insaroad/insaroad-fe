import React, { useState } from 'react';
import styles from './InsaroadButton.module.css';

type InsaroadButtonProps = {
    width: number;
    height: number;
    x: number;
    y: number;
    text: string;
    onClick?: () => void;
};

export const InsaroadButton: React.FC<InsaroadButtonProps> = ({
    width,
    height,
    x,
    y,
    text,
    onClick,
}) => {
    const [pressed, setPressed] = useState(false);

    const handlePress = () => {
        setPressed(true);

        // 눌림 상태를 250ms 유지 → 원하는 만큼 조절 가능
        setTimeout(() => {
            setPressed(false);
        }, 250);

        onClick?.();
    };

    return (
        <button
            type="button"
            className={`${styles.button} ${pressed ? styles.pressed : ''}`}
            style={{ width, height, left: x, top: y }}
            onClick={handlePress}
        >
            {text}
        </button>
    );
};

export default InsaroadButton;
