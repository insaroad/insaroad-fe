import React from 'react';
import KeypadButton from './KeypadButton';
import styles from './Keypad.module.css';

type KeypadProps = {
    originX: number; // 키패드 전체의 좌측 기준 x
    originY: number; // 키패드 전체의 상단 기준 y
    buttonWidth?: number;
    buttonHeight?: number;
    gapX?: number;
    gapY?: number;
    onNumberClick?: (digit: number) => void;
    onBackspaceClick?: () => void;
};

export const Keypad: React.FC<KeypadProps> = ({
    originX,
    originY,
    buttonWidth = 80,
    buttonHeight = 60,
    gapX = 80,
    gapY = 70,
    onNumberClick,
    onBackspaceClick,
}) => {
    // 1~9 버튼 정보
    const numbers = [
        { n: 1, row: 0, col: 0 },
        { n: 2, row: 0, col: 1 },
        { n: 3, row: 0, col: 2 },
        { n: 4, row: 1, col: 0 },
        { n: 5, row: 1, col: 1 },
        { n: 6, row: 1, col: 2 },
        { n: 7, row: 2, col: 0 },
        { n: 8, row: 2, col: 1 },
        { n: 9, row: 2, col: 2 },
    ];

    return (
        <div className={styles.wrapper}>
            {numbers.map(({ n, row, col }) => (
                <KeypadButton
                    key={n}
                    label={String(n)}
                    width={buttonWidth}
                    height={buttonHeight}
                    x={originX + col * gapX}
                    y={originY + row * gapY}
                    onClick={() => onNumberClick?.(n)}
                />
            ))}

            {/* 0 버튼: 가운데 아래 줄 */}
            <KeypadButton
                label="0"
                width={buttonWidth}
                height={buttonHeight}
                x={originX + gapX} // 가운데 열
                y={originY + 3 * gapY} // 4번째 줄
                onClick={() => onNumberClick?.(0)}
            />

            {/* ← 버튼: 오른쪽 아래 */}
            <KeypadButton
                label="←"
                width={buttonWidth}
                height={buttonHeight}
                x={originX + 2 * gapX} // 오른쪽 열
                y={originY + 3 * gapY}
                onClick={onBackspaceClick}
            />
        </div>
    );
};

export default Keypad;
