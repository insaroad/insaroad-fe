// components/kiosk/common/NextButton.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NextButton.module.css';

import nextButtonImage from '@/assets/next.png';

export type PositionMode = 'manual' | 'center-x' | 'center-both';

export interface NextButtonProps {
    to: string;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    positionMode?: PositionMode;
}

export const NextButton: React.FC<NextButtonProps> = ({
    to,
    width = 260,
    height = 80,
    x = 0,
    y = 0,
    positionMode = 'manual',
}) => {
    const navigate = useNavigate();
    const [pressed, setPressed] = useState(false);

    const handleClick = () => {
        setPressed(true);

        setTimeout(() => {
            setPressed(false);
            navigate(to);
        }, 260);
    };

    const buildPositionStyle = (): React.CSSProperties => {
        switch (positionMode) {
            case 'center-x':
                return {
                    position: 'absolute',
                    left: '50%',
                    top: y,
                    transform: 'translateX(-50%)', // 위치용 transform
                };
            case 'center-both':
                return {
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)', // 위치용 transform
                };
            case 'manual':
            default:
                return {
                    position: 'absolute',
                    left: x,
                    top: y,
                };
        }
    };

    return (
        <button
            type="button"
            className={styles.nextButton}
            style={{
                ...buildPositionStyle(),
                width,
                height,
                padding: 0,
            }}
            onClick={handleClick}
        >
            <img
                src={nextButtonImage}
                alt="next"
                className={`${styles.buttonImage} ${pressed ? styles.pressed : ''}`}
            />
        </button>
    );
};

export default NextButton;
