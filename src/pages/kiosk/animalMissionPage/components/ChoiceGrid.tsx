// components/kiosk/choice/ChoiceGrid.tsx
import React, { useState } from 'react';
import ChoiceItem from './ChoiceItem';
import styles from './ChoiceGrid.module.css';

interface ChoiceGridProps {
    items: { index: number; imageSrc: string }[];
    onSelectionChange?: (selectedIndexes: number[]) => void;

    imageWidth?: number;
    imageHeight?: number;
    maxSelectable?: number;

    width?: string | number;
    columnGap?: number;
    rowGap?: number;
}

export const ChoiceGrid: React.FC<ChoiceGridProps> = ({
    items,
    onSelectionChange,
    imageWidth,
    imageHeight,
    maxSelectable = 2,

    width = '80%',
    columnGap = 250,
    rowGap = 120,
}) => {
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

    const handleToggle = (index: number) => {
        const isSelected = selectedIndexes.includes(index);
        let nextSelected: number[];

        if (isSelected) {
            nextSelected = selectedIndexes.filter((i) => i !== index);
        } else {
            if (selectedIndexes.length >= maxSelectable) {
                return;
            }
            nextSelected = [...selectedIndexes, index];
        }

        setSelectedIndexes(nextSelected);
        onSelectionChange?.(nextSelected);
    };

    return (
        <div
            className={styles.grid}
            style={{
                width,
                columnGap,
                rowGap,
            }}
        >
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
