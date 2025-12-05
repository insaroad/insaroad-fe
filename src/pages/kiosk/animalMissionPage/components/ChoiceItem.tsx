// components/kiosk/choice/ChoiceItem.tsx
import React from 'react';
import styles from './ChoiceItem.module.css';

interface ChoiceItemProps {
    index: number; // 1~5
    imageSrc: string;
    imageAlt?: string;
    selected: boolean;
    onToggle: (index: number) => void;

    imageWidth?: number;
    imageHeight?: number;
}

const CIRCLED_NUMBERS = ['①', '②', '③', '④', '⑤'];

export const ChoiceItem: React.FC<ChoiceItemProps> = ({
    index,
    imageSrc,
    imageAlt = 'choice image',
    selected,
    onToggle,
    imageWidth = 280, // 기본값
    imageHeight = 280, // 기본값
}) => {
    const circledNumber = CIRCLED_NUMBERS[index - 1] ?? String(index);

    return (
        <button
            type="button"
            className={styles.choiceButton}
            onClick={() => onToggle(index)}
        >
            <div className={styles.index}>{circledNumber}</div>

            <div
                className={styles.imageWrapper}
                style={{ width: imageWidth, height: imageHeight }} // 동적 크기 적용
            >
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className={`${styles.image} ${selected ? styles.imageSelected : ''}`}
                />
                {selected && <div className={styles.check} />}
            </div>

            <div
                className={styles.underline}
                style={{ width: imageWidth }} // 밑줄도 이미지 크기에 맞게
            />
        </button>
    );
};

export default ChoiceItem;
