// components/kiosk/choice/ChoiceGrid.tsx
import React, { useState } from 'react';
import ChoiceItem from './ChoiceItem';
import styles from './ChoiceGrid.module.css';

interface ChoiceGridProps {
    items: { index: number; imageSrc: string }[];
    onSelectionChange?: (selectedIndexes: number[]) => void;

    imageWidth?: number;
    imageHeight?: number;
}

export const ChoiceGrid: React.FC<ChoiceGridProps> = ({
    items,
    onSelectionChange,
    imageWidth,
    imageHeight,
}) => {
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

    const handleToggle = (index: number) => {
        const isSelected = selectedIndexes.includes(index);
        let nextSelected: number[];

        if (isSelected) {
            // 이미 선택된 항목 → 해제
            nextSelected = selectedIndexes.filter((i) => i !== index);
        } else {
            // 새로 선택인데 이미 2개 선택됨 → 무시
            if (selectedIndexes.length >= 2) {
                return;
            }
            nextSelected = [...selectedIndexes, index];
        }

        setSelectedIndexes(nextSelected);
        onSelectionChange?.(nextSelected);
    };

    return (
        <div className={styles.grid}>
            {items.map((item) => (
                <ChoiceItem
                    key={item.index}
                    index={item.index}
                    imageSrc={item.imageSrc}
                    selected={selectedIndexes.includes(item.index)}
                    onToggle={handleToggle}
                    imageWidth={imageWidth}
                    imageHeight={imageHeight}
                />
            ))}
        </div>
    );
};

export default ChoiceGrid;
