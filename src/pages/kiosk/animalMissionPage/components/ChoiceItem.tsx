// components/kiosk/choice/ChoiceItem.tsx
import React from 'react';
import styles from './ChoiceItem.module.css';

interface ChoiceItemProps {
    index: number; // 1~5
    imageSrc: string;
    imageAlt?: string;
    selected: boolean; // 부모가 넘겨주는 선택 상태
    onToggle: (index: number) => void; // 선택 요청 이벤트
}

const CIRCLED_NUMBERS = ['①', '②', '③', '④', '⑤'];

export const ChoiceItem: React.FC<ChoiceItemProps> = ({
    index,
    imageSrc,
    imageAlt = 'choice image',
    selected,
    onToggle,
}) => {
    const circledNumber = CIRCLED_NUMBERS[index - 1] ?? String(index);

    return (
        <button
            type="button"
            className={styles.choiceButton}
            onClick={() => onToggle(index)}
        >
            <div className={styles.index}>{circledNumber}</div>

            <div className={styles.imageWrapper}>
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className={`${styles.image} ${selected ? styles.imageSelected : ''}`}
                />
                {selected && <div className={styles.check} />}
            </div>

            <div className={styles.underline} />
        </button>
    );
};

export default ChoiceItem;
