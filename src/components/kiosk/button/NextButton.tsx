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

    /** ✅ 페이지 전환을 외부에서 제어(페이드아웃 후 이동 등) */
    onBeforeNavigate?: (to: string) => void;

    /** (선택) 버튼 눌림 애니메이션 시간 */
    pressMs?: number;
}

export const NextButton: React.FC<NextButtonProps> = ({
    to,
    width = 260,
    height = 80,
    x = 0,
    y = 0,
    positionMode = 'manual',
    onBeforeNavigate,
    pressMs = 260,
}) => {
    const navigate = useNavigate();
    const [pressed, setPressed] = useState(false);

    const handleClick = () => {
        setPressed(true);

        window.setTimeout(() => {
            setPressed(false);

            // ✅ 외부 훅이 있으면 외부에서 전환(페이드) 처리
            if (onBeforeNavigate) {
                onBeforeNavigate(to);
                return;
            }

            // 기존 동작 유지
            navigate(to);
        }, pressMs ?? 260);
    };

    const buildPositionStyle = (): React.CSSProperties => {
        switch (positionMode) {
            case 'center-x':
                return {
                    position: 'absolute',
                    left: '50%',
                    top: y,
                    transform: 'translateX(-50%)',
                };
            case 'center-both':
                return {
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
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
