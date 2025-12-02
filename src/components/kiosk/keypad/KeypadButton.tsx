// components/kiosk/keypad/KeypadButton.tsx
import React, { useState } from 'react';
import styles from './KeypadButton.module.css';

type KeypadButtonProps = {
    x: number;
    y: number;
    width: number;
    height: number;
    label: string; // 버튼에 보여줄 내용 (숫자/← 등)
    onClick?: () => void;
};

export const KeypadButton: React.FC<KeypadButtonProps> = ({
    x,
    y,
    width,
    height,
    label,
    onClick,
}) => {
    const [pressed, setPressed] = useState(false);

    const handleClick = () => {
        setPressed(true);

        // 눌림 상태를 일정 시간 유지 (예: 220ms)
        setTimeout(() => {
            setPressed(false);
        }, 220);

        onClick?.();
    };

    return (
        <button
            type="button"
            className={`${styles.button} ${pressed ? styles.pressed : ''}`}
            style={{ left: x, top: y, width, height }}
            onClick={handleClick}
        >
            {label}
        </button>
    );
};

export default KeypadButton;
